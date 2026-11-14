from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import Command
from database import get_user_language, get_user_appointments, cancel_appointment, get_appointment_by_id
from strings import t
from keyboards import get_booking_cancel_keyboard
from aiogram import Bot
import config

router = Router()

@router.message(F.text.in_(["📋 My Bookings", "📋 የእኔ ቀጠሮዎች"]))
@router.message(Command("mybookings"))
async def cmd_my_bookings(message: Message):
    lang = await get_user_language(message.from_user.id)
    appts = await get_user_appointments(message.from_user.id)
    
    if not appts:
        await message.answer(t("no_bookings", lang))
        return
        
    title = t("my_bookings_title", lang)
    await message.answer(title, parse_mode="Markdown")
    
    for a in appts:
        srv_name = a["name_am"] if lang == "am" else a["name_en"]
        status_emoji = "🟢" if a["status"] == "confirmed" else ("🟡" if a["status"] == "pending" else "🔴")
        
        info = (
            f"🎫 **Booking #{a['id']}** {status_emoji} _{a['status'].upper()}_\n"
            f"• Service: **{srv_name}** ({a['price']} ETB)\n"
            f"• Barber: **{a['barber_name']}**\n"
            f"• Schedule: **{a['booking_date']} at {a['time_slot']}**\n"
            f"• Payment: {a['payment_method']}\n"
        )
        
        kb = get_booking_cancel_keyboard(a["id"], lang) if a["status"] == "pending" else None
        await message.answer(info, reply_markup=kb, parse_mode="Markdown")

@router.callback_query(F.data.startswith("cancel_"))
async def cb_cancel_appointment(callback: CallbackQuery, bot: Bot):
    app_id = int(callback.data.split("_")[1])
    lang = await get_user_language(callback.from_user.id)
    appt = await get_appointment_by_id(app_id)
    success = await cancel_appointment(app_id, callback.from_user.id)
    
    if success:
        await callback.message.edit_text(t("booking_cancelled", lang, id=app_id))
        if appt:
            for admin_id in config.ADMIN_IDS:
                try:
                    await bot.send_message(
                        admin_id,
                        f"⚠️ **BOOKING CANCELLED BY CUSTOMER #{app_id}**\n\n"
                        f"• Customer: {appt['customer_name']} ({appt['customer_phone']})\n"
                        f"• Service: {appt['name_en']}\n"
                        f"• Schedule: {appt['booking_date']} at {appt['time_slot']}\n\n"
                        f"🟢 This time slot has been released and is now open for new bookings."
                    )
                except Exception:
                    pass
    else:
        await callback.answer("Unable to cancel this booking.", show_alert=True)
    await callback.answer()
