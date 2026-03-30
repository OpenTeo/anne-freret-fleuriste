'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const plans = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    monthlyPrice: 29.90,
    biweeklyPrice: 27.50,
    weeklyPrice: 25.50,
    tagline: 'Le bouquet de saison',
    description: 'Une touche de fraîcheur naturelle qui illumine votre quotidien',
    features: [
      'Bouquet de fleurs fraîches (30-35cm)',
      'Carte message personnalisée',
      'Fleurs sélectionnées par notre fleuriste',
    ],
  },
  {
    id: 'signature',
    name: 'Signature',
    monthlyPrice: 44.90,
    biweeklyPrice: 41.50,
    weeklyPrice: 38.00,
    tagline: 'Notre sélection premium',
    description: 'Un bouquet généreux qui exprime l\'élégance et le raffinement',
    popular: true,
    features: [
      'Bouquet premium plus généreux (35-40cm)',
      'Carte message personnalisée',
      'Fleurs de saison sélectionnées',
    ],
  },
  {
    id: 'prestige',
    name: 'Prestige',
    monthlyPrice: 69.90,
    biweeklyPrice: 64.50,
    weeklyPrice: 59.00,
    tagline: 'L\'exception florale',
    description: 'Une composition d\'exception pour célébrer les moments précieux',
    features: [
      "Grande composition d'exception (40-45cm)",
      'Vase offert à la première livraison',
      'Carte message personnalisée',
    ],
  },
];

const frequencies = [
  {
    id: 'weekly',
    label: 'Hebdomadaire',
    shortLabel: 'Chaque lundi',
    description: 'Fraîcheur chaque semaine',
    deliveryInfo: 'Livraison automatique tous les lundis',
  },
  {
    id: 'biweekly',
    label: 'Bimensuel',
    shortLabel: 'Les 1er et 15',
    description: 'Deux fois par mois',
    deliveryInfo: 'Livraison automatique le 1er et le 15 de chaque mois',
  },
  {
    id: 'monthly',
    label: 'Mensuel',
    shortLabel: 'Chaque 1er du mois',
    description: 'Rendez-vous mensuel',
    deliveryInfo: 'Livraison automatique le 1er jour de chaque mois',
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
      <main className="min-h-screen pt-14 md:pt-20">
        {/* Hero Section - Dark & Elegant */}
        <section className="relative bg-gradient-to-br from-[#0a0a0a] via-[#1a1613] to-[#0a0a0a] py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#b8935a] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#b8935a] rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <div className="inline-block mb-6">
              <span className="text-[#b8935a] text-sm tracking-[0.3em] uppercase font-light">Abonnement</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
              Des fleurs fraîches,<br />
              <span className="text-[#b8935a]">livrées avec régularité</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Laissez-vous surprendre par nos créations florales de saison, 
              sélectionnées avec soin et livrées directement chez vous.
            </p>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-16 md:py-24 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-4">Nos Formules</h2>
              <p className="text-[#2d2a26]/60 max-w-2xl mx-auto">
                Chaque bouquet est une création unique, composée selon les arrivages du marché et l'inspiration du moment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`group relative bg-white border-2 transition-all duration-300 overflow-hidden text-left ${
                    selectedPlan === plan.id
                      ? 'border-[#b8935a] shadow-2xl scale-105'
                      : 'border-[#e8e0d8] hover:border-[#b8935a]/50 hover:shadow-xl'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-[#b8935a] text-white text-xs px-3 py-1 tracking-wider uppercase font-light">
                        Populaire
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-[#2d2a26] mb-2">{plan.name}</h3>
                    <p className="text-sm text-[#b8935a] mb-3 font-light">{plan.tagline}</p>
                    <p className="text-sm text-[#2d2a26]/70 mb-6 leading-relaxed">{plan.description}</p>

                    <div className="space-y-2 mb-6 pb-6 border-b border-[#e8e0d8]">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-[#2d2a26]/80">
                          <span className="text-[#b8935a] mt-0.5">—</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-3xl text-[#2d2a26]">
                        {getPriceForPlan(plan.id, selectedFrequency).toFixed(2)}€
                      </span>
                      <span className="text-sm text-[#2d2a26]/50 font-light">par livraison</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Frequency Selection */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="font-serif text-2xl text-[#2d2a26] mb-8 text-center">Choisissez votre rythme</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {frequencies.map((freq) => (
                  <button
                    key={freq.id}
                    onClick={() => setSelectedFrequency(freq.id)}
                    className={`p-6 border-2 text-center transition-all duration-300 ${
                      selectedFrequency === freq.id
                        ? 'border-[#b8935a] bg-[#b8935a]/5 shadow-lg'
                        : 'border-[#e8e0d8] bg-white hover:border-[#b8935a]/30'
                    }`}
                  >
                    <h3 className="font-serif text-xl text-[#2d2a26] mb-2">{freq.label}</h3>
                    <p className="text-sm text-[#2d2a26]/60 mb-1">{freq.shortLabel}</p>
                    <p className="text-xs text-[#b8935a] font-light">{freq.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Card */}
            <div className="max-w-xl mx-auto">
              <div className="bg-white border-2 border-[#b8935a] p-8 shadow-2xl">
                <h3 className="font-serif text-2xl text-[#2d2a26] mb-8 text-center">Récapitulatif</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center pb-4 border-b border-[#e8e0d8]">
                    <span className="text-[#2d2a26]/60 font-light">Formule</span>
                    <span className="font-serif text-lg text-[#2d2a26]">{selectedPlanData?.name}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-[#e8e0d8]">
                    <span className="text-[#2d2a26]/60 font-light">Rythme</span>
                    <span className="text-[#2d2a26]">{selectedFrequencyData?.label}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-[#e8e0d8]">
                    <span className="text-[#2d2a26]/60 font-light">Prochaine livraison</span>
                    <span className="text-[#b8935a] text-sm capitalize">{nextDelivery}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-serif text-xl text-[#2d2a26]">Total</span>
                    <span className="font-serif text-3xl text-[#b8935a]">{price.toFixed(2)}€</span>
                  </div>
                </div>

                <button
                  onClick={handleSubscribe}
                  disabled={isLoading}
                  className="w-full bg-[#b8935a] text-white py-4 px-6 text-lg font-light tracking-wide hover:bg-[#a17d47] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  {isLoading ? 'Redirection...' : user ? 'S\'abonner maintenant' : 'Créer un compte pour s\'abonner'}
                </button>

                <p className="text-xs text-[#2d2a26]/40 text-center">
                  Paiement sécurisé • Annulation libre à tout moment
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Discreet Section */}
        <section className="py-12 bg-[#f5f0eb]">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="font-serif text-xl text-[#2d2a26] mb-8 text-center">Comment ça marche</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-[#b8935a] text-[#b8935a]">
                  <span className="font-serif text-xl">1</span>
                </div>
                <h4 className="font-serif text-lg text-[#2d2a26] mb-2">Livraison automatique</h4>
                <p className="text-sm text-[#2d2a26]/60">
                  Recevez vos fleurs à la fréquence choisie, sans effort
                </p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-[#b8935a] text-[#b8935a]">
                  <span className="font-serif text-xl">2</span>
                </div>
                <h4 className="font-serif text-lg text-[#2d2a26] mb-2">Paiement simplifié</h4>
                <p className="text-sm text-[#2d2a26]/60">
                  Débit automatique sécurisé avant chaque livraison
                </p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-[#b8935a] text-[#b8935a]">
                  <span className="font-serif text-xl">3</span>
                </div>
                <h4 className="font-serif text-lg text-[#2d2a26] mb-2">Liberté totale</h4>
                <p className="text-sm text-[#2d2a26]/60">
                  Pausez ou annulez votre abonnement à tout moment
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
