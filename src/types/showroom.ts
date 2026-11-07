export type PricingModel = 'one-time' | 'monthly';

export type BotCategory = 'all' | 'ecommerce' | 'subscription' | 'ai' | 'crypto' | 'automation';

export interface BotSimulatorStep {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  buttons?: { label: string; action: string; url?: string }[];
  time?: string;
}

export interface BotDemoFlow {
  botId: string;
  botName: string;
  botUsername: string;
  avatarText: string;
  initialMessages: BotSimulatorStep[];
  responses: Record<string, BotSimulatorStep[]>;
}

export interface BotItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: BotCategory;
  categoryLabel: string;
  badge?: string;
  badgeColor?: 'green' | 'cyan' | 'purple' | 'amber';
  oneTimePrice: number;
  monthlyPrice: number;
  popular?: boolean;
  features: string[];
  techStack: string[];
  deliverables: string[];
  demoFlowId: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface DealPackage {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  monthlyPrice: number;
  oneTimePrice: number;
  billingTerm: string;
  description: string;
  highlights: string[];
  ctaText: string;
  popular?: boolean;
  savingsBadge?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  comment: string;
  stars: number;
}
