import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DealsPricing } from './components/DealsPricing';
import { TelegramSimulator } from './components/TelegramSimulator';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { OutfitConfigurator } from './components/OutfitConfigurator';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CurrencyCode, PackageTier } from './types/showroom';
import { PACKAGES, SITE_CONFIG } from './config/showroom';
import { Send } from 'lucide-react';

export function App() {
  // Read initial query params from URL
  const getInitialParam = (key: string, fallback: string) => {
    if (typeof window === 'undefined') return fallback;
    const params = new URLSearchParams(window.location.search);
    return params.get(key) || fallback;
  };

  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    const p = getInitialParam('currency', 'ETB');
    return p === 'USD' ? 'USD' : 'ETB';
  });

  const [selectedPackageId, setSelectedPackageId] = useState<string>(() => {
    return getInitialParam('plan', 'standard');
  });

  const [activeDemoFlowId, setActiveDemoFlowId] = useState<string>(() => {
    return getInitialParam('demo', 'standard-flow');
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalPackageId, setModalPackageId] = useState<string>('standard');

  // Sync state changes to URL search params for shareability and persistence
  const syncUrlParams = useCallback(
    (cur: CurrencyCode, plan: string, demo: string) => {
      if (typeof window === 'undefined') return;
      const url = new URL(window.location.href);
      url.searchParams.set('currency', cur);
      url.searchParams.set('plan', plan);
      url.searchParams.set('demo', demo);
      window.history.replaceState({}, '', url.toString());
    },
    []
  );

  useEffect(() => {
    syncUrlParams(currency, selectedPackageId, activeDemoFlowId);
  }, [currency, selectedPackageId, activeDemoFlowId, syncUrlParams]);

  const handleToggleCurrency = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
  };

  const handleSelectPackage = (pkg: PackageTier) => {
    setSelectedPackageId(pkg.id);
    setModalPackageId(pkg.id);
    setModalOpen(true);
  };

  const handleSelectPackageFromComparison = (packageId: 'starter' | 'standard' | 'full') => {
    setSelectedPackageId(packageId);
    setModalPackageId(packageId);
    setModalOpen(true);
  };

  const handleLaunchDemo = (demoFlowId: string) => {
    setActiveDemoFlowId(demoFlowId);
    const element = document.getElementById('simulator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenOrderModal = (packageId?: string) => {
    if (packageId) {
      setModalPackageId(packageId);
    } else {
      setModalPackageId(selectedPackageId);
    }
    setModalOpen(true);
  };

  const handleExplorePackages = () => {
    const element = document.getElementById('packages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-sans selection:bg-emerald-400 selection:text-black">
        {/* Navigation Bar */}
        <Navbar
          currency={currency}
          onToggleCurrency={handleToggleCurrency}
          onOpenOrderModal={() => handleOpenOrderModal(selectedPackageId)}
        />

        {/* Main Content */}
        <main className="flex-1 pb-16 sm:pb-0">
          {/* 1. Hero */}
          <Hero
            currency={currency}
            onExplorePackages={handleExplorePackages}
            onOpenDemo={handleLaunchDemo}
            onOpenOrderModal={() => handleOpenOrderModal(selectedPackageId)}
          />

          {/* 2. Universal Telegram Bot Outfit Studio */}
          <OutfitConfigurator />

          {/* 3. Packages & Pricing (Starter 3,000, Standard 4,000, Full 7,000) */}
          <DealsPricing
            currency={currency}
            selectedPackageId={selectedPackageId}
            onSelectPackage={handleSelectPackage}
            onLaunchDemo={handleLaunchDemo}
          />

          {/* 3. Interactive Telegram Simulator */}
          <TelegramSimulator
            activeDemoFlowId={activeDemoFlowId}
            onSelectFlow={(flowId) => setActiveDemoFlowId(flowId)}
            onOrderPackage={(pkgId) => handleOpenOrderModal(pkgId)}
          />

          {/* 4. Feature Comparison Matrix */}
          <ComparisonMatrix
            currency={currency}
            onSelectPackage={handleSelectPackageFromComparison}
          />

          {/* 5. FAQ */}
          <FAQ />
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile Sticky Quick Order Action Bar */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0e14]/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="text-xs">
            <span className="text-slate-400">Packages from </span>
            <span className="font-bold text-emerald-400">
              {currency === 'ETB' ? '3,000 ETB' : '$25'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleOpenOrderModal(selectedPackageId)}
            className="px-4 py-2 text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Order Bot</span>
          </button>
        </div>

        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialPackageId={modalPackageId}
          currency={currency}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
