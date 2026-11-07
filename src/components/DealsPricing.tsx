import React, { useState } from 'react';
import { Check, Zap, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { DEAL_PACKAGES } from '../config/showroom';
import { PricingModel } from '../types/showroom';

interface DealsPricingProps {
  onSelectDeal: (dealName: string, model: PricingModel, price: number) => void;
}

export const DealsPricing: React.FC<DealsPricingProps> = ({ onSelectDeal }) => {
  const [pricingModel, setPricingModel] = useState<PricingModel>('one-time');

  return (
    <section id="deals" className="py-24 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-spotify-green/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-spotify-green/10 text-spotify-green text-xs font-semibold uppercase tracking-wider mb-3 border border-spotify-green/20">
            <Sparkles className="w-3.5 h-3.5" />
            Spotify-Style Transparent Deals
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Choose Your Ownership Model
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Pick between one-time full source code buyout or zero-maintenance monthly managed cloud hosting. Switch or cancel anytime.
          </p>

          {/* Pricing Model Switcher Toggle (Spotify-style) */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-[#161922] border border-white/10 shadow-inner">
            <button
              onClick={() => setPricingModel('one-time')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                pricingModel === 'one-time'
                  ? 'bg-spotify-green text-black shadow-glow-green'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>💎 One-Time Buyout</span>
              <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-black/20 text-black">
                Own Forever
              </span>
            </button>
            <button
              onClick={() => setPricingModel('monthly')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                pricingModel === 'monthly'
                  ? 'bg-spotify-green text-black shadow-glow-green'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>☁️ Monthly Servicing</span>
              <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-black/20 text-black">
                Managed 24/7
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {DEAL_PACKAGES.map((deal) => {
            const isPopular = deal.popular;
            const currentPrice = pricingModel === 'one-time' ? deal.oneTimePrice : deal.monthlyPrice;
            const billingLabel = pricingModel === 'one-time' ? 'one-time payment' : '/ month billed monthly';

            return (
              <div
                key={deal.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#18231d] to-[#11161d] border-2 border-spotify-green shadow-glow-green/40 lg:-translate-y-2'
                    : 'glass-card border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Floating Top Badge */}
                {deal.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-md bg-spotify-green text-black border border-spotify-green-light">
                    {deal.badge}
                  </div>
                )}

                <div>
                  {/* Title & Subtitle */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black text-white">{deal.name}</h3>
                    {deal.savingsBadge && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {deal.savingsBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mb-6 min-h-[40px] leading-relaxed">
                    {deal.subtitle}
                  </p>

                  {/* Price Block */}
                  <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-white/5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                        ${currentPrice}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {billingLabel}
                      </span>
                    </div>
                    <div className="text-xs text-spotify-green mt-1 font-medium">
                      {pricingModel === 'one-time'
                        ? '✓ 100% Full Source Code & Lifetime License'
                        : '✓ 24/7 Cloud Hosting & Zero Server Setup'}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      What is included:
                    </div>
                    {deal.highlights.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="p-0.5 rounded-full bg-spotify-green/20 text-spotify-green mt-0.5 shrink-0">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <span className="text-sm text-slate-300 leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <button
                  onClick={() => onSelectDeal(deal.name, pricingModel, currentPrice)}
                  className={`w-full py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                    isPopular
                      ? 'bg-spotify-green text-black hover:bg-spotify-green-light shadow-glow-green hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/10 hover:border-spotify-green/40 hover:scale-[1.02]'
                  }`}
                >
                  <span>{deal.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner below pricing */}
        <div className="mt-12 max-w-3xl mx-auto p-4 rounded-2xl bg-[#11141c] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">60-Day Bug-Free Warranty &amp; Upgrade Credit</div>
              <div className="text-xs text-slate-400">
                Switch from monthly to one-time buyout anytime with 20% of prior monthly fees credited.
              </div>
            </div>
          </div>
          <a
            href="#compare"
            className="text-xs font-semibold text-spotify-green hover:underline whitespace-nowrap"
          >
            See Full Comparison Matrix &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
