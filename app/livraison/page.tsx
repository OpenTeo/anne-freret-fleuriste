import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DeliveryCalculator from '@/components/ui/DeliveryCalculator';
import { Truck, Clock, MapPin, Package, Shield, Heart, Award, CheckCircle } from 'lucide-react';
import Image from 'next/image';

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
      
      <main className="pt-20 bg-[#faf8f5]">
        
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-b from-[#f5f3f0] to-[#faf8f5]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Truck className="w-6 h-6 text-[#b8956a]" />
                <span className="text-[#b8956a] text-sm font-medium uppercase tracking-wider">
                  Livraison de fleurs fraîches
                </span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2d2a26] mb-6">
                Livraison
                <span className="text-gradient block md:inline md:ml-4">partout en France</span>
              </h1>
              
              <p className="text-xl text-[#6b6560] max-w-3xl mx-auto leading-relaxed mb-8">
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

        {/* How It Works Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-6">
                Comment ça
                <span className="text-gradient block md:inline md:ml-4">marche</span>
              </h2>
              <p className="text-xl text-[#6b6560] max-w-2xl mx-auto">
                Un processus simple en 3 étapes pour une livraison parfaite.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Step 1 */}
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#b8956a] to-[#a08455] rounded-full 
                                flex items-center justify-center mx-auto shadow-lg">
                    <Package className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#4caf50] text-white rounded-full 
                                flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                </div>
                <h3 className="font-serif text-xl text-[#2d2a26] mb-3">
                  Commandez
                </h3>
                <p className="text-[#6b6560] leading-relaxed">
                  Sélectionnez votre création florale et personnalisez votre commande. 
                  Choisissez votre date et créneau de livraison.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#b8956a] to-[#a08455] rounded-full 
                                flex items-center justify-center mx-auto shadow-lg">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#4caf50] text-white rounded-full 
                                flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                </div>
                <h3 className="font-serif text-xl text-[#2d2a26] mb-3">
                  Préparation artisanale
                </h3>
                <p className="text-[#6b6560] leading-relaxed">
                  Notre fleuriste prépare votre commande avec des fleurs fraîches du jour, 
                  sélectionnées avec soin dans notre atelier.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#b8956a] to-[#a08455] rounded-full 
                                flex items-center justify-center mx-auto shadow-lg">
                    <Truck className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#4caf50] text-white rounded-full 
                                flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                </div>
                <h3 className="font-serif text-xl text-[#2d2a26] mb-3">
                  Livraison soignée
                </h3>
                <p className="text-[#6b6560] leading-relaxed">
                  Livraison en douceur dans notre emballage protecteur spécial. 
                  SMS de confirmation avec photo à la réception.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Zones Map Section */}
        <section className="py-24 bg-gradient-to-b from-[#f5f3f0] to-[#faf8f5]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-6">
                Nos zones de
                <span className="text-gradient block md:inline md:ml-4">livraison</span>
              </h2>
              <p className="text-xl text-[#6b6560] max-w-2xl mx-auto">
                Découvrez nos tarifs selon votre localisation depuis notre atelier de Saint-Pair-sur-Mer.
              </p>
            </div>

            {/* Visual Delivery Zones Map */}
            <div className="max-w-4xl mx-auto">
              <DeliveryCalculator showMap={true} className="" />
            </div>
          </div>
        </section>

        {/* Special Packaging Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0295/6292/9231/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798"
                    alt="Emballage spécial livraison Anne Freret"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center space-x-2 mb-6">
                  <Package className="w-6 h-6 text-[#b8956a]" />
                  <span className="text-[#b8956a] text-sm font-medium uppercase tracking-wider">
                    Emballage spécial
                  </span>
                </div>

                <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-6">
                  Protection parfaite
                  <span className="text-gradient block md:inline md:ml-3">pour vos fleurs</span>
                </h2>

                <p className="text-lg text-[#6b6560] leading-relaxed mb-8">
                  Chaque bouquet voyage dans notre emballage protecteur spécialement conçu 
                  pour préserver la fraîcheur et la beauté de vos fleurs pendant le transport.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#4caf50] rounded-full"></div>
                    <span className="text-[#2d2a26] font-medium">Protection contre les chocs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#4caf50] rounded-full"></div>
                    <span className="text-[#2d2a26] font-medium">Maintien de l'hydratation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#4caf50] rounded-full"></div>
                    <span className="text-[#2d2a26] font-medium">Emballage éco-responsable</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#4caf50] rounded-full"></div>
                    <span className="text-[#2d2a26] font-medium">Présentation soignée à l'arrivée</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantees Section */}
        <section className="py-24 bg-gradient-to-b from-[#f5f3f0] to-[#faf8f5]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-6">
                Nos
                <span className="text-gradient block md:inline md:ml-4">garanties</span>
              </h2>
              <p className="text-xl text-[#6b6560] max-w-2xl mx-auto">
                Votre satisfaction est notre priorité. Découvrez nos engagements qualité.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Guarantee 1 */}
              <div className="bg-white rounded-2xl p-8 border border-[#e8e0d8] text-center 
                            shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4caf50]/20 to-[#4caf50]/5 rounded-3xl 
                              flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-[#4caf50]" />
                </div>
                <h3 className="font-serif text-xl text-[#2d2a26] mb-3">
                  Fraîcheur 72h
                </h3>
                <p className="text-[#6b6560] leading-relaxed">
                  Nous garantissons la fraîcheur de vos fleurs pendant au minimum 72h 
                  après la livraison ou nous les remplaçons.
                </p>
              </div>

              {/* Guarantee 2 */}
              <div className="bg-white rounded-2xl p-8 border border-[#e8e0d8] text-center 
                            shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-[#b8956a]/20 to-[#b8956a]/5 rounded-3xl 
                              flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-[#b8956a]" />
                </div>
                <h3 className="font-serif text-xl text-[#2d2a26] mb-3">
                  Satisfait ou remplacé
                </h3>
                <p className="text-[#6b6560] leading-relaxed">
                  Si votre bouquet ne correspond pas à vos attentes, 
                  nous le remplaçons gratuitement dans les 24h.
                </p>
              </div>

              {/* Guarantee 3 */}
              <div className="bg-white rounded-2xl p-8 border border-[#e8e0d8] text-center 
                            shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2196f3]/20 to-[#2196f3]/5 rounded-3xl 
                              flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-[#2196f3]" />
                </div>
                <h3 className="font-serif text-xl text-[#2d2a26] mb-3">
                  Emballage protecteur
                </h3>
                <p className="text-[#6b6560] leading-relaxed">
                  Emballage spécialisé qui préserve vos fleurs pendant le transport 
                  et garantit une présentation parfaite.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-6">
                Questions
                <span className="text-gradient block md:inline md:ml-4">Fréquentes</span>
              </h2>
              <p className="text-xl text-[#6b6560] max-w-2xl mx-auto">
                Toutes les réponses sur nos services de livraison.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <details 
                    key={index}
                    className="bg-[#faf8f5] rounded-2xl border border-[#e8e0d8] 
                             hover:border-[#b8956a]/30 transition-all group"
                  >
                    <summary className="p-6 cursor-pointer font-medium text-[#2d2a26] 
                                     hover:text-[#b8956a] transition-colors 
                                     flex items-center justify-between">
                      <span>{item.question}</span>
                      <CheckCircle className="w-5 h-5 text-[#b8956a] group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-[#6b6560] leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-[#f5f0eb] to-[#faf8f5] rounded-2xl p-8 
                            border border-[#e8e0d8] max-w-2xl mx-auto">
                <h3 className="font-serif text-2xl text-[#2d2a26] mb-4">
                  Une autre question ?
                </h3>
                <p className="text-[#6b6560] mb-6">
                  Notre équipe est disponible pour répondre à toutes vos questions 
                  sur nos services de livraison.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <a 
                    href="tel:+33233043782"
                    className="btn-primary px-6 py-3 rounded-lg font-medium text-white"
                    style={{ backgroundColor: '#b8956a' }}
                  >
                    02 33 50 26 15
                  </a>
                  <a 
                    href="mailto:contact@anne-freret.fr"
                    className="btn-secondary px-6 py-3 rounded-lg font-medium border border-[#b8956a] 
                             text-[#b8956a] hover:bg-[#b8956a] hover:text-white transition-colors"
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