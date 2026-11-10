import { getShopConfig, BOT_LOCALES } from '../shop.config.js';

// Simple in-memory / lightweight storage for user language & sessions
// In serverless, sessions gracefully fallback or persist via callback_data
const userLangs: Record<number, 'en' | 'am'> = {};

async function callTelegram(token: string, method: string, payload: Record<string, any>) {
  if (!token) {
    console.warn('BOT_TOKEN is missing. Skipping Telegram API call.');
    return null;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err) {
    console.error(`Telegram API error on ${method}:`, err);
    return null;
  }
}

export default async function handler(req: any, res: any) {
  // Allow health check / status inspection
  if (req.method === 'GET') {
    const config = getShopConfig();
    return res.status(200).json({
      status: 'active',
      shopName: config.shopName,
      niche: config.niche,
      hasBotToken: Boolean(config.botToken),
      webhookEndpoint: '/api/webhook',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const update = req.body;
  if (!update) {
    return res.status(400).json({ error: 'Empty payload' });
  }

  const config = getShopConfig();
  const token = config.botToken;

  try {
    // 1. Process Messages (e.g. /start, text queries)
    if (update.message) {
      const msg = update.message;
      const chatId = msg.chat.id;
      const fromId = msg.from?.id || chatId;
      const firstName = msg.from?.first_name || 'Valued Guest';
      const text = (msg.text || '').trim();

      const lang = userLangs[fromId] || 'en';
      const t = BOT_LOCALES[lang];
      const isAm = lang === 'am';

      if (text.startsWith('/start')) {
        const welcomeText = t.greeting(
          firstName,
          isAm ? config.shopNameAm : config.shopName,
          isAm ? config.taglineAm : config.tagline
        );

        const keyboard = {
          inline_keyboard: [
            [
              { text: t.btn_book, callback_data: 'nav_book' },
              { text: t.btn_catalog, callback_data: 'nav_services' },
            ],
            [
              { text: t.btn_hours, callback_data: 'nav_hours' },
              { text: t.btn_human, callback_data: 'nav_human' },
            ],
            [
              { text: t.btn_bookings, callback_data: 'nav_bookings' },
              { text: t.btn_lang, callback_data: 'toggle_lang' },
            ],
          ],
        };

        // If public host is configured, we can send a photo banner
        const host = req.headers['x-forwarded-host'] || req.headers.host;
        const protocol = req.headers['x-forwarded-proto'] || 'https';
        const bannerUrl = host ? `${protocol}://${host}${config.welcomeBanner}` : null;

        if (bannerUrl) {
          await callTelegram(token, 'sendPhoto', {
            chat_id: chatId,
            photo: bannerUrl,
            caption: welcomeText,
            parse_mode: 'Markdown',
            reply_markup: keyboard,
          });
        } else {
          await callTelegram(token, 'sendMessage', {
            chat_id: chatId,
            text: welcomeText,
            parse_mode: 'Markdown',
            reply_markup: keyboard,
          });
        }

        return res.status(200).json({ ok: true });
      }

      // Handle user sending phone number or inquiries
      if (/^09\d{8}$/.test(text) || /^\+251\d{9}$/.test(text)) {
        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: isAm
            ? `✅ ስልክ ቁጥርዎ ተመዝግቧል: \`${text}\`\nየቀጠሮ ዝርዝርዎን ከታች ካሉት አማራጮች ያረጋግጡ።`
            : `✅ Contact phone recorded: \`${text}\`\nPlease proceed with your appointment selection below.`,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [[{ text: t.btn_book, callback_data: 'nav_book' }]],
          },
        });
        return res.status(200).json({ ok: true });
      }

      // General fallback or question forwarding to admin
      if (text && !text.startsWith('/')) {
        // Forward message to shop admins
        for (const adminId of config.adminIds) {
          await callTelegram(token, 'sendMessage', {
            chat_id: adminId,
            text: `📩 **New Inquiry from Customer**\n\n• From: [${firstName}](tg://user?id=${fromId}) (\`${fromId}\`)\n• Message: "${text}"`,
            parse_mode: 'Markdown',
          });
        }

        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: isAm
            ? `🙏 መልእክትዎ ደርሶናል! የቡድናችን አባል በቅርቡ መልስ ይሰጥዎታል።\nለአስቸኳይ ጥሪ: \`${config.phone}\``
            : `🙏 Thank you! Your message has been forwarded to our shop staff. We will reply promptly.\nFor immediate calls: \`${config.phone}\``,
          parse_mode: 'Markdown',
        });
        return res.status(200).json({ ok: true });
      }
    }

    // 2. Process Callback Queries (Buttons)
    if (update.callback_query) {
      const cb = update.callback_query;
      const callbackId = cb.id;
      const chatId = cb.message?.chat?.id;
      const messageId = cb.message?.message_id;
      const fromId = cb.from?.id || chatId;
      const data = cb.data || '';

      await callTelegram(token, 'answerCallbackQuery', { callback_query_id: callbackId });

      let lang = userLangs[fromId] || 'en';
      let t = BOT_LOCALES[lang];
      let isAm = lang === 'am';

      // Language Switcher
      if (data === 'toggle_lang') {
        lang = lang === 'en' ? 'am' : 'en';
        userLangs[fromId] = lang;
        t = BOT_LOCALES[lang];
        isAm = lang === 'am';

        const updatedGreeting = t.greeting(
          cb.from?.first_name || 'Guest',
          isAm ? config.shopNameAm : config.shopName,
          isAm ? config.taglineAm : config.tagline
        );

        await callTelegram(token, 'editMessageCaption', {
          chat_id: chatId,
          message_id: messageId,
          caption: updatedGreeting,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: t.btn_book, callback_data: 'nav_book' },
                { text: t.btn_catalog, callback_data: 'nav_services' },
              ],
              [
                { text: t.btn_hours, callback_data: 'nav_hours' },
                { text: t.btn_human, callback_data: 'nav_human' },
              ],
              [
                { text: t.btn_bookings, callback_data: 'nav_bookings' },
                { text: t.btn_lang, callback_data: 'toggle_lang' },
              ],
            ],
          },
        });
        return res.status(200).json({ ok: true });
      }

      // Back to Home
      if (data === 'nav_home') {
        const welcomeText = t.greeting(
          cb.from?.first_name || 'Guest',
          isAm ? config.shopNameAm : config.shopName,
          isAm ? config.taglineAm : config.tagline
        );

        await callTelegram(token, 'editMessageCaption', {
          chat_id: chatId,
          message_id: messageId,
          caption: welcomeText,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: t.btn_book, callback_data: 'nav_book' },
                { text: t.btn_catalog, callback_data: 'nav_services' },
              ],
              [
                { text: t.btn_hours, callback_data: 'nav_hours' },
                { text: t.btn_human, callback_data: 'nav_human' },
              ],
              [
                { text: t.btn_bookings, callback_data: 'nav_bookings' },
                { text: t.btn_lang, callback_data: 'toggle_lang' },
              ],
            ],
          },
        });
        return res.status(200).json({ ok: true });
      }

      // View Catalog / Services
      if (data === 'nav_services') {
        const lines = config.services.map((s) => {
          const name = isAm ? s.nameAm : s.name;
          const desc = isAm ? s.descriptionAm : s.description;
          const dur = s.durationMinutes ? ` • ${s.durationMinutes} min` : '';
          return `${s.emoji} **${name}** — \`${s.price} ${config.currency}\`${dur}\n_${desc}_\n`;
        });

        const catalogText = `🏷️ **${isAm ? 'አገልግሎቶችና ዋጋ' : 'Services & Menu'}**\n\n${lines.join('\n')}`;

        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: catalogText,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: t.btn_book, callback_data: 'nav_book' }],
              [{ text: t.btn_back, callback_data: 'nav_home' }],
            ],
          },
        });
        return res.status(200).json({ ok: true });
      }

      // Location & Hours
      if (data === 'nav_hours') {
        const hoursText = isAm
          ? `📍 **${config.shopNameAm}**\n\n• አድራሻ: ${config.locationAm}\n• የስራ ሰዓት: ${config.operatingHoursAm}\n• ዋና ስልክ: \`${config.phone}\`\n• ተጨማሪ ስልክ: \`${config.altPhone || config.phone}\`\n• ቴሌብር: \`${config.telebirrPhone}\` (${config.telebirrName})`
          : `📍 **${config.shopName}**\n\n• Address: ${config.location}\n• Hours: ${config.operatingHours}\n• Phone: \`${config.phone}\`\n• Alternate: \`${config.altPhone || config.phone}\`\n• Telebirr: \`${config.telebirrPhone}\` (${config.telebirrName})`;

        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: hoursText,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '🗺️ Open in Google Maps', url: config.googleMapsUrl },
                { text: '📞 Call Shop', url: `tel:${config.phone.replace(/\s+/g, '')}` },
              ],
              [{ text: t.btn_back, callback_data: 'nav_home' }],
            ],
          },
        });
        return res.status(200).json({ ok: true });
      }

      // Talk to Human
      if (data === 'nav_human') {
        const msgHuman = t.talk_human_msg(isAm ? config.shopNameAm : config.shopName, config.phone);
        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: msgHuman,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '📞 Call Directly', url: `tel:${config.phone.replace(/\s+/g, '')}` }],
              [{ text: t.btn_back, callback_data: 'nav_home' }],
            ],
          },
        });
        return res.status(200).json({ ok: true });
      }

      // Step 1: Book Service selection
      if (data === 'nav_book') {
        const buttons = config.services.map((s) => [
          {
            text: `${s.emoji} ${isAm ? s.nameAm : s.name} (${s.price} ${config.currency})`,
            callback_data: `svc:${s.id}`,
          },
        ]);
        buttons.push([{ text: t.btn_back, callback_data: 'nav_home' }]);

        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: t.select_service_title,
          parse_mode: 'Markdown',
          reply_markup: { inline_keyboard: buttons },
        });
        return res.status(200).json({ ok: true });
      }

      // Step 2: Staff Selection
      if (data.startsWith('svc:')) {
        const svcId = data.replace('svc:', '');
        const staffButtons = config.staff.map((st) => [
          {
            text: `${st.name} — ${isAm ? st.titleAm : st.title}`,
            callback_data: `stf:${svcId}:${st.id}`,
          },
        ]);
        staffButtons.push([{ text: '⬅️ Back to Services', callback_data: 'nav_book' }]);

        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: t.select_staff_title,
          parse_mode: 'Markdown',
          reply_markup: { inline_keyboard: staffButtons },
        });
        return res.status(200).json({ ok: true });
      }

      // Step 3: Date Selection
      if (data.startsWith('stf:')) {
        const [, svcId, staffId] = data.split(':');
        const today = new Date();
        const dateOptions = [
          { label: isAm ? 'ዛሬ (Today)' : 'Today', val: today.toISOString().split('T')[0] },
          {
            label: isAm ? 'ነገ (Tomorrow)' : 'Tomorrow',
            val: new Date(today.getTime() + 86400000).toISOString().split('T')[0],
          },
          {
            label: isAm ? 'ከነገ ወዲያ' : 'Day After Tomorrow',
            val: new Date(today.getTime() + 172800000).toISOString().split('T')[0],
          },
        ];

        const dateButtons = dateOptions.map((d) => [
          { text: `📅 ${d.label} (${d.val})`, callback_data: `dt:${svcId}:${staffId}:${d.val}` },
        ]);
        dateButtons.push([{ text: '⬅️ Change Specialist', callback_data: `svc:${svcId}` }]);

        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: t.select_date_title,
          parse_mode: 'Markdown',
          reply_markup: { inline_keyboard: dateButtons },
        });
        return res.status(200).json({ ok: true });
      }

      // Step 4: Time Slot Selection
      if (data.startsWith('dt:')) {
        const [, svcId, staffId, dateVal] = data.split(':');
        const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '05:30 PM'];

        const slotButtons = timeSlots.map((slot) => [
          {
            text: `⏰ ${slot}`,
            callback_data: `sl:${svcId}:${staffId}:${dateVal}:${slot.replace(/\s+/g, '_')}`,
          },
        ]);
        slotButtons.push([{ text: '⬅️ Change Date', callback_data: `stf:${svcId}:${staffId}` }]);

        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: t.select_time_title.replace('{date}', dateVal).replace('{staff}', staffId),
          parse_mode: 'Markdown',
          reply_markup: { inline_keyboard: slotButtons },
        });
        return res.status(200).json({ ok: true });
      }

      // Step 5: Payment / Final Confirmation
      if (data.startsWith('sl:')) {
        const [, svcId, staffId, dateVal, rawSlot] = data.split(':');
        const slot = rawSlot.replace('_', ' ');
        const svc = config.services.find((s) => s.id === svcId) || config.services[0];
        const staffObj = config.staff.find((st) => st.id === staffId) || config.staff[0];

        const confirmMsg = isAm
          ? `${t.confirm_booking_title}\n\n• አገልግሎት: **${svc.nameAm}**\n• ባለሙያ: **${staffObj.name}**\n• ቀን: **${dateVal} በ ${slot}**\n• ጠቅላላ ዋጋ: **${svc.price} ${config.currency}**\n\nእባክዎ የመክፈያ መንገድ ይምረጡ:`
          : `${t.confirm_booking_title}\n\n• Service: **${svc.name}**\n• Specialist: **${staffObj.name}**\n• Schedule: **${dateVal} at ${slot}**\n• Total Amount: **${svc.price} ${config.currency}**\n\nPlease select your payment preference:`;

        const bookingRef = `${svcId}_${dateVal}_${Math.floor(1000 + Math.random() * 9000)}`;

        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: confirmMsg,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: t.btn_confirm_cash, callback_data: `done:cash:${bookingRef}` },
                { text: t.btn_confirm_telebirr, callback_data: `done:tb:${bookingRef}:${svc.price}` },
              ],
              [{ text: '⬅️ Back to Menu', callback_data: 'nav_home' }],
            ],
          },
        });
        return res.status(200).json({ ok: true });
      }

      // Final: Booking Confirmed (Cash or Telebirr)
      if (data.startsWith('done:')) {
        const parts = data.split(':');
        const method = parts[1]; // 'cash' or 'tb'
        const bookingId = parts[2] || `${Math.floor(10000 + Math.random() * 90000)}`;
        const customerName = cb.from?.first_name || 'Valued Guest';

        const successText = isAm
          ? `🎉 **ቀጠሮዎ በተሳካ ሁኔታ ተመዝግቧል!**\n\n• የቀጠሮ መለያ: \`#${bookingId}\`\n• የመክፈያ መንገድ: **${method === 'cash' ? 'በቦታው (ካሽ)' : 'ቴሌብር'}**\n\n📍 አድራሻ: ${config.locationAm}\n📞 ጥያቄ ካለዎት: \`${config.phone}\``
          : `🎉 **Reservation Confirmed!**\n\n• Reservation ID: \`#${bookingId}\`\n• Payment: **${method === 'cash' ? 'Pay at Shop (Cash)' : 'Telebirr'}**\n\n📍 Address: ${config.location}\n📞 Questions? Call us: \`${config.phone}\``;

        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: successText,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '🗺️ Get Directions', url: config.googleMapsUrl },
                { text: t.btn_back, callback_data: 'nav_home' },
              ],
            ],
          },
        });

        // Notify Admins
        for (const adminId of config.adminIds) {
          await callTelegram(token, 'sendMessage', {
            chat_id: adminId,
            text: `🔔 **NEW RESERVATION ALERT #${bookingId}**\n\n• Customer: [${customerName}](tg://user?id=${fromId})\n• Method: **${method.toUpperCase()}**\n• Shop: ${config.shopName}`,
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '✅ Accept', callback_data: `admin_accept:${bookingId}` },
                  { text: '❌ Reject', callback_data: `admin_reject:${bookingId}` },
                ],
              ],
            },
          });
        }

        return res.status(200).json({ ok: true });
      }

      // Admin quick actions
      if (data.startsWith('admin_accept:')) {
        const id = data.replace('admin_accept:', '');
        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: `✅ Reservation #${id} marked as **Accepted & Confirmed** by Admin.`,
        });
        return res.status(200).json({ ok: true });
      }

      if (data.startsWith('admin_reject:')) {
        const id = data.replace('admin_reject:', '');
        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: `❌ Reservation #${id} has been cancelled by Admin.`,
        });
        return res.status(200).json({ ok: true });
      }

      // My bookings
      if (data === 'nav_bookings') {
        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: isAm
            ? `📋 **የእርስዎ ቀጠሮዎች**\n\nበቅርቡ የያዟቸው ቀጠሮዎች ዝርዝር እዚህ ይታያል። አዲስ ቀጠሮ ለመያዝ ከታች ያለውን ይጫኑ:`
            : `📋 **Your Scheduled Bookings**\n\nYou currently have reservations on file. To schedule another service:`,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: t.btn_book, callback_data: 'nav_book' }],
              [{ text: t.btn_back, callback_data: 'nav_home' }],
            ],
          },
        });
        return res.status(200).json({ ok: true });
      }
    }

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
