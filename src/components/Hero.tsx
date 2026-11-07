import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Code2, Cloud } from 'lucide-react';
import { SITE_CONFIG } from '../config/showroom';

interface HeroProps {
  onOpenOrderModal: (title?: string) => void;
  onExploreCatalog: () => void;
  onOpenSimulator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenOrderModal,
  onExploreCatalog,
  onOpenSimulator,
}) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden hero-glow">
      {/* Background ambient gradient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-spotify-green/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Deal Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-300 mb-8 backdrop-blur-md hover:border-spotify-green/40 transition-colors">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spotify-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-spotify-green"></span>
          </span>
          <span className="font-semibold text-white">2026 Showroom Deals:</span>
          <span className="text-spotify-green font-medium">One-Time Buyout &amp; Managed Monthly Plans</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
          Turnkey <span className="text-transparent bg-clip-text bg-gradient-to-r from-spotify-green via-emerald-400 to-cyan-400">Telegram Bots</span> That Scale Revenue &amp; Automate 24/7
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Own full Python source code with lifetime commercial rights, or choose zero-maintenance monthly managed cloud hosting with 99.9% uptime SLA. Built by{' '}
          <strong className="text-white">{SITE_CONFIG.developerName}</strong>.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
          <button
            onClick={onExploreCatalog}
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-black bg-spotify-green rounded-full hover:bg-spotify-green-light transition-all duration-300 shadow-glow-green hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
          >
            <span>Explore Bot Catalog</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenSimulator}
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-200 bg-white/5 border border-white/10 hover:border-spotify-green/50 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-5 h-5 text-spotify-green group-hover:rotate-12 transition-transform" />
            <span>Try Live Telegram Demo</span>
          </button>

          <button
            onClick={() => onOpenOrderModal('Bespoke Custom Bot')}
            className="w-full sm:w-auto px-6 py-4 text-base font-medium text-slate-400 hover:text-white transition-colors"
          >
            Request Custom Build &rarr;
          </button>
        </div>

        {/* Value Highlights Pill Row */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-spotify-green/10 text-spotify-green border border-spotify-green/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">100% Code Ownership</div>
              <div className="text-xs text-slate-400">Full Python 3.12 Repo</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">&lt; 100ms Latency</div>
              <div className="text-xs text-slate-400">High-speed Async Webhooks</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">99.9% Uptime SLA</div>
              <div className="text-xs text-slate-400">Managed Cloud Servicing</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">60-Day Warranty</div>
              <div className="text-xs text-slate-400">Free Bug Fixes &amp; Updates</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
