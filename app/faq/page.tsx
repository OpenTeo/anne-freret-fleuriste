'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ChevronRight, ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Comment passer commande ?",
    answer: "Vous pouvez passer commande de plusieurs façons : directement en magasin (Place de l'Église, 50270 Saint-Pair-sur-Mer), par téléphone (02 33 50 26 15), sur notre site internet annefreret.fr, ou par email (contact@annefreret.fr). Pour les commandes urgentes, nous recommandons le téléphone pour vérifier la disponibilité en temps réel."
  },
  {
    id: 2,
    question: "Quels sont les délais de livraison ?",
    answer: "Nous proposons plusieurs options de livraison : livraison express en 24 à 48 heures ouvrées, livraison standard en 2 à 4 jours ouvrés, ou livraison à date choisie selon nos disponibilités. Pour les événements spéciaux (mariages, obsèques), nous pouvons organiser des livraisons le jour même si la commande est passée avant 14h."
  },
  {
    id: 3,
    question: "Livrez-vous partout en France ?",
    answer: "Oui, nous livrons sur toute la France métropolitaine. Notre zone de livraison prioritaire couvre la Normandie avec des délais raccourcis. Pour la Corse et les DOM-TOM, des conditions particulières s'appliquent - n'hésitez pas à nous contacter pour plus d'informations sur les modalités et tarifs spécifiques."
  },
  {
    id: 4,
    question: "Puis-je choisir une date de livraison ?",
    answer: "Absolument ! Nous proposons un service de livraison à date choisie, particulièrement apprécié pour les anniversaires, fêtes et événements spéciaux. Lors de votre commande, indiquez simplement la date souhaitée. Nous recommandons de commander au moins 48h à l'avance pour garantir la disponibilité du créneau."
  },
  {
    id: 5,
    question: "Comment sont emballées les fleurs ?",
    answer: "Nos fleurs sont emballées avec le plus grand soin dans des contenants spécialisés avec réserve d'eau pour maintenir leur fraîcheur pendant le transport. Nous utilisons des matériaux de protection adaptés et un emballage isotherme si nécessaire. Chaque bouquet est accompagné d'instructions d'entretien pour maximiser sa durée de vie."
  },
  {
    id: 6,
    question: "Que faire si mon bouquet arrive endommagé ?",
    answer: "Si vous constatez que vos fleurs sont fanées ou endommagées à la réception, contactez-nous immédiatement (dans les 24h) avec des photos à l'appui. Nous nous engageons à remplacer gratuitement tout bouquet qui ne correspondrait pas à nos standards de qualité. Votre satisfaction est notre priorité."
  },
  {
    id: 7,
    question: "Puis-je ajouter un message personnalisé ?",
    answer: "Bien sûr ! Nous incluons gratuitement une carte avec votre message personnalisé avec chaque commande. Vous pouvez rédiger votre message lors de la commande en ligne, ou nous le communiquer par téléphone ou email. Nos cartes élégantes s'harmonisent parfaitement avec nos créations florales."
  },
  {
    id: 8,
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons tous les moyens de paiement courants : carte bancaire (Visa, Mastercard, American Express) en ligne et en magasin, espèces et chèques pour les achats en boutique, et virement bancaire pour les commandes importantes. Tous nos paiements en ligne sont sécurisés par protocole SSL."
  },
  {
    id: 9,
    question: "Peut-on annuler ou modifier une commande ?",
    answer: "Les modifications et annulations sont possibles jusqu'à 24h avant la date de livraison prévue. Pour les livraisons le jour même, contactez-nous avant 10h du matin. Après ces délais, nous ne pouvons plus garantir les modifications car la préparation est souvent en cours. Les fleurs fraîches étant périssables, les remboursements ne sont possibles qu'en cas de force majeure."
  },
  {
    id: 10,
    question: "Comment entretenir mon bouquet ?",
    answer: "Pour prolonger la vie de vos fleurs : coupez les tiges en biseau sous l'eau froide, placez-les dans un vase propre avec de l'eau fraîche, changez l'eau tous les 2-3 jours, retirez les feuilles qui trempent dans l'eau, et gardez votre bouquet loin des sources de chaleur. Consultez notre guide complet d'entretien pour plus de conseils détaillés."
  },
  {
    id: 11,
    question: "Proposez-vous des services pour les mariages ?",
    answer: "Oui ! Nous sommes spécialisés dans les décorations florales de mariage. Nous proposons : bouquet de mariée, boutonnières et corsages, centres de table, décoration de cérémonie et de réception, arches florales. Nous offrons une consultation gratuite pour discuter de vos souhaits et établir un devis personnalisé selon votre budget et vos goûts."
  },
  {
    id: 12,
    question: "Y a-t-il un minimum de commande ?",
    answer: "Il n'y a pas de montant minimum pour les commandes en magasin. Pour les livraisons, un montant minimum peut s'appliquer selon la zone géographique (généralement 30€). Pour les livraisons gratuites, le seuil est fixé à 60€. Ces conditions sont clairement indiquées lors de votre commande."
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
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <section className="bg-gray py-6">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-muted hover:text-accent transition-colors">
                Accueil
              </Link>
              <ChevronRight size={16} className="text-muted" />
              <span className="text-primary">FAQ</span>
            </nav>
          </div>
        </section>

        {/* Hero section */}
        <section className="bg-primary text-secondary py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                <HelpCircle size={32} className="text-accent" />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
              Questions fréquentes
            </h1>
            <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
              Trouvez rapidement les réponses à vos questions sur nos services, nos livraisons et l'entretien de vos fleurs.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted mb-8">
                Vous trouverez ci-dessous les réponses aux questions les plus fréquemment posées. 
                Si vous ne trouvez pas l'information recherchée, n'hésitez pas à nous contacter directement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-accent text-white px-6 py-3 rounded-full font-semibold hover:bg-accent/90 transition-colors inline-flex items-center justify-center"
                >
                  Nous contacter
                </Link>
                <Link
                  href="tel:0233XXXXXX"
                  className="border-2 border-accent text-accent px-6 py-3 rounded-full font-semibold hover:bg-accent hover:text-white transition-colors inline-flex items-center justify-center"
                >
                  02 33 50 26 15
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {faqData.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-light-gray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray/30 transition-colors"
                    >
                      <h3 className="font-serif text-lg font-semibold text-primary pr-4">
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0">
                        <ChevronDown
                          size={20}
                          className={`text-accent transition-transform duration-300 ${
                            openItems.includes(item.id) ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>
                    
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openItems.includes(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-5 pt-2">
                        <div className="border-t border-light-gray pt-4">
                          <p className="text-muted leading-relaxed">
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
        <section className="bg-gray py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                Besoin d'aide supplémentaire ?
              </h2>
              <p className="text-lg text-muted mb-8">
                Notre équipe est disponible pour répondre à toutes vos questions spécifiques 
                et vous accompagner dans votre projet floral.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent font-serif font-bold text-xl">?</span>
                  </div>
                  <h3 className="font-serif font-semibold text-primary mb-2">Questions techniques</h3>
                  <p className="text-sm text-muted mb-4">Entretien, conservation, conseils de pro</p>
                  <Link 
                    href="/entretien" 
                    className="text-accent font-medium hover:underline"
                  >
                    Guide d'entretien →
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent font-serif font-bold text-xl">💡</span>
                  </div>
                  <h3 className="font-serif font-semibold text-primary mb-2">Conseils personnalisés</h3>
                  <p className="text-sm text-muted mb-4">Projets spéciaux, mariages, événements</p>
                  <Link 
                    href="/contact" 
                    className="text-accent font-medium hover:underline"
                  >
                    Nous consulter →
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent font-serif font-bold text-xl">📞</span>
                  </div>
                  <h3 className="font-serif font-semibold text-primary mb-2">Support direct</h3>
                  <p className="text-sm text-muted mb-4">Lun-Sam 9h-19h, Dim 10h-17h</p>
                  <Link 
                    href="tel:0233XXXXXX" 
                    className="text-accent font-medium hover:underline"
                  >
                    02 33 50 26 15 →
                  </Link>
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