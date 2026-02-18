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
                D'une petite boutique verte à Lessay jusqu'au littoral de Saint-Pair-sur-Mer — 
                plus de vingt ans d'amour des fleurs, de la Normandie et des émotions partagées.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-2">Lieu</div>
                  <div className="text-[#2d2a26] font-light">Saint-Pair-sur-Mer</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-2">Depuis</div>
                  <div className="text-[#2d2a26] font-light">Plus de 20 ans</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-2">Deux chapitres</div>
                  <div className="text-[#2d2a26] font-light">Lessay → Saint-Pair</div>
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
                    L'histoire a commencé dans la petite ville de Lessay, au cœur du Cotentin, 
                    dans une boutique verte nichée entre les ruelles pavées et l'abbaye millénaire. 
                    C'est là, bercée par le vent marin et les bruyères de la lande, qu'Anne Freret 
                    a posé ses premières fleurs sur un comptoir en bois — et qu'une passion est 
                    devenue un métier.
                  </p>
                  
                  <p>
                    Pendant des années, la petite boutique de Lessay a vu défiler les saisons et les 
                    émotions. Des bouquets de mariée tremblants d'émotion, des couronnes de deuil 
                    composées avec respect, des compositions de Noël qui illuminaient les foyers normands. 
                    Anne y a forgé son style — un mélange d'élégance naturelle et de générosité, 
                    à l'image de cette terre normande qu'elle aime tant.
                  </p>
                  
                  <p>
                    En 2008, un nouveau chapitre s'ouvre. Anne pose ses valises à Saint-Pair-sur-Mer, 
                    face à la mer, sur la Place du Général de Gaulle. Un atelier plus grand, une lumière 
                    différente — celle de l'océan qui baigne chaque création d'une douceur particulière. 
                    Mais l'âme reste la même : ce souci du détail, cette écoute sincère, cette envie 
                    de mettre du beau dans le quotidien des gens.
                  </p>

                  <p>
                    Aujourd'hui, l'atelier Anne Freret est devenu une adresse incontournable 
                    du littoral normand. De la composition quotidienne aux grands événements, 
                    chaque création porte en elle plus de vingt ans de savoir-faire — et toute 
                    la tendresse de cette petite boutique verte de Lessay où tout a commencé.
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