import React from 'react';
import { Send, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/showroom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07080c] border-t border-white/10 pt-12 pb-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#161a24] border border-white/15 flex items-center justify-center">
                <svg
                  className="w-3.5 h-3.5 text-emerald-400"
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
              <span className="text-base font-bold text-white">
                Yene<span className="text-emerald-400">.</span>suk
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-3">
              Professional Telegram business bots: Menus, order taking with direct phone dispatch, and appointment scheduling.
            </p>
            <div className="text-slate-400">
              Developed by <strong className="text-white">{SITE_CONFIG.developerName}</strong>
            </div>
          </div>

          {/* Packages */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-3">
              Packages
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Starter (3,000 ETB)
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Standard (4,000 ETB)
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Full Suite (7,000 ETB)
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-white transition-colors">
                  Full Feature Matrix
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-3">
              Direct Contact
            </h4>
            <div className="space-y-2">
              <a
                href={SITE_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <span>Telegram: @{SITE_CONFIG.telegramUsername}</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={SITE_CONFIG.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <span>GitHub: @abenezer-abrham</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </div>
          <div>
            Telegram Bot API • Fast Webhook Delivery • 24/7 Hosting
          </div>
        </div>
      </div>
    </footer>
  );
};
