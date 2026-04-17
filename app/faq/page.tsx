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
  // --- COMMANDES ---
  {
    id: 1,
    question: "Comment passer commande ?",
    answer: "Plusieurs options s'offrent à vous : directement sur notre site internet (24h/24), en boutique dans l'un de nos 5 magasins (Saint-Pair-sur-Mer, Jullouville, Yquelon, Dol-de-Bretagne, Dinard), par téléphone au 02 33 50 26 15, ou par email à contact@fleuriste-annefreret.com. Pour les commandes urgentes, privilégiez le téléphone afin de vérifier la disponibilité en temps réel."
  },
  {
    id: 2,
    question: "Quels sont les délais de livraison ?",
    answer: "Livraison locale (rayon 35 km) : en 24h, du mardi au samedi. Colissimo (France métropolitaine) : 48h ouvrées. Chronopost express : 24h ouvrées, hors week-end. Pour une livraison le dimanche, seule la livraison locale est possible (nous contacter). Pour les événements spéciaux (mariages, obsèques), nous recommandons de commander la veille avant 17h pour garantir la préparation et la livraison. Contactez-nous par téléphone pour les urgences."
  },
  {
    id: 3,
    question: "Peut-on annuler ou modifier une commande ?",
    answer: "Toute modification ou annulation est possible jusqu'à 24h avant la date de livraison prévue. Pour les commandes en livraison le jour même, contactez-nous avant 10h. Au-delà de ces délais, la préparation est généralement en cours et nous ne pouvons plus garantir de changement."
  },
  {
    id: 4,
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "En ligne : carte bancaire (Visa, Mastercard, American Express) via notre paiement sécurisé Stripe. En boutique : carte bancaire, espèces et chèques. Pour les commandes importantes (mariages, événements), le virement bancaire est également possible."
  },
  // --- LIVRAISON ---
  {
    id: 5,
    question: "Quels sont vos modes de livraison ?",
    answer: "Nous proposons deux modes de livraison. La livraison locale (rayon de 35 km autour de Saint-Pair-sur-Mer) : livrée le jour même pour toute commande passée avant 12h, du mardi au samedi. Et la livraison Chronopost Express (France métropolitaine) : livrée en 24h (J+1), du lundi au samedi avant 18h."
  },
  {
    id: 6,
    question: "Combien coûte la livraison ?",
    answer: "Livraison locale : de 6 € à 10 € selon la distance (0-5 km : 6 €, 5-10 km : 8 €, 10-35 km : 10 €), offerte dès 60 € d'achat. Livraison Chronopost : 11,99 €, offerte dès 90 € d'achat. Dans les deux cas, le suivi est inclus."
  },
  {
    id: 7,
    question: "Puis-je choisir une date de livraison ?",
    answer: "Oui ! Lors de votre commande, vous pouvez sélectionner la date de livraison souhaitée. Nous recommandons de commander au moins 48h à l'avance pour les événements importants. À noter : Chronopost ne livre pas le dimanche, seule la livraison locale est disponible ce jour-là (sur demande)."
  },
  {
    id: 8,
    question: "Comment sont emballées les fleurs pour l'expédition ?",
    answer: "Chaque bouquet est préparé avec soin : les tiges sont placées dans une réserve d'eau, protégées par un emballage adapté et, si nécessaire, isotherme pour les périodes de chaleur ou de froid. L'objectif est que vos fleurs arrivent aussi fraîches qu'en boutique."
  },
  {
    id: 9,
    question: "Que faire si mon bouquet arrive endommagé ?",
    answer: "Contactez-nous dans les 24h suivant la réception avec des photos du bouquet. Nous nous engageons à trouver une solution (remplacement ou remboursement) pour tout bouquet qui ne correspondrait pas à nos standards de qualité. Appelez-nous au 02 33 50 26 15 ou écrivez-nous via le formulaire de contact."
  },
  // --- ABONNEMENTS ---
  {
    id: 10,
    question: "Comment fonctionnent vos abonnements fleurs ?",
    answer: "Nous proposons trois formules d'abonnement (Essentiel, Signature, Prestige) avec une fréquence au choix : hebdomadaire, bi-mensuelle ou mensuelle. À chaque livraison, notre équipe compose un bouquet de saison unique. Vous pouvez mettre en pause ou annuler votre abonnement à tout moment depuis votre espace client."
  },
  // --- BOUTIQUES ---
  {
    id: 11,
    question: "Où se trouvent vos boutiques ?",
    answer: "Nous avons 5 boutiques : Saint-Pair-sur-Mer (39 Place du Général de Gaulle — 02 33 50 26 15), Jullouville (7 Avenue Armand Jullou — 02 33 91 71 07), Yquelon (577 Route de Villedieu — 02 61 90 04 00), Dol-de-Bretagne (17 Grande Rue des Stuarts — 02 99 48 03 63) et Dinard (5 Place de la République — 02 99 88 34 33). Les horaires détaillés sont sur notre page Contact."
  },
  // --- MARIAGES & ÉVÉNEMENTS ---
  {
    id: 12,
    question: "Proposez-vous des services pour les mariages ?",
    answer: "Oui, c'est l'une de nos spécialités ! Avec plus de 1 000 mariages accompagnés, nous proposons : bouquet de mariée, boutonnières, corsages, centres de table, décoration de cérémonie et de réception, arches florales. Une consultation gratuite est disponible pour discuter de votre projet. Remplissez notre formulaire de devis mariage ou contactez-nous directement."
  },
  {
    id: 13,
    question: "Réalisez-vous des compositions pour les obsèques ?",
    answer: "Oui, nous réalisons des compositions florales de deuil avec respect et délicatesse : gerbes, couronnes, coussins, dessus de cercueil. Pour les obsèques, nous recommandons de nous contacter par téléphone au 02 33 50 26 15 afin de garantir les délais de préparation."
  },
  // --- ENTRETIEN ---
  {
    id: 14,
    question: "Comment entretenir mon bouquet pour qu'il dure plus longtemps ?",
    answer: "Quelques gestes simples prolongent la vie de vos fleurs : recoupez les tiges en biseau (2-3 cm) sous l'eau froide dès réception, utilisez un vase propre avec de l'eau fraîche, changez l'eau tous les 2 jours, retirez les feuilles qui trempent dans l'eau, éloignez le bouquet des fruits (l'éthylène accélère le flétrissement) et des sources de chaleur directe. Pour des conseils détaillés, consultez notre guide d'entretien."
  },
  {
    id: 15,
    question: "Y a-t-il un minimum de commande ?",
    answer: "Aucun minimum en boutique. Pour les livraisons en ligne, le panier minimum est de 25 €. La livraison locale est offerte dès 60 € d'achat, et la livraison Chronopost est offerte dès 90 €."
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
