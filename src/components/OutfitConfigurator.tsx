import React, { useState } from 'react';
import {
  Store, Scissors, Coffee, HeartHandshake, ShoppingBag,
  Utensils, Dumbbell, Truck, ChevronRight, Send,
  CheckCircle, Sparkles, Clock, Phone, MapPin, User
} from 'lucide-react';

const NICHES = [
  { id: 'barbershop', label: 'Barbershop & Grooming', icon: Scissors },
  { id: 'coffee', label: 'Specialty Coffee & Café', icon: Coffee },
  { id: 'spa', label: 'Spa & Wellness', icon: HeartHandshake },
  { id: 'boutique', label: 'Boutique & Fashion', icon: ShoppingBag },
  { id: 'restaurant', label: 'Restaurant & Food', icon: Utensils },
  { id: 'gym', label: 'Gym & Fitness', icon: Dumbbell },
  { id: 'delivery', label: 'Delivery & Logistics', icon: Truck },
  { id: 'other', label: 'Other / Custom', icon: Store },
];

const FEATURES = [
  { id: 'booking', label: 'Appointment / Booking Flow' },
  { id: 'catalog', label: 'Menu / Product Catalog' },
  { id: 'payments', label: 'Telebirr & Cash Payments' },
  { id: 'admin', label: 'Admin Notifications & Panel' },
  { id: 'bilingual', label: 'Bilingual (English & Amharic)' },
  { id: 'location', label: 'Location & Hours Info' },
  { id: 'reviews', label: 'Customer Reviews & Feedback' },
  { id: 'broadcasts', label: 'Promo Broadcast Messages' },
];

interface FormData {
  businessName: string;
  niche: string;
  phone: string;
  location: string;
  extraDetails: string;
  features: string[];
  hasBotToken: 'yes' | 'no' | '';
}

export function OutfitConfigurator() {
  const [step, setStep] = useState<'form' | 'sent'>('form');
  const [form, setForm] = useState<FormData>({
    businessName: '',
    niche: '',
    phone: '',
    location: '',
    extraDetails: '',
    features: [],
    hasBotToken: '',
  });

  const toggleFeature = (id: string) => {
    setForm(f => ({
      ...f,
      features: f.features.includes(id)
        ? f.features.filter(x => x !== id)
        : [...f.features, id],
    }));
  };

  const isValid = form.businessName.trim() && form.niche && form.phone.trim();

  const buildTelegramMessage = () => {
    const nicheLabel = NICHES.find(n => n.id === form.niche)?.label || form.niche;
    const featureList = form.features.length
      ? form.features.map(f => FEATURES.find(x => x.id === f)?.label || f).join(', ')
      : 'Standard setup';

    const msg = `🌿 *New Bot Outfit Request*

🏪 *Business Name:* ${form.businessName}
🎯 *Niche / Type:* ${nicheLabel}
📞 *Contact Phone:* ${form.phone}
📍 *Location:* ${form.location || 'Not specified'}
✅ *Requested Features:* ${featureList}
🔑 *Already has Bot Token:* ${form.hasBotToken === 'yes' ? 'Yes ✅' : 'No — needs setup'}
📝 *Extra Details:* ${form.extraDetails || 'None'}`;

    return encodeURIComponent(msg);
  };

  const handleSend = () => {
    const msg = buildTelegramMessage();
    // Open Telegram DM to Abenezer with the prefilled message
    window.open(`https://t.me/abenezer_abrham?text=${msg}`, '_blank');
    setStep('sent');
  };

  if (step === 'sent') {
    return (
      <section id="outfit-studio" className="relative py-20 px-4 max-w-3xl mx-auto text-center">
        <div className="bg-neutral-900/90 border border-emerald-500/30 rounded-3xl p-10 shadow-2xl">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">Request Sent!</h3>
          <p className="text-neutral-400 mb-6">
            Your order details were prefilled in Telegram. Once you hit <strong className="text-white">Send</strong> in the chat,
            Abenezer will receive everything and get back to you within a few hours to set up your customized bot.
          </p>
          <div className="bg-neutral-950 rounded-2xl p-4 text-left space-y-2 text-sm text-neutral-300 mb-6 border border-neutral-800">
            <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2">What happens next</div>
            <div className="flex items-start gap-2"><span className="text-amber-400 font-bold">1.</span> Abenezer reviews your request & confirms details</div>
            <div className="flex items-start gap-2"><span className="text-amber-400 font-bold">2.</span> Bot is configured & deployed to Vercel (usually same day)</div>
            <div className="flex items-start gap-2"><span className="text-amber-400 font-bold">3.</span> You receive your live bot link, ready to share with customers</div>
          </div>
          <button
            onClick={() => setStep('form')}
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            ← Submit another request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="outfit-studio" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-2/3 h-80 bg-amber-600/8 blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          The Outfit — Custom Bot Order
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Tell me about your shop.{' '}
          <span className="bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
            I'll build your bot.
          </span>
        </h2>
        <p className="mt-3 text-neutral-400 text-base leading-relaxed">
          Fill in the details below — it takes 2 minutes. Your info goes straight to Abenezer on Telegram,
          who will set up and deploy your fully customized bot, usually the same day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Form — 3 cols */}
        <div className="lg:col-span-3 space-y-6">

          {/* Business name & phone */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" /> Basic Info
            </h4>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Business Name *</label>
              <input
                type="text"
                placeholder="e.g. Miliana Barbershop"
                value={form.businessName}
                onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  <Phone className="w-3 h-3 inline mr-1" />Contact Phone *
                </label>
                <input
                  type="text"
                  placeholder="+251 90 ..."
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  <MapPin className="w-3 h-3 inline mr-1" />Location (optional)
                </label>
                <input
                  type="text"
                  placeholder="Bole, Addis Ababa"
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Niche selector */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Store className="w-4 h-4 text-amber-400" /> Type of Business *
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {NICHES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setForm(f => ({ ...f, niche: id }))}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all text-center ${
                    form.niche === id
                      ? 'border-amber-500/70 bg-amber-500/10 text-amber-300 scale-105'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${form.niche === id ? 'text-amber-400' : 'text-neutral-500'}`} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Features You Want (pick all that apply)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FEATURES.map(f => (
                <button
                  key={f.id}
                  onClick={() => toggleFeature(f.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all text-left ${
                    form.features.includes(f.id)
                      ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded flex-shrink-0 border flex items-center justify-center ${
                    form.features.includes(f.id) ? 'bg-emerald-500 border-emerald-500' : 'border-neutral-600'
                  }`}>
                    {form.features.includes(f.id) && <span className="text-black text-[10px] font-bold leading-none">✓</span>}
                  </span>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bot token question & extra notes */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-semibold text-white">Do you already have a Telegram Bot Token?</h4>
            <div className="flex gap-3">
              {(['yes', 'no'] as const).map(opt => (
                <button
                  key={opt}
                  onClick={() => setForm(f => ({ ...f, hasBotToken: opt }))}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    form.hasBotToken === opt
                      ? 'border-amber-500/60 bg-amber-500/10 text-amber-300'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                  }`}
                >
                  {opt === 'yes' ? '✅ Yes, I have one' : '❌ No, need help'}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Any extra details / special requests</label>
              <textarea
                rows={3}
                placeholder="e.g. I want it in Amharic only, 3 staff members, special services list..."
                value={form.extraDetails}
                onChange={e => setForm(f => ({ ...f, extraDetails: e.target.value }))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSend}
            disabled={!isValid}
            className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              isValid
                ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-lg shadow-amber-500/20 active:scale-98'
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            Send Request to Abenezer on Telegram
            <ChevronRight className="w-4 h-4" />
          </button>
          {!isValid && (
            <p className="text-center text-xs text-neutral-500">Fill in business name, type, and phone to continue</p>
          )}
        </div>

        {/* Right side — How it works */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> How it works
            </h4>
            <div className="space-y-4">
              {[
                { step: '1', title: 'You fill this form', desc: 'Takes 2 minutes. Name, type, phone, features you want.' },
                { step: '2', title: 'Sent to Abenezer', desc: 'All details go directly via Telegram. No forms, no emails.' },
                { step: '3', title: 'Bot gets built', desc: 'Fully customized to your shop. Same-day deployment in most cases.' },
                { step: '4', title: 'You receive a live link', desc: 'Share it with your customers. The bot handles everything 24/7.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {step}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{title}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What's included */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-white mb-3">Every bot includes</h4>
            <div className="space-y-2">
              {[
                'Realistic, people-free shop banner & profile badge',
                'Warm bilingual English & Amharic interface',
                'Telebirr + Cash payment flow',
                'Admin alerts for every booking/order',
                'Vercel deployment (no monthly server bills)',
                '1 round of revisions after delivery',
              ].map(item => (
                <div key={item} className="flex items-start gap-2 text-xs text-neutral-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Direct contact */}
          <a
            href="https://t.me/abenezer_abrham"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-neutral-950 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-all group"
          >
            <div className="w-9 h-9 rounded-full bg-sky-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">@abenezer_abrham</div>
              <div className="text-xs text-neutral-400">Prefer to message directly? Go ahead</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
