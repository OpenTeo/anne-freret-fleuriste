'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const plans = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    price: 39.90,
    description: 'Le bouquet de saison',
    diameter: '30-35cm',
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
    diameter: '35-40cm',
    features: [
      'Bouquet premium plus généreux',
      'Livraison gratuite à domicile',
      'Carte message personnalisée',
      'Vase offert à la première livraison',
      'Accès aux fleurs rares de saison',
    ],
  },
  {
    id: 'prestige',
    name: 'Prestige',
    price: 69.90,
    description: "L'exception florale",
    diameter: '40-45cm',
    features: [
      "Grande composition d'exception",
      'Livraison gratuite à domicile',
      'Carte message personnalisée',
      'Vase offert à la première livraison',
      'Fleurs rares et importées',
      'Emballage cadeau luxe',
    ],
  },
];

const frequencies = [
  { id: 'weekly', label: 'Chaque semaine', shortLabel: 'Hebdomadaire', deliveriesPerMonth: 4, discount: 15 },
  { id: 'bimonthly', label: 'Toutes les 2 semaines', shortLabel: 'Bi-mensuel', deliveriesPerMonth: 2, discount: 8 },
  { id: 'monthly', label: 'Chaque mois', shortLabel: 'Mensuel', deliveriesPerMonth: 1, discount: 0 },
];

const durations = [
  { id: '1', label: 'Sans engagement', months: 1, discount: 0 },
  { id: '3', label: '3 mois', months: 3, discount: 0 },
  { id: '6', label: '6 mois', months: 6, discount: 7 },
  { id: '12', label: '12 mois', months: 12, discount: 10 },
];

const steps = [
  { id: 1, label: 'Formule' },
  { id: 2, label: 'Livraison' },
  { id: 3, label: 'Inscription' },
  { id: 4, label: 'Paiement' },
];

function AbonnementContent() {
  const [step, setStep] = useState(1);
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState('signature');
  
  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam && plans.find(p => p.id === planParam)) {
      setSelectedPlan(planParam);
    }
  }, [searchParams]);
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');
  const [selectedDuration, setSelectedDuration] = useState('1');
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  
  // Customer info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Delivery
  const [deliveryFirstName, setDeliveryFirstName] = useState('');
  const [deliveryLastName, setDeliveryLastName] = useState('');
  const [address, setAddress] = useState('');
  const [addressComplement, setAddressComplement] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [preferredDay, setPreferredDay] = useState('mercredi');

  // Computed
  const currentPlan = plans.find(p => p.id === selectedPlan)!;
  const currentDuration = durations.find(d => d.id === selectedDuration)!;
  const currentFrequency = frequencies.find(f => f.id === selectedFrequency)!;
  // Réduction combinée: fréquence (plus on commande, moins c'est cher) + durée d'engagement
  const combinedDiscount = 1 - (1 - currentFrequency.discount / 100) * (1 - currentDuration.discount / 100);
  const pricePerDelivery = currentPlan.price * (1 - combinedDiscount);
  const totalDeliveries = currentDuration.months * currentFrequency.deliveriesPerMonth;
  const monthlyPrice = pricePerDelivery * currentFrequency.deliveriesPerMonth;
  const totalPrice = pricePerDelivery * totalDeliveries;

  const [confirmed, setConfirmed] = useState(false);

  const canProceedStep2 = selectedPlan && selectedFrequency && selectedDuration;
  const canProceedStep3 = address && postalCode && city && (deliveryFirstName || !isGift) && preferredDay;
  const canProceedStep4 = firstName && lastName && email && phone;

  const inputClass = "w-full px-4 py-3.5 bg-white border border-[#e8e0d8] text-[#2d2a26] placeholder-[#9a9490] focus:outline-none focus:border-[#b8935a] transition-colors duration-200 text-sm";
  const labelClass = "block text-[10px] tracking-[0.15em] uppercase text-[#2d2a26]/60 mb-2";

  if (confirmed) {
    return (
      <>
        <Header />
        <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
          <section className="py-28 md:py-40 text-center">
            <div className="max-w-lg mx-auto px-4">
              <svg className="w-16 h-16 mx-auto mb-8 text-[#b8935a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <h1 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-4">Merci pour votre inscription !</h1>
              <div className="w-12 h-px bg-[#b8935a] mx-auto mb-6"></div>
              <p className="text-[#2d2a26]/60 mb-8 leading-relaxed">
                Votre abonnement <strong>{currentPlan.name}</strong> est enregistré.
                Votre première livraison sera préparée avec soin et envoyée sous 48h.
              </p>
              <div className="bg-white border border-[#e8e0d8] p-8 mb-8 text-left">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#b8935a] mb-4">Récapitulatif</p>
                <div className="space-y-2 text-sm text-[#2d2a26]/70">
                  <p><span className="text-[#2d2a26]">Formule :</span> {currentPlan.name} — {pricePerDelivery.toFixed(2)}€/livraison</p>
                  <p><span className="text-[#2d2a26]">Fréquence :</span> {currentFrequency.label}</p>
                  <p><span className="text-[#2d2a26]">Durée :</span> {currentDuration.label}</p>
                  <p><span className="text-[#2d2a26]">Livraison :</span> {address}, {postalCode} {city}</p>
                  <p><span className="text-[#2d2a26]">Jour préféré :</span> {preferredDay}</p>
                  {isGift && <p><span className="text-[#2d2a26]">Cadeau pour :</span> {deliveryFirstName} {deliveryLastName}</p>}
                </div>
              </div>
              <p className="text-[#2d2a26]/40 text-xs">Un email de confirmation a été envoyé à {email}</p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
        
        {/* Hero compact */}
        <section className="py-12 md:py-16 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-[#b8935a] text-[10px] tracking-[0.3em] uppercase mb-3">Abonnement</p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2d2a26] mb-4">
              L'Abonnement Floral
            </h1>
            <div className="w-12 h-px bg-[#b8935a] mx-auto mb-4"></div>
            <p className="text-[#2d2a26]/50 text-sm max-w-md mx-auto">
              Des fleurs fraîches de saison livrées chez vous. Chaque bouquet est une surprise.
            </p>
          </div>
        </section>

        {/* Stepper */}
        <section className="pb-12">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                      step >= s.id ? 'bg-[#b8935a] text-white' : 'border border-[#e8e0d8] text-[#2d2a26]/30'
                    }`}>
                      {step > s.id ? '✓' : s.id}
                    </div>
                    <span className={`text-[9px] tracking-[0.1em] uppercase mt-2 ${
                      step >= s.id ? 'text-[#2d2a26]' : 'text-[#2d2a26]/30'
                    }`}>{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-px mx-3 mt-[-16px] transition-colors duration-300 ${
                      step > s.id ? 'bg-[#b8935a]' : 'bg-[#e8e0d8]'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 md:px-6 pb-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Main content */}
            <div className="lg:col-span-2">

              {/* STEP 1 — Formule */}
              {step === 1 && (
                <div className="space-y-12">
                  {/* Plans */}
                  <div>
                    <h2 className="font-serif text-2xl text-[#2d2a26] mb-8">Choisissez votre formule</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      {plans.map((plan) => (
                        <button
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan.id)}
                          className={`relative text-left p-6 md:p-8 bg-white transition-all duration-300 ${
                            selectedPlan === plan.id 
                              ? 'border-2 border-[#b8935a] shadow-lg' 
                              : 'border border-[#e8e0d8] hover:border-[#b8935a]/50'
                          }`}
                        >
                          {plan.popular && (
                            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#b8935a] text-white text-[8px] tracking-[0.15em] uppercase px-3 py-0.5">
                              Populaire
                            </div>
                          )}
                          <p className="text-[10px] tracking-[0.2em] uppercase text-[#b8935a] mb-1">{plan.name}</p>
                          <p className="text-[#2d2a26]/40 text-xs mb-1">Diamètre {plan.diameter}</p>
                          <p className="text-[#2d2a26]/50 text-sm mb-4">{plan.description}</p>
                          <div className="mb-6">
                            <span className="font-serif text-3xl text-[#2d2a26]">{plan.price.toFixed(2)}€</span>
                            <span className="text-[#2d2a26]/40 text-xs">/livraison</span>
                          </div>
                          <ul className="space-y-2">
                            {plan.features.map((f, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-[#2d2a26]/60 font-light">
                                <span className="text-[#b8935a] mt-0.5 text-[10px]">✓</span>{f}
                              </li>
                            ))}
                          </ul>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fréquence */}
                  <div>
                    <h2 className="font-serif text-2xl text-[#2d2a26] mb-6">Fréquence de livraison</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {frequencies.map((freq) => (
                        <button
                          key={freq.id}
                          onClick={() => setSelectedFrequency(freq.id)}
                          className={`px-6 py-4 text-sm transition-all duration-300 ${
                            selectedFrequency === freq.id
                              ? 'bg-[#b8935a] text-white'
                              : 'bg-white border border-[#e8e0d8] text-[#2d2a26] hover:border-[#b8935a]'
                          }`}
                        >
                          <span className="block">{freq.label}</span>
                          {freq.discount > 0 && (
                            <span className={`text-[10px] ${selectedFrequency === freq.id ? 'text-white/80' : 'text-[#b8935a]'}`}>
                              -{freq.discount}% par livraison
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Durée */}
                  <div>
                    <h2 className="font-serif text-2xl text-[#2d2a26] mb-6">Durée d'engagement</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {durations.map((dur) => (
                        <button
                          key={dur.id}
                          onClick={() => setSelectedDuration(dur.id)}
                          className={`px-4 py-4 text-sm transition-all duration-300 ${
                            selectedDuration === dur.id
                              ? 'bg-[#b8935a] text-white'
                              : 'bg-white border border-[#e8e0d8] text-[#2d2a26] hover:border-[#b8935a]'
                          }`}
                        >
                          <span className="block">{dur.label}</span>
                          {dur.discount > 0 && (
                            <span className={`text-[10px] ${selectedDuration === dur.id ? 'text-white/80' : 'text-[#b8935a]'}`}>
                              -{dur.discount}%
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cadeau ? */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div 
                        onClick={() => setIsGift(!isGift)}
                        className={`w-5 h-5 border flex items-center justify-center transition-all duration-200 ${
                          isGift ? 'bg-[#b8935a] border-[#b8935a]' : 'border-[#e8e0d8]'
                        }`}
                      >
                        {isGift && <span className="text-white text-xs">✓</span>}
                      </div>
                      <span className="text-sm text-[#2d2a26]">C'est un cadeau</span>
                    </label>
                    {isGift && (
                      <div className="mt-4 ml-8">
                        <textarea
                          value={giftMessage}
                          onChange={(e) => setGiftMessage(e.target.value)}
                          placeholder="Votre message personnel (facultatif)"
                          rows={3}
                          className={`${inputClass} resize-none`}
                        />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!canProceedStep2}
                    className="w-full md:w-auto px-12 py-4 bg-[#b8935a] text-white hover:bg-[#b8956a] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continuer →
                  </button>
                </div>
              )}

              {/* STEP 2 — Livraison */}
              {step === 2 && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => setStep(1)} className="text-[#b8935a] text-sm hover:underline">← Retour</button>
                  </div>
                  <h2 className="font-serif text-2xl text-[#2d2a26]">Adresse de livraison</h2>
                  
                  {isGift && (
                    <div className="bg-[#b8935a]/5 border border-[#b8935a]/20 p-6">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-[#b8935a] mb-4">Destinataire du cadeau</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Prénom du destinataire *</label>
                          <input type="text" value={deliveryFirstName} onChange={e => setDeliveryFirstName(e.target.value)} placeholder="Prénom" className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Nom du destinataire *</label>
                          <input type="text" value={deliveryLastName} onChange={e => setDeliveryLastName(e.target.value)} placeholder="Nom" className={inputClass} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Adresse *</label>
                      <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Numéro et nom de rue" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Complément d'adresse</label>
                      <input type="text" value={addressComplement} onChange={e => setAddressComplement(e.target.value)} placeholder="Appartement, étage, bâtiment..." className={inputClass} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Code postal *</label>
                        <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} placeholder="75001" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Ville *</label>
                        <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Paris" className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Instructions de livraison</label>
                      <textarea value={deliveryInstructions} onChange={e => setDeliveryInstructions(e.target.value)} placeholder="Code d'entrée, digicode, étage..." rows={2} className={`${inputClass} resize-none`} />
                    </div>
                    <div>
                      <label className={labelClass}>Jour de livraison préféré *</label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                        {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'].map(day => (
                          <button
                            key={day}
                            onClick={() => setPreferredDay(day)}
                            className={`py-3 text-sm capitalize transition-all duration-200 ${
                              preferredDay === day
                                ? 'bg-[#b8935a] text-white'
                                : 'bg-white border border-[#e8e0d8] text-[#2d2a26] hover:border-[#b8935a]'
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                      <p className="text-[#2d2a26]/40 text-xs mt-2">Livraison entre 8h et 13h</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(3)}
                    disabled={!canProceedStep3}
                    className="w-full md:w-auto px-12 py-4 bg-[#b8935a] text-white hover:bg-[#b8956a] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continuer →
                  </button>
                </div>
              )}

              {/* STEP 3 — Inscription / Infos perso */}
              {step === 3 && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => setStep(2)} className="text-[#b8935a] text-sm hover:underline">← Retour</button>
                  </div>
                  <h2 className="font-serif text-2xl text-[#2d2a26]">Vos informations</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Prénom *</label>
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Votre prénom" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Nom *</label>
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Votre nom" className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Téléphone *</label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="06 12 34 56 78" className={inputClass} />
                    </div>
                  </div>

                  <div className="bg-white border border-[#e8e0d8] p-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div className="w-5 h-5 mt-0.5 border border-[#b8935a] bg-[#b8935a] flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-xs text-[#2d2a26]/60 leading-relaxed">
                        J'accepte les <a href="/cgv" className="text-[#b8935a] underline">conditions générales de vente</a> et la <a href="/mentions-legales" className="text-[#b8935a] underline">politique de confidentialité</a>. Je comprends que mon abonnement sera renouvelé automatiquement selon la durée choisie.
                      </span>
                    </label>
                  </div>

                  <button
                    onClick={() => setStep(4)}
                    disabled={!canProceedStep4}
                    className="w-full md:w-auto px-12 py-4 bg-[#b8935a] text-white hover:bg-[#b8956a] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continuer vers le paiement →
                  </button>
                </div>
              )}

              {/* STEP 4 — Paiement */}
              {step === 4 && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => setStep(3)} className="text-[#b8935a] text-sm hover:underline">← Retour</button>
                  </div>
                  <h2 className="font-serif text-2xl text-[#2d2a26]">Paiement sécurisé</h2>
                  
                  {/* Simulated payment form */}
                  <div className="bg-white border border-[#e8e0d8] p-6 md:p-8 space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <svg className="w-8 h-5 text-[#2d2a26]/30" viewBox="0 0 32 20" fill="currentColor"><rect width="32" height="20" rx="3"/></svg>
                      <svg className="w-8 h-5 text-[#2d2a26]/30" viewBox="0 0 32 20" fill="currentColor"><rect width="32" height="20" rx="3"/></svg>
                      <span className="text-[10px] tracking-[0.1em] uppercase text-[#2d2a26]/40 ml-auto">Paiement sécurisé SSL</span>
                    </div>
                    
                    <div>
                      <label className={labelClass}>Numéro de carte</label>
                      <input type="text" placeholder="1234 5678 9012 3456" className={inputClass} maxLength={19} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Expiration</label>
                        <input type="text" placeholder="MM/AA" className={inputClass} maxLength={5} />
                      </div>
                      <div>
                        <label className={labelClass}>CVC</label>
                        <input type="text" placeholder="123" className={inputClass} maxLength={4} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Nom sur la carte</label>
                      <input type="text" placeholder="PRÉNOM NOM" className={inputClass} />
                    </div>
                  </div>

                  <button
                    onClick={() => setConfirmed(true)}
                    className="w-full py-4 bg-[#b8935a] text-white hover:bg-[#b8956a] transition-colors duration-300 text-sm tracking-wide"
                  >
                    Confirmer l'abonnement — {totalPrice.toFixed(2)}€
                  </button>
                  
                  <p className="text-[#2d2a26]/40 text-xs text-center">
                    {currentDuration.id === '1' ? 'Sans engagement · Annulation à tout moment' : `Engagement ${currentDuration.months} mois · Annulation possible après`}
                    {' · '}Paiement sécurisé par Stripe
                  </p>
                </div>
              )}

            </div>

            {/* Sidebar récap — always visible */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white border border-[#e8e0d8] p-6 md:p-8">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#b8935a] mb-4">Votre abonnement</p>
                  
                  <h3 className="font-serif text-xl text-[#2d2a26] mb-1">{currentPlan.name}</h3>
                  <p className="text-[#2d2a26]/40 text-xs mb-4">Diamètre {currentPlan.diameter}</p>
                  
                  <div className="space-y-3 text-sm border-t border-[#e8e0d8] pt-4">
                    <div className="flex justify-between">
                      <span className="text-[#2d2a26]/60">Par livraison</span>
                      <div className="text-right">
                        {(currentFrequency.discount > 0 || currentDuration.discount > 0) && (
                          <span className="text-[#2d2a26]/40 text-sm line-through mr-2">{currentPlan.price.toFixed(2)}€</span>
                        )}
                        <span className="text-[#2d2a26] font-medium">{pricePerDelivery.toFixed(2)}€</span>
                      </div>
                    </div>
                    {(currentFrequency.discount > 0 || currentDuration.discount > 0) && (
                      <div className="bg-[#4a7c59]/10 border border-[#4a7c59]/20 px-3 py-2 flex justify-between items-center">
                        <span className="text-[#4a7c59] text-xs font-medium">🎉 Vous économisez</span>
                        <span className="text-[#4a7c59] text-sm font-semibold">-{(currentPlan.price - pricePerDelivery).toFixed(2)}€/livraison</span>
                      </div>
                    )}
                    {currentFrequency.discount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-[#2d2a26]/60">Fidélité {currentFrequency.shortLabel.toLowerCase()}</span>
                        <span className="text-[#b8935a]">-{currentFrequency.discount}%</span>
                      </div>
                    )}
                    {currentDuration.discount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-[#2d2a26]/60">Engagement {currentDuration.months} mois</span>
                        <span className="text-[#b8935a]">-{currentDuration.discount}%</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#2d2a26]/60">Fréquence</span>
                      <span className="text-[#2d2a26]">{currentFrequency.shortLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#2d2a26]/60">Par mois</span>
                      <span className="text-[#2d2a26] font-medium">{monthlyPrice.toFixed(2)}€/mois</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#2d2a26]/60">Durée</span>
                      <span className="text-[#2d2a26]">{currentDuration.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#2d2a26]/60">Livraisons</span>
                      <span className="text-[#2d2a26]">{totalDeliveries} bouquets</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#2d2a26]/60">Livraison</span>
                      <span className="text-[#b8935a]">Gratuite</span>
                    </div>
                    {isGift && (
                      <div className="flex justify-between">
                        <span className="text-[#2d2a26]/60">Cadeau</span>
                        <span className="text-[#2d2a26]">Oui</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-[#e8e0d8] pt-4 mt-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[#2d2a26]/60 text-sm">Total</span>
                      <span className="font-serif text-2xl text-[#2d2a26]">{totalPrice.toFixed(2)}€</span>
                    </div>
                    {currentDuration.months > 1 && (
                      <p className="text-[#2d2a26]/40 text-[10px] text-right mt-1">
                        soit {pricePerDelivery.toFixed(2)}€ × {totalDeliveries} livraisons
                      </p>
                    )}
                    {(currentFrequency.discount > 0 || currentDuration.discount > 0) && totalDeliveries > 1 && (
                      <div className="bg-[#4a7c59]/10 border border-[#4a7c59]/20 px-3 py-2 mt-3 text-center">
                        <span className="text-[#4a7c59] text-xs font-semibold">Économie totale : {((currentPlan.price - pricePerDelivery) * totalDeliveries).toFixed(2)}€</span>
                      </div>
                    )}
                  </div>

                  {/* Vase offert */}
                  {(selectedPlan === 'signature' || selectedPlan === 'prestige') && (
                    <div className="mt-4 bg-[#b8935a]/5 border border-[#b8935a]/20 p-3 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 text-[#b8935a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-[#b8935a]">Vase offert à la 1ère livraison</p>
                    </div>
                  )}
                </div>

                {/* Trust */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="p-3">
                    <svg className="w-6 h-6 mx-auto mb-1.5 text-[#b8935a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                    <p className="text-[9px] tracking-[0.1em] uppercase text-[#2d2a26]/40">Livraison gratuite</p>
                  </div>
                  <div className="p-3">
                    <svg className="w-6 h-6 mx-auto mb-1.5 text-[#b8935a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                    <p className="text-[9px] tracking-[0.1em] uppercase text-[#2d2a26]/40">Paiement sécurisé</p>
                  </div>
                  <div className="p-3">
                    <svg className="w-6 h-6 mx-auto mb-1.5 text-[#b8935a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                    <p className="text-[9px] tracking-[0.1em] uppercase text-[#2d2a26]/40">Sans engagement</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-2xl mx-auto px-4 md:px-6">
            <h2 className="font-serif text-2xl md:text-3xl text-[#2d2a26] text-center mb-12">Questions fréquentes</h2>
            <div className="space-y-0">
              {[
                { q: 'Quand serai-je livré(e) ?', a: 'Votre première livraison est envoyée sous 48h après votre inscription. Les suivantes selon la fréquence choisie, le jour que vous avez sélectionné.' },
                { q: 'Puis-je modifier ou mettre en pause mon abonnement ?', a: 'Oui, à tout moment depuis votre espace client. Vous pouvez changer la fréquence, l\'adresse, mettre en pause ou reprendre quand vous le souhaitez.' },
                { q: 'Les fleurs sont-elles toujours les mêmes ?', a: 'Jamais ! Chaque livraison est une composition unique de saison, créée par notre fleuriste avec les plus belles fleurs disponibles. C\'est la surprise à chaque fois.' },
                { q: 'Puis-je offrir un abonnement ?', a: 'Absolument ! Cochez "C\'est un cadeau" lors de votre commande. Vous pourrez ajouter un message personnalisé et indiquer l\'adresse du destinataire.' },
                { q: 'Comment fonctionne l\'annulation ?', a: 'Pour un abonnement sans engagement, vous pouvez annuler à tout moment. Pour un abonnement avec durée, l\'annulation prend effet à la fin de la période choisie.' },
                { q: 'Et si je ne suis pas chez moi ?', a: 'Le livreur déposera votre bouquet chez un voisin ou en point relais. Vous pouvez également laisser des instructions de livraison lors de votre inscription.' },
              ].map((item, i) => (
                <details key={i} className="border-b border-[#e8e0d8] group">
                  <summary className="py-5 cursor-pointer flex items-center justify-between text-[#2d2a26] hover:text-[#b8935a] transition-colors">
                    <span className="font-serif text-base">{item.q}</span>
                    <span className="text-[#b8935a] text-xl group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <p className="text-[#2d2a26]/60 font-light text-sm leading-relaxed pb-5 pr-8">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

export default function Abonnement() {
  return (
    <Suspense>
      <AbonnementContent />
    </Suspense>
  );
}
