import React, { useState, useEffect } from 'react';
import { Send, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/showroom';

interface NavbarProps {
  onOpenOrderModal: (title?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0b0e]/90 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-spotify-green to-cyan-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-glow-green/30">
              <div className="w-full h-full bg-[#0a0b0e] rounded-full flex items-center justify-center">
                {/* Hand-drawn styled star in circle emblem matching the sketch */}
                <svg
                  className="w-5 h-5 text-spotify-green transition-transform duration-500 group-hover:rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="9.5" strokeWidth="1.5" stroke="currentColor" opacity="0.8" />
                  <line x1="12" y1="5.5" x2="12" y2="18.5" />
                  <line x1="6.37" y1="8.75" x2="17.63" y2="15.25" />
                  <line x1="6.37" y1="15.25" x2="17.63" y2="8.75" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white group-hover:text-spotify-green transition-colors font-sans">
                  Yene<span className="text-spotify-green">.</span>suk
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-spotify-green/10 text-spotify-green border border-spotify-green/20">
                  SHOWROOM
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium">by {SITE_CONFIG.developerName}</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#showroom" className="hover:text-spotify-green transition-colors">
              Bot Showroom
            </a>
            <a href="#simulator" className="hover:text-spotify-green transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-spotify-green animate-pulse" />
              Live Demo
            </a>
            <a href="#deals" className="hover:text-spotify-green transition-colors">
              Deals & Pricing
            </a>
            <a href="#compare" className="hover:text-spotify-green transition-colors">
              Comparison
            </a>
            <a href="#calculator" className="hover:text-spotify-green transition-colors">
              Quote Builder
            </a>
            <a href="#faq" className="hover:text-spotify-green transition-colors">
              FAQ
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={SITE_CONFIG.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:text-white hover:border-slate-500 transition-all flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              Telegram Online
            </a>
            <button
              onClick={() => onOpenOrderModal('Custom Telegram Bot Inquiry')}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-black bg-spotify-green rounded-full hover:bg-spotify-green-light transition-all duration-300 shadow-glow-green hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4 mr-2" />
              Order Bot Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => onOpenOrderModal('Quick Bot Order')}
              className="px-3 py-1.5 text-xs font-bold text-black bg-spotify-green rounded-full"
            >
              Order
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0e14] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#showroom"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:bg-white/5 rounded-lg"
          >
            Bot Showroom
          </a>
          <a
            href="#simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-spotify-green hover:bg-white/5 rounded-lg flex items-center justify-between"
          >
            <span>Live Interactive Demo</span>
            <Sparkles className="w-4 h-4" />
          </a>
          <a
            href="#deals"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:bg-white/5 rounded-lg"
          >
            Deals & Pricing
          </a>
          <a
            href="#compare"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:bg-white/5 rounded-lg"
          >
            Comparison Matrix
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:bg-white/5 rounded-lg"
          >
            Custom Quote Builder
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:bg-white/5 rounded-lg"
          >
            FAQ
          </a>
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <a
              href={SITE_CONFIG.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800 text-sm font-semibold text-slate-200"
            >
              <Send className="w-4 h-4 text-spotify-green" />
              Chat on Telegram (@{SITE_CONFIG.telegramUsername})
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full py-3 rounded-lg bg-spotify-green text-black font-bold text-center"
            >
              Order Bot Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
