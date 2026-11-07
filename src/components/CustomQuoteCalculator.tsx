import React, { useState } from 'react';
import { Calculator, Send, CheckSquare, Square, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/showroom';

interface AddonOption {
  id: string;
  name: string;
  description: string;
  oneTimePrice: number;
  monthlyPrice: number;
}

const ADDONS: AddonOption[] = [
  {
    id: 'crypto-pay',
    name: 'Multi-Chain Crypto Gateway',
    description: 'Instant USDT, TON, and BTC payment verification with automated webhooks.',
    oneTimePrice: 49,
    monthlyPrice: 10,
  },
  {
    id: 'ai-rag',
    name: 'Custom AI RAG / PDF Document Training',
    description: 'Train your bot on your private company PDFs, knowledge docs, and FAQs.',
    oneTimePrice: 79,
    monthlyPrice: 15,
  },
  {
    id: 'web-dashboard',
    name: 'Web Admin Dashboard & Analytics',
    description: 'Standalone web portal to view registered users, order logs, and broadcast messages.',
    oneTimePrice: 99,
    monthlyPrice: 20,
  },
  {
    id: 'multilingual',
    name: '30+ Language Auto-Translation',
    description: 'Automatic language detection for international members and buyers.',
    oneTimePrice: 39,
    monthlyPrice: 8,
  },
  {
    id: 'priority-sla',
    name: 'Emergency Priority SLA Support',
    description: 'Direct priority phone/Telegram hotline with guaranteed under 30-minute fix window.',
    oneTimePrice: 59,
    monthlyPrice: 25,
  },
];

export const CustomQuoteCalculator: React.FC = () => {
  const [model, setModel] = useState<'one-time' | 'monthly'>('one-time');
  const [baseTier, setBaseTier] = useState<number>(149);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['crypto-pay']);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    let total = model === 'one-time' ? baseTier : Math.round(baseTier * 0.22);
    selectedAddons.forEach((id) => {
      const addon = ADDONS.find((a) => a.id === id);
      if (addon) {
        total += model === 'one-time' ? addon.oneTimePrice : addon.monthlyPrice;
      }
    });
    return total;
  };

  const handleTelegramInquiry = () => {
    const selectedAddonNames = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = encodeURIComponent(
      `Hello @abenezer_abrham, I configured a custom bot quote on Yene.suk:\n\n` +
      `• Model: ${model === 'one-time' ? 'One-Time Source Code Buyout' : 'Monthly Managed Cloud Servicing'}\n` +
      `• Base Tier: $${baseTier}\n` +
      `• Addons: ${selectedAddonNames || 'None'}\n` +
      `• Estimated Total: $${calculateTotal()}${model === 'monthly' ? '/mo' : ''}\n\n` +
      `I would like to discuss implementation details and get started!`
    );

    window.open(`https://t.me/${SITE_CONFIG.telegramUsername}?text=${text}`, '_blank');
  };

  return (
    <section id="calculator" className="py-24 bg-[#0a0c12] border-t border-white/5 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-spotify-green/10 text-spotify-green text-xs font-bold uppercase tracking-wider mb-3 border border-spotify-green/20">
            <Calculator className="w-3.5 h-3.5" />
            Interactive Custom Estimator
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Build Your Custom Bot Quote
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Select your desired delivery model and modular add-on capabilities to generate an instant estimate.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          {/* Step 1: Model Choice */}
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              1. Choose Delivery Model
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setModel('one-time')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  model === 'one-time'
                    ? 'border-spotify-green bg-spotify-green/10 text-white shadow-glow-green/20'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="font-bold text-sm">💎 One-Time Source Code Buyout</div>
                <div className="text-xs text-slate-400 mt-1">Full IP ownership, 1-click Docker self-hosting.</div>
              </button>

              <button
                type="button"
                onClick={() => setModel('monthly')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  model === 'monthly'
                    ? 'border-spotify-green bg-spotify-green/10 text-white shadow-glow-green/20'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="font-bold text-sm">☁️ Monthly Managed Servicing</div>
                <div className="text-xs text-slate-400 mt-1">We host 24/7 with 99.9% uptime SLA &amp; backups.</div>
              </button>
            </div>
          </div>

          {/* Step 2: Base Bot Scope */}
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              2. Select Base Core Architecture
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Standard Bot (Shop / Forms)', price: 149 },
                { label: 'Advanced Bot (VIP Sub / Gating)', price: 179 },
                { label: 'High-Frequency (AI / Crypto)', price: 229 },
              ].map((tier, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setBaseTier(tier.price)}
                  className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                    baseTier === tier.price
                      ? 'border-spotify-green bg-spotify-green/15 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div>{tier.label}</div>
                  <div className="text-spotify-green font-semibold mt-1">
                    Base: ${tier.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Add-on Modules */}
          <div className="mb-10">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              3. Modular Add-On Features
            </label>
            <div className="space-y-3">
              {ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                const addonPrice = model === 'one-time' ? addon.oneTimePrice : addon.monthlyPrice;
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-spotify-green/60 bg-spotify-green/5 text-white'
                        : 'border-white/10 bg-black/20 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`shrink-0 ${isSelected ? 'text-spotify-green' : 'text-slate-500'}`}>
                        {isSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold">{addon.name}</div>
                        <div className="text-[11px] text-slate-400">{addon.description}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <span className="text-xs sm:text-sm font-bold text-spotify-green">
                        +${addonPrice}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {model === 'one-time' ? 'once' : '/mo'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estimate Summary Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Estimated Investment</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white">
                  ${calculateTotal()}
                </span>
                <span className="text-xs text-slate-400">
                  {model === 'one-time' ? 'total one-time' : '/ month managed'}
                </span>
              </div>
            </div>

            <button
              onClick={handleTelegramInquiry}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-spotify-green hover:bg-spotify-green-light text-black font-extrabold text-sm transition-all shadow-glow-green hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Discuss Quote on Telegram</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
