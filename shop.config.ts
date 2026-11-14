/**
 * Universal Turnkey Telegram Shop Bot ("The Outfit")
 * Designed for effortless single-command deployment to Vercel.
 * Customize for ANY shop by editing this file or setting Vercel Environment Variables.
 */

export interface ShopService {
  id: string;
  name: string;
  nameAm: string;
  category: string;
  categoryAm: string;
  price: number; // in local currency (e.g. ETB)
  durationMinutes?: number;
  description: string;
  descriptionAm: string;
  emoji: string;
}

export interface ShopStaff {
  id: string;
  name: string;
  title: string;
  titleAm: string;
}

export interface ShopTheme {
  primaryColor: string; // e.g. '#251A14'
  accentColor: string;  // e.g. '#B67342'
  badgeColor: string;
  lightBg: string;
}

export interface ShopPreset {
  id: string;
  niche: string;
  nicheAm: string;
  shopName: string;
  shopNameAm: string;
  tagline: string;
  taglineAm: string;
  welcomeBanner: string;
  profilePic: string;
  theme: ShopTheme;
  services: ShopService[];
  staff: ShopStaff[];
  operatingHours: string;
  operatingHoursAm: string;
}

export interface ShopConfig {
  shopName: string;
  shopNameAm: string;
  niche: string;
  tagline: string;
  taglineAm: string;
  phone: string;
  altPhone?: string;
  location: string;
  locationAm: string;
  googleMapsUrl?: string;
  telebirrPhone: string;
  telebirrName: string;
  botToken: string;
  adminIds: number[];
  welcomeBanner: string;
  profilePic: string;
  theme: ShopTheme;
  operatingHours: string;
  operatingHoursAm: string;
  currency: string;
  services: ShopService[];
  staff: ShopStaff[];
}

export const SHOP_PRESETS: Record<string, ShopPreset> = {
  barbershop: {
    id: 'barbershop',
    niche: 'Heritage Grooming & Barber Club',
    nicheAm: 'የባህልና ዘመናዊ የጸጉር ማስተካከያ',
    shopName: 'Yeha Heritage Barbershop',
    shopNameAm: 'ይሐ የጸጉርና ጢም ማስተካከያ',
    tagline: 'Master craftsmanship, classic hot towel shaves, and timeless grooming.',
    taglineAm: 'ሙያዊ የጸጉር አቆራረጥ፣ የጢም ቅርጽ እና የሆት ታወል እንክብካቤ።',
    welcomeBanner: '/assets/outfit/barber-banner.jpg',
    profilePic: '/assets/outfit/barber-pfp.jpg',
    theme: {
      primaryColor: '#251A14',
      accentColor: '#B67342',
      badgeColor: '#E6A76E',
      lightBg: '#FAF7F2',
    },
    operatingHours: 'Mon – Sun: 8:30 AM – 9:00 PM',
    operatingHoursAm: 'ከሰኞ – እሁድ: 2:30 ጥዋት – 3:00 ማታ',
    staff: [
      { id: 'any', name: '⚡ First Available Barber', title: 'Quickest queue', titleAm: 'ፈጣን ተረኛ' },
      { id: 'dawit', name: 'Master Dawit', title: 'Senior Barber (12 yrs exp)', titleAm: 'ዋና ባለሙያ' },
      { id: 'samuel', name: 'Barber Samuel', title: 'Fade & Beard Specialist', titleAm: 'የጢም ስፔሻሊስት' },
      { id: 'yared', name: 'Barber Yared', title: 'Styling & Facial Care', titleAm: 'የፊትና ጸጉር እንክብካቤ' },
    ],
    services: [
      {
        id: 'cut_classic',
        name: 'Signature Haircut & Wash',
        nameAm: 'ሙሉ የጸጉር አቆራረጥና እጥበት',
        category: 'Haircut',
        categoryAm: 'ጸጉር',
        price: 350,
        durationMinutes: 35,
        description: 'Precision shear & clipper cut tailored to your facial structure, finished with organic shampoo.',
        descriptionAm: 'ለፊትዎ ቅርጽ የሚስማማ ሙያዊ አቆራረጥ ከጥራት ሻምፑ እጥበት ጋር።',
        emoji: '✂️',
      },
      {
        id: 'beard_sculpt',
        name: 'Beard Sculpt & Hot Towel',
        nameAm: 'የጢም ቅርጽና የሆት ታወል እንክብካቤ',
        category: 'Beard',
        categoryAm: 'ጢም',
        price: 250,
        durationMinutes: 25,
        description: 'Straight razor outline, steam towel treatment, and natural sandalwood conditioning oil.',
        descriptionAm: 'በምላጭ የጠራ መስመር፣ የእንፋሎት ፎጣ እና የተፈጥሮ ዘይት ቅባት።',
        emoji: '🪒',
      },
      {
        id: 'vip_combo',
        name: 'Royal Heritage Grooming (Full VIP)',
        nameAm: 'ሮያል ቪአይፒ ሙሉ ጥቅል',
        category: 'VIP Packages',
        categoryAm: 'ቪአይፒ',
        price: 600,
        durationMinutes: 60,
        description: 'Signature haircut, beard sculpt, herbal facial steam, scalp massage, and refreshing drink.',
        descriptionAm: 'ጸጉር፣ ጢም፣ የፊት ስቲም፣ የእራስ ማሳጅ እና የሚያድስ መጠጥ ያካተተ።',
        emoji: '👑',
      },
      {
        id: 'kids_cut',
        name: 'Gentlemen Junior Cut',
        nameAm: 'የህጻናት ጸጉር አቆራረጥ',
        category: 'Haircut',
        categoryAm: 'ጸጉር',
        price: 250,
        durationMinutes: 30,
        description: 'Patient, gentle styling for young gentlemen under 14.',
        descriptionAm: 'ለታዳጊዎች በጥንቃቄና በፈገግታ የሚሰጥ አቆራረጥ።',
        emoji: '👦',
      },
      {
        id: 'clay_mask',
        name: 'Dead Sea Clay Purifying Mask',
        nameAm: 'የፊት ሸክላ ማጣሪያ ማክስ',
        category: 'Facial',
        categoryAm: 'የፊት እንክብካቤ',
        price: 300,
        durationMinutes: 25,
        description: 'Deep pore detox, blackhead extraction, and cooling cold towel seal.',
        descriptionAm: 'የቆዳ ቀዳዳዎችን የሚያጸዳና የሚያለሰልስ የሸክላ ትሪትመንት።',
        emoji: '🌿',
      },
    ],
  },

  coffee: {
    id: 'coffee',
    niche: 'Specialty Coffee & Roastery',
    nicheAm: 'ልዩ ጥራት ያለው ቡናና ማብሰያ',
    shopName: "The Artisan's Oak Coffee",
    shopNameAm: 'አርቲሳን ኦክ የቡና ማዕከል',
    tagline: 'Single-origin Ethiopian highland beans, artisan pastries, and warm conversations.',
    taglineAm: 'የሐገር ውስጥ ልዩ የቡና ጣዕሞች፣ ትኩስ ኬኮች እና ምቹ ድባብ።',
    welcomeBanner: '/assets/outfit/artisan-banner.jpg',
    profilePic: '/assets/outfit/artisan-pfp.jpg',
    theme: {
      primaryColor: '#2C1D11',
      accentColor: '#A85A32',
      badgeColor: '#D4956B',
      lightBg: '#FAF6EE',
    },
    operatingHours: 'Mon – Sat: 7:00 AM – 8:30 PM | Sun: 8:00 AM – 7:00 PM',
    operatingHoursAm: 'ከሰኞ – ቅዳሜ: 1:00 ጥዋት – 2:30 ማታ | እሁድ: 2:00 ጥዋት – 1:00 ማታ',
    staff: [
      { id: 'any', name: '☕ Barista on Bar', title: 'Fast service', titleAm: 'ፈጣን አገልግሎት' },
      { id: 'helen', name: 'Head Barista Helen', title: 'Filter & Manual Brew Champion', titleAm: 'ዋና ባሪስታ' },
      { id: 'bisrat', name: 'Roaster Bisrat', title: 'Green Bean & Roasting Guide', titleAm: 'የቡና አዋቂ' },
    ],
    services: [
      {
        id: 'pourover_yirg',
        name: 'Yirgacheffe Floral Pour-Over (V60)',
        nameAm: 'ይርጋጨፌ ቪ60 ፊልተር ቡና',
        category: 'Handcrafted Coffee',
        categoryAm: 'ልዩ ቡና',
        price: 120,
        durationMinutes: 10,
        description: 'Jasmine blossom notes, bergamot citrus, and clean honey finish.',
        descriptionAm: 'የጃስሚን ሽታ እና የቀላል ማር ጣዕም ያለው ተፈጥሯዊ ፊልተር ቡና።',
        emoji: '☕',
      },
      {
        id: 'flat_white_oat',
        name: 'Velvet Flat White (House Roast)',
        nameAm: 'ፍላት ዋይት ላቴ',
        category: 'Handcrafted Coffee',
        categoryAm: 'ልዩ ቡና',
        price: 140,
        durationMinutes: 8,
        description: 'Double ristretto with micro-foamed textured milk or oat milk.',
        descriptionAm: 'ድርብ ኤስፕሬሶ ከለሰለሰ ወተት ወይም ኦት ወተት ጋር።',
        emoji: '🥛',
      },
      {
        id: 'beans_250g',
        name: 'Whole Bean Bag (Guji Natural 250g)',
        nameAm: 'የጉጂ የተጠበሰ ቡና (250ግ)',
        category: 'Retail Beans',
        categoryAm: 'የቡና ፍሬ',
        price: 650,
        description: 'Freshly roasted whole beans with vibrant strawberry and peach tasting notes.',
        descriptionAm: 'በቅርብ የተጠበሰ የጉጂ የተፈጥሮ ቡና ለቤትዎ ዝግጅት።',
        emoji: '🫘',
      },
      {
        id: 'tasting_flight',
        name: '3-Origin Ethiopian Tasting Experience',
        nameAm: 'የ3 አከባቢ ቡናዎች ቅምሻ',
        category: 'Experiences',
        categoryAm: 'ልዩ ተሞክሮ',
        price: 320,
        durationMinutes: 30,
        description: 'Side-by-side tasting cups of Sidama, Yirgacheffe, and Harar with guide card.',
        descriptionAm: 'የሲዳማ፣ ይርጋጨፌ እና የሐረር ቡናዎችን ጎን ለጎን የመቅመስ ልዩ ዝግጅት።',
        emoji: '✨',
      },
      {
        id: 'croissant_almond',
        name: 'Baked Almond & Butter Croissant',
        nameAm: 'የአልሞንድ ክሩአሳን ኬክ',
        category: 'Bakery',
        categoryAm: 'መክሰስ',
        price: 180,
        description: 'Flaky slow-fermented French pastry filled with rich almond frangipane.',
        descriptionAm: 'በቅቤና በአልሞንድ ክሬም የተዘጋጀ ጥርት ያለ ትኩስ ክሩአሳን።',
        emoji: '🥐',
      },
    ],
  },

  spa: {
    id: 'spa',
    niche: 'Luxury Wellness & Esthetics',
    nicheAm: 'የውበትና የመዝናኛ ስፓ',
    shopName: 'Velvet Glow Esthetics & Spa',
    shopNameAm: 'ቬልቬት ግሎው የውበትና ስፓ ማዕከል',
    tagline: 'Quiet sanctuary for rejuvenation, organic facials, and deep tissue therapy.',
    taglineAm: 'ለሰውነትዎ እረፍት፣ ለቆዳዎ ውበትና ጥራት ያለው ስፓ።',
    welcomeBanner: '/assets/outfit/artisan-banner.jpg',
    profilePic: '/assets/outfit/artisan-pfp.jpg',
    theme: {
      primaryColor: '#1E2B24',
      accentColor: '#5E7A68',
      badgeColor: '#98B4A2',
      lightBg: '#F5F7F5',
    },
    operatingHours: 'Tue – Sun: 9:00 AM – 8:00 PM (Closed Mondays)',
    operatingHoursAm: 'ከማክሰኞ – እሁድ: 3:00 ጥዋት – 2:00 ማታ (ሰኞ ዝግ ነው)',
    staff: [
      { id: 'any', name: '🌿 Any Available Therapist', title: 'Immediate booking', titleAm: 'ፈጣን ተረኛ' },
      { id: 'selam', name: 'Therapist Selamawit', title: 'Deep Tissue & Hot Stone', titleAm: 'የማሳጅ ባለሙያ' },
      { id: 'tigist', name: 'Esthetician Tigist', title: 'Facials & Skin Rejuvenation', titleAm: 'የቆዳ እንክብካቤ' },
    ],
    services: [
      {
        id: 'aromatherapy_60',
        name: 'Swedish Aromatherapy Massage (60 min)',
        nameAm: 'የስዊዲሽ አሮማቴራፒ ማሳጅ (60 ደቂቃ)',
        category: 'Massage',
        categoryAm: 'ማሳጅ',
        price: 900,
        durationMinutes: 60,
        description: 'Gentle pressure body massage using organic lavender and eucalyptus oils.',
        descriptionAm: 'ሰውነትዎን የሚያዝናና እና ድካም የሚያወጣ የተፈጥሮ ዘይት ማሳጅ።',
        emoji: '💆‍♀️',
      },
      {
        id: 'glow_facial',
        name: 'Deep Hydration Organic Glow Facial',
        nameAm: 'ጥልቅ የፊት እርጥበትና የውበት እንክብካቤ',
        category: 'Facial',
        categoryAm: 'የፊት እንክብካቤ',
        price: 1100,
        durationMinutes: 50,
        description: 'Gentle ultrasonic peel, botanical serum infusion, and cooling jade roller.',
        descriptionAm: 'የተፈጥሮ ሴረም እና የፊት ቆዳን የሚያበራ የውበት ህክምና።',
        emoji: '✨',
      },
      {
        id: 'spa_pedicure',
        name: 'Deluxe Milk & Honey Spa Pedicure',
        nameAm: 'የወተትና ማር ዴሉክስ ፔዲኪዩር',
        category: 'Nails & Feet',
        categoryAm: 'ጥፍርና እግር',
        price: 500,
        durationMinutes: 45,
        description: 'Warm milk foot soak, exfoliating sea salt scrub, cuticles, and clean polish.',
        descriptionAm: 'ለስላሳ የወተት እግር ማሸት እና የጥፍር ማሳመር ስራ።',
        emoji: '💅',
      },
    ],
  },

  boutique: {
    id: 'boutique',
    niche: 'Artisan Goods & Lifestyle Boutique',
    nicheAm: 'የእጅ ጥበብ እና ፋሽን ቡቲክ',
    shopName: "The Artisan's Oak Boutique",
    shopNameAm: 'አርቲሳን ኦክ የፋሽንና እደ-ጥበብ ቡቲክ',
    tagline: 'Handcrafted leather goods, organic textiles, and curated lifestyle essentials.',
    taglineAm: 'ከእውነተኛ ሌዘር የተሰሩ እቃዎች፣ የባህል ጥበቦችና ጌጣጌጦች።',
    welcomeBanner: '/assets/outfit/artisan-banner.jpg',
    profilePic: '/assets/outfit/artisan-pfp.jpg',
    theme: {
      primaryColor: '#2B2520',
      accentColor: '#A3684A',
      badgeColor: '#D19C80',
      lightBg: '#FAF7F4',
    },
    operatingHours: 'Mon – Sat: 9:30 AM – 7:30 PM',
    operatingHoursAm: 'ከሰኞ – ቅዳሜ: 3:30 ጥዋት – 1:30 ማታ',
    staff: [
      { id: 'any', name: '🛍️ Boutique Concierge', title: 'Personal Assistant', titleAm: 'ረዳት' },
      { id: 'eden', name: 'Eden (Stylist)', title: 'Personal Wardrobe Stylist', titleAm: 'የስታይል አማካሪ' },
    ],
    services: [
      {
        id: 'leather_tote',
        name: 'Handcrafted Pull-up Leather Tote',
        nameAm: 'የእጅ ጥበብ እውነተኛ የሌዘር ቦርሳ',
        category: 'Leather Goods',
        categoryAm: 'ሌዘር',
        price: 3200,
        description: 'Full-grain vegetable tanned leather with solid brass hardware, laptop sleeve.',
        descriptionAm: 'ከእውነተኛ ቆዳ የተሰራ ለላፕቶፕ እና ለዕለታዊ አገልግሎት የሚሆን ቦርሳ።',
        emoji: '👜',
      },
      {
        id: 'woven_scarf',
        name: 'Hand-Spun Cotton Scarf (Tibeb Motif)',
        nameAm: 'በእጅ የተሸመነ የጥበብ ሻርፕ',
        category: 'Textiles',
        categoryAm: 'ጨርቃጨርቅ',
        price: 850,
        description: '100% organic Ethiopian handspun cotton accented with traditional geometric borders.',
        descriptionAm: 'ከንጹህ የጥጥ ክር የተሸመነ ውብ የሀበሻ ጥበብ ሻርፕ።',
        emoji: '🧣',
      },
      {
        id: 'personal_styling',
        name: '1-on-1 In-Shop Style Consultation',
        nameAm: 'የግል ስታይልና ልብስ ምረጣ ቀጠሮ',
        category: 'Services',
        categoryAm: 'አገልግሎት',
        price: 400,
        durationMinutes: 45,
        description: 'Private 45-minute styling session with espresso and curated fitting room selection.',
        descriptionAm: 'የ45 ደቂቃ የግል ልብስ መምረጫና የማማከር ቀጠሮ።',
        emoji: '👔',
      },
    ],
  },
};

/**
 * Returns the active ShopConfig by merging the selected preset with any
 * environment variables set in Vercel or locally.
 */
export function getShopConfig(overridePreset?: string): ShopConfig {
  const procEnv =
    (typeof globalThis !== 'undefined' && (globalThis as any).process?.env) || {};
  const chosenNiche = overridePreset || procEnv.SHOP_NICHE || 'barbershop';
  const preset = SHOP_PRESETS[chosenNiche] || SHOP_PRESETS.barbershop;
  const env = procEnv;

  return {
    shopName: env.SHOP_NAME || preset.shopName,
    shopNameAm: env.SHOP_NAME_AM || preset.shopNameAm,
    niche: preset.niche,
    tagline: env.SHOP_TAGLINE || preset.tagline,
    taglineAm: env.SHOP_TAGLINE_AM || preset.taglineAm,
    phone: env.SHOP_PHONE || '+251 90 421 6852',
    altPhone: env.SHOP_ALT_PHONE || '+251 96 366 1680',
    location: env.SHOP_LOCATION || 'Bole Bulbula, Addis Ababa',
    locationAm: env.SHOP_LOCATION_AM || 'ቦሌ ቡልቡላ፣ አዲስ አበባ',
    googleMapsUrl: env.GOOGLE_MAPS_URL || 'https://maps.google.com/?q=Bole+Addis+Ababa',
    telebirrPhone: env.TELEBIRR_PHONE || '+251 96 366 1680',
    telebirrName: env.TELEBIRR_NAME || 'ADDIS RETAIL',
    botToken: env.BOT_TOKEN || '',
    adminIds: (env.ADMIN_IDS || '123456789')
      .split(',')
      .map((x) => parseInt(x.trim(), 10))
      .filter((n) => !isNaN(n)),
    welcomeBanner: preset.welcomeBanner,
    profilePic: preset.profilePic,
    theme: preset.theme,
    operatingHours: preset.operatingHours,
    operatingHoursAm: preset.operatingHoursAm,
    currency: env.SHOP_CURRENCY || 'ETB',
    services: preset.services,
    staff: preset.staff,
  };
}

/**
 * Humane, conversational strings for Telegram bot messages.
 */
export const BOT_LOCALES = {
  en: {
    greeting: (name: string, shop: string, tagline: string) =>
      `🌿 **Welcome to ${shop}**, ${name}!\n\n_${tagline}_\n\nWe are delighted to have you here. What would you like to do today?`,
    btn_book: '📅 Book an Appointment',
    btn_catalog: '🏷️ View Services & Pricing',
    btn_hours: '📍 Location & Operating Hours',
    btn_human: '💬 Talk to Staff',
    btn_bookings: '📋 My Bookings',
    btn_lang: '🌐 አማርኛ / English',
    btn_back: '⬅️ Back to Main Menu',
    status_open: '🟢 Open Now',
    status_closed: '🟠 Closed Now',
    select_service_title: '✂️ **Step 1/4: Choose a Service**\n\nTap any service below to view details and proceed:',
    select_staff_title: '👤 **Step 2/4: Select Your Specialist**\n\nChoose your preferred artisan or select first available:',
    select_date_title: '📅 **Step 3/4: Pick Appointment Day**\n\nPlease choose your preferred date:',
    select_time_title: '⏰ **Step 4/4: Pick a Time Slot**\n\nAvailable slots for **{date}** with **{staff}**:',
    enter_phone_prompt: '📱 **Please share your Contact Phone**\n\nType your phone number (e.g., `0911223344`) so our team can confirm your reservation:',
    confirm_booking_title: '✨ **Review & Confirm Your Reservation**',
    btn_confirm_cash: '💵 Pay in Shop (Cash)',
    btn_confirm_telebirr: '📱 Pay with Telebirr',
    telebirr_instructions: (phone: string, name: string, price: number, cur: string) =>
      `📱 **Telebirr Payment Transfer**\n\n• Number: \`${phone}\`\n• Account Name: **${name}**\n• Amount: **${price} ${cur}**\n\nAfter transferring, please paste your **Telebirr Transaction Reference / Code** below:`,
    booking_confirmed: (id: string, service: string, date: string, time: string, staff: string, shop: string) =>
      `🎉 **Your Reservation is Confirmed!**\n\n• Reservation ID: \`#${id}\`\n• Service: **${service}**\n• Specialist: **${staff}**\n• When: **${date} at ${time}**\n\n📍 We look forward to welcoming you at **${shop}**.\nIf your plans change, you can easily reschedule anytime from "My Bookings".`,
    admin_alert: (id: string, customer: string, phone: string, service: string, date: string, time: string, price: number, cur: string, payment: string) =>
      `🔔 **NEW RESERVATION ALERT #${id}**\n\n• Customer: **${customer}**\n• Phone: \`${phone}\`\n• Service: **${service}**\n• Time: **${date} @ ${time}**\n• Total: **${price} ${cur}** (${payment})`,
    talk_human_msg: (shop: string, phone: string) =>
      `💬 **We are here for you!**\n\nTo speak directly with the team at **${shop}**:\n• Call or Telegram: \`${phone}\`\n\nOr reply right here with any custom question, and a member of our team will assist you shortly.`,
    no_bookings: 'You do not have any upcoming reservations with us yet.',
  },
  am: {
    greeting: (name: string, shop: string, tagline: string) =>
      `🌿 **እንኳን ወደ ${shop} በደህና መጡ**፣ ${name}!\n\n_${tagline}_\n\nበደስታ እንቀበልዎታለን። ዛሬ ምን ማስተናገድ እንችላለን?`,
    btn_book: '📅 ቀጠሮ ይያዙ',
    btn_catalog: '🏷️ አገልግሎቶችና ዋጋ',
    btn_hours: '📍 አድራሻና የስራ ሰዓት',
    btn_human: '💬 ከባለሙያ ጋር ይገናኙ',
    btn_bookings: '📋 የእኔ ቀጠሮዎች',
    btn_lang: '🌐 English / አማርኛ',
    btn_back: '⬅️ ወደ ዋና ማውጫ',
    status_open: '🟢 ክፍት ነው',
    status_closed: '🟠 ዝግ ነው',
    select_service_title: '✂️ **ደረጃ 1/4: አገልግሎት ይምረጡ**\n\nየሚፈልጉትን አገልግሎት ከታች ይምረጡ:',
    select_staff_title: '👤 **ደረጃ 2/4: ባለሙያ ይምረጡ**\n\nየሚመርጡትን ባለሙያ ወይም ፈጣን ተረኛ ይምረጡ:',
    select_date_title: '📅 **ደረጃ 3/4: ቀን ይምረጡ**\n\nየሚመችዎትን የቀጠሮ ቀን ይምረጡ:',
    select_time_title: '⏰ **ደረጃ 4/4: ሰዓት ይምረጡ**\n\nለ **{date}** ከ **{staff}** ጋር ክፍት የሆኑ ሰዓቶች:',
    enter_phone_prompt: '📱 **እባክዎ የስልክ ቁጥርዎን ያስገቡ**\n\nቀጠሮዎን ለማረጋገጥ ስልክ ቁጥርዎን (ለምሳሌ `0911223344`) ይጻፉልን:',
    confirm_booking_title: '✨ **የቀጠሮዎን ዝርዝር ያረጋግጡ**',
    btn_confirm_cash: '💵 በቦታው ይክፈሉ (ካሽ)',
    btn_confirm_telebirr: '📱 በቴሌብር ይክፈሉ',
    telebirr_instructions: (phone: string, name: string, price: number, cur: string) =>
      `📱 **የቴሌብር ክፍያ ዝርዝር**\n\n• ስልክ ቁጥር: \`${phone}\`\n• የስም ዝርዝር: **${name}**\n• ጠቅላላ: **${price} ${cur}**\n\nክፍያውን ከፈጸሙ በኋላ የደረሰኝ ቁጥሩን (Transaction Reference) እዚህ ይጻፉልን:`,
    booking_confirmed: (id: string, service: string, date: string, time: string, staff: string, shop: string) =>
      `🎉 **ቀጠሮዎ በተሳካ ሁኔታ ተይዟል!**\n\n• የቀጠሮ መለያ: \`#${id}\`\n• አገልግሎት: **${service}**\n• ባለሙያ: **${staff}**\n• ቀንና ሰዓት: **${date} በ ${time}**\n\n📍 በ **${shop}** በደስታ እንጠብቅዎታለን።\nቀጠሮ ለመቀየር ወይም ለመሰረዝ "የእኔ ቀጠሮዎች" የሚለውን መጫን ይችላሉ።`,
    admin_alert: (id: string, customer: string, phone: string, service: string, date: string, time: string, price: number, cur: string, payment: string) =>
      `🔔 **አዲስ የቀጠሮ ማሳወቂያ #${id}**\n\n• ደንበኛ: **${customer}**\n• ስልክ: \`${phone}\`\n• አገልግሎት: **${service}**\n• ቀን: **${date} በ ${time}**\n• ዋጋ: **${price} ${cur}** (${payment})`,
    talk_human_msg: (shop: string, phone: string) =>
      `💬 **እንደምንረዳዎት በደስታ ነው!**\n\nየ **${shop}** ሰራተኞችን በቀጥታ ለማግኘት:\n• በስልክ ወይም ቴሌግራም: \`${phone}\`\n\nወይም ጥያቄዎን እዚህ መልእክት ይላኩልን፤ በቅጽበት መልስ እንሰጥዎታለን።`,
    no_bookings: 'እስካሁን የያዙት የቀጠሮ መረጃ የለም።',
  },
};
