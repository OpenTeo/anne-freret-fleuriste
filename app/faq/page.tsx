'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Comment passer commande ?",
    answer: "Vous pouvez passer commande de plusieurs façons : directement en magasin (39 Place du Général de Gaulle, 50270 Saint-Pair-sur-Mer), par téléphone (02 33 50 26 15), sur notre site internet, ou par email (contact@fleuriste-annefreret.com). Pour les commandes urgentes, nous recommandons le téléphone pour vérifier la disponibilité en temps réel."
  },
  {
    id: 2,
    question: "Quels sont les délais de livraison ?",
    answer: "Livraison locale (rayon 35 km) : en 24h, du mardi au samedi. Colissimo (France métropolitaine) : 48h ouvrées, du lundi au samedi — La Poste ne livre pas le dimanche. Chronopost express : 24h, du lundi au samedi avant 18h. Pour une livraison le dimanche, seule la livraison locale est possible (nous contacter). Pour les événements spéciaux (mariages, obsèques), nous pouvons organiser des livraisons le jour même si la commande est passée avant 14h."
  },
  {
    id: 3,
    question: "Livrez-vous partout en France ?",
    answer: "Oui, nous livrons sur toute la France métropolitaine. Notre zone de livraison prioritaire couvre la Normandie avec des délais raccourcis. Pour la Corse et les DOM-TOM, des conditions particulières s'appliquent - n'hésitez pas à nous contacter pour plus d'informations."
  },
  {
    id: 4,
    question: "Puis-je choisir une date de livraison ?",
    answer: "Absolument ! Nous proposons un service de livraison à date choisie, particulièrement apprécié pour les anniversaires, fêtes et événements spéciaux. Lors de votre commande, indiquez simplement la date souhaitée. Nous recommandons de commander au moins 48h à l'avance. Attention : pour une livraison le dimanche, seule la livraison locale est disponible (Colissimo et Chronopost ne livrent pas le dimanche)."
  },
  {
    id: 5,
    question: "Comment sont emballées les fleurs ?",
    answer: "Nos fleurs sont emballées avec le plus grand soin dans des contenants spécialisés avec réserve d'eau pour maintenir leur fraîcheur pendant le transport. Nous utilisons des matériaux de protection adaptés et un emballage isotherme si nécessaire."
  },
  {
    id: 6,
    question: "Que faire si mon bouquet arrive endommagé ?",
    answer: "Si vous constatez que vos fleurs sont fanées ou endommagées à la réception, contactez-nous immédiatement (dans les 24h) avec des photos à l'appui. Nous nous engageons à remplacer gratuitement tout bouquet qui ne correspondrait pas à nos standards de qualité."
  },
  {
    id: 7,
    question: "Puis-je ajouter un message personnalisé ?",
    answer: "Bien sûr ! Nous incluons gratuitement une carte avec votre message personnalisé avec chaque commande. Vous pouvez rédiger votre message lors de la commande en ligne, ou nous le communiquer par téléphone ou email."
  },
  {
    id: 8,
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons tous les moyens de paiement courants : carte bancaire (Visa, Mastercard, American Express) en ligne et en magasin, espèces et chèques pour les achats en boutique, et virement bancaire pour les commandes importantes."
  },
  {
    id: 9,
    question: "Peut-on annuler ou modifier une commande ?",
    answer: "Les modifications et annulations sont possibles jusqu'à 24h avant la date de livraison prévue. Pour les livraisons le jour même, contactez-nous avant 10h du matin. Après ces délais, nous ne pouvons plus garantir les modifications car la préparation est souvent en cours."
  },
  {
    id: 10,
    question: "Comment entretenir mon bouquet ?",
    answer: "Pour prolonger la vie de vos fleurs : coupez les tiges en biseau sous l'eau froide, placez-les dans un vase propre avec de l'eau fraîche, changez l'eau tous les 2-3 jours, retirez les feuilles qui trempent dans l'eau, et gardez votre bouquet loin des sources de chaleur."
  },
  {
    id: 11,
    question: "Proposez-vous des services pour les mariages ?",
    answer: "Oui ! Nous sommes spécialisés dans les décorations florales de mariage. Nous proposons : bouquet de mariée, boutonnières et corsages, centres de table, décoration de cérémonie et de réception, arches florales. Consultation gratuite disponible."
  },
  {
    id: 12,
    question: "Y a-t-il un minimum de commande ?",
    answer: "Il n'y a pas de montant minimum pour les commandes en magasin. Pour les livraisons, un montant minimum peut s'appliquer selon la zone géographique (généralement 30€). Pour les livraisons gratuites, le seuil est fixé à 60€."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-20">
        
        {/* Breadcrumb */}
        <section className="py-6 border-b border-[#b8935a]/20">
          <div className="container mx-auto px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-[#b8935a] hover:text-[#b8956a] transition-colors">
                Accueil
              </Link>
              <span className="text-[#b8935a]">/</span>
              <span className="text-[#2d2a26] font-light">FAQ</span>
            </nav>
          </div>
        </section>

        {/* Hero section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-8">
              Questions Fréquentes
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2d2a26] mb-8 leading-tight">
              Toutes les Réponses à Vos Questions
            </h1>
            
            <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>
            
            <p className="text-xl text-[#2d2a26] font-light max-w-2xl mx-auto leading-relaxed">
              Trouvez rapidement les réponses à vos questions sur nos services, nos livraisons et l'entretien de vos fleurs.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="pb-12">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-[#2d2a26] font-light mb-8 leading-relaxed">
                Vous trouverez ci-dessous les réponses aux questions les plus fréquemment posées. 
                Si vous ne trouvez pas l'information recherchée, n'hésitez pas à nous contacter directement.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <Link
                  href="/contact"
                  className="bg-[#b8935a] text-white px-8 py-4 hover:bg-[#b8956a] transition-colors duration-300"
                >
                  Nous Contacter
                </Link>
                <Link
                  href="tel:0233502615"
                  className="text-[#b8935a] underline hover:text-[#b8956a] transition-colors py-4"
                >
                  02 33 50 26 15
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-2">
                {faqData.map((item) => (
                  <div
                    key={item.id}
                    className="border border-[#b8935a]/20 hover:border-[#b8935a]/40 transition-colors"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-[#faf8f5] transition-colors"
                    >
                      <h3 className="text-lg font-serif text-[#2d2a26] pr-4 leading-tight">
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0">
                        <svg
                          className={`w-5 h-5 text-[#b8935a] transition-transform duration-300 ${
                            openItems.includes(item.id) ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openItems.includes(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-8 pb-6">
                        <div className="border-t border-[#b8935a]/20 pt-6">
                          <p className="text-[#2d2a26] font-light leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Help Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                Aide Supplémentaire
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif text-[#2d2a26] mb-8">
                Besoin d'un Conseil Personnalisé ?
              </h2>
              
              <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light leading-relaxed">
                Notre équipe est disponible pour répondre à toutes vos questions spécifiques 
                et vous accompagner dans votre projet floral.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-white p-8 text-center">
                <h3 className="text-xl font-serif text-[#2d2a26] mb-4">Questions Techniques</h3>
                <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light mb-6 leading-relaxed">
                  Entretien, conservation, conseils de pro
                </p>
                <Link 
                  href="/entretien" 
                  className="text-[#b8935a] underline hover:text-[#b8956a] transition-colors"
                >
                  Guide d'entretien
                </Link>
              </div>

              <div className="bg-white p-8 text-center">
                <h3 className="text-xl font-serif text-[#2d2a26] mb-4">Conseils Personnalisés</h3>
                <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light mb-6 leading-relaxed">
                  Projets spéciaux, mariages, événements
                </p>
                <Link 
                  href="/contact" 
                  className="text-[#b8935a] underline hover:text-[#b8956a] transition-colors"
                >
                  Nous consulter
                </Link>
              </div>

              <div className="bg-white p-8 text-center">
                <h3 className="text-xl font-serif text-[#2d2a26] mb-4">Support Direct</h3>
                <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light mb-6 leading-relaxed">
                  Lun-Sam 9h-19h, Dim 10h-17h
                </p>
                <Link 
                  href="tel:0233502615" 
                  className="text-[#b8935a] underline hover:text-[#b8956a] transition-colors"
                >
                  02 33 50 26 15
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}