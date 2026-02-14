'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { 
  ChevronRight, 
  Package, 
  Scissors, 
  Droplets, 
  RefreshCw,
  Thermometer,
  Sun,
  Apple,
  Zap,
  Clock,
  Heart,
  Lightbulb
} from 'lucide-react';

interface FlowerLifespan {
  name: string;
  duration: string;
  tips: string;
}

const flowerLifespans: FlowerLifespan[] = [
  {
    name: "Roses",
    duration: "7-10 jours",
    tips: "Recoupez les tiges tous les 2 jours et changez l'eau quotidiennement"
  },
  {
    name: "Tulipes", 
    duration: "5-7 jours",
    tips: "Gardez-les au frais et recoupez régulièrement, elles continuent de grandir"
  },
  {
    name: "Lisianthus",
    duration: "10-14 jours",
    tips: "Très résistants, retirez simplement les fleurs fanées au fur et à mesure"
  },
  {
    name: "Pivoines",
    duration: "5-8 jours",
    tips: "Fragiles, manipulez avec précaution et gardez au frais"
  },
  {
    name: "Chrysanthèmes",
    duration: "14-21 jours",
    tips: "Longue durée de vie, parfaits pour les compositions durables"
  },
  {
    name: "Gerberas",
    duration: "7-10 jours", 
    tips: "Attention à l'eau stagnante, changez l'eau tous les 2 jours"
  },
  {
    name: "Œillets",
    duration: "10-14 jours",
    tips: "Très résistants, coupez au-dessus des nœuds pour favoriser l'absorption"
  },
  {
    name: "Freesias",
    duration: "5-7 jours",
    tips: "Délicats et parfumés, gardez-les dans un endroit frais"
  }
];

export default function Entretien() {
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
              <span className="text-primary">Entretien des fleurs</span>
            </nav>
          </div>
        </section>

        {/* Hero section */}
        <section className="bg-primary text-secondary py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                <Heart size={32} className="text-accent" />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
              Entretien des fleurs
            </h1>
            <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
              Découvrez tous nos conseils d'expert pour prolonger la beauté et la fraîcheur de vos bouquets.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted mb-8">
                Avec les bons gestes et un peu d'attention, vous pouvez profiter de vos fleurs fraîches 
                bien plus longtemps. Suivez nos conseils de professionnels pour maximiser leur durée de vie.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: À la réception */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-accent/10 rounded-full px-6 py-2 mb-4">
                  <Package className="text-accent mr-2" size={20} />
                  <span className="text-accent font-medium">Étape 1</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-primary mb-4">
                  À la réception de votre bouquet
                </h2>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                  Les premiers gestes sont cruciaux pour garantir la longévité de vos fleurs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-light-gray">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Package className="text-accent" size={24} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-primary mb-3">
                    Déballez délicatement
                  </h3>
                  <p className="text-muted">
                    Retirez l'emballage avec précaution en évitant de tirer sur les tiges. 
                    Gardez l'eau de transport si les fleurs y baignent encore.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-light-gray">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Scissors className="text-accent" size={24} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-primary mb-3">
                    Recoupez les tiges
                  </h3>
                  <p className="text-muted">
                    Coupez 2-3 cm des tiges en biseau sous l'eau froide courante. 
                    Cela évite la formation de bulles d'air qui bloqueraient l'absorption.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-light-gray">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Droplets className="text-accent" size={24} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-primary mb-3">
                    Plongez dans l'eau fraîche
                  </h3>
                  <p className="text-muted">
                    Placez immédiatement les fleurs dans un vase propre rempli d'eau fraîche. 
                    L'eau doit couvrir au moins la moitié des tiges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Entretien quotidien */}
        <section className="py-12 bg-gray/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-accent/10 rounded-full px-6 py-2 mb-4">
                  <RefreshCw className="text-accent mr-2" size={20} />
                  <span className="text-accent font-medium">Étape 2</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-primary mb-4">
                  Entretien quotidien
                </h2>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                  Quelques minutes chaque jour suffisent pour maintenir vos fleurs en parfait état.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Droplets className="text-accent" size={24} />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-primary mb-3">
                    Changez l'eau
                  </h3>
                  <p className="text-muted text-sm">
                    Tous les 2-3 jours ou dès que l'eau devient trouble. 
                    Rincez bien le vase pour éliminer les bactéries.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Scissors className="text-accent" size={24} />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-primary mb-3">
                    Recoupez les tiges
                  </h3>
                  <p className="text-muted text-sm">
                    À chaque changement d'eau, recoupez 1 cm en biseau 
                    pour maintenir une bonne absorption.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Package className="text-accent" size={24} />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-primary mb-3">
                    Retirez les feuilles
                  </h3>
                  <p className="text-muted text-sm">
                    Enlevez les feuilles qui trempent dans l'eau 
                    et les fleurs fanées pour éviter les bactéries.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <RefreshCw className="text-accent" size={24} />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-primary mb-3">
                    Vaporisez légèrement
                  </h3>
                  <p className="text-muted text-sm">
                    Un léger spray d'eau sur les pétales 
                    (sauf pour les fleurs fragiles) maintient l'hydratation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Astuces de pro */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-accent/10 rounded-full px-6 py-2 mb-4">
                  <Lightbulb className="text-accent mr-2" size={20} />
                  <span className="text-accent font-medium">Étape 3</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-primary mb-4">
                  Astuces de pro
                </h2>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                  Les secrets de nos fleuristes pour des bouquets qui durent plus longtemps.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Thermometer className="text-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                        Température idéale
                      </h3>
                      <p className="text-muted">
                        Maintenez vos fleurs entre 18-22°C. Évitez les zones trop chaudes 
                        comme près des radiateurs ou cheminées qui accélèrent le flétrissement.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sun className="text-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                        Évitez le soleil direct
                      </h3>
                      <p className="text-muted">
                        Placez vos fleurs dans un endroit lumineux mais sans soleil direct, 
                        qui dessèche rapidement les pétales et décolore les couleurs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Apple className="text-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                        Éloignez des fruits mûrs
                      </h3>
                      <p className="text-muted">
                        Les fruits mûrs dégagent de l'éthylène, un gaz qui accélère 
                        le vieillissement des fleurs. Gardez-les à distance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="text-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                        Le truc du sucre
                      </h3>
                      <p className="text-muted">
                        Ajoutez une cuillère à café de sucre dans l'eau : il nourrit les fleurs. 
                        Alternativement, quelques gouttes d'eau de javel désinfectent l'eau.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Droplets className="text-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                        Eau tiède pour certaines fleurs
                      </h3>
                      <p className="text-muted">
                        Les gerberas et tournesols préfèrent l'eau tiède qui facilite 
                        l'absorption. Testez la température avec votre poignet.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <RefreshCw className="text-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                        Réveil matinal
                      </h3>
                      <p className="text-muted">
                        Plongez les tiges dans l'eau froide le matin : les fleurs 
                        "boivent" plus efficacement aux heures fraîches de la journée.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Durée de vie par type */}
        <section className="py-12 bg-gray/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-accent/10 rounded-full px-6 py-2 mb-4">
                  <Clock className="text-accent mr-2" size={20} />
                  <span className="text-accent font-medium">Étape 4</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-primary mb-4">
                  Durée de vie par type de fleur
                </h2>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                  Chaque variété a ses spécificités. Connaître la durée de vie moyenne vous aide à mieux anticiper.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {flowerLifespans.map((flower, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-light-gray hover:shadow-md transition-shadow">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-accent font-serif font-bold text-lg">
                          {flower.duration.split('-')[0]}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-primary">
                        {flower.name}
                      </h3>
                      <p className="text-accent font-medium">
                        {flower.duration}
                      </p>
                    </div>
                    <p className="text-muted text-sm text-center">
                      {flower.tips}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-accent/5 p-6 rounded-lg border border-accent/20">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                      Bon à savoir
                    </h3>
                    <p className="text-muted">
                      Ces durées sont indicatives et peuvent varier selon les conditions d'entretien, 
                      la saison et la fraîcheur des fleurs à l'achat. Avec nos conseils, 
                      vous pouvez souvent dépasser ces estimations !
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section bonus: SOS fleurs fanées */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-primary text-secondary p-8 rounded-lg">
                <div className="text-center mb-8">
                  <h2 className="font-serif text-3xl font-bold mb-4">
                    🆘 SOS Fleurs fanées
                  </h2>
                  <p className="text-lg text-secondary/80">
                    Vos fleurs montrent des signes de fatigue ? Tentez ces gestes de secours !
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="text-accent" size={24} />
                    </div>
                    <h3 className="font-serif font-semibold mb-2">Bain glacé</h3>
                    <p className="text-secondary/80 text-sm">
                      Plongez les tiges dans l'eau très froide pendant 1h. 
                      Effet choc garanti !
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Droplets className="text-accent" size={24} />
                    </div>
                    <h3 className="font-serif font-semibold mb-2">Douche fraîche</h3>
                    <p className="text-secondary/80 text-sm">
                      Vaporisez délicatement les pétales avec 
                      de l'eau fraîche pour les réhydrater.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Scissors className="text-accent" size={24} />
                    </div>
                    <h3 className="font-serif font-semibold mb-2">Coupe radicale</h3>
                    <p className="text-secondary/80 text-sm">
                      Coupez 3-4 cm des tiges sous l'eau courante. 
                      Parfois, ça relance tout !
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                Une question sur l'entretien de vos fleurs ?
              </h2>
              <p className="text-lg text-muted mb-8">
                Notre équipe d'experts est à votre disposition pour vous conseiller 
                et vous aider à prolonger la beauté de vos créations florales.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/faq"
                  className="bg-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-accent/90 transition-colors"
                >
                  Consulter la FAQ
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-accent text-accent px-8 py-3 rounded-full font-semibold hover:bg-accent hover:text-white transition-colors"
                >
                  Nous contacter
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