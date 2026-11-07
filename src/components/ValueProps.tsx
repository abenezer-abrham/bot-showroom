import React from 'react';
import { DollarSign, Shield, Cpu, RefreshCw, Key, Headphones } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const cards = [
    {
      icon: <Key className="w-6 h-6 text-spotify-green" />,
      title: 'Full Source Code & No Vendor Lock-in',
      description: 'With One-Time Buyouts, you own 100% of the repository. Deploy to your own VPS, modify the Python code freely, or rebrand for your agency clients.',
      badge: 'Lifetime Buyout'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-cyan-400" />,
      title: 'Zero-Maintenance Cloud Servicing',
      description: 'Prefer not to touch Linux servers, Docker, or SSL certs? Choose our Monthly Managed Servicing. We maintain 99.9% uptime, backup databases, and handle all updates.',
      badge: 'Managed Servicing'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-amber-400" />,
      title: 'Direct Monetization Built-In',
      description: 'Ready-to-use checkout flows with Telegram Stars (native in-app microtransactions), Crypto (USDT, TON, BTC), and Stripe cards for global payments.',
      badge: 'Revenue Ready'
    },
    {
      icon: <Headphones className="w-6 h-6 text-purple-400" />,
      title: 'Direct Telegram Priority Support',
      description: 'No ticket queues. Work directly with Abenezer Abrham for onboarding, bot token setup, webhook debugging, or custom feature expansion.',
      badge: 'Direct Engineering'
    }
  ];

  return (
    <section className="py-20 bg-[#0e1017] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-spotify-green font-bold mb-3">
            Why BotMatrix
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for Creators, Community Owners &amp; Tech Agencies
          </p>
          <p className="mt-4 text-base text-slate-400">
            Compare how our dual-model deals give you the maximum flexibility: buy once and keep forever, or let us host and manage it every month.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                  {card.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-spotify-green transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
