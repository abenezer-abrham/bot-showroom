import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValueProps } from './components/ValueProps';
import { Showroom } from './components/Showroom';
import { TelegramSimulator } from './components/TelegramSimulator';
import { DealsPricing } from './components/DealsPricing';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { CustomQuoteCalculator } from './components/CustomQuoteCalculator';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { BotItem, PricingModel } from './types/showroom';
import { BOT_CATALOG } from './config/showroom';

export function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Pro Operator Bundle');
  const [modalModel, setModalModel] = useState<PricingModel>('one-time');
  const [modalPrice, setModalPrice] = useState<number>(299);
  const [activeDemoFlowId, setActiveDemoFlowId] = useState<string>('shop-bot-flow');

  const handleOpenOrderModal = (
    title = 'Pro Operator Bundle',
    model: PricingModel = 'one-time',
    price = 299
  ) => {
    setModalTitle(title);
    setModalModel(model);
    setModalPrice(price);
    setModalOpen(true);
  };

  const handleSelectDeal = (
    dealName: string,
    model: PricingModel,
    price: number
  ) => {
    handleOpenOrderModal(dealName, model, price);
  };

  const handleOrderBot = (bot: BotItem, model: PricingModel) => {
    const price = model === 'one-time' ? bot.oneTimePrice : bot.monthlyPrice;
    handleOpenOrderModal(`${bot.name} (${bot.categoryLabel})`, model, price);
  };

  const handleOpenDemo = (demoFlowId: string) => {
    setActiveDemoFlowId(demoFlowId);
    const element = document.getElementById('simulator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderBotById = (botId: string) => {
    const bot = BOT_CATALOG.find((b) => b.id === botId);
    if (bot) {
      handleOrderBot(bot, 'one-time');
    } else {
      handleOpenOrderModal('Telegram Bot Order', 'one-time', 149);
    }
  };

  const handleExploreCatalog = () => {
    const element = document.getElementById('showroom');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSimulator = () => {
    const element = document.getElementById('simulator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-slate-100 flex flex-col font-sans selection:bg-spotify-green selection:text-black">
      {/* Top Navigation */}
      <Navbar onOpenOrderModal={() => handleOpenOrderModal('Direct Telegram Order')} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section (Spotify-Inspired) */}
        <Hero
          onOpenOrderModal={() => handleOpenOrderModal('Bespoke Telegram Bot')}
          onExploreCatalog={handleExploreCatalog}
          onOpenSimulator={handleOpenSimulator}
        />

        {/* 2. Core Value Grid (Code Ownership vs Managed Cloud Servicing) */}
        <ValueProps />

        {/* 3. The Interactive Bot Showroom (Categorized Catalog) */}
        <Showroom
          onOpenDemo={handleOpenDemo}
          onOrderBot={handleOrderBot}
        />

        {/* 4. Live Interactive Telegram Sandbox Simulator */}
        <TelegramSimulator
          initialFlowId={activeDemoFlowId}
          onOrderBotById={handleOrderBotById}
        />

        {/* 5. Spotify Deals & Pricing Matrix */}
        <DealsPricing onSelectDeal={handleSelectDeal} />

        {/* 6. Feature Delivery Comparison Matrix */}
        <ComparisonMatrix />

        {/* 7. Interactive Custom Quote Estimator */}
        <CustomQuoteCalculator />

        {/* 8. Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Checkout & Inquiry Modal */}
      <CheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialItemTitle={modalTitle}
        initialModel={modalModel}
        initialPrice={modalPrice}
      />
    </div>
  );
}

export default App;
