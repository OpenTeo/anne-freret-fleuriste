import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

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
      <main className="bg-[#faf8f5] min-h-screen pt-20">
        
        {/* Breadcrumb */}
        <section className="py-6 border-b border-[#b8935a]/20">
          <div className="container mx-auto px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-[#b8935a] hover:text-[#b8956a] transition-colors">
                Accueil
              </Link>
              <span className="text-[#b8935a]">/</span>
              <span className="text-[#2d2a26] font-light">Entretien des fleurs</span>
            </nav>
          </div>
        </section>

        {/* Hero section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-8">
              Guide d'Entretien
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2d2a26] mb-8 leading-tight">
              Prolongez la Beauté de Vos Fleurs
            </h1>
            
            <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>
            
            <p className="text-xl text-[#2d2a26] font-light max-w-2xl mx-auto leading-relaxed">
              Découvrez tous nos conseils d'expert pour prolonger la beauté et la fraîcheur de vos bouquets.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="pb-12">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-[#2d2a26] font-light leading-relaxed">
                Avec les bons gestes et un peu d'attention, vous pouvez profiter de vos fleurs fraîches 
                bien plus longtemps. Suivez nos conseils de professionnels pour maximiser leur durée de vie.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: À la réception */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                Étape 1
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                À la Réception de Votre Bouquet
              </h2>
              
              <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light max-w-2xl mx-auto leading-relaxed">
                Les premiers gestes sont cruciaux pour garantir la longévité de vos fleurs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              
              <div className="text-center">
                <div className="text-6xl font-serif text-[#b8935a] mb-6">1</div>
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                  Déballez Délicatement
                </h3>
                <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Retirez l'emballage avec précaution en évitant de tirer sur les tiges. 
                  Gardez l'eau de transport si les fleurs y baignent encore.
                </p>
              </div>

              <div className="text-center">
                <div className="text-6xl font-serif text-[#b8935a] mb-6">2</div>
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                  Recoupez les Tiges
                </h3>
                <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Coupez 2-3 cm des tiges en biseau sous l'eau froide courante. 
                  Cela évite la formation de bulles d'air qui bloqueraient l'absorption.
                </p>
              </div>

              <div className="text-center">
                <div className="text-6xl font-serif text-[#b8935a] mb-6">3</div>
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                  Plongez dans l'Eau Fraîche
                </h3>
                <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Placez immédiatement les fleurs dans un vase propre rempli d'eau fraîche. 
                  L'eau doit couvrir au moins la moitié des tiges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Entretien quotidien */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                Étape 2
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Entretien Quotidien
              </h2>
              
              <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light max-w-2xl mx-auto leading-relaxed">
                Quelques minutes chaque jour suffisent pour maintenir vos fleurs en parfait état.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              <div className="text-center">
                <h3 className="text-xl font-serif text-[#2d2a26] mb-4">
                  Changez l'Eau
                </h3>
                <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Tous les 2-3 jours ou dès que l'eau devient trouble. 
                  Rincez bien le vase pour éliminer les bactéries.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-serif text-[#2d2a26] mb-4">
                  Recoupez les Tiges
                </h3>
                <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  À chaque changement d'eau, recoupez 1 cm en biseau 
                  pour maintenir une bonne absorption.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-serif text-[#2d2a26] mb-4">
                  Retirez les Feuilles
                </h3>
                <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Enlevez les feuilles qui trempent dans l'eau 
                  et les fleurs fanées pour éviter les bactéries.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-serif text-[#2d2a26] mb-4">
                  Vaporisez Légèrement
                </h3>
                <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Un léger spray d'eau sur les pétales 
                  (sauf pour les fleurs fragiles) maintient l'hydratation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Astuces de pro */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                Étape 3
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Astuces de Professionnel
              </h2>
              
              <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light max-w-2xl mx-auto leading-relaxed">
                Les secrets de nos fleuristes pour des bouquets qui durent plus longtemps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                    Température Idéale
                  </h3>
                  <div className="w-16 h-px bg-[#b8935a] mb-4"></div>
                  <p className="text-[#2d2a26] font-light leading-relaxed">
                    Maintenez vos fleurs entre 18-22°C. Évitez les zones trop chaudes 
                    comme près des radiateurs ou cheminées qui accélèrent le flétrissement.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                    Évitez le Soleil Direct
                  </h3>
                  <div className="w-16 h-px bg-[#b8935a] mb-4"></div>
                  <p className="text-[#2d2a26] font-light leading-relaxed">
                    Placez vos fleurs dans un endroit lumineux mais sans soleil direct, 
                    qui dessèche rapidement les pétales et décolore les couleurs.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                    Éloignez des Fruits Mûrs
                  </h3>
                  <div className="w-16 h-px bg-[#b8935a] mb-4"></div>
                  <p className="text-[#2d2a26] font-light leading-relaxed">
                    Les fruits mûrs dégagent de l'éthylène, un gaz qui accélère 
                    le vieillissement des fleurs. Gardez-les à distance.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                    Le Truc du Sucre
                  </h3>
                  <div className="w-16 h-px bg-[#b8935a] mb-4"></div>
                  <p className="text-[#2d2a26] font-light leading-relaxed">
                    Ajoutez une cuillère à café de sucre dans l'eau : il nourrit les fleurs. 
                    Alternativement, quelques gouttes d'eau de javel désinfectent l'eau.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                    Eau Tiède pour Certaines Fleurs
                  </h3>
                  <div className="w-16 h-px bg-[#b8935a] mb-4"></div>
                  <p className="text-[#2d2a26] font-light leading-relaxed">
                    Les gerberas et tournesols préfèrent l'eau tiède qui facilite 
                    l'absorption. Testez la température avec votre poignet.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                    Réveil Matinal
                  </h3>
                  <div className="w-16 h-px bg-[#b8935a] mb-4"></div>
                  <p className="text-[#2d2a26] font-light leading-relaxed">
                    Plongez les tiges dans l'eau froide le matin : les fleurs 
                    "boivent" plus efficacement aux heures fraîches de la journée.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Durée de vie par type */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                Étape 4
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Durée de Vie par Type de Fleur
              </h2>
              
              <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light max-w-2xl mx-auto leading-relaxed">
                Chaque variété a ses spécificités. Connaître la durée de vie moyenne vous aide à mieux anticiper.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {flowerLifespans.map((flower, index) => (
                <div key={index} className="bg-white p-8 text-center">
                  <h3 className="text-xl font-serif text-[#2d2a26] mb-2">
                    {flower.name}
                  </h3>
                  <div className="text-[#b8935a] font-light mb-4">
                    {flower.duration}
                  </div>
                  <div className="w-16 h-px bg-[#b8935a] mx-auto mb-4"></div>
                  <p className="text-[#2d2a26] font-light text-sm leading-relaxed">
                    {flower.tips}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 border border-[#b8935a]/20">
              <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                Bon à Savoir
              </h3>
              <div className="w-16 h-px bg-[#b8935a] mb-4"></div>
              <p className="text-[#2d2a26] font-light leading-relaxed">
                Ces durées sont indicatives et peuvent varier selon les conditions d'entretien, 
                la saison et la fraîcheur des fleurs à l'achat. Avec nos conseils, 
                vous pouvez souvent dépasser ces estimations !
              </p>
            </div>
          </div>
        </section>

        {/* Section SOS fleurs fanées */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                SOS
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Fleurs Fanées : Gestes de Secours
              </h2>
              
              <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light mb-16 leading-relaxed">
                Vos fleurs montrent des signes de fatigue ? Tentez ces gestes de secours !
              </p>
                
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">Bain Glacé</h3>
                  <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
                  <p className="text-[#2d2a26] font-light leading-relaxed">
                    Plongez les tiges dans l'eau très froide pendant 1h. 
                    Effet choc garanti !
                  </p>
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">Douche Fraîche</h3>
                  <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
                  <p className="text-[#2d2a26] font-light leading-relaxed">
                    Vaporisez délicatement les pétales avec 
                    de l'eau fraîche pour les réhydrater.
                  </p>
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">Coupe Radicale</h3>
                  <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
                  <p className="text-[#2d2a26] font-light leading-relaxed">
                    Coupez 3-4 cm des tiges sous l'eau courante. 
                    Parfois, ça relance tout !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                Besoin d'aide ?
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif text-[#2d2a26] mb-8">
                Une Question sur l'Entretien de Vos Fleurs ?
              </h2>
              
              <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light mb-12 leading-relaxed">
                Notre équipe d'experts est à votre disposition pour vous conseiller 
                et vous aider à prolonger la beauté de vos créations florales.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <Link
                  href="/faq"
                  className="bg-[#b8935a] text-white px-8 py-4 hover:bg-[#b8956a] transition-colors duration-300"
                >
                  Consulter la FAQ
                </Link>
                <Link
                  href="/contact"
                  className="text-[#b8935a] underline hover:text-[#b8956a] transition-colors py-4"
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