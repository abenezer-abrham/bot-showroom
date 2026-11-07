import React from 'react';
import { BotItem, PricingModel } from '../types/showroom';
import { Play, Check, Send, Sparkles, Layers, Terminal } from 'lucide-react';

interface BotCardProps {
  bot: BotItem;
  pricingModel: PricingModel;
  onOpenDemo: (demoFlowId: string) => void;
  onOrderBot: (bot: BotItem, model: PricingModel) => void;
}

export const BotCard: React.FC<BotCardProps> = ({
  bot,
  pricingModel,
  onOpenDemo,
  onOrderBot,
}) => {
  const price = pricingModel === 'one-time' ? bot.oneTimePrice : bot.monthlyPrice;
  const billingLabel = pricingModel === 'one-time' ? 'one-time buyout' : '/ mo managed';

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group border border-white/10 hover:border-spotify-green/40">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
            {bot.categoryLabel}
          </span>
          {bot.badge && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-spotify-green/15 text-spotify-green border border-spotify-green/30">
              {bot.badge}
            </span>
          )}
        </div>

        {/* Name & Tagline */}
        <h3 className="text-2xl font-black text-white group-hover:text-spotify-green transition-colors">
          {bot.name}
        </h3>
        <p className="text-xs font-medium text-spotify-green-light mt-1">
          {bot.tagline}
        </p>

        <p className="text-sm text-slate-400 mt-3 line-clamp-3 leading-relaxed">
          {bot.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {bot.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Key Features List */}
        <div className="mt-5 space-y-2 border-t border-white/5 pt-4">
          {bot.features.slice(0, 4).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <Check className="w-3.5 h-3.5 text-spotify-green shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-5 grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-black/30 border border-white/5 text-center">
          {bot.stats.map((st, idx) => (
            <div key={idx}>
              <div className="text-xs font-black text-white">{st.value}</div>
              <div className="text-[10px] text-slate-400">{st.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing & CTAs */}
      <div className="mt-6 pt-5 border-t border-white/10">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="text-xs text-slate-400">
              {pricingModel === 'one-time' ? 'Lifetime Ownership' : 'Fully Managed Servicing'}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-white">${price}</span>
              <span className="text-xs text-slate-400">{billingLabel}</span>
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-400">
            {pricingModel === 'one-time' ? (
              <span className="text-emerald-400 font-semibold">Includes Source Code</span>
            ) : (
              <span className="text-cyan-400 font-semibold">Includes 24/7 Hosting</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onOpenDemo(bot.demoFlowId)}
            className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 hover:border-spotify-green/40 transition-all flex items-center justify-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 text-spotify-green fill-spotify-green" />
            <span>Test Demo</span>
          </button>

          <button
            onClick={() => onOrderBot(bot, pricingModel)}
            className="py-2.5 px-3 rounded-xl bg-spotify-green hover:bg-spotify-green-light text-black font-bold text-xs transition-all shadow-glow-green/30 hover:scale-[1.02] flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Order Bot</span>
          </button>
        </div>
      </div>
    </div>
  );
};
