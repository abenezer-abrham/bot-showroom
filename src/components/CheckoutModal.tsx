import React, { useState } from 'react';
import { X, Send, Check, Copy, CheckCheck, ShieldCheck, Sparkles, CreditCard, Coins } from 'lucide-react';
import { SITE_CONFIG } from '../config/showroom';
import { PricingModel } from '../types/showroom';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItemTitle?: string;
  initialModel?: PricingModel;
  initialPrice?: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  initialItemTitle = 'Pro Operator Bundle',
  initialModel = 'one-time',
  initialPrice = 299,
}) => {
  const [model, setModel] = useState<PricingModel>(initialModel);
  const [telegramHandle, setTelegramHandle] = useState('');
  const [projectNote, setProjectNote] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentPrice = initialPrice || (model === 'one-time' ? 299 : 59);

  const orderSummaryText =
    `Hello @abenezer_abrham, I would like to order from Yene.suk:\n\n` +
    `• Item: ${initialItemTitle}\n` +
    `• Model: ${model === 'one-time' ? 'One-Time Source Code Buyout ($' + currentPrice + ')' : 'Monthly Managed Servicing ($' + currentPrice + '/mo)'}\n` +
    `• My Telegram Handle: ${telegramHandle ? (telegramHandle.startsWith('@') ? telegramHandle : '@' + telegramHandle) : 'Not specified'}\n` +
    (projectNote ? `• Notes / Requirements: ${projectNote}\n` : '') +
    `\nPlease confirm invoice details and setup steps!`;

  const handleSendTelegram = () => {
    const encoded = encodeURIComponent(orderSummaryText);
    window.open(`https://t.me/${SITE_CONFIG.telegramUsername}?text=${encoded}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(orderSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 rounded-3xl bg-[#12151f] border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-spotify-green/10 text-spotify-green text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Fast-Track Checkout
          </div>
          <h3 className="text-2xl font-black text-white">Order &amp; Deployment Request</h3>
          <p className="text-xs text-slate-400 mt-1">
            Connect directly with developer Abenezer Abrham to finalize bot deployment or receive source code.
          </p>
        </div>

        {/* Item & Price Banner */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider">Selected Package</span>
              <div className="text-lg font-bold text-white">{initialItemTitle}</div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-spotify-green">${currentPrice}</span>
              <span className="text-xs text-slate-400 block">
                {model === 'one-time' ? 'one-time' : '/ month'}
              </span>
            </div>
          </div>

          {/* Model Switcher in Modal */}
          <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
            <button
              type="button"
              onClick={() => setModel('one-time')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                model === 'one-time'
                  ? 'bg-spotify-green text-black font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              One-Time Code Buyout
            </button>
            <button
              type="button"
              onClick={() => setModel('monthly')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                model === 'monthly'
                  ? 'bg-spotify-green text-black font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              Monthly Managed Servicing
            </button>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Your Telegram Username
            </label>
            <input
              type="text"
              value={telegramHandle}
              onChange={(e) => setTelegramHandle(e.target.value)}
              placeholder="@your_username"
              className="w-full px-4 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-spotify-green"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Specific Requirements or Questions (Optional)
            </label>
            <textarea
              rows={2}
              value={projectNote}
              onChange={(e) => setProjectNote(e.target.value)}
              placeholder="e.g. Need custom Stripe integration, require Telegram Stars token support, or want custom branding."
              className="w-full px-4 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-spotify-green resize-none"
            />
          </div>
        </div>

        {/* Accepted Payment Badges */}
        <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Accepted Payment Rails</span>
            <span className="text-spotify-green font-medium">Instant Verification</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-xs text-slate-300">
            <span className="px-2.5 py-1 rounded bg-black/40 border border-white/10 flex items-center gap-1.5">
              ⭐ Telegram Stars
            </span>
            <span className="px-2.5 py-1 rounded bg-black/40 border border-white/10 flex items-center gap-1.5">
              💎 USDT / TON / BTC
            </span>
            <span className="px-2.5 py-1 rounded bg-black/40 border border-white/10 flex items-center gap-1.5">
              💳 Stripe &amp; Cards
            </span>
            <span className="px-2.5 py-1 rounded bg-black/40 border border-white/10 flex items-center gap-1.5">
              🅿️ PayPal
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSendTelegram}
            className="flex-1 py-3.5 px-5 rounded-full bg-spotify-green hover:bg-spotify-green-light text-black font-extrabold text-sm transition-all shadow-glow-green hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Order on Telegram</span>
          </button>

          <button
            onClick={handleCopy}
            className="py-3.5 px-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition-all flex items-center justify-center gap-1.5"
          >
            {copied ? (
              <>
                <CheckCheck className="w-4 h-4 text-spotify-green" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>

        {/* Trust Note */}
        <div className="mt-4 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-spotify-green" />
          <span>Direct deal with Abenezer Abrham. 60-day warranty &amp; zero hidden fees.</span>
        </div>
      </div>
    </div>
  );
};
