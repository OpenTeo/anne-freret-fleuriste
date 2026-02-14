import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function LaMarque() {
  const values = [
    {
      title: 'Artisanat Local',
      description: 'Chaque création est réalisée à la main avec des fleurs fraîches, privilégiant les producteurs locaux de Normandie.'
    },
    {
      title: 'Passion & Émotion',
      description: 'Nous mettons tout notre cœur dans chaque composition pour transmettre vos sentiments les plus précieux.'
    },
    {
      title: 'Qualité Exceptionnelle',
      description: 'Une sélection rigoureuse des plus belles fleurs pour garantir fraîcheur et beauté de nos créations.'
    },
    {
      title: 'Service Personnalisé',
      description: 'Un accompagnement sur-mesure pour répondre à vos besoins uniques et sublimer vos moments importants.'
    }
  ];

  return (
    <>
      <Header />
      
      <main className="bg-[#faf8f5] min-h-screen pt-20">
        
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-8">
                L'histoire d'une passion
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2d2a26] mb-8 leading-tight">
                Anne Freret Fleuriste
              </h1>

              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>

              <p className="text-xl text-[#2d2a26] mb-12 font-light leading-relaxed max-w-3xl mx-auto">
                Une histoire d'amour entre la Normandie et l'art floral, 
                où chaque création raconte l'émotion de l'instant présent.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-2">Lieu</div>
                  <div className="text-[#2d2a26] font-light">Saint-Pair-sur-Mer</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-2">Depuis</div>
                  <div className="text-[#2d2a26] font-light">2009</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-2">Expérience</div>
                  <div className="text-[#2d2a26] font-light">15 ans</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                  Notre Histoire
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8 leading-tight">
                  Une Passion Normande
                </h2>
                
                <div className="w-16 h-px bg-[#c4a47a] mb-8"></div>
                
                <div className="space-y-6 text-[#2d2a26] font-light leading-relaxed text-lg">
                  <p>
                    Tout a commencé en 2009, quand Anne Freret a décidé de transformer sa passion 
                    pour les fleurs en véritable art de vivre. Installée au cœur du Cotentin, 
                    à Saint-Pair-sur-Mer, elle puise son inspiration dans les paysages sauvages 
                    et authentiques de la Normandie.
                  </p>
                  
                  <p>
                    Formée aux plus belles techniques florales européennes, Anne a développé 
                    un style unique qui marie l'élégance classique française à la spontanéité 
                    champêtre normande. Chaque création porte en elle l'empreinte de cette terre 
                    généreuse et de ses saisons changeantes.
                  </p>
                  
                  <p>
                    Aujourd'hui, l'atelier Anne Freret est devenu une référence en Normandie 
                    pour tous ceux qui recherchent l'exception dans l'art floral. De la simple 
                    composition quotidienne aux plus grands événements, nous mettons notre 
                    expertise et notre passion au service de vos émotions.
                  </p>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=85"
                  alt="Anne Freret dans son atelier"
                  className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                Nos Valeurs
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                L'Excellence au Quotidien
              </h2>
              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
              <p className="text-xl text-[#2d2a26] font-light max-w-3xl mx-auto leading-relaxed">
                Les principes qui guident notre travail quotidien et donnent du sens 
                à chacune de nos créations florales.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">
                    {value.title}
                  </h3>
                  <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-6"></div>
                  <p className="text-[#2d2a26] font-light leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Savoir-faire */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=85"
                  alt="Atelier floral"
                  className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                  Savoir-faire
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8 leading-tight">
                  L'Art de la Composition
                </h2>
                
                <div className="w-16 h-px bg-[#c4a47a] mb-8"></div>
                
                <div className="space-y-6 text-[#2d2a26] font-light leading-relaxed text-lg">
                  <p>
                    Chaque composition naît d'une rencontre entre votre émotion et notre expertise. 
                    Nous sélectionnons avec soin les plus belles fleurs de saison, en privilégiant 
                    les producteurs locaux et les circuits courts.
                  </p>
                  
                  <p>
                    Notre atelier est un lieu de création où tradition et innovation se côtoient. 
                    Techniques ancestrales et tendances contemporaines s'harmonisent pour donner 
                    naissance à des œuvres uniques, reflets de votre personnalité.
                  </p>
                </div>

                <div className="mt-12">
                  <a
                    href="/boutique"
                    className="text-[#c4a47a] underline hover:text-[#b8956a] transition-colors"
                  >
                    Découvrir nos créations
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement Local */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                Engagement Local
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Fiers d'être Normands
              </h2>
              
              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
              
              <div className="space-y-6 text-[#2d2a26] font-light leading-relaxed text-lg mb-12">
                <p>
                  Notre attachement à la Normandie va bien au-delà de notre localisation. 
                  Nous travaillons en étroite collaboration avec les producteurs locaux 
                  pour privilégier les fleurs de saison et réduire notre empreinte environnementale.
                </p>
                
                <p>
                  Cette démarche nous permet de vous offrir des créations plus fraîches, 
                  plus authentiques, tout en soutenant l'économie locale et les savoir-faire 
                  traditionnels de notre belle région.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-2">Origine</div>
                  <div className="text-[#2d2a26] font-light">Fleurs locales</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-2">Partenaires</div>
                  <div className="text-[#2d2a26] font-light">Producteurs normands</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-2">Qualité</div>
                  <div className="text-[#2d2a26] font-light">Fraîcheur garantie</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Contact */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                Rencontrons-nous
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Votre Projet, Notre Passion
              </h2>
              
              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light mb-12 leading-relaxed">
                Venez découvrir notre atelier et discutons ensemble de vos projets floraux. 
                Une rencontre, une tasse de thé, et laissons parler notre passion commune pour les fleurs.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                <a
                  href="/contact"
                  className="bg-[#c4a47a] text-white px-8 py-4 hover:bg-[#b8956a] transition-colors duration-300"
                >
                  Prendre rendez-vous
                </a>
                <a
                  href="/galerie"
                  className="text-[#c4a47a] underline hover:text-[#b8956a] transition-colors"
                >
                  Voir nos créations
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}