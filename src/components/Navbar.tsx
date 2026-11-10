import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/showroom';
import { CurrencyCode } from '../types/showroom';

interface NavbarProps {
  currency: CurrencyCode;
  onToggleCurrency: (c: CurrencyCode) => void;
  onOpenOrderModal: (packageName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onToggleCurrency,
  onOpenOrderModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#090a0f]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with clean circle star emblem */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-9 h-9 rounded-full bg-[#161a24] border border-white/15 flex items-center justify-center transition-colors group-hover:border-emerald-500/60">
              <svg
                className="w-4 h-4 text-emerald-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="9" strokeWidth="1.6" opacity="0.8" />
                <line x1="12" y1="5.5" x2="12" y2="18.5" />
                <line x1="6.37" y1="8.75" x2="17.63" y2="15.25" />
                <line x1="6.37" y1="15.25" x2="17.63" y2="8.75" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Yene<span className="text-emerald-400">.</span>suk
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                  Telegram Bots
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#outfit-studio" className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Universal Outfit
            </a>
            <a href="#packages" className="hover:text-white transition-colors">
              Packages &amp; Pricing
            </a>
            <a href="#simulator" className="hover:text-white transition-colors">
              Live Demo
            </a>
            <a href="#comparison" className="hover:text-white transition-colors">
              Feature Matrix
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Currency Selector */}
            <div className="flex items-center p-0.5 rounded-lg bg-[#141722] border border-white/10 text-xs font-semibold">
              <button
                type="button"
                onClick={() => onToggleCurrency('ETB')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  currency === 'ETB'
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ETB
              </button>
              <button
                type="button"
                onClick={() => onToggleCurrency('USD')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  currency === 'USD'
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                USD
              </button>
            </div>

            <a
              href={SITE_CONFIG.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Telegram Support</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
            </a>

            <button
              type="button"
              onClick={() => onOpenOrderModal()}
              className="px-4 py-2 text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
            >
              Order Bot
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex md:hidden items-center gap-2.5">
            {/* Currency toggle for mobile */}
            <div className="flex items-center p-0.5 rounded bg-[#141722] border border-white/10 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => onToggleCurrency('ETB')}
                className={`px-2 py-0.5 rounded ${
                  currency === 'ETB' ? 'bg-white/20 text-white font-bold' : 'text-slate-400'
                }`}
              >
                ETB
              </button>
              <button
                type="button"
                onClick={() => onToggleCurrency('USD')}
                className={`px-2 py-0.5 rounded ${
                  currency === 'USD' ? 'bg-white/20 text-white font-bold' : 'text-slate-400'
                }`}
              >
                USD
              </button>
            </div>

            <button
              type="button"
              onClick={() => onOpenOrderModal()}
              className="px-3 py-1.5 text-xs font-semibold text-black bg-emerald-400 rounded-md"
            >
              Order
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0e14] border-b border-white/10 px-4 pt-3 pb-6 space-y-2">
          <a
            href="#outfit-studio"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-sm font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg"
          >
            🌿 Universal Bot Outfit (Vercel)
          </a>
          <a
            href="#packages"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5 rounded-lg"
          >
            Packages &amp; Pricing
          </a>
          <a
            href="#simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5 rounded-lg"
          >
            Interactive Demo
          </a>
          <a
            href="#comparison"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5 rounded-lg"
          >
            Feature Matrix
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5 rounded-lg"
          >
            Frequently Asked Questions
          </a>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href={SITE_CONFIG.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-200"
            >
              <span>Contact via Telegram (@{SITE_CONFIG.telegramUsername})</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
