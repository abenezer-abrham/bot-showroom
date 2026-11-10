import { getShopConfig } from '../shop.config.js';

export default async function handler(req: any, res: any) {
  const config = getShopConfig();
  const token = req.query?.token || config.botToken;

  if (!token) {
    return res.status(400).json({
      error: 'Missing BOT_TOKEN. Pass it as ?token=... or set BOT_TOKEN environment variable in Vercel.',
    });
  }

  // Detect public host
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const defaultWebhookUrl = host ? `${protocol}://${host}/api/webhook` : '';
  const webhookUrl = req.query?.url || defaultWebhookUrl;

  if (!webhookUrl) {
    return res.status(400).json({
      error: 'Unable to determine webhook URL. Pass ?url=https://your-domain.vercel.app/api/webhook',
    });
  }

  try {
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`,
      { method: 'GET' }
    );
    const data = await telegramRes.json();

    const infoRes = await fetch(
      `https://api.telegram.org/bot${token}/getWebhookInfo`,
      { method: 'GET' }
    );
    const webhookInfo = await infoRes.json();

    return res.status(200).json({
      message: 'Telegram Webhook setup executed',
      targetUrl: webhookUrl,
      shop: config.shopName,
      niche: config.niche,
      telegramResponse: data,
      currentWebhookInfo: webhookInfo,
    });
  } catch (err: any) {
    return res.status(500).json({
      error: 'Failed to contact Telegram API',
      details: err.message,
    });
  }
}
