from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton
from datetime import datetime, timedelta
from strings import t

def get_main_menu_keyboard(lang: str = "en") -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text=t("btn_book", lang)), KeyboardButton(text=t("btn_services", lang))],
            [KeyboardButton(text=t("btn_my_bookings", lang)), KeyboardButton(text=t("btn_hours", lang))],
            [KeyboardButton(text=t("btn_change_lang", lang)), KeyboardButton(text=t("btn_contact", lang))]
        ],
        resize_keyboard=True
    )

def get_language_inline_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="🇬🇧 English", callback_data="lang_en"),
                InlineKeyboardButton(text="🇪🇹 አማርኛ", callback_data="lang_am")
            ]
        ]
    )

def get_services_keyboard(services, lang: str = "en") -> InlineKeyboardMarkup:
    buttons = []
    for s in services:
        name = s["name_am"] if lang == "am" else s["name_en"]
        label = f"{name} — {s['price']} ETB ({s['duration_mins']}m)"
        buttons.append([InlineKeyboardButton(text=label, callback_data=f"srv_{s['id']}")])
    buttons.append([InlineKeyboardButton(text="⬅️ Back", callback_data="cancel_booking")])
    return InlineKeyboardMarkup(inline_keyboard=buttons)

def get_barbers_keyboard(barbers, lang: str = "en") -> InlineKeyboardMarkup:
    buttons = []
    for b in barbers:
        spec = b["specialty_am"] if lang == "am" else b["specialty_en"]
        buttons.append([InlineKeyboardButton(text=f"✂️ {b['name']} ({spec})", callback_data=f"brb_{b['id']}")])
    
    any_label = "⚡ Any Available Barber (ፈጣን ተረኛ)" if lang == "am" else "⚡ Any Available Barber"
    buttons.append([InlineKeyboardButton(text=any_label, callback_data="brb_0")])
    buttons.append([InlineKeyboardButton(text="⬅️ Back", callback_data="cancel_booking")])
    return InlineKeyboardMarkup(inline_keyboard=buttons)

def get_date_keyboard(lang: str = "en") -> InlineKeyboardMarkup:
    now = datetime.now()
    d1 = now.strftime("%Y-%m-%d")
    d2 = (now + timedelta(days=1)).strftime("%Y-%m-%d")
    d3 = (now + timedelta(days=2)).strftime("%Y-%m-%d")
    
    t1 = "ዛሬ (Today)" if lang == "am" else f"Today ({now.strftime('%b %d')})"
    t2 = "ነገ (Tomorrow)" if lang == "am" else f"Tomorrow ({(now + timedelta(days=1)).strftime('%b %d')})"
    t3 = (now + timedelta(days=2)).strftime("%a, %b %d")

    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=f"📅 {t1}", callback_data=f"date_{d1}")],
            [InlineKeyboardButton(text=f"📅 {t2}", callback_data=f"date_{d2}")],
            [InlineKeyboardButton(text=f"📅 {t3}", callback_data=f"date_{d3}")],
            [InlineKeyboardButton(text="⬅️ Back", callback_data="cancel_booking")]
        ]
    )

def get_time_slots_keyboard(taken_slots: list = None) -> InlineKeyboardMarkup:
    taken_slots = taken_slots or []
    all_slots = [
        "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
        "06:30 PM", "07:30 PM"
    ]
    
    rows = []
    current_row = []
    for slot in all_slots:
        is_taken = slot in taken_slots
        text = f"❌ {slot}" if is_taken else f"🟢 {slot}"
        cb = "slot_taken" if is_taken else f"slot_{slot}"
        current_row.append(InlineKeyboardButton(text=text, callback_data=cb))
        if len(current_row) == 2:
            rows.append(current_row)
            current_row = []
    if current_row:
        rows.append(current_row)
    rows.append([InlineKeyboardButton(text="⬅️ Back", callback_data="cancel_booking")])
    return InlineKeyboardMarkup(inline_keyboard=rows)

def get_payment_keyboard(lang: str = "en") -> InlineKeyboardMarkup:
    lbl_telebirr = "📱 Telebirr (በቴሌብር)" if lang == "am" else "📱 Pay via Telebirr"
    lbl_cash = "💵 Cash at Shop (በቦታው በካሽ)" if lang == "am" else "💵 Cash at Barbershop"
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=lbl_telebirr, callback_data="pay_telebirr")],
            [InlineKeyboardButton(text=lbl_cash, callback_data="pay_cash")],
            [InlineKeyboardButton(text="⬅️ Back", callback_data="cancel_booking")]
        ]
    )

def get_booking_cancel_keyboard(booking_id: int, lang: str = "en") -> InlineKeyboardMarkup:
    label = t("btn_cancel", lang)
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=f"❌ {label} #{booking_id}", callback_data=f"cancel_{booking_id}")]
        ]
    )

def get_admin_action_keyboard(booking_id: int) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="✅ Approve", callback_data=f"adm_app_{booking_id}"),
                InlineKeyboardButton(text="❌ Decline", callback_data=f"adm_dec_{booking_id}")
            ]
        ]
    )
