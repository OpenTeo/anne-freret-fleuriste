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
    tagline: 'Le rituel simple et élégant',
    description: 'Imaginez rentrer chez vous et découvrir un bouquet frais qui transforme votre salon en refuge parfumé. C\'est votre petit luxe hebdomadaire — sans effort, sans stress.',
    features: [
      'Votre dose de fraîcheur (30-35cm)',
      'Un message écrit de notre main',
      'Sélection artisanale de saison',
    ],
    dailyCost: 0.99, // weekly price / 7
  },
  {
    id: 'signature',
    name: 'Signature',
    monthlyPrice: 44.90,
    biweeklyPrice: 41.50,
    weeklyPrice: 38.00,
    tagline: 'Notre création favorite',
    description: 'Ce bouquet, c\'est celui que nous offririons à nos proches. Généreux, raffiné, conçu pour impressionner. Parce que votre intérieur mérite ce qu\'il y a de mieux.',
    popular: true,
    features: [
      'Composition généreuse premium (35-40cm)',
      'Un message écrit de notre main',
      'Fleurs rares et variétés d\'exception',
    ],
    dailyCost: 1.27, // weekly price / 7 (arrondi)
  },
  {
    id: 'prestige',
    name: 'Prestige',
    monthlyPrice: 69.90,
    biweeklyPrice: 64.50,
    weeklyPrice: 59.00,
    tagline: 'L\'excellence florale absolue',
    description: 'Une œuvre d\'art vivante. Ce bouquet attire les regards, suscite l\'admiration, et transforme chaque pièce en galerie d\'exception. C\'est plus qu\'un abonnement : c\'est une signature.',
    features: [
      'Grande composition d\'exception (40-45cm)',
      'Vase design offert (1ère livraison)',
      'Message personnalisé calligraphié',
    ],
    dailyCost: 1.97, // weekly price / 7 (arrondi)
  },
];

const frequencies = [
  {
    id: 'weekly',
    label: 'Hebdomadaire',
    shortLabel: 'Chaque lundi',
    description: 'Votre rituel sacré',
    deliveryInfo: 'Plus jamais de dimanche à courir chez le fleuriste',
  },
  {
    id: 'biweekly',
    label: 'Bimensuel',
    shortLabel: 'Les 1er et 15',
    description: 'L\'équilibre parfait',
    deliveryInfo: 'Le bon rythme pour ceux qui aiment la surprise',
  },
  {
    id: 'monthly',
    label: 'Mensuel',
    shortLabel: 'Chaque 1er du mois',
    description: 'Le rendez-vous précieux',
    deliveryInfo: 'Un cadeau que vous vous offrez, chaque mois',
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
        {/* Hero Section - Émotionnel */}
        <section className="relative bg-gradient-to-b from-[#f5f0eb] to-[#faf8f5] pt-20 pb-12 md:pt-32 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#b8935a] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#b8935a] rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <div className="inline-block mb-6">
              <span className="text-[#b8935a] text-sm tracking-[0.3em] uppercase font-light">Abonnements Floraux</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-[#2d2a26] mb-6 leading-tight">
              Des fleurs fraîches chaque semaine,<br />
              <span className="text-[#b8935a]">créées avec passion</span>
            </h1>
            <p className="text-lg md:text-xl text-[#2d2a26]/70 max-w-2xl mx-auto leading-relaxed mb-4">
              Imaginez recevoir l&apos;émotion d&apos;un cadeau, chaque semaine. Sans y penser, sans courir. 
              Juste la magie d&apos;un bouquet frais qui vous attend.
            </p>
            <p className="text-base text-[#2d2a26]/70 max-w-xl mx-auto font-medium">
              Annulation libre • Sans engagement • Garantie fraîcheur 7 jours
            </p>
          </div>
        </section>

        {/* Plans Section */}
        <section className="pt-10 pb-16 md:pt-14 md:pb-24 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-4">Nos Rituels Floraux</h2>
              <p className="text-[#2d2a26]/60 max-w-2xl mx-auto">
                Chaque bouquet est une création unique, pensée pour transformer votre quotidien. 
                Choisissez votre rituel, nous nous occupons du reste.
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
                        Le + Choisi
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-[#2d2a26] mb-2">{plan.name}</h3>
                    <p className="text-sm text-[#b8935a] mb-3 font-light italic">{plan.tagline}</p>
                    <p className="text-sm text-[#2d2a26]/70 mb-6 leading-relaxed">{plan.description}</p>

                    <div className="space-y-2 mb-6 pb-6 border-b border-[#e8e0d8]">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-[#2d2a26]/80">
                          <span className="text-[#b8935a] mt-0.5">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-3xl text-[#2d2a26]">
                          {getPriceForPlan(plan.id, selectedFrequency).toFixed(2)}€
                        </span>
                        <span className="text-sm text-[#2d2a26]/50 font-light">par livraison</span>
                      </div>
                      {selectedFrequency === 'weekly' && (
                        <p className="text-xs text-[#b8935a] italic">
                          Soit {plan.dailyCost.toFixed(2)}€ par jour de beauté
                        </p>
                      )}
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
                    <p className="text-xs text-[#b8935a] font-light italic">{freq.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Card */}
            <div className="max-w-xl mx-auto">
              <div className="bg-white border-2 border-[#b8935a] p-8 shadow-2xl">
                <h3 className="font-serif text-2xl text-[#2d2a26] mb-8 text-center">Votre Rituel</h3>
                
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
                    <span className="text-[#2d2a26]/60 font-light">Première livraison</span>
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
                  {isLoading ? 'Redirection...' : user ? 'Commencer mon rituel fleuri' : 'Créer mon compte'}
                </button>

                <p className="text-xs text-[#2d2a26]/40 text-center">
                  Sans engagement • Annulation libre • Garantie fraîcheur 7 jours
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl text-[#2d2a26] mb-4">Ils ont adopté le rituel</h2>
              <p className="text-[#2d2a26]/60">Ce qu'ils disent de leur abonnement</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#faf8f5] p-6 border border-[#e8e0d8]">
                <div className="mb-4">
                  <span className="text-[#b8935a] text-2xl">★★★★★</span>
                </div>
                <p className="text-[#2d2a26] mb-4 leading-relaxed italic">
                  "Je ne peux plus m'en passer. Mon lundi est devenu magique. C'est mon petit luxe hebdomadaire, et ça change tout."
                </p>
                <div className="text-sm">
                  <p className="text-[#2d2a26] font-light">Sophie L.</p>
                  <p className="text-[#2d2a26]/50 text-xs">Abonnée depuis 8 mois</p>
                </div>
              </div>

              <div className="bg-[#faf8f5] p-6 border border-[#e8e0d8]">
                <div className="mb-4">
                  <span className="text-[#b8935a] text-2xl">★★★★★</span>
                </div>
                <p className="text-[#2d2a26] mb-4 leading-relaxed italic">
                  "Plus besoin d'y penser, les fleurs arrivent comme par magie. Et à chaque fois, c'est une nouvelle surprise. Un pur bonheur."
                </p>
                <div className="text-sm">
                  <p className="text-[#2d2a26] font-light">Mathilde D.</p>
                  <p className="text-[#2d2a26]/50 text-xs">Abonnée depuis 5 mois</p>
                </div>
              </div>

              <div className="bg-[#faf8f5] p-6 border border-[#e8e0d8]">
                <div className="mb-4">
                  <span className="text-[#b8935a] text-2xl">★★★★★</span>
                </div>
                <p className="text-[#2d2a26] mb-4 leading-relaxed italic">
                  "La qualité est exceptionnelle. Ce n'est pas qu'un bouquet, c'est une œuvre d'art. Mes invités sont toujours impressionnés."
                </p>
                <div className="text-sm">
                  <p className="text-[#2d2a26] font-light">Claire M.</p>
                  <p className="text-[#2d2a26]/50 text-xs">Abonnée depuis 1 an</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pourquoi S'Abonner Section */}
        <section className="py-16 bg-[#faf8f5]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl text-[#2d2a26] mb-4">Pourquoi s'abonner ?</h2>
              <p className="text-[#2d2a26]/60">Les avantages que vous allez adorer</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 border-2 border-[#e8e0d8] hover:border-[#b8935a]/30 transition-all duration-300">
                <div className="w-12 h-12 mb-4 flex items-center justify-center border border-[#b8935a] text-[#b8935a]">
                  <span className="font-serif text-2xl">✓</span>
                </div>
                <h3 className="font-serif text-xl text-[#2d2a26] mb-3">Liberté totale</h3>
                <p className="text-[#2d2a26]/70 leading-relaxed">
                  Annulation libre à tout moment, sans justification. Vous êtes libre de mettre en pause ou 
                  d'arrêter quand vous voulez. C'est votre rituel, vous en gardez le contrôle.
                </p>
              </div>

              <div className="bg-white p-8 border-2 border-[#e8e0d8] hover:border-[#b8935a]/30 transition-all duration-300">
                <div className="w-12 h-12 mb-4 flex items-center justify-center border border-[#b8935a] text-[#b8935a]">
                  <span className="font-serif text-2xl">✦</span>
                </div>
                <h3 className="font-serif text-xl text-[#2d2a26] mb-3">Zéro contrainte</h3>
                <p className="text-[#2d2a26]/70 leading-relaxed">
                  Plus besoin de courir chez le fleuriste le dimanche. Plus de stress, plus d'oublis. 
                  Juste la joie de découvrir vos fleurs fraîches, livrées directement chez vous.
                </p>
              </div>

              <div className="bg-white p-8 border-2 border-[#e8e0d8] hover:border-[#b8935a]/30 transition-all duration-300">
                <div className="w-12 h-12 mb-4 flex items-center justify-center border border-[#b8935a] text-[#b8935a]">
                  <span className="font-serif text-2xl">✧</span>
                </div>
                <h3 className="font-serif text-xl text-[#2d2a26] mb-3">Variétés exclusives</h3>
                <p className="text-[#2d2a26]/70 leading-relaxed">
                  Accédez à des fleurs rares que nous sélectionnons au marché. Des variétés d'exception 
                  que vous ne trouverez pas ailleurs. Votre intérieur le mérite.
                </p>
              </div>

              <div className="bg-white p-8 border-2 border-[#e8e0d8] hover:border-[#b8935a]/30 transition-all duration-300">
                <div className="w-12 h-12 mb-4 flex items-center justify-center border border-[#b8935a] text-[#b8935a]">
                  <span className="font-serif text-2xl">€</span>
                </div>
                <h3 className="font-serif text-xl text-[#2d2a26] mb-3">Prix privilégié</h3>
                <p className="text-[#2d2a26]/70 leading-relaxed">
                  Économisez jusqu'à 15% par rapport à l'achat à l'unité. Un tarif préférentiel réservé 
                  à nos abonnés, sans compromis sur la qualité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Garanties Section */}
        <section className="py-12 bg-gradient-to-br from-[#0a0a0a] via-[#1a1613] to-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h3 className="font-serif text-2xl text-white mb-3">Nos Garanties</h3>
              <p className="text-white/60 text-sm">Votre satisfaction est notre priorité</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/5 border border-[#b8935a]/30">
                <div className="text-[#b8935a] text-3xl mb-3">✓</div>
                <h4 className="font-serif text-lg text-white mb-2">Fraîcheur 7 jours</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  Fleurs garanties fraîches minimum 7 jours. Sinon, nous les remplaçons gratuitement.
                </p>
              </div>

              <div className="text-center p-6 bg-white/5 border border-[#b8935a]/30">
                <div className="text-[#b8935a] text-3xl mb-3">∞</div>
                <h4 className="font-serif text-lg text-white mb-2">Sans engagement</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  Aucun contrat, aucune durée minimum. Vous êtes libre de partir à tout moment.
                </p>
              </div>

              <div className="text-center p-6 bg-white/5 border border-[#b8935a]/30">
                <div className="text-[#b8935a] text-3xl mb-3">◐</div>
                <h4 className="font-serif text-lg text-white mb-2">Pause flexible</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  En vacances ? Mettez votre abonnement en pause d'un simple clic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl text-[#2d2a26] mb-4">Questions fréquentes</h2>
              <p className="text-[#2d2a26]/60">Tout ce que vous devez savoir</p>
            </div>

            <div className="space-y-6">
              <div className="border-b border-[#e8e0d8] pb-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-2">Puis-je changer de formule ?</h3>
                <p className="text-[#2d2a26]/70 leading-relaxed">
                  Absolument ! Vous pouvez changer de formule ou de fréquence à tout moment depuis votre espace client. 
                  Les modifications prennent effet dès la prochaine livraison.
                </p>
              </div>

              <div className="border-b border-[#e8e0d8] pb-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-2">Que se passe-t-il si je suis absent ?</h3>
                <p className="text-[#2d2a26]/70 leading-relaxed">
                  Pas de souci ! Vous pouvez reporter ou sauter une livraison depuis votre compte, ou simplement 
                  mettre votre abonnement en pause. Aucun gaspillage, aucune perte.
                </p>
              </div>

              <div className="border-b border-[#e8e0d8] pb-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-2">Puis-je offrir un abonnement ?</h3>
                <p className="text-[#2d2a26]/70 leading-relaxed">
                  Oui ! Un abonnement floral est un cadeau merveilleux. Contactez-nous pour créer un abonnement 
                  cadeau personnalisé avec une durée déterminée (3, 6 ou 12 mois).
                </p>
              </div>

              <div className="border-b border-[#e8e0d8] pb-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-2">Comment annuler mon abonnement ?</h3>
                <p className="text-[#2d2a26]/70 leading-relaxed">
                  Rendez-vous dans votre espace client, section "Mon abonnement", et cliquez sur "Annuler". 
                  C'est immédiat, sans justification, sans frais. Vous pouvez revenir quand vous voulez.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-2">Les bouquets sont-ils vraiment uniques ?</h3>
                <p className="text-[#2d2a26]/70 leading-relaxed">
                  Chaque bouquet est composé selon les arrivages du marché et l'inspiration de notre fleuriste. 
                  Vous ne recevrez jamais deux fois le même bouquet. C'est la magie de l'artisanat floral.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-br from-[#1a1613] to-[#0a0a0a]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Prêt à transformer votre quotidien ?
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Rejoignez la communauté des amoureux de fleurs qui ont adopté le rituel Anne Freret. 
              Sans engagement, avec amour.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#b8935a] text-white py-4 px-10 text-lg font-light tracking-wide hover:bg-[#a17d47] transition-colors"
            >
              Rejoindre la communauté Anne Freret
            </button>
            <p className="text-white/40 text-xs mt-6">
              Annulation libre • Sans engagement • Garantie fraîcheur 7 jours
            </p>
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
                <h4 className="font-serif text-lg text-[#2d2a26] mb-2">Choisissez votre rituel</h4>
                <p className="text-sm text-[#2d2a26]/60">
                  Sélectionnez votre formule et votre rythme préféré
                </p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-[#b8935a] text-[#b8935a]">
                  <span className="font-serif text-xl">2</span>
                </div>
                <h4 className="font-serif text-lg text-[#2d2a26] mb-2">Recevez vos fleurs</h4>
                <p className="text-sm text-[#2d2a26]/60">
                  Livraison automatique, sans effort, sans oubli
                </p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-[#b8935a] text-[#b8935a]">
                  <span className="font-serif text-xl">3</span>
                </div>
                <h4 className="font-serif text-lg text-[#2d2a26] mb-2">Profitez</h4>
                <p className="text-sm text-[#2d2a26]/60">
                  Pausez, modifiez ou annulez à tout moment
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
