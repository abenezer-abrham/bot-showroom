import React from 'react';
import { COMPARISON_FEATURES } from '../config/showroom';
import { Check, Sparkles, HelpCircle } from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  return (
    <section id="compare" className="py-24 bg-[#0d0f16] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-spotify-green/10 text-spotify-green text-xs font-bold uppercase tracking-wider mb-3 border border-spotify-green/20">
            <Sparkles className="w-3.5 h-3.5" />
            Clear Transparency
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Compare The Delivery Models
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Whether you want total independence with full source code or zero server headache with 24/7 managed hosting, see exactly what each option provides.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#12151f]/80 backdrop-blur-md shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#161a26]">
                <th className="py-6 px-6 text-sm font-bold text-slate-300 min-w-[240px]">
                  Feature / Capability
                </th>
                <th className="py-6 px-6 text-sm font-bold text-white min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <span>One-Time Buyout</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-spotify-green/20 text-spotify-green">
                      Code
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-normal mt-1">Full source code ownership</div>
                </th>
                <th className="py-6 px-6 text-sm font-bold text-white min-w-[200px] bg-spotify-green/5 border-x border-spotify-green/20">
                  <div className="flex items-center gap-2">
                    <span className="text-spotify-green">Monthly Managed</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-spotify-green text-black">
                      Popular
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-normal mt-1">Zero server maintenance</div>
                </th>
                <th className="py-6 px-6 text-sm font-bold text-white min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <span>Custom Bespoke</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">
                      Bespoke
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-normal mt-1">Engineered to spec</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-slate-300">
              {COMPARISON_FEATURES.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 px-6 font-medium text-white flex items-center gap-2">
                    <span>{item.feature}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-200">{item.oneTime}</span>
                  </td>
                  <td className="py-4 px-6 bg-spotify-green/5 border-x border-spotify-green/20">
                    <span className="font-semibold text-spotify-green flex items-center gap-1.5">
                      <Check className="w-4 h-4 shrink-0" />
                      {item.monthly}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-200">{item.custom}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
