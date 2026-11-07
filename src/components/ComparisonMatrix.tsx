import React from 'react';
import { COMPARISON_ROWS } from '../config/showroom';
import { Check, X } from 'lucide-react';
import { CurrencyCode } from '../types/showroom';

interface ComparisonMatrixProps {
  currency: CurrencyCode;
  onSelectPackage: (packageId: 'starter' | 'standard' | 'full') => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  currency,
  onSelectPackage,
}) => {
  const starterPrice = currency === 'ETB' ? '3,000 ETB' : '$25';
  const standardPrice = currency === 'ETB' ? '4,000 ETB' : '$35';
  const fullPrice = currency === 'ETB' ? '7,000 ETB' : '$60';

  return (
    <section id="comparison" className="py-20 sm:py-28 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Detailed Comparison
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Compare What You Get
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            A line-by-line feature breakdown for Starter, Standard, and Full Suite packages.
          </p>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0e1119] shadow-xl">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-white/10 bg-[#141724]">
                <th className="py-4 px-5 text-xs font-bold text-slate-300 w-2/5">
                  Package Capability
                </th>
                <th className="py-4 px-4 text-xs font-bold text-white text-center w-1/5">
                  <div>Starter</div>
                  <div className="text-emerald-400 text-[11px] font-normal">{starterPrice}</div>
                </th>
                <th className="py-4 px-4 text-xs font-bold text-white text-center w-1/5 bg-emerald-500/5 border-x border-emerald-500/20">
                  <div className="text-emerald-400">Standard</div>
                  <div className="text-white text-[11px] font-normal">{standardPrice}</div>
                </th>
                <th className="py-4 px-4 text-xs font-bold text-white text-center w-1/5">
                  <div>Full Suite</div>
                  <div className="text-emerald-400 text-[11px] font-normal">{fullPrice}</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-slate-300">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="font-medium text-white">{row.feature}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{row.detail}</div>
                  </td>

                  {/* Starter */}
                  <td className="py-3.5 px-4 text-center">
                    {row.starter ? (
                      <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-slate-600 mx-auto" />
                    )}
                  </td>

                  {/* Standard */}
                  <td className="py-3.5 px-4 text-center bg-emerald-500/5 border-x border-emerald-500/20">
                    {row.standard ? (
                      <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-slate-600 mx-auto" />
                    )}
                  </td>

                  {/* Full */}
                  <td className="py-3.5 px-4 text-center">
                    {row.full ? (
                      <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-slate-600 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-white/10 bg-[#121520]">
                <td className="py-4 px-5 text-xs text-slate-400 font-medium">
                  Instant order via Telegram
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => onSelectPackage('starter')}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                  >
                    Select Starter
                  </button>
                </td>
                <td className="py-4 px-4 text-center bg-emerald-500/5 border-x border-emerald-500/20">
                  <button
                    type="button"
                    onClick={() => onSelectPackage('standard')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black font-semibold text-xs transition-colors"
                  >
                    Select Standard
                  </button>
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => onSelectPackage('full')}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                  >
                    Select Full
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};
