import React, { useState } from 'react';
import { X, Send, Copy, CheckCheck, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG, PACKAGES } from '../config/showroom';
import { CurrencyCode, PackageTier } from '../types/showroom';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
  currency: CurrencyCode;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  initialPackageId = 'standard',
  currency,
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialPackageId);
  const [businessName, setBusinessName] = useState('');
  const [telegramHandle, setTelegramHandle] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentPkg: PackageTier =
    PACKAGES.find((p) => p.id === selectedId) || PACKAGES[1];

  const priceFormatted =
    currency === 'ETB'
      ? `${currentPkg.priceETB.toLocaleString()} ETB`
      : `$${currentPkg.priceUSD}`;

  // Input sanitization
  const cleanBusinessName = businessName.replace(/[<>]/g, '').trim();
  const cleanHandle = telegramHandle.replace(/[<>]/g, '').trim();

  const orderSummaryText =
    `Hello @abenezer_abrham, I would like to order a Telegram Bot on Yene.suk:\n\n` +
    `• Package: ${currentPkg.name} (${priceFormatted})\n` +
    `• What it includes: ${currentPkg.coreFeature}\n` +
    (cleanBusinessName ? `• Business Name: ${cleanBusinessName}\n` : '') +
    (cleanHandle ? `• My Contact: ${cleanHandle.startsWith('@') ? cleanHandle : '@' + cleanHandle}\n` : '') +
    `\nPlease let me know the next steps to launch!`;

  const handleSendTelegram = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const encoded = encodeURIComponent(orderSummaryText);
    window.open(`https://t.me/${SITE_CONFIG.telegramUsername}?text=${encoded}`, '_blank');
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(orderSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg my-6 rounded-2xl bg-[#121520] border border-white/10 shadow-2xl p-5 sm:p-7 animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-5 pr-8">
          <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            Order Request
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Deploy Your Telegram Bot
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Select your package and connect with {SITE_CONFIG.developerName} to launch your bot.
          </p>
        </div>

        {/* Package Selector */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {PACKAGES.map((pkg) => {
            const isSelected = selectedId === pkg.id;
            const pPrice =
              currency === 'ETB' ? `${pkg.priceETB.toLocaleString()}` : `$${pkg.priceUSD}`;

            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelectedId(pkg.id)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/10 text-white font-bold'
                    : 'border-white/10 bg-[#090b10] text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-semibold">{pkg.name}</div>
                <div className="text-[11px] text-emerald-400 font-bold mt-0.5">{pPrice}</div>
              </button>
            );
          })}
        </div>

        {/* Summary Card */}
        <div className="p-3.5 rounded-xl bg-[#090b10] border border-white/5 mb-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Selected Tier:</span>
            <span className="font-bold text-white">{currentPkg.name}</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-slate-400">Price:</span>
            <span className="font-bold text-emerald-400">{priceFormatted}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-white/5">
            <strong className="text-slate-300">Included:</strong> {currentPkg.coreFeature}
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-3.5 mb-5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Business / Store Name (Optional)
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Blue Cafe, Addis Boutique"
              maxLength={80}
              className="w-full px-3.5 py-2 rounded-lg bg-[#090b10] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Your Telegram Username or Phone
            </label>
            <input
              type="text"
              value={telegramHandle}
              onChange={(e) => setTelegramHandle(e.target.value)}
              placeholder="@username or +251 91..."
              maxLength={60}
              className="w-full px-3.5 py-2 rounded-lg bg-[#090b10] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSendTelegram}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-black font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Order via Telegram</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="py-3 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/10 transition-colors flex items-center justify-center gap-1.5"
          >
            {copied ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-3.5 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Direct deal with developer Abenezer Abrham. 100% money-back guarantee.</span>
        </div>
      </div>
    </div>
  );
};
