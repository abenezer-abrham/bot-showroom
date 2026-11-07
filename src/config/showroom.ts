import { PackageTier, BotDemoFlow } from '../types/showroom';

export const SITE_CONFIG = {
  name: 'Yene.suk',
  displayName: 'Yene.suk',
  developerName: 'Abenezer Abrham',
  telegramUsername: 'abenezer_abrham',
  telegramUrl: 'https://t.me/abenezer_abrham',
  githubUrl: 'https://github.com/abenezer-abrham',
  email: 'abenezerabrham61@gmail.com',
  tagline: 'Custom Telegram Business Bots for Local & Global Enterprises',
  heroHeadline: 'Turnkey Telegram Bots That Handle Customers 24/7',
  heroSubheadline: 'Empower your restaurant, boutique, salon, or service business with automated menus, order dispatching, and booking directly inside Telegram.',
};

export const PACKAGES: PackageTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Essential digital storefront for cafes, shops, and service professionals.',
    priceETB: 3000,
    priceUSD: 25,
    badge: 'Fast Launch',
    coreFeature: 'Menu, prices, hours, location, “contact owner” button',
    features: [
      'Interactive digital menu & item catalog',
      'Live pricing with instant updates',
      'Operating hours & open/closed status',
      'Google Maps & physical location pin',
      'One-tap "Contact Owner" direct button',
      'Zero server maintenance required'
    ],
    deliverables: [
      'Complete Telegram Bot deployment',
      'Menu data configuration & image uploads',
      'Admin guide for updating items',
      'Standard 30-day technical support'
    ],
    demoFlowId: 'starter-flow',
    ctaText: 'Choose Starter'
  },
  {
    id: 'standard',
    name: 'Standard',
    subtitle: 'Full order-taking automation with instant dispatch directly to the owner.',
    priceETB: 4000,
    priceUSD: 35,
    badge: 'Most Popular',
    popular: true,
    coreFeature: 'Starter + takes orders, sends them to owner’s phone',
    features: [
      'Everything included in Starter',
      'Interactive order cart & quantity selector',
      'Customer delivery address & phone capture',
      'Instant order dispatch to owner’s Telegram & phone',
      'Order confirmation receipt for customers',
      'Custom delivery notes & instructions'
    ],
    deliverables: [
      'Full ordering pipeline configured',
      'Owner phone/Telegram notification webhook',
      'Cart management logic & state engine',
      'Priority 45-day technical support'
    ],
    demoFlowId: 'standard-flow',
    ctaText: 'Choose Standard'
  },
  {
    id: 'full',
    name: 'Full Suite',
    subtitle: 'Advanced appointment bookings, automated reminders, and revenue reporting.',
    priceETB: 7000,
    priceUSD: 60,
    badge: 'Complete Enterprise',
    coreFeature: 'Standard + appointment booking, reminders, monthly sales report',
    features: [
      'Everything included in Standard',
      'Self-service appointment & reservation booking',
      'Calendar availability & slot management',
      'Automated customer appointment reminders',
      'Monthly sales, orders & customer analytics report',
      'Exportable CSV order & booking history'
    ],
    deliverables: [
      'Automated booking engine with slot locks',
      'Scheduled background reminder dispatchers',
      'Monthly reporting aggregator script',
      'Dedicated 90-day maintenance & SLA'
    ],
    demoFlowId: 'full-flow',
    ctaText: 'Choose Full Suite'
  }
];

export const DEMO_FLOWS: Record<string, BotDemoFlow> = {
  'starter-flow': {
    tierId: 'starter',
    tierName: 'Starter Tier Demo',
    badge: '3,000 ETB',
    botUsername: '@yenesuk_starter_bot',
    initialMessages: [
      {
        id: 'st-1',
        sender: 'bot',
        text: 'Welcome to **Yene.suk Restaurant & Cafe**.\n\nPlease select an option below to view our menu, operating hours, and location:',
        buttons: [
          { label: 'View Menu & Prices', action: 'show_menu' },
          { label: 'Hours & Location', action: 'show_hours' },
          { label: 'Contact Owner', action: 'contact_owner' }
        ],
        time: '12:00'
      }
    ],
    responses: {
      'show_menu': [
        {
          id: 'sm-1',
          sender: 'user',
          text: 'View Menu & Prices',
          time: '12:01'
        },
        {
          id: 'sm-2',
          sender: 'bot',
          text: 'Current Menu & Prices:\n\n1. Special Roast Coffee - 90 ETB\n2. Fresh Avocado Salad - 180 ETB\n3. Gourmet Burger with Fries - 350 ETB\n4. Sparkling Lemonade - 80 ETB\n\nAll items are prepared fresh to order.',
          buttons: [
            { label: 'Hours & Location', action: 'show_hours' },
            { label: 'Contact Owner', action: 'contact_owner' },
            { label: 'Reset Demo', action: 'reset' }
          ],
          time: '12:01'
        }
      ],
      'show_hours': [
        {
          id: 'sh-1',
          sender: 'user',
          text: 'Hours & Location',
          time: '12:01'
        },
        {
          id: 'sh-2',
          sender: 'bot',
          text: 'Business Information:\n\n• Hours: Monday - Sunday, 8:00 AM - 10:00 PM\n• Location: Bole Road, Next to Edna Mall, Addis Ababa\n• Map Coordinates: 9.0123° N, 38.7845° E',
          buttons: [
            { label: 'Contact Owner', action: 'contact_owner' },
            { label: 'Back to Menu', action: 'show_menu' }
          ],
          time: '12:01'
        }
      ],
      'contact_owner': [
        {
          id: 'co-1',
          sender: 'user',
          text: 'Contact Owner',
          time: '12:02'
        },
        {
          id: 'co-2',
          sender: 'bot',
          text: 'Direct Owner Contact:\n\n• Phone: +251 91 123 4567\n• Telegram: @abenezer_abrham\n\nYou can call directly or send a direct message for inquiries.',
          buttons: [
            { label: 'Chat on Telegram', url: 'https://t.me/abenezer_abrham', action: 'tg' },
            { label: 'Reset Demo', action: 'reset' }
          ],
          time: '12:02'
        }
      ]
    }
  },
  'standard-flow': {
    tierId: 'standard',
    tierName: 'Standard Tier Demo',
    badge: '4,000 ETB',
    botUsername: '@yenesuk_standard_bot',
    initialMessages: [
      {
        id: 'std-1',
        sender: 'bot',
        text: 'Welcome to **Yene.suk Orders**.\n\nBrowse products, add to your cart, and place your order. Orders are dispatched instantly to the owner\'s phone.',
        buttons: [
          { label: 'Browse Products', action: 'browse_cart' },
          { label: 'Track Recent Order', action: 'track_order' },
          { label: 'Store Info & Location', action: 'std_info' }
        ],
        time: '12:00'
      }
    ],
    responses: {
      'browse_cart': [
        {
          id: 'bc-1',
          sender: 'user',
          text: 'Browse Products',
          time: '12:01'
        },
        {
          id: 'bc-2',
          sender: 'bot',
          text: 'Available for Immediate Delivery:\n\n• Handcrafted Leather Bag (2,200 ETB)\n• Premium Canvas Sneakers (1,800 ETB)\n• Minimalist Wristwatch (1,400 ETB)',
          buttons: [
            { label: 'Add Leather Bag (2,200 ETB)', action: 'order_item' },
            { label: 'Back to Main Menu', action: 'reset' }
          ],
          time: '12:01'
        }
      ],
      'order_item': [
        {
          id: 'oi-1',
          sender: 'user',
          text: 'Add Leather Bag (2,200 ETB)',
          time: '12:01'
        },
        {
          id: 'oi-2',
          sender: 'bot',
          text: 'Cart Summary (1 item):\n\n• 1x Handcrafted Leather Bag\n• Total: 2,200 ETB\n\nConfirm delivery details to send order to owner\'s phone:',
          buttons: [
            { label: 'Confirm & Dispatch Order', action: 'dispatch_order' },
            { label: 'Cancel', action: 'reset' }
          ],
          time: '12:01'
        }
      ],
      'dispatch_order': [
        {
          id: 'do-1',
          sender: 'user',
          text: 'Confirm & Dispatch Order',
          time: '12:02'
        },
        {
          id: 'do-2',
          sender: 'bot',
          text: 'Order #ORD-4029 Dispatched!\n\nA structured alert has been sent directly to the business owner\'s phone with item details, total (2,200 ETB), and customer contact.\n\nThe store owner will confirm shortly.',
          buttons: [
            { label: 'Reset Demo', action: 'reset' }
          ],
          time: '12:02'
        }
      ],
      'track_order': [
        {
          id: 'to-1',
          sender: 'user',
          text: 'Track Recent Order',
          time: '12:01'
        },
        {
          id: 'to-2',
          sender: 'bot',
          text: 'Order #ORD-4029: In Preparation.\nEstimated delivery time: 35 minutes.',
          buttons: [
            { label: 'Back to Menu', action: 'reset' }
          ],
          time: '12:01'
        }
      ],
      'std_info': [
        {
          id: 'si-1',
          sender: 'user',
          text: 'Store Info & Location',
          time: '12:01'
        },
        {
          id: 'si-2',
          sender: 'bot',
          text: 'Standard Tier includes full Starter details: Menu, prices, open hours (9:00 AM - 8:00 PM), and physical shop coordinates.',
          buttons: [
            { label: 'Browse Products', action: 'browse_cart' }
          ],
          time: '12:01'
        }
      ]
    }
  },
  'full-flow': {
    tierId: 'full',
    tierName: 'Full Suite Demo',
    badge: '7,000 ETB',
    botUsername: '@yenesuk_full_bot',
    initialMessages: [
      {
        id: 'fl-1',
        sender: 'bot',
        text: 'Welcome to **Yene.suk Executive Suite**.\n\nAll Standard order features plus interactive appointment booking, reminder scheduling, and automated monthly analytics reports.',
        buttons: [
          { label: 'Book Appointment', action: 'book_slot' },
          { label: 'View Monthly Sales Report', action: 'sales_report' },
          { label: 'Order Items (Standard)', action: 'std_order' }
        ],
        time: '12:00'
      }
    ],
    responses: {
      'book_slot': [
        {
          id: 'bs-1',
          sender: 'user',
          text: 'Book Appointment',
          time: '12:01'
        },
        {
          id: 'bs-2',
          sender: 'bot',
          text: 'Select an available date & time slot:\n\n• Today: 3:00 PM (Available)\n• Tomorrow: 10:30 AM (Available)\n• Tomorrow: 4:00 PM (Available)',
          buttons: [
            { label: 'Tomorrow: 10:30 AM', action: 'confirm_slot' },
            { label: 'Back to Main Menu', action: 'reset' }
          ],
          time: '12:01'
        }
      ],
      'confirm_slot': [
        {
          id: 'cs-1',
          sender: 'user',
          text: 'Tomorrow: 10:30 AM',
          time: '12:02'
        },
        {
          id: 'cs-2',
          sender: 'bot',
          text: 'Appointment Confirmed for Tomorrow at 10:30 AM.\n\nAutomated Reminders Enabled:\n1. 24 hours prior SMS/Telegram notification\n2. 1 hour prior arrival alert\n\nNotification sent to business calendar.',
          buttons: [
            { label: 'View Monthly Sales Report', action: 'sales_report' },
            { label: 'Reset Demo', action: 'reset' }
          ],
          time: '12:02'
        }
      ],
      'sales_report': [
        {
          id: 'sr-1',
          sender: 'user',
          text: 'View Monthly Sales Report',
          time: '12:01'
        },
        {
          id: 'sr-2',
          sender: 'bot',
          text: 'Monthly Executive Summary (Generated for Owner):\n\n• Total Orders Processed: 384\n• Gross Revenue: 184,200 ETB\n• Appointments Completed: 96\n• No-Show Rate: 2.1% (reduced by automated reminders)\n• Top Requested Item: Special Roast (41% volume)\n\nReport auto-generated on the 1st of every month.',
          buttons: [
            { label: 'Book Appointment', action: 'book_slot' },
            { label: 'Reset Demo', action: 'reset' }
          ],
          time: '12:01'
        }
      ],
      'std_order': [
        {
          id: 'so-1',
          sender: 'user',
          text: 'Order Items (Standard)',
          time: '12:01'
        },
        {
          id: 'so-2',
          sender: 'bot',
          text: 'Full Suite includes all Standard ordering features. Seamless order placement with instant phone notification to staff.',
          buttons: [
            { label: 'Reset Demo', action: 'reset' }
          ],
          time: '12:01'
        }
      ]
    }
  }
};

export const COMPARISON_ROWS = [
  {
    feature: 'Digital Menu & Product Catalog',
    starter: true,
    standard: true,
    full: true,
    detail: 'Display items, descriptions, and active pricing.'
  },
  {
    feature: 'Business Hours & Physical Location Pin',
    starter: true,
    standard: true,
    full: true,
    detail: 'Show operating status and Google Maps pin.'
  },
  {
    feature: 'Direct "Contact Owner" Button',
    starter: true,
    standard: true,
    full: true,
    detail: 'Direct 1-tap call or Telegram chat.'
  },
  {
    feature: 'Order Taking & Shopping Cart',
    starter: false,
    standard: true,
    full: true,
    detail: 'Customers select items and enter delivery details.'
  },
  {
    feature: 'Instant Order Dispatch to Owner\'s Phone',
    starter: false,
    standard: true,
    full: true,
    detail: 'Immediate notification with items and total.'
  },
  {
    feature: 'Customer Order Confirmation Receipts',
    starter: false,
    standard: true,
    full: true,
    detail: 'Automated receipt number and status tracking.'
  },
  {
    feature: 'Self-Service Appointment & Table Booking',
    starter: false,
    standard: false,
    full: true,
    detail: 'Interactive calendar time slot reservation.'
  },
  {
    feature: 'Automated Reminder Alerts for Bookings',
    starter: false,
    standard: false,
    full: true,
    detail: 'Reduces customer no-shows with timed notifications.'
  },
  {
    feature: 'Monthly Sales & Analytics Summary Report',
    starter: false,
    standard: false,
    full: true,
    detail: 'Automated revenue, volume, and customer data report.'
  }
];

export const FAQ_ITEMS = [
  {
    q: 'How does the bot send orders to the owner\'s phone?',
    a: 'In the Standard and Full packages, when a customer completes their order inside Telegram, the bot formats the entire order (items, quantities, delivery address, contact number, and total) and transmits it immediately to the owner\'s private Telegram or linked phone number.'
  },
  {
    q: 'What is required from me to get started?',
    a: 'You simply provide your menu or product list, pricing, operating hours, and location. We configure and deploy the entire bot, link it to your Telegram, and hand over full operational control.'
  },
  {
    q: 'Can I start with Starter and upgrade later?',
    a: 'Yes. You can start with the Starter package (3,000 ETB) and upgrade to Standard (order taking) or Full (bookings & reports) at any time. Your existing menu and settings are preserved.'
  },
  {
    q: 'Are there monthly hosting fees?',
    a: 'All 3 packages include setup, full deployment, and cloud operational hosting so your bot remains active 24/7 with zero server management needed on your end.'
  },
  {
    q: 'How do appointment reminders work in the Full package?',
    a: 'When a customer reserves a time slot, the system schedules automated reminders sent 24 hours and 1 hour before the appointment, significantly reducing no-shows for clinics, salons, and consultancies.'
  }
];
