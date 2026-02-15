import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DeliveryCalculator from '@/components/ui/DeliveryCalculator';

export default function Livraison() {
  const faqItems = [
    {
      question: 'À quelle heure sont effectuées les livraisons ?',
      answer: 'Nos livraisons s\'effectuent du mardi au samedi, de 9h à 18h. Pour les commandes urgentes, nous proposons un service express avec supplément.'
    },
    {
      question: 'Puis-je choisir un créneau de livraison ?',
      answer: 'Oui, lors de votre commande, vous pouvez sélectionner un créneau de 2h parmi ceux disponibles. Ce service est gratuit pour toutes nos zones de livraison.'
    },
    {
      question: 'Comment puis-je suivre ma livraison ?',
      answer: 'Vous recevez un SMS avec l\'heure estimée de livraison et un autre SMS de confirmation une fois la livraison effectuée avec photo de la livraison.'
    },
    {
      question: 'Que se passe-t-il si personne n\'est présent lors de la livraison ?',
      answer: 'Nous contactons le destinataire avant la livraison. Si personne n\'est présent, nous laissons les fleurs chez un voisin de confiance ou repassons selon vos préférences.'
    }
  ];

  return (
    <>
      <Header />
      
      <main className="bg-[#faf8f5] min-h-screen pt-20">
        
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-8">
                Livraison de fleurs fraîches
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2d2a26] mb-8 leading-tight">
                Livraison Partout en France
              </h1>
              
              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light max-w-3xl mx-auto leading-relaxed mb-12">
                Vos créations florales livrées avec le plus grand soin depuis Saint-Pair-sur-Mer. 
                Fraîcheur garantie et service personnalisé pour chaque livraison.
              </p>

              {/* Delivery Calculator - Featured */}
              <div className="max-w-2xl mx-auto">
                <DeliveryCalculator showMap={false} className="mb-8" />
              </div>
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                Notre Processus
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Comment Ça Marche
              </h2>
              
              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light max-w-2xl mx-auto leading-relaxed">
                Un processus simple en 3 étapes pour une livraison parfaite.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              
              <div className="text-center">
                <div className="text-6xl font-serif text-[#c4a47a] mb-6">1</div>
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                  Commandez
                </h3>
                <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Sélectionnez votre création florale et personnalisez votre commande. 
                  Choisissez votre date et créneau de livraison.
                </p>
              </div>

              <div className="text-center">
                <div className="text-6xl font-serif text-[#c4a47a] mb-6">2</div>
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                  Préparation Artisanale
                </h3>
                <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Notre fleuriste prépare votre commande avec des fleurs fraîches du jour, 
                  sélectionnées avec soin dans notre atelier.
                </p>
              </div>

              <div className="text-center">
                <div className="text-6xl font-serif text-[#c4a47a] mb-6">3</div>
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                  Livraison Soignée
                </h3>
                <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Livraison en douceur dans notre emballage protecteur spécial. 
                  SMS de confirmation avec photo à la réception.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Zones de livraison avec la carte */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                Zones de Livraison
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Calculez Vos Frais de Livraison
              </h2>
              
              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light max-w-2xl mx-auto leading-relaxed">
                Découvrez nos tarifs selon votre localisation depuis notre atelier de Saint-Pair-sur-Mer.
              </p>
            </div>

            {/* DeliveryCalculator avec carte */}
            <div className="max-w-4xl mx-auto">
              <DeliveryCalculator showMap={true} className="" />
            </div>

            {/* Modes de livraison */}
            <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
              {/* Local */}
              <div className="border border-[#e8e0d8] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#e8e0d8] bg-[#faf8f5]">
                    <svg className="w-5 h-5 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#2d2a26]">Livraison locale</p>
                    <p className="text-[10px] text-[#2d2a26]/40">Rayon de 35 km · 24h (J+1)</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-[#2d2a26]/60 font-light">
                  <div className="flex justify-between border-b border-[#e8e0d8]/50 pb-1"><span>0 a 5 km</span><span>6,00 €</span></div>
                  <div className="flex justify-between border-b border-[#e8e0d8]/50 pb-1"><span>5 a 10 km</span><span>8,00 €</span></div>
                  <div className="flex justify-between"><span>10 a 35 km</span><span>10,00 €</span></div>
                </div>
                <p className="text-[10px] text-[#c4a47a] mt-3">Offerte des 60 € d&apos;achat</p>
              </div>

              {/* Colissimo */}
              <div className="border border-[#e8e0d8] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center text-white" style={{ backgroundColor: '#003DA5' }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide" style={{ color: '#003DA5' }}>COLISSIMO</p>
                    <p className="text-[10px] text-[#2d2a26]/40">La Poste · Suivi inclus · 48h (J+2)</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-[#2d2a26]/60 font-light">
                  <div className="flex justify-between"><span>France metropolitaine</span><span>12,90 €</span></div>
                </div>
                <p className="text-[10px] mt-3" style={{ color: '#003DA5' }}>Offerte des 60 € d&apos;achat</p>
              </div>

              {/* Chronopost */}
              <div className="border border-[#e8e0d8] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center text-white" style={{ backgroundColor: '#D4003C' }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide" style={{ color: '#D4003C' }}>CHRONOPOST</p>
                    <p className="text-[10px] text-[#2d2a26]/40">Express · Avant 18h · 24h (J+1)</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-[#2d2a26]/60 font-light">
                  <div className="flex justify-between"><span>France metropolitaine</span><span>18,90 €</span></div>
                  <div className="flex justify-between"><span>Suivi en temps reel</span><span className="text-[#c4a47a]">Inclus</span></div>
                </div>
                <p className="text-[10px] mt-3" style={{ color: '#D4003C' }}>Offerte des 90 € d&apos;achat</p>
              </div>
            </div>
          </div>
        </section>

        {/* Emballage spécial */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                  Emballage Spécial
                </div>

                <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8 leading-tight">
                  Protection Parfaite
                </h2>

                <div className="w-16 h-px bg-[#c4a47a] mb-8"></div>

                <p className="text-xl text-[#2d2a26] font-light leading-relaxed mb-8">
                  Chaque bouquet voyage dans notre emballage protecteur spécialement conçu 
                  pour préserver la fraîcheur et la beauté de vos fleurs pendant le transport.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#c4a47a] rounded-full mt-2"></div>
                    <span className="text-[#2d2a26] font-light">Protection contre les chocs</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#c4a47a] rounded-full mt-2"></div>
                    <span className="text-[#2d2a26] font-light">Maintien de l'hydratation</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#c4a47a] rounded-full mt-2"></div>
                    <span className="text-[#2d2a26] font-light">Emballage éco-responsable</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#c4a47a] rounded-full mt-2"></div>
                    <span className="text-[#2d2a26] font-light">Présentation soignée à l'arrivée</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://fleuriste-annefreret.com/cdn/shop/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798"
                  alt="Emballage protecteur Anne Freret"
                  className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nos garanties */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                Nos Garanties
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Nos Engagements Qualité
              </h2>
              
              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light max-w-2xl mx-auto leading-relaxed">
                Votre satisfaction est notre priorité.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              
              <div className="text-center">
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                  Fraîcheur 72h
                </h3>
                <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Nous garantissons la fraîcheur de vos fleurs pendant au minimum 72h 
                  après la livraison ou nous les remplaçons.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                  Satisfait ou Remplacé
                </h3>
                <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Si votre bouquet ne correspond pas à vos attentes, 
                  nous le remplaçons gratuitement dans les 24h.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                  Emballage Protecteur
                </h3>
                <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Emballage spécialisé qui préserve vos fleurs pendant le transport 
                  et garantit une présentation parfaite.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                FAQ
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Questions Fréquentes
              </h2>
              
              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light max-w-2xl mx-auto leading-relaxed">
                Toutes les réponses sur nos services de livraison.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-[#c4a47a]/20 pb-8">
                    <h3 className="text-xl font-serif text-[#2d2a26] mb-4">
                      {item.question}
                    </h3>
                    <p className="text-[#2d2a26] font-light leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center mt-16">
              <div className="max-w-2xl mx-auto">
                
                <h3 className="text-3xl font-serif text-[#2d2a26] mb-6">
                  Une Autre Question ?
                </h3>
                
                <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-6"></div>
                
                <p className="text-[#2d2a26] font-light mb-8 leading-relaxed">
                  Notre équipe est disponible pour répondre à toutes vos questions 
                  sur nos services de livraison.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                  <a 
                    href="tel:0233502615"
                    className="bg-[#c4a47a] text-white px-8 py-4 hover:bg-[#b8956a] transition-colors duration-300"
                  >
                    02 33 50 26 15
                  </a>
                  <a 
                    href="/contact"
                    className="text-[#c4a47a] underline hover:text-[#b8956a] transition-colors"
                  >
                    Nous écrire
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}