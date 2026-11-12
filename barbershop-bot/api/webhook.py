import os
import sys
import json
import asyncio
from urllib.parse import urlparse, parse_qs
from http.server import BaseHTTPRequestHandler

# Ensure parent directory is on sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

import config
from database import (
    init_db, get_all_services, get_all_barbers, get_service_by_id,
    get_barber_by_id, get_daily_appointments, create_appointment,
    get_user_appointments
)
from aiogram import Bot, Dispatcher
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties
from aiogram.types import Update
from keyboards import get_admin_action_keyboard
from strings import t
from handlers import start, admin, booking, profile

dp = Dispatcher()
dp.include_router(start.router)
dp.include_router(admin.router)
dp.include_router(booking.router)
dp.include_router(profile.router)

ALL_TIME_SLOTS = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "06:30 PM", "07:30 PM"
]

class handler(BaseHTTPRequestHandler):
    def _send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip('/')
        qs = parse_qs(parsed.query)

        # 1. Services & Barbers API for Mini App
        if path == '/api/services':
            async def get_catalog():
                await init_db()
                services = await get_all_services()
                barbers = await get_all_barbers()
                return {
                    "services": [dict(s) for s in services],
                    "barbers": [dict(b) for b in barbers],
                    "shop": {
                        "name": config.SHOP_NAME,
                        "phone": config.SHOP_PHONE,
                        "location": config.SHOP_LOCATION,
                        "telebirr": config.TELEBIRR_PHONE,
                        "telebirr_name": config.TELEBIRR_NAME
                    }
                }
            result = asyncio.run(get_catalog())
            self._send_json(result)
            return

        # 2. Live Slot Availability API
        if path == '/api/slots':
            date_str = qs.get('date', [''])[0]
            barber_id_str = qs.get('barber_id', ['0'])[0]

            async def get_slots():
                await init_db()
                if not date_str:
                    return {"taken_slots": [], "all_slots": ALL_TIME_SLOTS}
                daily = await get_daily_appointments(date_str)
                barber_id = int(barber_id_str) if barber_id_str.isdigit() else 0
                if barber_id > 0:
                    taken = [a["time_slot"] for a in daily if a["barber_id"] == barber_id and a["status"] != "cancelled"]
                else:
                    # If any barber, slot is taken only if all active barbers are taken
                    barbers = await get_all_barbers()
                    total_barbers = max(len(barbers), 1)
                    slot_counts = {}
                    for a in daily:
                        if a["status"] != "cancelled":
                            slot = a["time_slot"]
                            slot_counts[slot] = slot_counts.get(slot, 0) + 1
                    taken = [slot for slot, cnt in slot_counts.items() if cnt >= total_barbers]
                return {"date": date_str, "taken_slots": taken, "all_slots": ALL_TIME_SLOTS}

            result = asyncio.run(get_slots())
            self._send_json(result)
            return

        # 3. User Bookings API
        if path == '/api/my-bookings':
            user_id_str = qs.get('user_id', [''])[0]
            async def get_user_b():
                await init_db()
                if not user_id_str or not user_id_str.isdigit():
                    return {"bookings": []}
                appts = await get_user_appointments(int(user_id_str))
                return {"bookings": [dict(a) for a in appts]}
            result = asyncio.run(get_user_b())
            self._send_json(result)
            return

        # 4. Webhook status check
        response_body = {
            "status": "online",
            "shop": config.SHOP_NAME,
            "engine": "Python aiogram 3.x (Serverless TMA)",
            "webhook": "/api/webhook"
        }
        self._send_json(response_body)

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip('/')

        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)

        # 1. Mini App Direct Booking Endpoint
        if path == '/api/book':
            try:
                body = json.loads(post_data.decode('utf-8'))
                user_id = int(body.get('user_id', 0))
                customer_name = body.get('customer_name', 'Guest')
                customer_phone = body.get('customer_phone', '')
                service_id = int(body.get('service_id', 1))
                barber_id = int(body.get('barber_id', 1))
                booking_date = body.get('booking_date', '')
                time_slot = body.get('time_slot', '')
                payment_method = body.get('payment_method', 'Cash at Shop')
                payment_ref = body.get('payment_ref', None)

                # Default barber 1 if 0
                actual_barber_id = 1 if barber_id == 0 else barber_id

                async def process_booking():
                    await init_db()
                    booking_id = await create_appointment(
                        user_id=user_id or 1,
                        customer_name=customer_name,
                        customer_phone=customer_phone,
                        service_id=service_id,
                        barber_id=actual_barber_id,
                        date=booking_date,
                        slot=time_slot,
                        payment_method=payment_method,
                        payment_ref=payment_ref
                    )

                    service = await get_service_by_id(service_id)
                    barber = await get_barber_by_id(actual_barber_id)
                    srv_name = service["name_en"] if service else "Barbershop Service"
                    barber_name = barber["name"] if barber else "Stylist"
                    price = service["price"] if service else 800

                    # Alert Admin & User via Telegram Bot
                    async with Bot(
                        token=config.BOT_TOKEN,
                        default=DefaultBotProperties(parse_mode=ParseMode.MARKDOWN)
                    ) as bot_instance:
                        # 1. Alert Admin(s)
                        for admin_id in config.ADMIN_IDS:
                            try:
                                admin_msg = t(
                                    "admin_alert",
                                    "en",
                                    id=booking_id,
                                    name=customer_name,
                                    contact=customer_phone or "N/A",
                                    service=srv_name,
                                    barber=barber_name,
                                    date=booking_date,
                                    slot=time_slot,
                                    price=price,
                                    payment=payment_method,
                                    ref=payment_ref or "N/A"
                                )
                                kb = get_admin_action_keyboard(booking_id)
                                await bot_instance.send_message(admin_id, admin_msg, reply_markup=kb, parse_mode="Markdown")
                            except Exception:
                                pass

                        # 2. Send confirmation to user if Telegram user_id is provided
                        if user_id and user_id > 1000:
                            try:
                                user_msg = t(
                                    "booking_success",
                                    "en",
                                    id=booking_id,
                                    service=srv_name,
                                    barber=barber_name,
                                    date=booking_date,
                                    slot=time_slot,
                                    price=price,
                                    payment=payment_method,
                                    location=config.SHOP_LOCATION,
                                    phone=config.SHOP_PHONE
                                )
                                await bot_instance.send_message(user_id, user_msg, parse_mode="Markdown")
                            except Exception:
                                pass

                    return booking_id

                booking_id = asyncio.run(process_booking())
                self._send_json({"ok": True, "booking_id": booking_id, "message": "Appointment confirmed successfully!"})
            except Exception as e:
                self._send_json({"ok": False, "error": str(e)}, status=500)
            return

        # 2. Telegram Bot Webhook Updates
        try:
            update_dict = json.loads(post_data.decode('utf-8'))

            async def handle_update():
                await init_db()
                async with Bot(
                    token=config.BOT_TOKEN,
                    default=DefaultBotProperties(parse_mode=ParseMode.MARKDOWN)
                ) as bot_instance:
                    update = Update.model_validate(update_dict, context={"bot": bot_instance})
                    await dp.feed_update(bot=bot_instance, update=update)

            asyncio.run(handle_update())
            self._send_json({"ok": True})
        except Exception as e:
            self._send_json({"error": str(e)}, status=500)
