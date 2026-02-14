'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const plans = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    price: 39.90,
    description: 'Le bouquet de saison',
    features: [
      'Bouquet de fleurs fraîches de saison',
      'Livraison gratuite à domicile',
      'Carte message personnalisée',
      'Fleurs sélectionnées par notre fleuriste',
    ],
  },
  {
    id: 'signature',
    name: 'Signature',
    price: 49.90,
    popular: true,
    description: 'Notre sélection premium',
    features: [
      'Bouquet premium plus généreux',
      'Livraison gratuite à domicile',
      'Carte message personnalisée',
      'Vase offert le premier mois',
      'Accès aux fleurs rares de saison',
    ],
  },
  {
    id: 'prestige',
    name: 'Prestige',
    price: 69.90,
    description: 'L\'exception florale',
    features: [
      'Grande composition d\'exception',
      'Livraison gratuite à domicile',
      'Carte message personnalisée',
      'Vase offert le premier mois',
      'Fleurs rares et importées',
      'Emballage cadeau luxe',
    ],
  },
];

const frequencies = [
  { id: 'weekly', label: 'Chaque semaine', discount: 0 },
  { id: 'bimonthly', label: 'Toutes les 2 semaines', discount: 0 },
  { id: 'monthly', label: 'Chaque mois', discount: 0 },
];

export default function Abonnement() {
  const [selectedPlan, setSelectedPlan] = useState('signature');
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');
  const [isAnnual, setIsAnnual] = useState(false);

  const currentPlan = plans.find(p => p.id === selectedPlan)!;
  const displayPrice = isAnnual ? (currentPlan.price * 0.9).toFixed(2) : currentPlan.price.toFixed(2);

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
        
        {/* Hero */}
        <section className="py-20 md:py-28 text-center">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <p className="text-[#c4a47a] text-[10px] md:text-[11px] tracking-[0.3em] uppercase mb-4">Nouveau</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2d2a26] mb-6">
              L'Abonnement Floral
            </h1>
            <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-6"></div>
            <p className="text-[#2d2a26]/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Recevez des fleurs fraîches de saison directement chez vous. Chaque livraison est une surprise composée avec soin par notre fleuriste.
            </p>
          </div>
        </section>

        {/* Toggle mensuel/annuel */}
        <section className="pb-8">
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isAnnual ? 'text-[#2d2a26]' : 'text-[#2d2a26]/40'}`}>Mensuel</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isAnnual ? 'bg-[#c4a47a]' : 'bg-[#e8e0d8]'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${isAnnual ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-[#2d2a26]' : 'text-[#2d2a26]/40'}`}>
              Annuel <span className="text-[#c4a47a] text-xs">-10%</span>
            </span>
          </div>
        </section>

        {/* Plans */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative text-left p-8 md:p-10 bg-white transition-all duration-300 ${
                    selectedPlan === plan.id 
                      ? 'border-2 border-[#c4a47a] shadow-lg' 
                      : 'border border-[#e8e0d8] hover:border-[#c4a47a]/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c4a47a] text-white text-[9px] tracking-[0.15em] uppercase px-4 py-1">
                      Populaire
                    </div>
                  )}
                  
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#c4a47a] mb-3">{plan.name}</p>
                  <p className="text-[#2d2a26]/50 text-sm mb-6">{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="font-serif text-4xl text-[#2d2a26]">
                      {isAnnual ? (plan.price * 0.9).toFixed(2) : plan.price.toFixed(2)}€
                    </span>
                    <span className="text-[#2d2a26]/40 text-sm">/mois</span>
                    {isAnnual && (
                      <p className="text-[#c4a47a] text-xs mt-1">
                        au lieu de {plan.price.toFixed(2)}€
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#2d2a26]/70 font-light">
                        <span className="text-[#c4a47a] mt-0.5">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className={`mt-8 w-full py-3 text-center text-sm transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? 'bg-[#c4a47a] text-white'
                      : 'border border-[#c4a47a] text-[#c4a47a] hover:bg-[#c4a47a] hover:text-white'
                  }`}>
                    {selectedPlan === plan.id ? 'Sélectionné' : 'Choisir'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Fréquence */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
            <p className="text-[#c4a47a] text-[10px] tracking-[0.2em] uppercase mb-4">Fréquence</p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#2d2a26] mb-10">
              À quelle fréquence souhaitez-vous recevoir vos fleurs ?
            </h2>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {frequencies.map((freq) => (
                <button
                  key={freq.id}
                  onClick={() => setSelectedFrequency(freq.id)}
                  className={`px-8 py-4 transition-all duration-300 ${
                    selectedFrequency === freq.id
                      ? 'bg-[#c4a47a] text-white'
                      : 'border border-[#e8e0d8] text-[#2d2a26] hover:border-[#c4a47a]'
                  }`}
                >
                  {freq.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Récap */}
        <section className="py-20 md:py-28">
          <div className="max-w-lg mx-auto px-4 md:px-6">
            <div className="bg-white p-10 md:p-12 border border-[#e8e0d8]">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#c4a47a] mb-4">Votre abonnement</p>
              <h3 className="font-serif text-2xl text-[#2d2a26] mb-2">{currentPlan.name}</h3>
              <p className="text-[#2d2a26]/50 text-sm mb-6">
                {frequencies.find(f => f.id === selectedFrequency)?.label} · {isAnnual ? 'Engagement annuel' : 'Sans engagement'}
              </p>
              
              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-serif text-4xl text-[#2d2a26]">{displayPrice}€</span>
                <span className="text-[#2d2a26]/40">/mois</span>
              </div>

              <button className="w-full bg-[#c4a47a] text-white py-4 hover:bg-[#b8956a] transition-colors duration-300 mb-4">
                S'abonner
              </button>
              
              <p className="text-[#2d2a26]/40 text-xs text-center">
                {isAnnual ? 'Engagement 12 mois · Annulation possible à tout moment après' : 'Sans engagement · Annulation à tout moment'}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-2xl mx-auto px-4 md:px-6">
            <h2 className="font-serif text-2xl md:text-3xl text-[#2d2a26] text-center mb-12">Questions fréquentes</h2>
            
            <div className="space-y-6">
              {[
                { q: 'Quand serai-je livré(e) ?', a: 'Votre première livraison est envoyée sous 48h après votre inscription. Les suivantes selon la fréquence choisie.' },
                { q: 'Puis-je mettre en pause mon abonnement ?', a: 'Oui, vous pouvez mettre en pause ou reprendre votre abonnement à tout moment depuis votre espace client.' },
                { q: 'Les fleurs sont-elles toujours les mêmes ?', a: 'Non ! Chaque livraison est une composition unique de saison, créée par notre fleuriste avec les plus belles fleurs disponibles.' },
                { q: 'Puis-je offrir un abonnement ?', a: 'Absolument ! L\'abonnement floral est le cadeau parfait. Contactez-nous pour personnaliser la livraison.' },
              ].map((item, i) => (
                <div key={i} className="border-b border-[#e8e0d8] pb-6">
                  <h3 className="font-serif text-lg text-[#2d2a26] mb-2">{item.q}</h3>
                  <p className="text-[#2d2a26]/60 font-light text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
