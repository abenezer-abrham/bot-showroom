import React, { useState, useMemo } from 'react';
import { BOT_CATALOG } from '../config/showroom';
import { BotItem, BotCategory, PricingModel } from '../types/showroom';
import { BotCard } from './BotCard';
import { Search, Filter, Sparkles } from 'lucide-react';

interface ShowroomProps {
  onOpenDemo: (demoFlowId: string) => void;
  onOrderBot: (bot: BotItem, model: PricingModel) => void;
}

export const Showroom: React.FC<ShowroomProps> = ({
  onOpenDemo,
  onOrderBot,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BotCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [pricingModel, setPricingModel] = useState<PricingModel>('one-time');

  const categories: { id: BotCategory; label: string }[] = [
    { id: 'all', label: 'All Bots' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'subscription', label: 'VIP Communities' },
    { id: 'ai', label: 'AI & Customer Care' },
    { id: 'crypto', label: 'Crypto & Signals' },
    { id: 'automation', label: 'Automation & Lead Gen' },
  ];

  const filteredBots = useMemo(() => {
    return BOT_CATALOG.filter((bot) => {
      const matchesCategory =
        selectedCategory === 'all' || bot.category === selectedCategory;
      const matchesQuery =
        bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bot.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bot.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        bot.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="showroom" className="py-24 bg-[#0a0b0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-spotify-green/10 text-spotify-green text-xs font-bold uppercase tracking-wider mb-2 border border-spotify-green/20">
              <Sparkles className="w-3 h-3" />
              Verified Bot Catalog
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Bot Showroom
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Inspect production-ready Telegram bots built in Python 3.12. Filter by category, test the live simulator, or order instant setup.
            </p>
          </div>

          {/* Pricing Toggle inside showroom */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#14161f] border border-white/10 shrink-0">
            <button
              onClick={() => setPricingModel('one-time')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                pricingModel === 'one-time'
                  ? 'bg-spotify-green text-black shadow-glow-green/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              One-Time Buyout
            </button>
            <button
              onClick={() => setPricingModel('monthly')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                pricingModel === 'monthly'
                  ? 'bg-spotify-green text-black shadow-glow-green/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Servicing
            </button>
          </div>
        </div>

        {/* Controls Bar: Categories & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 pb-6 border-b border-white/10">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black shadow-md'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bots or features..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-[#141620] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-spotify-green transition-colors"
            />
          </div>
        </div>

        {/* Bots Grid */}
        {filteredBots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBots.map((bot) => (
              <BotCard
                key={bot.id}
                bot={bot}
                pricingModel={pricingModel}
                onOpenDemo={onOpenDemo}
                onOrderBot={onOrderBot}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 max-w-xl mx-auto">
            <p className="text-lg font-bold text-white mb-2">No bots match your search</p>
            <p className="text-sm text-slate-400 mb-6">
              Need a specialized custom bot built from scratch?
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-spotify-green text-black font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
