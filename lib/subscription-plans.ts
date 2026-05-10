export type SubscriptionPlanId = 'essentiel' | 'signature' | 'prestige';
export type SubscriptionFrequency = 'weekly' | 'biweekly' | 'monthly';

export interface SubscriptionPlan {
  id: SubscriptionPlanId;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  prices: Record<SubscriptionFrequency, number>;
  dailyCost: number;
  popular?: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    tagline: 'Le rituel simple et élégant',
    description: 'Imaginez rentrer chez vous et découvrir un bouquet frais qui transforme votre salon en refuge parfumé. C\'est votre petit luxe hebdomadaire, sans effort, sans stress.',
    features: [
      'Votre dose de fraîcheur (30-35cm)',
      'Un message écrit de notre main',
      'Sélection artisanale de saison',
    ],
    prices: {
      weekly: 25.5,
      biweekly: 27.5,
      monthly: 29.9,
    },
    dailyCost: 0.99,
  },
  {
    id: 'signature',
    name: 'Signature',
    tagline: 'Notre création favorite',
    description: 'Ce bouquet, c\'est celui que nous offririons à nos proches. Généreux, raffiné, conçu pour impressionner. Parce que votre intérieur mérite ce qu\'il y a de mieux.',
    features: [
      'Composition généreuse premium (35-40cm)',
      'Un message écrit de notre main',
      'Fleurs rares et variétés d\'exception',
    ],
    prices: {
      weekly: 38,
      biweekly: 41.5,
      monthly: 44.9,
    },
    dailyCost: 1.27,
    popular: true,
  },
  {
    id: 'prestige',
    name: 'Prestige',
    tagline: 'L\'excellence florale absolue',
    description: 'Une œuvre d\'art vivante. Ce bouquet attire les regards, suscite l\'admiration, et transforme chaque pièce en galerie d\'exception. C\'est plus qu\'un abonnement : c\'est une signature.',
    features: [
      'Grande composition d\'exception (40-45cm)',
      'Vase design offert (1ère livraison)',
      'Message personnalisé calligraphié',
    ],
    prices: {
      weekly: 59,
      biweekly: 64.5,
      monthly: 69.9,
    },
    dailyCost: 1.97,
  },
];

export function getSubscriptionPlan(planId: string): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find((plan) => plan.id === planId);
}

export function getSubscriptionPrice(planId: string, frequency: SubscriptionFrequency): number {
  return getSubscriptionPlan(planId)?.prices[frequency] ?? 0;
}
