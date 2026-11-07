import { BotItem, DealPackage, BotDemoFlow } from '../types/showroom';

export const SITE_CONFIG = {
  name: 'BotMatrix',
  developerName: 'Abenezer Abrham',
  telegramUsername: 'abenezer_abrham',
  telegramUrl: 'https://t.me/abenezer_abrham',
  githubUrl: 'https://github.com/abenezer-abrham',
  email: 'abenezerabrham61@gmail.com',
  tagline: 'High-Converting Telegram Bots & Managed Cloud Servicing',
  heroHeadline: 'Turnkey Telegram Bots That Automate Revenue 24/7',
  heroSubheadline: 'Buy full source code once for lifetime ownership, or subscribe to fully managed cloud servicing with 99.9% uptime SLA. Zero maintenance friction.',
};

export const BOT_CATALOG: BotItem[] = [
  {
    id: 'shop-bot',
    name: 'TeleShop Pro',
    tagline: 'Automated E-Commerce & Instant Digital Goods Delivery',
    description: 'A complete retail storefront inside Telegram. Features product catalogs, category browsing, interactive shopping carts, inventory sync, and multi-gateway checkout via Telegram Stars, Stripe, and Crypto.',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce',
    badge: '🔥 Top Seller',
    badgeColor: 'green',
    popular: true,
    oneTimePrice: 149,
    monthlyPrice: 29,
    features: [
      'Interactive inline catalog & search',
      'Telegram Stars & Crypto (USDT/TON) payments',
      'Instant digital file / license key delivery',
      'Order management & webhook alerts',
      'Admin broadcast & customer CRM',
      'Automated invoice generation'
    ],
    techStack: ['Python 3.12', 'aiogram 3.x', 'SQLite/PostgreSQL', 'Docker', 'Stripe API'],
    deliverables: [
      'Full Python source code (clean PEP 8)',
      '1-Click Docker Compose deployment script',
      'Admin dashboard commands',
      'Setup guide & 60 days bug-fix warranty'
    ],
    demoFlowId: 'shop-bot-flow',
    stats: [
      { label: 'Avg Checkout Time', value: '< 25s' },
      { label: 'Payment Gateways', value: '3+' },
      { label: 'Setup Time', value: '15 mins' }
    ]
  },
  {
    id: 'vip-gate-bot',
    name: 'SubGate VIP',
    tagline: 'Automated Paid Channel Memberships & Crypto Gating',
    description: 'Monetize exclusive Telegram channels and groups. Generates unique single-use join links upon payment, verifies recurring subscriptions, and automatically removes expired members.',
    category: 'subscription',
    categoryLabel: 'VIP Subscriptions',
    badge: '⚡ High ROI',
    badgeColor: 'cyan',
    oneTimePrice: 179,
    monthlyPrice: 35,
    features: [
      'Auto-generating single-use invite links',
      'Recurring monthly/annual payment verification',
      'Automated expiry reminders & graceful kick',
      'Crypto (USDT TRC20, TON, BTC) & Stripe support',
      'Affiliate referral commission system',
      'Detailed revenue analytics & member churn stats'
    ],
    techStack: ['Python 3.12', 'aiogram 3.x', 'Redis Queue', 'PostgreSQL', 'Telegram Bot API'],
    deliverables: [
      'Full source code with lifetime license',
      'Self-host on any $4/mo VPS or cloud',
      'Custom webhook notification engine',
      'Dedicated migration guide'
    ],
    demoFlowId: 'vip-gate-flow',
    stats: [
      { label: 'Churn Reduction', value: '40%' },
      { label: 'Supported Currencies', value: '10+' },
      { label: 'Automation Level', value: '100%' }
    ]
  },
  {
    id: 'ai-assistant-bot',
    name: 'OmniAI Support',
    tagline: 'Intelligent Knowledge Base & 24/7 Customer Care',
    description: 'Empower your community with an AI bot trained on your custom docs, PDFs, and website data. Answers queries in 30+ languages and seamlessly hands off complex tickets to human staff.',
    category: 'ai',
    categoryLabel: 'AI & LLMs',
    badge: '🤖 Gemini / GPT-4o Ready',
    badgeColor: 'purple',
    popular: true,
    oneTimePrice: 199,
    monthlyPrice: 45,
    features: [
      'RAG pipeline for custom PDF/doc ingestion',
      'Multi-model engine (Gemini 1.5, GPT-4o, Claude 3.5)',
      'Human support agent handover with ticket thread',
      'Context-aware conversational memory',
      'Multi-language auto-detection (30+ tongues)',
      'Rate-limiting & anti-abuse moderation'
    ],
    techStack: ['Python 3.12', 'LangChain / LlamaIndex', 'ChromaDB / Qdrant', 'FastAPI', 'aiogram 3'],
    deliverables: [
      'Clean modular AI agent codebase',
      'Vector database configuration template',
      'Knowledge ingestion scripts',
      'Free model API integration assistance'
    ],
    demoFlowId: 'ai-assistant-flow',
    stats: [
      { label: 'Ticket Deflection', value: '78%' },
      { label: 'Response Latency', value: '< 1.2s' },
      { label: 'Knowledge Base', value: 'Unlimited' }
    ]
  },
  {
    id: 'crypto-sniper-bot',
    name: 'AlphaPulse Signals',
    tagline: 'Multi-Chain Whale & DEX Token Alert Engine',
    description: 'High-speed algorithmic broadcast bot that tracks large wallet transactions, liquidity additions, token deployments, and sends formatted rich alerts directly to private channels.',
    category: 'crypto',
    categoryLabel: 'Crypto & Alerts',
    badge: '💎 High Speed',
    badgeColor: 'amber',
    oneTimePrice: 249,
    monthlyPrice: 59,
    features: [
      'Low-latency RPC websocket monitoring',
      'Formatted signal cards with DexScreener & chart links',
      'Whale wallet tracking & liquidity locks alerts',
      'Custom alert thresholds & subscriber filters',
      'Multi-channel simultaneous broadcasting',
      'Built-in security audits & honeypot warnings'
    ],
    techStack: ['Python 3.12', 'Web3.py', 'Asyncio WebSockets', 'Redis Streams', 'Docker'],
    deliverables: [
      'Complete high-frequency scanner codebase',
      'Custom RPC connection guide',
      'Broadcast dispatcher system',
      'Docker containerized deployment'
    ],
    demoFlowId: 'crypto-sniper-flow',
    stats: [
      { label: 'Signal Latency', value: '< 200ms' },
      { label: 'Supported Chains', value: 'EVM & TON' },
      { label: 'Active Alerts', value: 'Real-time' }
    ]
  },
  {
    id: 'lead-form-bot',
    name: 'LeadFlow Booker',
    tagline: 'Conversational Lead Intake & Instant CRM Sync',
    description: 'Convert cold channel visitors into qualified booked calls. Guides prospects through dynamic step-by-step questions, validates emails/phones, and pushes leads instantly to Google Sheets or your CRM.',
    category: 'automation',
    categoryLabel: 'Automation',
    badge: '📈 Conversion Booster',
    badgeColor: 'green',
    oneTimePrice: 129,
    monthlyPrice: 25,
    features: [
      'Branching conversational questionnaire',
      'Instant Google Sheets & Notion synchronization',
      'Phone number & email auto-verification',
      'Cal.com / Calendly booking integration',
      'Instant Telegram notification to sales reps',
      'Custom file/resume upload support'
    ],
    techStack: ['Python 3.12', 'aiogram 3.x', 'Google Sheets API', 'Webhooks', 'SQLite'],
    deliverables: [
      'Customizable survey flow config',
      'Google Sheets integration script',
      'Source code with full commercial usage rights',
      'Detailed video walkthrough'
    ],
    demoFlowId: 'lead-form-flow',
    stats: [
      { label: 'Completion Rate', value: '84%' },
      { label: 'CRM Sync', value: 'Instant' },
      { label: 'Lead Capture', value: '3x higher' }
    ]
  },
  {
    id: 'moderator-bot',
    name: 'ShieldGuard Moderator',
    tagline: 'Advanced Anti-Spam, Captcha & Channel Defense',
    description: 'Protect large Telegram groups from userbot spam, scam links, raid attacks, and flooding. Features interactive button captchas, blacklist filters, and automated mute/ban rules.',
    category: 'automation',
    categoryLabel: 'Moderation',
    badge: '🛡️ 100% Protection',
    badgeColor: 'cyan',
    oneTimePrice: 119,
    monthlyPrice: 24,
    features: [
      'Interactive click-to-verify math & emoji captcha',
      'Instant scam link & phishing domain auto-deletion',
      'Raid protection & mass join throttler',
      'Keyword blacklisting & regex filters',
      'Admin audit log channel',
      'Custom welcome greeting with media support'
    ],
    techStack: ['Python 3.12', 'aiogram 3.x', 'Redis Cache', 'Docker'],
    deliverables: [
      'Modular defense bot source code',
      'Pre-configured threat blacklist',
      'Docker deploy guide',
      'Unlimited group usage'
    ],
    demoFlowId: 'moderator-flow',
    stats: [
      { label: 'Spam Block Rate', value: '99.8%' },
      { label: 'Captcha Verification', value: '30s timer' },
      { label: 'Admin Time Saved', value: '15+ hrs/wk' }
    ]
  }
];

export const DEMO_FLOWS: Record<string, BotDemoFlow> = {
  'shop-bot-flow': {
    botId: 'shop-bot',
    botName: 'TeleShop Pro Demo',
    botUsername: '@teleshop_pro_bot',
    avatarText: '🛍️',
    initialMessages: [
      {
        id: 'msg-1',
        sender: 'bot',
        text: '👋 Welcome to **TeleShop Pro Demo Store**!\n\nBrowse our premium digital software, bot templates, and licenses with instant delivery upon checkout.\n\nSelect an option below to begin:',
        buttons: [
          { label: '📦 Browse Products', action: 'browse_catalog' },
          { label: '🛒 View Cart (0)', action: 'view_cart' },
          { label: '⚡ Test Instant Order', action: 'test_order' },
          { label: '❓ Help & FAQ', action: 'help' }
        ],
        time: '12:00'
      }
    ],
    responses: {
      'browse_catalog': [
        {
          id: 'b-1',
          sender: 'user',
          text: '📦 Browse Products',
          time: '12:01'
        },
        {
          id: 'b-2',
          sender: 'bot',
          text: '📂 **Featured Products**:\n\n1. **Python AI Bot Template** - $49\n2. **Telegram Mini-App Kit** - $89\n3. **Channel Automation Suite** - $59\n\nChoose an item to preview details:',
          buttons: [
            { label: '➕ Add Python AI Bot ($49)', action: 'add_ai_item' },
            { label: '➕ Add Mini-App Kit ($89)', action: 'add_miniapp' },
            { label: '⬅️ Back to Menu', action: 'reset' }
          ],
          time: '12:01'
        }
      ],
      'add_ai_item': [
        {
          id: 'a-1',
          sender: 'user',
          text: '➕ Add Python AI Bot ($49)',
          time: '12:02'
        },
        {
          id: 'a-2',
          sender: 'bot',
          text: '✅ **Added to Cart!**\n\n• Item: Python AI Bot Template ($49.00)\n• Quantity: 1\n• Subtotal: **$49.00**\n\nReady to checkout with Telegram Stars or USDT?',
          buttons: [
            { label: '💳 Checkout Now', action: 'checkout' },
            { label: '📦 Keep Shopping', action: 'browse_catalog' },
            { label: '🗑️ Clear Cart', action: 'reset' }
          ],
          time: '12:02'
        }
      ],
      'checkout': [
        {
          id: 'c-1',
          sender: 'user',
          text: '💳 Checkout Now',
          time: '12:02'
        },
        {
          id: 'c-2',
          sender: 'bot',
          text: '🧾 **Order Invoice #TS-8842**\n\nTotal: **$49.00**\n\nSelect your preferred instant payment method:',
          buttons: [
            { label: '⭐ Pay with Telegram Stars (2,450 Stars)', action: 'paid_demo' },
            { label: '💎 Pay with Crypto (USDT / TON)', action: 'paid_demo' },
            { label: '💳 Credit Card / Stripe', action: 'paid_demo' }
          ],
          time: '12:02'
        }
      ],
      'paid_demo': [
        {
          id: 'p-1',
          sender: 'user',
          text: 'Payment Completed',
          time: '12:03'
        },
        {
          id: 'p-2',
          sender: 'bot',
          text: '🎉 **Payment Verified!**\n\nYour order has been fulfilled instantly.\n\n📥 **Download Link**: `https://github.com/client/repo-access`\n🔑 **License Key**: `TS-PRO-9842-LIVE-KEY`\n\nThank you for shopping with TeleShop Pro!',
          buttons: [
            { label: '🔄 Restart Demo', action: 'reset' }
          ],
          time: '12:03'
        }
      ],
      'view_cart': [
        {
          id: 'vc-1',
          sender: 'user',
          text: '🛒 View Cart',
          time: '12:01'
        },
        {
          id: 'vc-2',
          sender: 'bot',
          text: '🛒 Your cart currently has **1 demo item** ($49.00).\n\nTap Checkout to test the payment flow!',
          buttons: [
            { label: '💳 Proceed to Checkout', action: 'checkout' },
            { label: '⬅️ Back to Menu', action: 'reset' }
          ],
          time: '12:01'
        }
      ],
      'test_order': [
        {
          id: 'to-1',
          sender: 'user',
          text: '⚡ Test Instant Order',
          time: '12:01'
        },
        {
          id: 'to-2',
          sender: 'bot',
          text: '🚀 Generating simulated payment invoice for 1x TeleShop Starter Package ($149)...',
          buttons: [
            { label: '⭐ Confirm Demo Invoice', action: 'paid_demo' },
            { label: '⬅️ Cancel', action: 'reset' }
          ],
          time: '12:01'
        }
      ],
      'help': [
        {
          id: 'h-1',
          sender: 'user',
          text: '❓ Help & FAQ',
          time: '12:01'
        },
        {
          id: 'h-2',
          sender: 'bot',
          text: '💡 **TeleShop Pro Capabilities**:\n• Supports 10,000+ simultaneous checkouts\n• Zero transaction fee on crypto\n• Docker ready for self-hosting or managed hosting by Abenezer.',
          buttons: [
            { label: '⬅️ Main Menu', action: 'reset' }
          ],
          time: '12:01'
        }
      ]
    }
  },
  'vip-gate-flow': {
    botId: 'vip-gate-bot',
    botName: 'SubGate VIP Bot',
    botUsername: '@subgate_vip_bot',
    avatarText: '👑',
    initialMessages: [
      {
        id: 'vg-1',
        sender: 'bot',
        text: '👑 Welcome to **Alpha Traders VIP Community**!\n\nAccess our private trading channel with daily high-conviction calls & market breakdown.\n\nChoose a pass to join:',
        buttons: [
          { label: '🌟 Monthly VIP Pass ($49/mo)', action: 'select_monthly' },
          { label: '💎 Lifetime VIP Pass ($299)', action: 'select_lifetime' },
          { label: '🎟️ Redeem Invite Code', action: 'redeem' }
        ],
        time: '12:00'
      }
    ],
    responses: {
      'select_monthly': [
        {
          id: 'sm-1',
          sender: 'user',
          text: '🌟 Monthly VIP Pass ($49/mo)',
          time: '12:01'
        },
        {
          id: 'sm-2',
          sender: 'bot',
          text: '🔒 **Step 1/2**: Select your billing method for automatic monthly access.\n\nCancel anytime with 1 tap.',
          buttons: [
            { label: '💎 Pay with Crypto (USDT-TRC20)', action: 'vip_crypto' },
            { label: '💳 Pay with Stripe / Card', action: 'vip_crypto' },
            { label: '⬅️ Back', action: 'reset' }
          ],
          time: '12:01'
        }
      ],
      'vip_crypto': [
        {
          id: 'vc-1',
          sender: 'user',
          text: '💎 Pay with Crypto',
          time: '12:02'
        },
        {
          id: 'vc-2',
          sender: 'bot',
          text: '🎉 **Access Approved!**\n\nHere is your private single-use invite link (valid for 1 join):\n🔗 `https://t.me/+AlphaVIP_Private_Token98`\n\n⏳ Next renewal date: 30 days from now.',
          buttons: [
            { label: '🚀 Join Alpha Traders VIP', action: 'reset' }
          ],
          time: '12:02'
        }
      ],
      'select_lifetime': [
        {
          id: 'sl-1',
          sender: 'user',
          text: '💎 Lifetime VIP Pass ($299)',
          time: '12:01'
        },
        {
          id: 'sl-2',
          sender: 'bot',
          text: '💎 **Lifetime Pass Selected** - Never pay monthly fees.\n\nReady to activate your permanent membership?',
          buttons: [
            { label: '⚡ Instant Activation', action: 'vip_crypto' },
            { label: '⬅️ Back', action: 'reset' }
          ],
          time: '12:01'
        }
      ],
      'redeem': [
        {
          id: 'rd-1',
          sender: 'user',
          text: '🎟️ Redeem Code',
          time: '12:01'
        },
        {
          id: 'rd-2',
          sender: 'bot',
          text: '⌨️ Enter your 8-digit promotional code to unlock VIP access.',
          buttons: [
            { label: '⬅️ Back to Menu', action: 'reset' }
          ],
          time: '12:01'
        }
      ]
    }
  },
  'ai-assistant-flow': {
    botId: 'ai-assistant-bot',
    botName: 'OmniAI Knowledge Bot',
    botUsername: '@omniai_support_bot',
    avatarText: '🤖',
    initialMessages: [
      {
        id: 'ai-1',
        sender: 'bot',
        text: '🤖 Hello! I am the **OmniAI Customer Intelligence Bot**.\n\nI have ingested the full company docs and API documentation. Ask me anything or select a topic below:',
        buttons: [
          { label: '⚡ How does source code delivery work?', action: 'ask_code' },
          { label: '🛠️ What is included in monthly servicing?', action: 'ask_servicing' },
          { label: '🧑‍💻 Connect to Human Engineer', action: 'handover' }
        ],
        time: '12:00'
      }
    ],
    responses: {
      'ask_code': [
        {
          id: 'ac-1',
          sender: 'user',
          text: 'How does source code delivery work?',
          time: '12:01'
        },
        {
          id: 'ac-2',
          sender: 'bot',
          text: '💡 **Direct Source Code Buyout**:\n\nWhen you purchase a bot one-time, you receive:\n1. Private GitHub repository access or ZIP archive.\n2. Complete Python 3.12 codebase (aiogram 3).\n3. Docker Compose configuration file.\n4. Step-by-step VPS deployment guide.\n5. 60 days of bug-fix warranty & support.\n\nYou own the code 100% with no recurring licensing fees.',
          buttons: [
            { label: '🛠️ What about monthly servicing?', action: 'ask_servicing' },
            { label: '🔄 Reset Chat', action: 'reset' }
          ],
          time: '12:01'
        }
      ],
      'ask_servicing': [
        {
          id: 'as-1',
          sender: 'user',
          text: 'What is included in monthly servicing?',
          time: '12:01'
        },
        {
          id: 'as-2',
          sender: 'bot',
          text: '🚀 **Monthly Managed Servicing (Bot-as-a-Service)**:\n\nIf you prefer zero technical hassle:\n• We host your bot 24/7 on high-speed cloud infrastructure.\n• 99.9% uptime SLA monitoring with instant failover.\n• Database backups & security patch updates.\n• Monthly feature adjustments & Telegram Bot API compatibility.\n• Cancel or switch to code buyout anytime!',
          buttons: [
            { label: '🧑‍💻 Speak to Abenezer', action: 'handover' },
            { label: '🔄 Reset Chat', action: 'reset' }
          ],
          time: '12:01'
        }
      ],
      'handover': [
        {
          id: 'ho-1',
          sender: 'user',
          text: 'Connect to Human Engineer',
          time: '12:02'
        },
        {
          id: 'ho-2',
          sender: 'bot',
          text: '🔔 Pinging Abenezer Abrham on Telegram...\n\nDirect contact link: [@abenezer_abrham](https://t.me/abenezer_abrham)\n\nTicket created: #TK-912. Average response time: < 15 minutes.',
          buttons: [
            { label: '💬 Open Telegram Chat', url: 'https://t.me/abenezer_abrham', action: 'open_tg' },
            { label: '🔄 Start Over', action: 'reset' }
          ],
          time: '12:02'
        }
      ]
    }
  },
  'crypto-sniper-flow': {
    botId: 'crypto-sniper-bot',
    botName: 'AlphaPulse DEX Signals',
    botUsername: '@alphapulse_bot',
    avatarText: '📈',
    initialMessages: [
      {
        id: 'cs-1',
        sender: 'bot',
        text: '🚨 **WHALE DETECTED | TON / USDT**\n\n💰 Size: **$124,500 USDT**\n🪙 Pair: $TON / $NOT\n📊 Price Impact: +4.82%\n🔒 Liquidity: 100% Locked (UNCX)\n\n⚡ Alert Latency: 142ms\n\nWhat would you like to filter?',
        buttons: [
          { label: '🎯 Set Min Alert Size ($50K+)', action: 'filter_size' },
          { label: '📡 View Channel Broadcasts', action: 'view_channels' }
        ],
        time: '12:00'
      }
    ],
    responses: {
      'filter_size': [
        {
          id: 'fs-1',
          sender: 'user',
          text: 'Set Min Alert Size to $50K+',
          time: '12:01'
        },
        {
          id: 'fs-2',
          sender: 'bot',
          text: '✅ Filter updated! Only transactions above $50,000 will be relayed to your private VIP channel.',
          buttons: [
            { label: '🔄 Reset Demo', action: 'reset' }
          ],
          time: '12:01'
        }
      ]
    }
  },
  'lead-form-flow': {
    botId: 'lead-form-bot',
    botName: 'LeadFlow Booker',
    botUsername: '@leadflow_booker_bot',
    avatarText: '📋',
    initialMessages: [
      {
        id: 'lf-1',
        sender: 'bot',
        text: '👋 Hi there! Looking for custom software or bot development?\n\nAnswer 3 quick questions so we can generate an accurate proposal for your project.',
        buttons: [
          { label: '🚀 Start Project Questionnaire', action: 'start_quiz' },
          { label: '📅 Book a Free Discovery Call', action: 'book_call' }
        ],
        time: '12:00'
      }
    ],
    responses: {
      'start_quiz': [
        {
          id: 'sq-1',
          sender: 'user',
          text: '🚀 Start Project Questionnaire',
          time: '12:01'
        },
        {
          id: 'sq-2',
          sender: 'bot',
          text: '📋 **Question 1 of 3**:\n\nWhat type of bot do you need built?',
          buttons: [
            { label: '🛒 E-Commerce & Payments', action: 'q2' },
            { label: '🤖 AI Support Assistant', action: 'q2' },
            { label: '📈 Crypto / Trading Alerts', action: 'q2' },
            { label: '⚡ Custom Workflow', action: 'q2' }
          ],
          time: '12:01'
        }
      ],
      'q2': [
        {
          id: 'q2-1',
          sender: 'user',
          text: 'E-Commerce & Payments',
          time: '12:01'
        },
        {
          id: 'q2-2',
          sender: 'bot',
          text: '📋 **Question 2 of 3**:\n\nHow do you prefer to run it?',
          buttons: [
            { label: '💎 Buy Source Code (One-Time)', action: 'q3' },
            { label: '☁️ Managed Servicing (Monthly)', action: 'q3' }
          ],
          time: '12:01'
        }
      ],
      'q3': [
        {
          id: 'q3-1',
          sender: 'user',
          text: 'Managed Servicing (Monthly)',
          time: '12:02'
        },
        {
          id: 'q3-2',
          sender: 'bot',
          text: '🎉 **Lead Recorded & Synced to CRM!**\n\nAbenezer has received your project parameters and will reach out on Telegram within 30 minutes.\n\nReady to get started now?',
          buttons: [
            { label: '💬 Chat Directly on Telegram', url: 'https://t.me/abenezer_abrham', action: 'open_tg' },
            { label: '🔄 Restart', action: 'reset' }
          ],
          time: '12:02'
        }
      ],
      'book_call': [
        {
          id: 'bc-1',
          sender: 'user',
          text: '📅 Book a Free Discovery Call',
          time: '12:01'
        },
        {
          id: 'bc-2',
          sender: 'bot',
          text: '🗓️ Select an available 20-minute slot on our calendar or message directly on [@abenezer_abrham](https://t.me/abenezer_abrham).',
          buttons: [
            { label: '⬅️ Back', action: 'reset' }
          ],
          time: '12:01'
        }
      ]
    }
  },
  'moderator-flow': {
    botId: 'moderator-bot',
    botName: 'ShieldGuard Group Defense',
    botUsername: '@shieldguard_bot',
    avatarText: '🛡️',
    initialMessages: [
      {
        id: 'mg-1',
        sender: 'bot',
        text: '🛡️ **ShieldGuard Defense Active**\n\n• Protected Members: 42,800\n• Spam Raids Deflected: 1,489\n• Uptime: 99.98%\n\nTest human verification simulation:',
        buttons: [
          { label: '🧪 Trigger Captcha Simulation', action: 'trigger_captcha' },
          { label: '⚙️ View Moderation Rules', action: 'view_rules' }
        ],
        time: '12:00'
      }
    ],
    responses: {
      'trigger_captcha': [
        {
          id: 'tc-1',
          sender: 'user',
          text: '🧪 Trigger Captcha Simulation',
          time: '12:01'
        },
        {
          id: 'tc-2',
          sender: 'bot',
          text: '⚠️ **HUMAN VERIFICATION REQUIRED**\n\nWelcome @NewMember! To speak in this group, please solve within 60 seconds:\n\n👉 **What is 5 + 3 ?**',
          buttons: [
            { label: '7', action: 'wrong_ans' },
            { label: '8 (Correct)', action: 'right_ans' },
            { label: '9', action: 'wrong_ans' }
          ],
          time: '12:01'
        }
      ],
      'right_ans': [
        {
          id: 'ra-1',
          sender: 'user',
          text: '8 (Correct)',
          time: '12:01'
        },
        {
          id: 'ra-2',
          sender: 'bot',
          text: '✅ **Verification Passed!**\n\nYou have been granted full chat permissions. Welcome aboard!',
          buttons: [
            { label: '🔄 Reset', action: 'reset' }
          ],
          time: '12:01'
        }
      ],
      'wrong_ans': [
        {
          id: 'wa-1',
          sender: 'user',
          text: 'Wrong Answer',
          time: '12:01'
        },
        {
          id: 'wa-2',
          sender: 'bot',
          text: '❌ Incorrect answer. User has been temporarily muted for 5 minutes.',
          buttons: [
            { label: '🔄 Try Again', action: 'trigger_captcha' }
          ],
          time: '12:01'
        }
      ]
    }
  }
};

export const DEAL_PACKAGES: DealPackage[] = [
  {
    id: 'deal-starter',
    name: 'Starter Turnkey',
    subtitle: 'Best for launching your first automated Telegram channel or shop.',
    badge: '⚡ Instant Setup',
    monthlyPrice: 29,
    oneTimePrice: 149,
    billingTerm: 'per month',
    description: 'Get any 1 ready-to-run bot template with complete configuration, database, and documentation.',
    savingsBadge: 'Save 20% on Annual',
    highlights: [
      'Choice of any 1 Bot from Showroom',
      'Full Python 3.12 source code OR cloud hosting',
      '1 Telegram Bot Token configuration',
      'Database setup (SQLite / PostgreSQL)',
      'Detailed deployment guide & video walkthrough',
      '30 days standard bug warranty'
    ],
    ctaText: 'Get Starter Deal',
    popular: false
  },
  {
    id: 'deal-operator',
    name: 'Pro Operator Bundle',
    subtitle: 'The Spotify-style all-inclusive package with zero technical overhead.',
    badge: '🔥 Most Popular',
    monthlyPrice: 59,
    oneTimePrice: 299,
    billingTerm: 'per month',
    description: 'Choice of any 2 Bots + 3 Months Managed Cloud Hosting + Custom Branding + Priority Support.',
    savingsBadge: 'BEST VALUE • SAVE $150',
    highlights: [
      'Any 2 Bots from the Showroom catalog',
      'Includes 3 Months Managed 24/7 Cloud Hosting',
      'Custom branding (Your logo, name & bot bio)',
      'Payment Gateway Integration (Stars / USDT / Stripe)',
      '99.9% Uptime Guarantee & health monitoring',
      'Direct Telegram Priority Support SLA (< 1 hr)',
      'Full source code transfer whenever requested'
    ],
    ctaText: 'Claim Pro Bundle',
    popular: true
  },
  {
    id: 'deal-studio',
    name: 'Full Studio & Agency',
    subtitle: 'For agencies, entrepreneurs, and high-volume digital communities.',
    badge: '💎 Lifetime Resale Rights',
    monthlyPrice: 129,
    oneTimePrice: 599,
    billingTerm: 'per month',
    description: 'All 6 Bots source code, white-label commercial rights, and direct engineering architecture support.',
    savingsBadge: 'SAVE OVER $600',
    highlights: [
      'ALL 6 Bot Templates in the Catalog',
      'Full Unrestricted Source Code & Commercial License',
      'White-label rights (Rebrand and resell to your clients)',
      'Docker Compose orchestration & deployment scripts',
      'Priority 1-on-1 Telegram architecture consultation',
      'Lifetime updates to bot base templates',
      'Custom webhook & API integration support'
    ],
    ctaText: 'Get Full Studio Rights',
    popular: false
  }
];

export const COMPARISON_FEATURES = [
  {
    feature: 'Full Python Source Code Ownership',
    oneTime: 'Included (100% Lifetime)',
    monthly: 'Available upon request',
    custom: 'Included (Full IP Transfer)'
  },
  {
    feature: 'Cloud Hosting & Server Infrastructure',
    oneTime: 'Self-hosted (We provide 1-click Docker)',
    monthly: 'Included (Fully Managed 24/7)',
    custom: 'Configured on your cloud or managed'
  },
  {
    feature: '99.9% Uptime Monitoring & Backups',
    oneTime: 'Manual / Self-managed',
    monthly: 'Automated 24/7 with alerts',
    custom: 'Enterprise Grade SLA'
  },
  {
    feature: 'Telegram Bot API Updates & Maintenance',
    oneTime: '60 Days bug fixes included',
    monthly: 'Continuous automated updates',
    custom: 'Dedicated continuous support'
  },
  {
    feature: 'Payment Gateways Setup (Stars/USDT/Stripe)',
    oneTime: 'Config template provided',
    monthly: 'Fully connected for you',
    custom: 'Bespoke multi-currency pipeline'
  },
  {
    feature: 'Custom Feature Add-ons & Tweaks',
    oneTime: 'Hourly rate or DIY',
    monthly: '2 minor revisions per month included',
    custom: 'Built to exact specifications'
  },
  {
    feature: 'Direct Telegram Support Channel',
    oneTime: 'Standard Support (24h)',
    monthly: 'Priority Direct Support (< 2h)',
    custom: 'VIP Dedicated Slack/Telegram (< 30m)'
  }
];

export const FAQ_ITEMS = [
  {
    q: 'What is the difference between One-Time Buyout and Monthly Servicing?',
    a: 'With a One-Time Buyout, you purchase the complete Python source code and lifetime commercial license. You can host it on your own VPS (e.g. Hetzner, DigitalOcean, AWS) using our 1-click Docker Compose script with zero recurring fees. With Monthly Servicing, we handle 100% of the infrastructure, server hosting, 24/7 monitoring, security patches, database backups, and Telegram API updates so you never have to touch a server.'
  },
  {
    q: 'Can I start with Monthly Servicing and later switch to One-Time Buyout?',
    a: 'Yes! If you start on a Monthly Servicing plan, you can buy out the complete source code and your database snapshot at any time with a 20% credit of all monthly fees already paid applied toward the buyout.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Crypto (USDT, TON, BTC, ETH), Telegram Stars directly inside Telegram, Credit/Debit cards via Stripe, and PayPal. Invoices are generated automatically.'
  },
  {
    q: 'How fast do I get access after ordering?',
    a: 'For pre-built templates, source code access or cloud deployment provisioning begins within 15–30 minutes of order confirmation. For custom modifications, delivery typically takes 24–72 hours.'
  },
  {
    q: 'Can you customize the bot to fit my exact workflow?',
    a: 'Absolutely! All bots are built modularly in clean Python (aiogram 3.x). We can integrate custom APIs, proprietary databases, custom mini-apps, or tailored payment flows. Contact [@abenezer_abrham](https://t.me/abenezer_abrham) for a tailored quote.'
  },
  {
    q: 'Do you offer a warranty or refund guarantee?',
    a: 'Yes. All one-time code purchases include a 60-day bug-free warranty where we fix any unexpected runtime issues immediately. For monthly plans, you can cancel at any time with zero lock-in or cancellation penalties.'
  }
];
