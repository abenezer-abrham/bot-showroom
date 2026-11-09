from aiogram import Router, F, Bot
from aiogram.types import Message, CallbackQuery
from aiogram.filters import Command
from datetime import datetime
from database import (
    get_daily_appointments, update_appointment_status,
    get_all_user_ids
)
import config

router = Router()

def is_admin(user_id: int) -> bool:
    return user_id in config.ADMIN_IDS

@router.message(Command("admin"))
async def cmd_admin(message: Message):
    if not is_admin(message.from_user.id):
        await message.answer("⛔ Access denied. Admin rights required.")
        return
        
    text = (
        "👑 **Barbershop Owner Dashboard**\n\n"
        "Commands:\n"
        "• `/today` — View all scheduled bookings for today\n"
        "• `/broadcast <message>` — Send announcement to all customers\n"
        "• Inline approvals for Telebirr transactions directly in your chat."
    )
    await message.answer(text, parse_mode="Markdown")

@router.message(Command("today"))
async def cmd_today(message: Message):
    if not is_admin(message.from_user.id):
        return
        
    today_str = datetime.now().strftime("%Y-%m-%d")
    appts = await get_daily_appointments(today_str)
    
    if not appts:
        await message.answer(f"📅 No bookings scheduled for today ({today_str}).")
        return
        
    lines = [f"📅 **Schedule for Today ({today_str})**:\n"]
    for a in appts:
        status_tag = "✅" if a["status"] == "confirmed" else ("⏳" if a["status"] == "pending" else "❌")
        lines.append(
            f"{status_tag} **{a['time_slot']}** — #{a['id']}\n"
            f"  • Barber: {a['barber_name']}\n"
            f"  • Service: {a['name_en']} ({a['price']} ETB)\n"
            f"  • Customer: {a['customer_name']} ({a['customer_phone']})\n"
            f"  • Pay: {a['payment_method']} | Ref: {a['payment_ref'] or 'Cash'}\n"
        )
        
    await message.answer("\n".join(lines), parse_mode="Markdown")

@router.callback_query(F.data.startswith("adm_app_"))
async def cb_admin_approve(callback: CallbackQuery, bot: Bot):
    if not is_admin(callback.from_user.id):
        return
        
    booking_id = int(callback.data.split("_")[2])
    await update_appointment_status(booking_id, "confirmed")
    await callback.message.edit_reply_markup(reply_markup=None)
    await callback.message.answer(f"✅ Booking #{booking_id} has been **APPROVED** and confirmed!")
    await callback.answer("Approved!")

@router.callback_query(F.data.startswith("adm_dec_"))
async def cb_admin_decline(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        return
        
    booking_id = int(callback.data.split("_")[2])
    await update_appointment_status(booking_id, "declined")
    await callback.message.edit_reply_markup(reply_markup=None)
    await callback.message.answer(f"❌ Booking #{booking_id} has been **DECLINED**.")
    await callback.answer("Declined.")

@router.message(Command("broadcast"))
async def cmd_broadcast(message: Message, bot: Bot):
    if not is_admin(message.from_user.id):
        return
        
    parts = message.text.split(maxsplit=1)
    if len(parts) < 2:
        await message.answer("Usage: `/broadcast Your message here...`")
        return
        
    broadcast_text = parts[1]
    user_ids = await get_all_user_ids()
    sent_count = 0
    
    for uid in user_ids:
        try:
            await bot.send_message(uid, f"📢 **Announcement from {config.SHOP_NAME}**:\n\n{broadcast_text}", parse_mode="Markdown")
            sent_count += 1
        except Exception:
            pass
            
    await message.answer(f"✅ Broadcast sent to {sent_count} customers.")
