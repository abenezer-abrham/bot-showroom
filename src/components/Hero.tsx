import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Smartphone } from 'lucide-react';
import { CurrencyCode } from '../types/showroom';

interface HeroProps {
  currency: CurrencyCode;
  onExplorePackages: () => void;
  onOpenDemo: (demoFlowId: string) => void;
  onOpenOrderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currency,
  onExplorePackages,
  onOpenDemo,
  onOpenOrderModal,
}) => {
  const starterPrice = currency === 'ETB' ? '3,000 ETB' : '$25';
  const standardPrice = currency === 'ETB' ? '4,000 ETB' : '$35';
  const fullPrice = currency === 'ETB' ? '7,000 ETB' : '$60';

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Subtle status tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>Turnkey Telegram Business Bots</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Launch in 24–48 Hours</span>
          </div>

          {/* Clean bold headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
            Automate Your Menu, Orders &amp; Bookings on Telegram
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Give customers an instant interactive storefront inside Telegram. Display menus, capture orders directly to your phone, or automate appointment scheduling.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onExplorePackages}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Explore 3 Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onOpenDemo('standard-flow')}
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>Test Interactive Demo</span>
            </button>
          </div>

          {/* 3 Package Quick Reference Badges */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
            <div
              onClick={onExplorePackages}
              className="p-3.5 rounded-xl bg-[#11141d] border border-white/10 cursor-pointer hover:border-white/20 transition-all"
            >
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Starter</div>
              <div className="text-base font-bold text-white mt-0.5">{starterPrice}</div>
              <div className="text-xs text-slate-400 mt-1 line-clamp-1">Menu, prices, hours, location &amp; contact</div>
            </div>

            <div
              onClick={onExplorePackages}
              className="p-3.5 rounded-xl bg-[#111718] border border-emerald-500/30 cursor-pointer hover:border-emerald-500/50 transition-all relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Standard</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">Popular</span>
              </div>
              <div className="text-base font-bold text-white mt-0.5">{standardPrice}</div>
              <div className="text-xs text-slate-300 mt-1 line-clamp-1">Takes orders + phone dispatch</div>
            </div>

            <div
              onClick={onExplorePackages}
              className="p-3.5 rounded-xl bg-[#11141d] border border-white/10 cursor-pointer hover:border-white/20 transition-all"
            >
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Suite</div>
              <div className="text-base font-bold text-white mt-0.5">{fullPrice}</div>
              <div className="text-xs text-slate-400 mt-1 line-clamp-1">Bookings, reminders &amp; sales reports</div>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Setup &amp; Delivery</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero Server Maintenance</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>24/7 Live Availability</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
