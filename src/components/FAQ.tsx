import React, { useState } from 'react';
import { FAQ_ITEMS, SITE_CONFIG } from '../config/showroom';
import { ChevronDown, Send, ArrowUpRight } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 border-t border-white/5 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Common Inquiries
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Answers regarding package features, setup timeframes, and phone dispatching.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#10131c] border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-white/[0.02]"
                >
                  <span className="font-semibold text-xs sm:text-sm text-white">
                    {item.q}
                  </span>
                  <div
                    className={`p-1 rounded-md bg-white/5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-400 bg-emerald-500/10' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact direct callout */}
        <div className="mt-10 text-center p-6 rounded-2xl bg-[#11141d] border border-white/10">
          <h3 className="text-sm sm:text-base font-bold text-white mb-1">
            Have a custom requirement or question?
          </h3>
          <p className="text-xs text-slate-400 mb-4 max-w-md mx-auto">
            Contact developer Abenezer Abrham directly on Telegram for immediate response.
          </p>
          <a
            href={SITE_CONFIG.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black font-semibold text-xs transition-colors"
          >
            <span>Message @{SITE_CONFIG.telegramUsername} on Telegram</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
