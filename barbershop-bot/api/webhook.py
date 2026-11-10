import os
import sys
import json
import asyncio
from http.server import BaseHTTPRequestHandler

# Ensure parent directory is on sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

import config
from database import init_db
from aiogram import Bot, Dispatcher
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties
from aiogram.types import Update
from handlers import start, admin, booking, profile

dp = Dispatcher()
dp.include_router(start.router)
dp.include_router(admin.router)
dp.include_router(booking.router)
dp.include_router(profile.router)

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        response_body = {
            "status": "online",
            "shop": config.SHOP_NAME,
            "engine": "Python aiogram 3.x (Serverless)",
            "webhook": "/api/webhook"
        }
        self.wfile.write(json.dumps(response_body).encode('utf-8'))

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)

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

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(b'{"ok": true}')
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
