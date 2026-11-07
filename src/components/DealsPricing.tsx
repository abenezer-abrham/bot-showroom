import React from 'react';
import { Check, ArrowRight, Smartphone, ShieldCheck } from 'lucide-react';
import { PACKAGES } from '../config/showroom';
import { CurrencyCode, PackageTier } from '../types/showroom';

interface DealsPricingProps {
  currency: CurrencyCode;
  selectedPackageId: string;
  onSelectPackage: (pkg: PackageTier) => void;
  onLaunchDemo: (demoFlowId: string) => void;
}

export const DealsPricing: React.FC<DealsPricingProps> = ({
  currency,
  selectedPackageId,
  onSelectPackage,
  onLaunchDemo,
}) => {
  return (
    <section id="packages" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Transparent Pricing
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Choose Your Telegram Bot Package
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            One-time setup with 24/7 cloud availability. Select the package matching your business needs.
          </p>
        </div>

        {/* Pricing Cards Grid - Mobile Friendly Single Col, Desktop 3 Col */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto">
          {PACKAGES.map((pkg) => {
            const isPopular = pkg.popular;
            const isSelected = selectedPackageId === pkg.id;
            const price = currency === 'ETB' ? `${pkg.priceETB.toLocaleString()} ETB` : `$${pkg.priceUSD}`;

            return (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative ${
                  isPopular
                    ? 'bg-[#10151c] border-2 border-emerald-500/50 shadow-lg lg:-translate-y-1'
                    : 'bg-[#10131b] border border-white/10 hover:border-white/20'
                } ${isSelected ? 'ring-2 ring-emerald-400' : ''}`}
              >
                {/* Popular Pill Badge */}
                {pkg.badge && (
                  <div
                    className={`absolute -top-3 left-6 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm ${
                      isPopular
                        ? 'bg-emerald-400 text-black'
                        : 'bg-[#1a1f2b] text-slate-300 border border-white/10'
                    }`}
                  >
                    {pkg.badge}
                  </div>
                )}

                <div>
                  {/* Title & Subtitle */}
                  <div className="mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{pkg.name}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mb-6 min-h-[36px] leading-relaxed">
                    {pkg.subtitle}
                  </p>

                  {/* Price Banner */}
                  <div className="mb-6 p-4 rounded-xl bg-black/40 border border-white/5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {price}
                      </span>
                      <span className="text-xs text-slate-400 font-normal">
                        one-time setup
                      </span>
                    </div>
                    {/* Exact user requirement callout */}
                    <div className="mt-2.5 pt-2.5 border-t border-white/5 text-xs text-emerald-400 font-medium leading-relaxed">
                      Core: {pkg.coreFeature}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-8">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Included Capabilities:
                    </div>
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-300 leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="space-y-2.5 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-emerald-400 text-black hover:bg-emerald-300'
                        : 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onLaunchDemo(pkg.demoFlowId)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Test {pkg.name} Demo</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 max-w-3xl mx-auto p-4 rounded-xl bg-[#11141c] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-white">Full Onboarding &amp; Setup Included</div>
              <div className="text-slate-400">
                Menu upload, store details, and testing completed before final delivery.
              </div>
            </div>
          </div>
          <a
            href="#comparison"
            className="text-emerald-400 hover:underline font-medium whitespace-nowrap"
          >
            Compare All Features &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
