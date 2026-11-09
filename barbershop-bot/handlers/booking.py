from aiogram import Router, F, Bot
from aiogram.types import Message, CallbackQuery
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from database import (
    get_user_language, get_all_services, get_service_by_id,
    get_all_barbers, get_barber_by_id, create_appointment,
    get_daily_appointments
)
from strings import t
from keyboards import (
    get_services_keyboard, get_barbers_keyboard,
    get_date_keyboard, get_time_slots_keyboard,
    get_payment_keyboard, get_admin_action_keyboard
)
import config

router = Router()

class BookingStates(StatesGroup):
    selecting_service = State()
    selecting_barber = State()
    selecting_date = State()
    selecting_slot = State()
    entering_contact = State()
    selecting_payment = State()
    waiting_telebirr_ref = State()

@router.message(F.text.in_(["📅 Book Appointment", "📅 ቀጠሮ ይያዙ"]))
async def start_booking(message: Message, state: FSMContext):
    await state.clear()
    lang = await get_user_language(message.from_user.id)
    services = await get_all_services()
    kb = get_services_keyboard(services, lang)
    await state.set_state(BookingStates.selecting_service)
    await message.answer(t("select_service", lang), reply_markup=kb, parse_mode="Markdown")

@router.callback_query(F.data.startswith("srv_"), BookingStates.selecting_service)
async def cb_select_service(callback: CallbackQuery, state: FSMContext):
    service_id = int(callback.data.split("_")[1])
    await state.update_data(service_id=service_id)
    lang = await get_user_language(callback.from_user.id)
    barbers = await get_all_barbers()
    kb = get_barbers_keyboard(barbers, lang)
    await state.set_state(BookingStates.selecting_barber)
    await callback.message.edit_text(t("select_barber", lang), reply_markup=kb, parse_mode="Markdown")
    await callback.answer()

@router.callback_query(F.data.startswith("brb_"), BookingStates.selecting_barber)
async def cb_select_barber(callback: CallbackQuery, state: FSMContext):
    barber_id = int(callback.data.split("_")[1])
    # 0 means any available barber, default to barber 1
    actual_barber_id = 1 if barber_id == 0 else barber_id
    await state.update_data(barber_id=actual_barber_id, chosen_barber_id=barber_id)
    lang = await get_user_language(callback.from_user.id)
    kb = get_date_keyboard(lang)
    await state.set_state(BookingStates.selecting_date)
    await callback.message.edit_text(t("select_date", lang), reply_markup=kb, parse_mode="Markdown")
    await callback.answer()

@router.callback_query(F.data.startswith("date_"), BookingStates.selecting_date)
async def cb_select_date(callback: CallbackQuery, state: FSMContext):
    date_str = callback.data.split("_")[1]
    await state.update_data(booking_date=date_str)
    data = await state.get_data()
    lang = await get_user_language(callback.from_user.id)
    
    # Get collision taken slots
    existing_appts = await get_daily_appointments(date_str)
    taken_slots = [a["time_slot"] for a in existing_appts if a["barber_id"] == data["barber_id"] and a["status"] != "cancelled"]
    
    barber = await get_barber_by_id(data["barber_id"])
    barber_name = barber["name"] if barber else "Any Stylist"
    
    kb = get_time_slots_keyboard(taken_slots)
    await state.set_state(BookingStates.selecting_slot)
    await callback.message.edit_text(
        t("select_time", lang, date=date_str, barber=barber_name),
        reply_markup=kb,
        parse_mode="Markdown"
    )
    await callback.answer()

@router.callback_query(F.data == "slot_taken")
async def cb_slot_taken(callback: CallbackQuery):
    await callback.answer("❌ This slot is already booked. Please choose another one.", show_alert=True)

@router.callback_query(F.data.startswith("slot_"), BookingStates.selecting_slot)
async def cb_select_slot(callback: CallbackQuery, state: FSMContext):
    slot = callback.data.replace("slot_", "")
    await state.update_data(time_slot=slot)
    lang = await get_user_language(callback.from_user.id)
    
    await state.set_state(BookingStates.entering_contact)
    await callback.message.edit_text(t("enter_contact", lang), parse_mode="Markdown")
    await callback.answer()

@router.message(BookingStates.entering_contact)
async def process_contact(message: Message, state: FSMContext):
    contact_text = message.text.strip()
    await state.update_data(customer_contact=contact_text)
    
    data = await state.get_data()
    service = await get_service_by_id(data["service_id"])
    lang = await get_user_language(message.from_user.id)
    srv_name = service["name_am"] if lang == "am" else service["name_en"]
    
    kb = get_payment_keyboard(lang)
    await state.set_state(BookingStates.selecting_payment)
    await message.answer(
        t("select_payment", lang, service=srv_name, price=service["price"]),
        reply_markup=kb,
        parse_mode="Markdown"
    )

@router.callback_query(F.data == "pay_cash", BookingStates.selecting_payment)
async def cb_pay_cash(callback: CallbackQuery, state: FSMContext, bot: Bot):
    await finalize_booking(callback.from_user.id, "Cash at Shop", None, state, callback.message, bot)
    await callback.answer()

@router.callback_query(F.data == "pay_telebirr", BookingStates.selecting_payment)
async def cb_pay_telebirr(callback: CallbackQuery, state: FSMContext):
    data = await state.get_data()
    service = await get_service_by_id(data["service_id"])
    lang = await get_user_language(callback.from_user.id)
    
    await state.set_state(BookingStates.waiting_telebirr_ref)
    await callback.message.edit_text(
        t("telebirr_instructions", lang, phone=config.TELEBIRR_PHONE, name=config.TELEBIRR_NAME, price=service["price"]),
        parse_mode="Markdown"
    )
    await callback.answer()

@router.message(BookingStates.waiting_telebirr_ref)
async def process_telebirr_ref(message: Message, state: FSMContext, bot: Bot):
    telebirr_ref = message.text.strip()
    await finalize_booking(message.from_user.id, "Telebirr", telebirr_ref, state, message, bot)

async def finalize_booking(user_id: int, payment_method: str, payment_ref: str, state: FSMContext, message_target: Message, bot: Bot):
    data = await state.get_data()
    service = await get_service_by_id(data["service_id"])
    barber = await get_barber_by_id(data["barber_id"])
    lang = await get_user_language(user_id)
    
    srv_name = service["name_am"] if lang == "am" else service["name_en"]
    barber_name = barber["name"] if barber else "Barber"
    contact_parts = data.get("customer_contact", "Customer").split("-")
    cust_name = contact_parts[0].strip()
    cust_phone = contact_parts[1].strip() if len(contact_parts) > 1 else ""
    
    booking_id = await create_appointment(
        user_id=user_id,
        customer_name=cust_name,
        customer_phone=cust_phone or data.get("customer_contact", ""),
        service_id=data["service_id"],
        barber_id=data["barber_id"],
        date=data["booking_date"],
        slot=data["time_slot"],
        payment_method=payment_method,
        payment_ref=payment_ref
    )
    
    success_text = t(
        "booking_success",
        lang,
        id=booking_id,
        service=srv_name,
        barber=barber_name,
        date=data["booking_date"],
        slot=data["time_slot"],
        price=service["price"],
        payment=payment_method,
        location=config.SHOP_LOCATION,
        phone=config.SHOP_PHONE
    )
    
    await message_target.answer(success_text, parse_mode="Markdown")
    await state.clear()
    
    # Notify Admin(s)
    for admin_id in config.ADMIN_IDS:
        try:
            admin_msg = t(
                "admin_alert",
                "en",
                id=booking_id,
                name=cust_name,
                contact=cust_phone or data.get("customer_contact", "N/A"),
                service=service["name_en"],
                barber=barber_name,
                date=data["booking_date"],
                slot=data["time_slot"],
                price=service["price"],
                payment=payment_method,
                ref=payment_ref or "N/A (Cash)"
            )
            kb = get_admin_action_keyboard(booking_id)
            await bot.send_message(admin_id, admin_msg, reply_markup=kb, parse_mode="Markdown")
        except Exception:
            pass

@router.callback_query(F.data == "cancel_booking")
async def cb_cancel_process(callback: CallbackQuery, state: FSMContext):
    await state.clear()
    lang = await get_user_language(callback.from_user.id)
    await callback.message.edit_text("❌ Booking cancelled. You can start again anytime from the menu.")
    await callback.answer()
