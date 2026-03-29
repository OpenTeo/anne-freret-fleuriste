'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const plans = [
  {
    id: 'essentiel',
    name: '🌿 Essentiel',
    monthlyPrice: 29.90,
    biweeklyPrice: 27.50,
    weeklyPrice: 25.50,
    description: 'Le bouquet de saison',
    features: [
      'Bouquet de fleurs fraîches (30-35cm)',
      'Carte message personnalisée',
      'Fleurs sélectionnées par notre fleuriste',
    ],
  },
  {
    id: 'signature',
    name: '🌸 Signature',
    monthlyPrice: 44.90,
    biweeklyPrice: 41.50,
    weeklyPrice: 38.00,
    description: 'Notre sélection premium',
    popular: true,
    features: [
      'Bouquet premium plus généreux (35-40cm)',
      'Carte message personnalisée',
      'Fleurs de saison sélectionnées',
    ],
  },
  {
    id: 'prestige',
    name: '👑 Prestige',
    monthlyPrice: 69.90,
    biweeklyPrice: 64.50,
    weeklyPrice: 59.00,
    description: "L'exception florale",
    features: [
      "Grande composition d'exception (40-45cm)",
      '🎁 Vase offert à la première livraison',
      'Livraison gratuite à domicile',
      'Carte message personnalisée',
    ],
  },
];

const frequencies = [
  {
    id: 'weekly',
    label: 'Chaque lundi',
    description: 'Fraîcheur chaque semaine',
    deliveryInfo: 'Livraison automatique tous les lundis',
    icon: '🌿',
  },
  {
    id: 'biweekly',
    label: 'Les 1er et 15',
    description: '2 fois par mois',
    deliveryInfo: 'Livraison automatique le 1er et le 15 de chaque mois',
    icon: '🌸',
  },
  {
    id: 'monthly',
    label: 'Chaque 1er du mois',
    description: 'Rendez-vous mensuel',
    deliveryInfo: 'Livraison automatique le 1er jour de chaque mois',
    icon: '👑',
  },
];

// Fonction pour calculer la prochaine date de livraison
function getNextDeliveryDate(frequency: string): string {
  const today = new Date();
  let nextDate: Date;

  if (frequency === 'weekly') {
    // Prochain lundi
    const daysUntilMonday = (8 - today.getDay()) % 7 || 7;
    nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysUntilMonday);
  } else if (frequency === 'biweekly') {
    // 1er ou 15 du mois
    const day = today.getDate();
    if (day < 1) {
      nextDate = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (day < 15) {
      nextDate = new Date(today.getFullYear(), today.getMonth(), 15);
    } else {
      // Prochain 1er du mois suivant
      nextDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    }
  } else {
    // monthly: 1er du mois prochain
    nextDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  }

  return nextDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function AbonnementStripe() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('signature');
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);
  const [nextDelivery, setNextDelivery] = useState('');

  const getPriceForPlan = (planId: string, frequency: string) => {
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return 0;

    if (frequency === 'weekly') return plan.weeklyPrice;
    if (frequency === 'biweekly') return plan.biweeklyPrice;
    return plan.monthlyPrice;
  };

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);
  const selectedFrequencyData = frequencies.find((f) => f.id === selectedFrequency);
  const price = getPriceForPlan(selectedPlan, selectedFrequency);

  // Calculer la prochaine date de livraison quand la fréquence change
  useEffect(() => {
    setNextDelivery(getNextDeliveryDate(selectedFrequency));
  }, [selectedFrequency]);

  const handleSubscribe = async () => {
    if (!user) {
      router.push('/compte/inscription?redirect=/abonnement');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/subscriptions/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formula: selectedPlan,
          frequency: selectedFrequency,
          email: user.email,
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        alert('Erreur lors de la création du checkout');
      }
    } catch (error) {
      console.error('Erreur checkout:', error);
      alert('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
        {/* Hero */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-[#f5f0eb] to-[#faf8f5]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl md:text-5xl text-[#2d2a26] mb-6">
              Abonnement Fleurs Fraîches
            </h1>
            <p className="text-lg text-[#2d2a26]/70 max-w-2xl mx-auto mb-4">
              Recevez des fleurs fraîches de saison, sélectionnées avec soin par notre fleuriste.
            </p>
            <div className="bg-white border-2 border-[#b8935a] rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="font-serif text-xl text-[#2d2a26] mb-4 text-center">
                Comment ça marche ? 🌸
              </h3>
              <div className="space-y-3 text-sm text-[#2d2a26]/80">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <strong className="text-[#b8935a]">Livraison automatique à dates fixes</strong>
                    <p>Selon votre fréquence : chaque lundi (hebdomadaire), les 1er & 15 (bi-mensuel), ou le 1er du mois (mensuel)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💳</span>
                  <div>
                    <strong className="text-[#b8935a]">Paiement automatique par carte</strong>
                    <p>Votre carte est débitée automatiquement avant chaque livraison — aucune action requise</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔄</span>
                  <div>
                    <strong className="text-[#b8935a]">Annulation libre à tout moment</strong>
                    <p>Pausez ou annulez votre abonnement depuis votre compte, sans engagement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selection */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            {/* Choix formule */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-[#2d2a26] mb-6 text-center">1. Choisissez votre formule</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`p-6 border-2 text-left transition-all ${
                      selectedPlan === plan.id
                        ? 'border-[#b8935a] bg-[#b8935a]/5 shadow-lg scale-105'
                        : 'border-[#e8e0d8] bg-white hover:border-[#b8935a]/50'
                    } ${plan.popular ? 'relative' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 right-4 bg-[#b8935a] text-white text-xs px-3 py-1 rounded-full">
                        ⭐ Populaire
                      </div>
                    )}
                    <h3 className="font-serif text-xl text-[#2d2a26] mb-2">{plan.name}</h3>
                    <p className="text-sm text-[#2d2a26]/60 mb-4">{plan.description}</p>
                    <div className="space-y-2 mb-4">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-[#2d2a26]/80">
                          <span className="text-[#b8935a]">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-2xl font-serif text-[#2d2a26]">
                      {getPriceForPlan(plan.id, selectedFrequency).toFixed(2)}€
                      <span className="text-sm text-[#2d2a26]/60 font-sans"> / livraison</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Choix fréquence */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-[#2d2a26] mb-6 text-center">
                2. Choisissez votre fréquence
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {frequencies.map((freq) => (
                  <button
                    key={freq.id}
                    onClick={() => setSelectedFrequency(freq.id)}
                    className={`p-6 border-2 text-left transition-all ${
                      selectedFrequency === freq.id
                        ? 'border-[#b8935a] bg-[#b8935a]/5 shadow-lg'
                        : 'border-[#e8e0d8] bg-white hover:border-[#b8935a]/50'
                    }`}
                  >
                    <div className="text-3xl mb-3">{freq.icon}</div>
                    <h3 className="font-serif text-lg text-[#2d2a26] mb-2">{freq.label}</h3>
                    <p className="text-sm text-[#2d2a26]/60 mb-3">{freq.description}</p>
                    <p className="text-xs text-[#b8935a] font-medium">{freq.deliveryInfo}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Récapitulatif */}
            <div className="bg-white border-2 border-[#b8935a] p-8 max-w-2xl mx-auto">
              <h2 className="font-serif text-2xl text-[#2d2a26] mb-6 text-center">Votre abonnement</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-[#e8e0d8]">
                  <span className="text-[#2d2a26]/60">Formule</span>
                  <span className="font-medium text-[#2d2a26]">{selectedPlanData?.name}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#e8e0d8]">
                  <span className="text-[#2d2a26]/60">Fréquence</span>
                  <span className="font-medium text-[#2d2a26]">{selectedFrequencyData?.label}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#e8e0d8]">
                  <span className="text-[#2d2a26]/60">Livraison</span>
                  <span className="font-medium text-[#2d2a26] text-sm">{selectedFrequencyData?.deliveryInfo}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#e8e0d8]">
                  <span className="text-[#2d2a26]/60">Prochaine livraison</span>
                  <span className="font-medium text-[#b8935a] text-sm capitalize">{nextDelivery}</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="font-serif text-lg text-[#2d2a26]">Prix par livraison</span>
                  <span className="font-serif text-2xl text-[#b8935a]">{price.toFixed(2)}€</span>
                </div>
              </div>

              <div className="bg-[#f5f0eb] p-4 rounded mb-6 text-sm text-[#2d2a26]/80">
                <p className="mb-2">
                  <strong>💳 Débit automatique</strong> : Votre carte sera débitée automatiquement à chaque période.
                </p>
                <p>
                  <strong>🔄 Annulation libre</strong> : Vous pouvez annuler votre abonnement à tout moment depuis votre
                  compte.
                </p>
              </div>

              <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="w-full bg-[#b8935a] text-white py-4 px-6 text-lg font-medium hover:bg-[#b8956a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Redirection...' : user ? 'S\'abonner maintenant' : 'Créer un compte pour s\'abonner'}
              </button>

              <p className="text-xs text-[#2d2a26]/50 text-center mt-4">
                Paiement sécurisé par Stripe • Annulation possible à tout moment
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
