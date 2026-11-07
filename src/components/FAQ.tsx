import React, { useState } from 'react';
import { FAQ_ITEMS, SITE_CONFIG } from '../config/showroom';
import { ChevronDown, HelpCircle, Send } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#0a0b0f] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-spotify-green/10 text-spotify-green text-xs font-bold uppercase tracking-wider mb-3 border border-spotify-green/20">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Got Questions? We Have Answers.
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Everything you need to know about code ownership, cloud hosting, and payment guarantees.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#12151f] border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-white/[0.02]"
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {item.q}
                  </span>
                  <div
                    className={`p-1.5 rounded-full bg-white/5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-spotify-green bg-spotify-green/10' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 text-center p-8 rounded-3xl bg-gradient-to-r from-spotify-green/10 via-[#12151f] to-cyan-500/10 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-2">Have a custom question or architecture inquiry?</h3>
          <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
            Abenezer Abrham is available directly on Telegram to consult on your system requirements.
          </p>
          <a
            href={SITE_CONFIG.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-spotify-green text-black font-bold text-sm hover:bg-spotify-green-light transition-all shadow-glow-green"
          >
            <Send className="w-4 h-4" />
            <span>Message @{SITE_CONFIG.telegramUsername} on Telegram</span>
          </a>
        </div>
      </div>
    </section>
  );
};
