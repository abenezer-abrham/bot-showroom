# Bilingual Localization for Ethiopian Community Barbershop Bot

TEXTS = {
    "en": {
        "welcome": "💈 Welcome to **{shop_name}**!\n\nYour premier grooming lounge in Addis Ababa. Book appointments, choose your favorite barber, and pay with Telebirr or in-shop cash.\n\nPlease select an option below:",
        "choose_language": "🌐 Please select your preferred language / ቋንቋ ይምረጡ:",
        "lang_changed": "✅ Language changed to English.",
        "btn_book": "📅 Book Appointment",
        "btn_services": "✂️ Services & Pricing",
        "btn_my_bookings": "📋 My Bookings",
        "btn_hours": "📍 Location & Hours",
        "btn_change_lang": "🌐 አማርኛ / English",
        "btn_contact": "📞 Call Shop",
        
        # Booking Flow
        "select_service": "✂️ **Step 1/5: Select a Service**\n\nChoose the service you would like to book:",
        "select_barber": "👤 **Step 2/5: Choose Your Barber**\n\nSelect your preferred stylist or pick 'Any Available':",
        "select_date": "📅 **Step 3/5: Select Appointment Date**\n\nChoose your preferred day:",
        "select_time": "⏰ **Step 4/5: Select Time Slot**\n\nAvailable slots for **{date}** with **{barber}**:",
        "select_payment": "💳 **Step 5/5: Choose Payment Method**\n\nService: **{service}**\nTotal: **{price} ETB**\n\nSelect how you want to pay:",
        
        "telebirr_instructions": "📱 **Telebirr Payment Details**:\n\n• Number: `{phone}`\n• Account Name: **{name}**\n• Amount: **{price} ETB**\n\nPlease transfer via Telebirr and enter your **Transaction Reference / Code** below:",
        "cash_instructions": "💵 **Cash at Barbershop Selected**\n\nYou will pay **{price} ETB** directly upon arrival at the shop.",
        
        "enter_contact": "📝 **Customer Details**\n\nPlease enter your Full Name & Phone Number (e.g., Dawit - 0911223344):",
        "booking_success": "🎉 **Appointment Confirmed!**\n\n• Booking ID: `#{id}`\n• Service: **{service}**\n• Barber: **{barber}**\n• Date & Time: **{date} at {slot}**\n• Total: **{price} ETB**\n• Payment: **{payment}**\n\n📍 Location: {location}\n📞 Need to change? Call {phone}.",
        
        "admin_alert": "🚨 **NEW BOOKING ALERT #{id}**\n\n• Customer: {name} ({contact})\n• Service: {service}\n• Barber: {barber}\n• Date & Time: {date} at {slot}\n• Price: {price} ETB\n• Payment: {payment}\n• Ref: {ref}",
        
        "no_bookings": "You currently have no scheduled appointments.",
        "my_bookings_title": "📋 **Your Recent Appointments**:\n",
        "btn_cancel": "❌ Cancel Booking",
        "booking_cancelled": "✅ Booking #{id} has been cancelled.",
        
        "location_info": "📍 **{shop_name}**\n\n• Location: {location}\n• Operating Hours: Mon - Sun (8:30 AM - 9:00 PM)\n• Primary Phone: {phone}\n• Alternate (Call): {alt_phone}\n• Telebirr: {telebirr} ({name})",
        
        "admin_menu": "👑 **Barbershop Admin Dashboard**\n\nManage appointments, verify Telebirr payments, or broadcast updates to customers.",
        "admin_today": "📅 **Today's Appointments ({date})**:\n\n{list}",
        "admin_no_appointments": "No appointments scheduled for today.",
        "btn_approve": "✅ Approve Payment",
        "approved_msg": "✅ Payment for Booking #{id} approved and confirmed!",
        "booking_declined": "❌ **Booking #{id} Declined / Rejected**\n\nDear {name}, we regret to inform you that your appointment for **{service}** with **{barber}** on **{date} at {slot}** has been **DECLINED / REJECTED** by the shop.\n\n📍 Location: {location}\n📞 To reschedule or ask questions, please call {phone}.",
        "booking_approved": "✅ **Booking #{id} Approved & Confirmed!**\n\nDear {name}, your appointment for **{service}** with **{barber}** on **{date} at {slot}** has been officially **APPROVED** and confirmed!\n\n📍 Location: {location}\n📞 Need assistance? Call {phone}.",
        "booking_cancelled_notify": "⚠️ **Booking #{id} Cancelled**\n\nYour appointment for **{service}** on **{date} at {slot}** has been cancelled.",
    },
    "am": {
        "welcome": "💈 እንኳን ወደ **{shop_name}** በደህና መጡ!\n\nየአዲስ አበባ ምርጥ የጸጉርና ጢም ማስተካከያ ላውንጅ። ቀጠሮ ይያዙ፣ ጸጉር አስተካካይዎን ይምረጡ፣ በቴሌብር ወይም በካሽ ይክፈሉ።\n\nከታች አንዱን ይምረጡ:",
        "choose_language": "🌐 Please select your preferred language / ቋንቋ ይምረጡ:",
        "lang_changed": "✅ ቋንቋዎ ወደ አማርኛ ተቀይሯል።",
        "btn_book": "📅 ቀጠሮ ይያዙ",
        "btn_services": "✂️ አገልግሎቶችና ዋጋ",
        "btn_my_bookings": "📋 የእኔ ቀጠሮዎች",
        "btn_hours": "📍 አድራሻና ሰዓት",
        "btn_change_lang": "🌐 English / አማርኛ",
        "btn_contact": "📞 ደውል",
        
        # Booking Flow
        "select_service": "✂️ **ደረጃ 1/5: አገልግሎት ይምረጡ**\n\nየሚፈልጉትን የጸጉር ወይም የጢም አገልግሎት ይምረጡ:",
        "select_barber": "👤 **ደረጃ 2/5: ጸጉር አስተካካይ ይምረጡ**\n\nየሚመርጡትን ባለሙያ ይምረጡ ወይም 'ፈጣን ተረኛ' ይጫኑ:",
        "select_date": "📅 **ደረጃ 3/5: የቀጠሮ ቀን ይምረጡ**\n\nየሚመችዎትን ቀን ይምረጡ:",
        "select_time": "⏰ **ደረጃ 4/5: ሰዓት ይምረጡ**\n\nበ **{date}** ለ **{barber}** ክፍት የሆኑ ሰዓቶች:",
        "select_payment": "💳 **ደረጃ 5/5: የክፍያ መንገድ ይምረጡ**\n\nአገልግሎት: **{service}**\nጠቅላላ ዋጋ: **{price} ብር**\n\nየመክፈያ መንገድ ይምረጡ:",
        
        "telebirr_instructions": "📱 **የቴሌብር መክፈያ መረጃ**:\n\n• ስልክ ቁጥር: `{phone}`\n• የስም ባለቤት: **{name}**\n• የሚከፈለው: **{price} ብር**\n\nእባክዎ በቴሌብር ከከፈሉ በኋላ የደረሰኝ ቁጥሩን (Transaction Code) ከታች ጽፈው ይላኩ:",
        "cash_instructions": "💵 **በቦታው በካሽ መክፈል መርጠዋል**\n\nወደ ሳሎኑ ሲመጡ **{price} ብር** በቀጥታ ይከፍላሉ።",
        
        "enter_contact": "📝 **የደንበኛ መረጃ**\n\nእባክዎ ሙሉ ስምዎን እና ስልክ ቁጥርዎን ያስገቡ (ምሳሌ: ዳዊት - 0911223344):",
        "booking_success": "🎉 **ቀጠሮዎ ተረጋግጧል!**\n\n• የቀጠሮ መለያ: `#{id}`\n• አገልግሎት: **{service}**\n• አስተካካይ: **{barber}**\n• ቀንና ሰዓት: **{date} በ {slot}**\n• ጠቅላላ ዋጋ: **{price} ብር**\n• አከፋፈል: **{payment}**\n\n📍 አድራሻ: {location}\n📞 ጥያቄ ካለዎት ይደውሉ: {phone}።",
        
        "admin_alert": "🚨 **አዲስ የቀጠሮ ማስታወቂያ #{id}**\n\n• ደንበኛ: {name} ({contact})\n• አገልግሎት: {service}\n• አስተካካይ: {barber}\n• ቀንና ሰዓት: {date} በ {slot}\n• ዋጋ: {price} ብር\n• አከፋፈል: {payment}\n• የደረሰኝ ኮድ: {ref}",
        
        "no_bookings": "እስካሁን የተያዘ ቀጠሮ የለዎትም።",
        "my_bookings_title": "📋 **የእርስዎ የቅርብ ቀጠሮዎች**:\n",
        "btn_cancel": "❌ ቀጠሮ ሰርዝ",
        "booking_cancelled": "✅ ቀጠሮ #{id} ተሰርዟል።",
        
        "location_info": "📍 **{shop_name}**\n\n• አድራሻ: {location}\n• የሥራ ሰዓት: ከሰኞ - እሑድ (2:30 ጥዋት - 3:00 ማታ)\n• ዋና ስልክ: {phone}\n• ተጨማሪ ስልክ: {alt_phone}\n• ቴሌብር: {telebirr} ({name})",
        
        "admin_menu": "👑 **የባርበርሾፕ አድሚን ዳሽቦርድ**\n\nቀጠሮዎችን ይቆጣጠሩ፣ የቴሌብር ክፍያዎችን ያረጋግጡ፣ ወይም ለደንበኞች መልእክት ያስተላልፉ።",
        "admin_today": "📅 **የዛሬ ቀጠሮዎች ({date})**:\n\n{list}",
        "admin_no_appointments": "ለዛሬ የተያዘ ቀጠሮ የለም።",
        "btn_approve": "✅ ክፍያ አረጋግጥ",
        "approved_msg": "✅ ለቀጠሮ #{id} ክፍያ ተረጋግጧል!",
        "booking_declined": "❌ **ቀጠሮ #{id} ውድቅ ተደርጓል (ተሰርዟል)**\n\nውድ {name}፣ በ **{date} በ {slot}** ለ **{service}** ከአስተካካይ **{barber}** ጋር የያዙት ቀጠሮ በባርበርሾፑ **ውድቅ ተደርጓል (ተሰርዟል)**።\n\n📍 አድራሻ: {location}\n📞 ሌላ ሰዓት ለመያዝ ወይም ለመጠየቅ በ {phone} ይደውሉልን።",
        "booking_approved": "✅ **ቀጠሮ #{id} ጸድቋል!**\n\nውድ {name}፣ በ **{date} በ {slot}** ለ **{service}** ከአስተካካይ **{barber}** ጋር የያዙት ቀጠሮ በባርበርሾፑ **ጸድቋል**!\n\n📍 አድራሻ: {location}\n📞 ጥያቄ ካለዎት በ {phone} ይደውሉልን።",
        "booking_cancelled_notify": "⚠️ **ቀጠሮ #{id} ተሰርዟል**\n\nበ **{date} በ {slot}** የነበረዎት የ **{service}** ቀጠሮ ተሰርዟል።",
    }
}

def t(key: str, lang: str = "en", **kwargs) -> str:
    lang = lang if lang in TEXTS else "en"
    text = TEXTS[lang].get(key, TEXTS["en"].get(key, key))
    if kwargs:
        return text.format(**kwargs)
    return text
