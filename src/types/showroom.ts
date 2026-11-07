export type PricingModel = 'one-time' | 'monthly';
export type CurrencyCode = 'ETB' | 'USD';

export interface BotSimulatorStep {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  buttons?: { label: string; action: string; url?: string }[];
  time?: string;
}

export interface BotDemoFlow {
  tierId: 'starter' | 'standard' | 'full';
  tierName: string;
  badge: string;
  botUsername: string;
  initialMessages: BotSimulatorStep[];
  responses: Record<string, BotSimulatorStep[]>;
}

export interface PackageTier {
  id: 'starter' | 'standard' | 'full';
  name: string;
  subtitle: string;
  priceETB: number;
  priceUSD: number;
  badge?: string;
  popular?: boolean;
  coreFeature: string;
  features: string[];
  deliverables: string[];
  demoFlowId: string;
  ctaText: string;
}
