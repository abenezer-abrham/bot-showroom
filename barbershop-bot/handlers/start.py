from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import CommandStart, Command
from database import get_user_language, set_user_language, get_all_services
from strings import t
from keyboards import get_main_menu_keyboard, get_language_inline_keyboard
import config

router = Router()

@router.message(CommandStart())
async def cmd_start(message: Message):
    lang = await get_user_language(message.from_user.id)
    # Check if first time or existing
    text = t("welcome", lang, shop_name=config.SHOP_NAME)
    kb = get_main_menu_keyboard(lang)
    await message.answer(text, reply_markup=kb, parse_mode="Markdown")

@router.message(F.text.in_(["🌐 አማርኛ / English", "🌐 English / አማርኛ"]))
@router.message(Command("language"))
async def cmd_language(message: Message):
    await message.answer(
        "🌐 Please select your preferred language / እባክዎ ቋንቋ ይምረጡ:",
        reply_markup=get_language_inline_keyboard()
    )

@router.callback_query(F.data.startswith("lang_"))
async def cb_language(callback: CallbackQuery):
    lang = callback.data.split("_")[1]
    await set_user_language(callback.from_user.id, lang)
    msg = t("lang_changed", lang)
    kb = get_main_menu_keyboard(lang)
    await callback.message.edit_text(msg)
    await callback.message.answer(t("welcome", lang, shop_name=config.SHOP_NAME), reply_markup=kb, parse_mode="Markdown")
    await callback.answer()

@router.message(F.text.in_(["📍 Location & Hours", "📍 አድራሻና ሰዓት"]))
@router.message(Command("location"))
async def cmd_location(message: Message):
    lang = await get_user_language(message.from_user.id)
    text = t(
        "location_info",
        lang,
        shop_name=config.SHOP_NAME,
        location=config.SHOP_LOCATION,
        phone=config.SHOP_PHONE,
        alt_phone=config.SHOP_ALT_PHONE,
        telebirr=config.TELEBIRR_PHONE,
        name=config.TELEBIRR_NAME
    )
    await message.answer(text, parse_mode="Markdown")

@router.message(F.text.in_(["✂️ Services & Pricing", "✂️ አገልግሎቶችና ዋጋ"]))
@router.message(Command("services"))
async def cmd_services(message: Message):
    lang = await get_user_language(message.from_user.id)
    services = await get_all_services()
    
    header = "✂️ **Barbershop Services & Official Prices**:\n\n" if lang == "en" else "✂️ **የባርበርሾፕ አገልግሎቶች እና ዋጋ ዝርዝር**:\n\n"
    lines = []
    for s in services:
        name = s["name_am"] if lang == "am" else s["name_en"]
        desc = s["description_am"] if lang == "am" else s["description_en"]
        lines.append(f"• **{name}** — **{s['price']} ETB** ({s['duration_mins']} mins)\n  _{desc}_")
    
    await message.answer(header + "\n\n".join(lines), parse_mode="Markdown")

@router.message(F.text.in_(["📞 Call Shop", "📞 ደውል"]))
async def cmd_call(message: Message):
    await message.answer(
        f"📞 **Call {config.SHOP_NAME} Directly**:\n\n"
        f"• Primary: `{config.SHOP_PHONE}`\n"
        f"• Alternate: `{config.SHOP_ALT_PHONE}`\n\n"
        f"Our team is happy to assist with any special inquiries!",
        parse_mode="Markdown"
    )
