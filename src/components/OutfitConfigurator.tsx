import React, { useState } from 'react';
import { SHOP_PRESETS, ShopPreset, ShopService } from '../../shop.config';
import {
  Sparkles,
  Smartphone,
  Copy,
  Check,
  ExternalLink,
  Store,
  Scissors,
  Coffee,
  HeartHandshake,
  ShoppingBag,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  ChevronRight,
  RotateCcw,
  Zap,
  Globe,
  Sliders
} from 'lucide-react';

export function OutfitConfigurator() {
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>('barbershop');
  const activePreset = SHOP_PRESETS[selectedPresetKey] || SHOP_PRESETS.barbershop;

  // Customizer state
  const [shopName, setShopName] = useState(activePreset.shopName);
  const [shopNameAm, setShopNameAm] = useState(activePreset.shopNameAm);
  const [tagline, setTagline] = useState(activePreset.tagline);
  const [phone, setPhone] = useState('+251 90 421 6852');
  const [telebirrPhone, setTelebirrPhone] = useState('+251 96 366 1680');
  const [telebirrName, setTelebirrName] = useState('ADDIS RETAIL');
  const [botToken, setBotToken] = useState('7812938472:AAHq_EXAMPLE_TOKEN_xyz');
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [copiedWebhook, setCopiedWebhook] = useState(false);

  // Interactive Telegram simulator state
  const [simLang, setSimLang] = useState<'en' | 'am'>('en');
  const [simStep, setSimStep] = useState<'home' | 'catalog' | 'hours' | 'human' | 'book_svc' | 'book_staff' | 'book_date' | 'book_time' | 'book_confirm' | 'book_done'>('home');
  const [chosenService, setChosenService] = useState<ShopService | null>(null);
  const [chosenStaff, setChosenStaff] = useState<string>('First Available');
  const [chosenDate, setChosenDate] = useState<string>('Today');
  const [chosenTime, setChosenTime] = useState<string>('02:00 PM');
  const [chosenPayment, setChosenPayment] = useState<'cash' | 'telebirr'>('cash');

  const handleSelectPreset = (key: string) => {
    setSelectedPresetKey(key);
    const p = SHOP_PRESETS[key];
    if (p) {
      setShopName(p.shopName);
      setShopNameAm(p.shopNameAm);
      setTagline(p.tagline);
      setSimStep('home');
      setChosenService(null);
    }
  };

  const generateEnvString = () => {
    return `# --- Universal Vercel Telegram Shop Bot Config ---
SHOP_NICHE=${selectedPresetKey}
SHOP_NAME="${shopName}"
SHOP_NAME_AM="${shopNameAm}"
SHOP_TAGLINE="${tagline}"
SHOP_PHONE="${phone}"
SHOP_LOCATION="Bole Road, Near Edna Mall, Addis Ababa"
TELEBIRR_PHONE="${telebirrPhone}"
TELEBIRR_NAME="${telebirrName}"
BOT_TOKEN="${botToken}"
ADMIN_IDS="123456789"
SHOP_CURRENCY="ETB"
`;
  };

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(generateEnvString());
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2500);
  };

  const handleCopyWebhookUrl = () => {
    const sample = `https://your-shop-bot.vercel.app/api/set-webhook?token=${botToken}`;
    navigator.clipboard.writeText(sample);
    setCopiedWebhook(true);
    setTimeout(() => setCopiedWebhook(false), 2500);
  };

  const resetSimulator = () => {
    setSimStep('home');
    setChosenService(null);
  };

  const isAm = simLang === 'am';

  return (
    <section id="outfit-studio" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Glow decorative backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-r from-amber-600/10 via-emerald-600/10 to-amber-700/10 blur-[130px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-4 h-4 text-amber-400" />
          The Universal Bot Outfit • 1-Click Vercel Architecture
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          One Outfit. <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent">Any Shop Niche.</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed">
          Switch from a classic barbershop to a specialty roastery, boutique, or spa in seconds.
          Pre-built with <strong>humane, photographic aesthetics</strong>, bilingual Ethiopian & international localization, and zero-cold-start Vercel serverless webhooks.
        </p>
      </div>

      {/* Niche Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {[
          { key: 'barbershop', label: 'Barbershop & Grooming', icon: Scissors, badge: 'Popular' },
          { key: 'coffee', label: 'Specialty Coffee & Roastery', icon: Coffee, badge: 'Artisanal' },
          { key: 'spa', label: 'Wellness & Luxury Spa', icon: HeartHandshake, badge: 'Premium' },
          { key: 'boutique', label: 'Artisan Boutique & Goods', icon: ShoppingBag, badge: 'Lifestyle' },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = selectedPresetKey === item.key;
          return (
            <button
              key={item.key}
              onClick={() => handleSelectPreset(item.key)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-neutral-800 text-white border-2 border-amber-500/70 shadow-lg shadow-amber-500/10 scale-105'
                  : 'bg-neutral-900/80 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-neutral-500'}`} />
              <span>{item.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                isActive ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'bg-neutral-800 text-neutral-500'
              }`}>
                {item.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Live Customizer & Aesthetic Profile (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Aesthetic Showcase Card: Profile Pic & Welcome Banner */}
          <div className="bg-neutral-900/90 border border-neutral-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Visual Identity & Aesthetic Assets</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                Authentic 35mm Photography • Zero AI Glitch
              </span>
            </div>

            {/* Banner & PFP Preview */}
            <div className="relative rounded-xl overflow-hidden border border-neutral-800 group">
              <img
                src={activePreset.welcomeBanner}
                alt={`${activePreset.shopName} Welcome Banner`}
                className="w-full h-48 sm:h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              
              {/* Profile Avatar Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={activePreset.profilePic}
                      alt={`${activePreset.shopName} Avatar`}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-amber-500/80 shadow-2xl object-cover bg-neutral-900"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-neutral-950" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                      {shopName}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300 line-clamp-1">
                      {tagline}
                    </p>
                    <span className="inline-block mt-1 text-[11px] font-mono text-amber-400/90 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/30">
                      Niche: {activePreset.niche}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs text-neutral-400 flex items-center gap-1.5">
              <span className="text-amber-400">✨</span>
              Crafted with warm natural daylight, real organic wood, textured linen, and humane tones.
            </p>
          </div>

          {/* Quick Customizer Fields */}
          <div className="bg-neutral-900/90 border border-neutral-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Turnkey Parameters (Change For Any Shop)</h3>
              </div>
              <span className="text-xs text-neutral-400">Updates Simulator & Vercel Env</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Shop Name (English)
                </label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Shop Name (Amharic / ቋንቋ)
                </label>
                <input
                  type="text"
                  value={shopNameAm}
                  onChange={(e) => setShopNameAm(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Warm Tagline / Greeting
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Contact Phone (Calls / Support)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Telebirr Account (Phone & Name)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={telebirrPhone}
                    onChange={(e) => setTelebirrPhone(e.target.value)}
                    className="w-2/3 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                  />
                  <input
                    type="text"
                    value={telebirrName}
                    onChange={(e) => setTelebirrName(e.target.value)}
                    className="w-1/3 bg-neutral-950 border border-neutral-800 rounded-lg px-2 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors text-center font-mono"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Telegram Bot Token (from @BotFather)
                </label>
                <input
                  type="text"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  placeholder="e.g. 7812938472:AAHq_EXAMPLE_TOKEN_xyz"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-amber-300 focus:outline-none focus:border-amber-500 transition-colors font-mono text-xs"
                />
              </div>
            </div>

            {/* Active Services Preview */}
            <div className="mt-4 pt-3 border-t border-neutral-800">
              <span className="block text-xs font-medium text-neutral-400 mb-2">
                Included Turnkey Services ({activePreset.services.length} items):
              </span>
              <div className="flex flex-wrap gap-2">
                {activePreset.services.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-xs text-neutral-300"
                  >
                    <span>{s.emoji}</span>
                    <span>{s.name}</span>
                    <strong className="text-amber-400">{s.price} ETB</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Vercel 1-Click Deployment Card */}
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Deploy to Vercel in 60 Seconds</h3>
              </div>
              <span className="text-[11px] font-mono bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold">
                Serverless • Zero VPS Bills
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Vercel runs the Telegram Bot completely serverless via <code className="text-amber-300 bg-neutral-900 px-1 py-0.5 rounded font-mono">/api/webhook</code>. No server crashes, no Docker setups, and instantaneous sub-50ms responses.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleCopyEnv}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-md active:scale-95"
              >
                {copiedEnv ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
                {copiedEnv ? 'Copied Vercel Environment Variables!' : 'Copy Vercel .env Preset'}
              </button>

              <button
                onClick={handleCopyWebhookUrl}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 text-white font-medium text-xs hover:bg-neutral-700 transition-all border border-neutral-700"
              >
                {copiedWebhook ? <Check className="w-4 h-4 text-emerald-400" /> : <ExternalLink className="w-4 h-4" />}
                {copiedWebhook ? 'Copied Webhook URL!' : 'Copy Webhook Activation URL'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Telegram Phone Simulator (5 cols) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
            
            {/* Phone Header Toolbar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 text-xs">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">Live Telegram Bot Sandbox</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Language toggle inside sandbox */}
                <button
                  onClick={() => setSimLang(simLang === 'en' ? 'am' : 'en')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 font-medium text-[11px] transition-colors"
                  title="Toggle Language"
                >
                  <Globe className="w-3 h-3 text-amber-400" />
                  {simLang === 'en' ? 'አማርኛ' : 'English'}
                </button>
                <button
                  onClick={resetSimulator}
                  className="p-1 rounded-full bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                  title="Restart Bot (/start)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Telegram App Frame */}
            <div className="bg-[#17212b] rounded-2xl overflow-hidden border border-neutral-800 shadow-inner flex flex-col h-[580px]">
              
              {/* Telegram Top App Bar */}
              <div className="bg-[#242f3d] px-4 py-2.5 flex items-center justify-between border-b border-neutral-800/80">
                <div className="flex items-center gap-2.5">
                  <img
                    src={activePreset.profilePic}
                    alt="Bot Avatar"
                    className="w-8 h-8 rounded-full object-cover border border-amber-500/50"
                  />
                  <div>
                    <div className="text-white font-semibold text-xs leading-none flex items-center gap-1.5">
                      {shopName}
                      <span className="text-[9px] bg-sky-500/20 text-sky-400 px-1 py-0.2 rounded font-normal">bot</span>
                    </div>
                    <div className="text-[10px] text-emerald-400 leading-none mt-1">online</div>
                  </div>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">v1.0 serverless</span>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs text-white">
                
                {/* Simulated Welcome Message with Banner Image */}
                <div className="bg-[#182533] rounded-2xl overflow-hidden border border-neutral-800 max-w-[94%] shadow-md">
                  <img
                    src={activePreset.welcomeBanner}
                    alt="Welcome Banner"
                    className="w-full h-32 object-cover object-center"
                  />
                  <div className="p-3 space-y-2">
                    <p className="font-semibold text-amber-200">
                      🌿 {isAm ? `እንኳን ወደ ${shopNameAm} በደህና መጡ!` : `Welcome to ${shopName}!`}
                    </p>
                    <p className="text-neutral-300 text-[11px] italic">
                      {isAm ? activePreset.taglineAm : tagline}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 pt-1 border-t border-neutral-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{isAm ? activePreset.operatingHoursAm : activePreset.operatingHours}</span>
                    </div>
                  </div>
                </div>

                {/* Step Content: Home Menu */}
                {simStep === 'home' && (
                  <div className="space-y-1.5">
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => setSimStep('book_svc')}
                        className="bg-[#2b5278] hover:bg-[#346290] text-white font-medium py-2 px-2.5 rounded-xl text-center text-[11px] transition-colors"
                      >
                        📅 {isAm ? 'ቀጠሮ ይያዙ' : 'Book Appointment'}
                      </button>
                      <button
                        onClick={() => setSimStep('catalog')}
                        className="bg-[#2b5278] hover:bg-[#346290] text-white font-medium py-2 px-2.5 rounded-xl text-center text-[11px] transition-colors"
                      >
                        🏷️ {isAm ? 'አገልግሎቶችና ዋጋ' : 'Services & Menu'}
                      </button>
                      <button
                        onClick={() => setSimStep('hours')}
                        className="bg-[#242f3d] hover:bg-[#2c394a] text-neutral-200 font-medium py-2 px-2.5 rounded-xl text-center text-[11px] transition-colors"
                      >
                        📍 {isAm ? 'አድራሻና ሰዓት' : 'Location & Hours'}
                      </button>
                      <button
                        onClick={() => setSimStep('human')}
                        className="bg-[#242f3d] hover:bg-[#2c394a] text-neutral-200 font-medium py-2 px-2.5 rounded-xl text-center text-[11px] transition-colors"
                      >
                        💬 {isAm ? 'ከባለሙያ ጋር' : 'Talk to Staff'}
                      </button>
                    </div>
                    <button
                      onClick={() => setSimLang(simLang === 'en' ? 'am' : 'en')}
                      className="w-full bg-[#1e2a38] text-neutral-300 py-1.5 rounded-xl text-center text-[10px] hover:text-white"
                    >
                      🌐 {isAm ? 'Switch to English' : 'ወደ አማርኛ ቀይር'}
                    </button>
                  </div>
                )}

                {/* Step Content: Catalog Menu */}
                {simStep === 'catalog' && (
                  <div className="bg-[#182533] rounded-2xl p-3 space-y-2 border border-neutral-800">
                    <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800">
                      <span className="font-semibold text-amber-300">
                        🏷️ {isAm ? 'የአገልግሎቶች ዝርዝር' : 'Services & Pricing'}
                      </span>
                      <button
                        onClick={() => setSimStep('home')}
                        className="text-[10px] text-neutral-400 hover:text-white"
                      >
                        ✕ Close
                      </button>
                    </div>
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {activePreset.services.map((s) => (
                        <div key={s.id} className="p-2 rounded-lg bg-[#242f3d]/60 text-[11px]">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-white">{s.emoji} {isAm ? s.nameAm : s.name}</span>
                            <span className="font-bold text-amber-400">{s.price} ETB</span>
                          </div>
                          <p className="text-[10px] text-neutral-400 mt-0.5">{isAm ? s.descriptionAm : s.description}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setSimStep('book_svc')}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-1.5 rounded-xl text-center text-[11px] mt-2"
                    >
                      📅 {isAm ? 'አሁን ቀጠሮ ይያዙ' : 'Book a Service Now'}
                    </button>
                  </div>
                )}

                {/* Step Content: Booking Step 1 (Choose Service) */}
                {simStep === 'book_svc' && (
                  <div className="bg-[#182533] rounded-2xl p-3 space-y-2 border border-neutral-800">
                    <p className="font-medium text-amber-300 text-[11px]">
                      ✂️ {isAm ? 'ደረጃ 1/4: የሚፈልጉትን አገልግሎት ይምረጡ' : 'Step 1/4: Choose a Service'}
                    </p>
                    <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                      {activePreset.services.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setChosenService(s);
                            setSimStep('book_staff');
                          }}
                          className="w-full text-left p-2 rounded-xl bg-[#242f3d] hover:bg-[#2b5278] flex items-center justify-between text-[11px] transition-colors"
                        >
                          <span className="font-medium text-white">{s.emoji} {isAm ? s.nameAm : s.name}</span>
                          <span className="text-amber-400 font-bold">{s.price} ETB</span>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setSimStep('home')}
                      className="text-[10px] text-neutral-400 hover:text-white w-full text-center py-1"
                    >
                      ⬅️ {isAm ? 'ወደ ዋና ማውጫ' : 'Back to Menu'}
                    </button>
                  </div>
                )}

                {/* Step Content: Booking Step 2 (Choose Staff) */}
                {simStep === 'book_staff' && (
                  <div className="bg-[#182533] rounded-2xl p-3 space-y-2 border border-neutral-800">
                    <p className="font-medium text-amber-300 text-[11px]">
                      👤 {isAm ? 'ደረጃ 2/4: ባለሙያ ይምረጡ' : 'Step 2/4: Select Your Specialist'}
                    </p>
                    <div className="space-y-1.5">
                      {activePreset.staff.map((st) => (
                        <button
                          key={st.id}
                          onClick={() => {
                            setChosenStaff(st.name);
                            setSimStep('book_date');
                          }}
                          className="w-full text-left p-2 rounded-xl bg-[#242f3d] hover:bg-[#2b5278] text-[11px] transition-colors"
                        >
                          <div className="font-medium text-white">{st.name}</div>
                          <div className="text-[10px] text-neutral-400">{isAm ? st.titleAm : st.title}</div>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setSimStep('book_svc')}
                      className="text-[10px] text-neutral-400 hover:text-white w-full text-center py-1"
                    >
                      ⬅️ {isAm ? 'አገልግሎት ቀይር' : 'Change Service'}
                    </button>
                  </div>
                )}

                {/* Step Content: Booking Step 3 (Choose Date) */}
                {simStep === 'book_date' && (
                  <div className="bg-[#182533] rounded-2xl p-3 space-y-2 border border-neutral-800">
                    <p className="font-medium text-amber-300 text-[11px]">
                      📅 {isAm ? 'ደረጃ 3/4: የቀጠሮ ቀን ይምረጡ' : 'Step 3/4: Pick Appointment Date'}
                    </p>
                    <div className="space-y-1.5">
                      {['Today (ዛሬ)', 'Tomorrow (ነገ)', 'Day After Tomorrow'].map((d) => (
                        <button
                          key={d}
                          onClick={() => {
                            setChosenDate(d);
                            setSimStep('book_time');
                          }}
                          className="w-full text-left p-2 rounded-xl bg-[#242f3d] hover:bg-[#2b5278] text-[11px] transition-colors font-medium text-white"
                        >
                          📅 {d}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setSimStep('book_staff')}
                      className="text-[10px] text-neutral-400 hover:text-white w-full text-center py-1"
                    >
                      ⬅️ {isAm ? 'ባለሙያ ቀይር' : 'Change Specialist'}
                    </button>
                  </div>
                )}

                {/* Step Content: Booking Step 4 (Choose Time Slot) */}
                {simStep === 'book_time' && (
                  <div className="bg-[#182533] rounded-2xl p-3 space-y-2 border border-neutral-800">
                    <p className="font-medium text-amber-300 text-[11px]">
                      ⏰ {isAm ? 'ደረጃ 4/4: ሰዓት ይምረጡ' : 'Step 4/4: Choose Time Slot'}
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '05:30 PM'].map((slot) => (
                        <button
                          key={slot}
                          onClick={() => {
                            setChosenTime(slot);
                            setSimStep('book_confirm');
                          }}
                          className="p-2 rounded-xl bg-[#242f3d] hover:bg-[#2b5278] text-center text-[11px] font-mono text-white transition-colors"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setSimStep('book_date')}
                      className="text-[10px] text-neutral-400 hover:text-white w-full text-center py-1"
                    >
                      ⬅️ {isAm ? 'ቀን ቀይር' : 'Change Date'}
                    </button>
                  </div>
                )}

                {/* Step Content: Confirm & Payment */}
                {simStep === 'book_confirm' && (
                  <div className="bg-[#182533] rounded-2xl p-3 space-y-2.5 border border-neutral-800">
                    <div className="font-semibold text-amber-300 text-xs">
                      ✨ {isAm ? 'የቀጠሮ ማረጋገጫና ክፍያ' : 'Review & Confirm'}
                    </div>
                    <div className="p-2 rounded-xl bg-[#242f3d] text-[11px] space-y-1">
                      <div>• {isAm ? 'አገልግሎት' : 'Service'}: <strong>{chosenService?.name || 'Selected Item'}</strong></div>
                      <div>• {isAm ? 'ባለሙያ' : 'Specialist'}: <strong>{chosenStaff}</strong></div>
                      <div>• {isAm ? 'ጊዜ' : 'Schedule'}: <strong>{chosenDate} @ {chosenTime}</strong></div>
                      <div className="text-amber-400 font-bold">• {isAm ? 'ዋጋ' : 'Total'}: {chosenService?.price || 350} ETB</div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <button
                        onClick={() => {
                          setChosenPayment('cash');
                          setSimStep('book_done');
                        }}
                        className="w-full p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-[11px] font-medium transition-colors text-left flex items-center justify-between"
                      >
                        <span>💵 {isAm ? 'በቦታው በካሽ መክፈል' : 'Pay Cash at Shop'}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                      </button>
                      <button
                        onClick={() => {
                          setChosenPayment('telebirr');
                          setSimStep('book_done');
                        }}
                        className="w-full p-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-[11px] font-medium transition-colors text-left flex items-center justify-between"
                      >
                        <span>📱 {isAm ? 'በቴሌብር ይክፈሉ' : 'Pay via Telebirr Transfer'}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-200" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step Content: Done / Ticket */}
                {simStep === 'book_done' && (
                  <div className="bg-[#182533] rounded-2xl p-3.5 space-y-3 border border-emerald-500/50 shadow-lg">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <Check className="w-4 h-4" />
                      <span>{isAm ? 'ቀጠሮዎ በተሳካ ሁኔታ ተመዝግቧል!' : 'Reservation Confirmed!'}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#242f3d] font-mono text-[11px] space-y-1 text-neutral-200">
                      <div>Ticket: <span className="text-amber-300 font-bold">#YH-8492</span></div>
                      <div>Service: {chosenService?.name || 'Item'}</div>
                      <div>Specialist: {chosenStaff}</div>
                      <div>When: {chosenDate} @ {chosenTime}</div>
                      <div>Payment: {chosenPayment === 'cash' ? 'Cash at Shop' : 'Telebirr Pending Verification'}</div>
                    </div>

                    {chosenPayment === 'telebirr' && (
                      <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-800/40 text-[10px] text-amber-300">
                        📱 Send transfer to <strong>{telebirrPhone}</strong> ({telebirrName}) and paste reference.
                      </div>
                    )}

                    <div className="pt-1 flex gap-2">
                      <button
                        onClick={resetSimulator}
                        className="flex-1 bg-[#2b5278] hover:bg-[#346290] text-white py-1.5 rounded-xl text-center text-[10px]"
                      >
                        ⬅️ Main Menu
                      </button>
                    </div>
                  </div>
                )}

                {/* Step Content: Location & Hours */}
                {simStep === 'hours' && (
                  <div className="bg-[#182533] rounded-2xl p-3 space-y-2 border border-neutral-800 text-[11px]">
                    <div className="font-semibold text-amber-300">📍 {isAm ? 'አድራሻና የስራ ሰዓት' : 'Location & Hours'}</div>
                    <p className="text-neutral-300">
                      • {isAm ? 'አድራሻ' : 'Address'}: Bole Road, Near Edna Mall, Addis Ababa<br />
                      • {isAm ? 'የስራ ሰዓት' : 'Hours'}: {isAm ? activePreset.operatingHoursAm : activePreset.operatingHours}<br />
                      • {isAm ? 'ስልክ' : 'Phone'}: {phone}
                    </p>
                    <button
                      onClick={() => setSimStep('home')}
                      className="w-full bg-[#242f3d] py-1.5 rounded-xl text-center text-[10px] text-neutral-300 hover:text-white"
                    >
                      ⬅️ {isAm ? 'ተመለስ' : 'Back'}
                    </button>
                  </div>
                )}

                {/* Step Content: Human Contact */}
                {simStep === 'human' && (
                  <div className="bg-[#182533] rounded-2xl p-3 space-y-2 border border-neutral-800 text-[11px]">
                    <div className="font-semibold text-amber-300">💬 {isAm ? 'ከባለሙያ ጋር ይገናኙ' : 'Talk with Staff'}</div>
                    <p className="text-neutral-300 text-[11px]">
                      {isAm
                        ? 'የሱቃችንን ሰራተኞች በቀጥታ በስልክ ወይም በቴሌግራም ለማግኘት:'
                        : 'To speak directly with our in-shop concierge:'}
                    </p>
                    <div className="p-2 rounded-xl bg-[#242f3d] font-mono text-[11px] text-amber-300">
                      📞 Phone: {phone}
                    </div>
                    <button
                      onClick={() => setSimStep('home')}
                      className="w-full bg-[#242f3d] py-1.5 rounded-xl text-center text-[10px] text-neutral-300 hover:text-white"
                    >
                      ⬅️ {isAm ? 'ተመለስ' : 'Back'}
                    </button>
                  </div>
                )}
              </div>

              {/* Telegram Bottom Input Bar */}
              <div className="bg-[#242f3d] px-3.5 py-2.5 flex items-center justify-between border-t border-neutral-800/80">
                <span className="text-[11px] text-neutral-400 italic">
                  Tap buttons above to interact...
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
                  ⚡ 10ms
                </span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <span className="text-[11px] text-neutral-500">
                Live interactive emulation of <code className="text-neutral-400">/api/webhook.ts</code>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
