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
        
        {/* Hero — Logo grand + sous-phrase */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              
              <div className="text-sm md:text-base uppercase tracking-[0.25em] text-[#b8935a] mb-10 font-medium">
                Qui sommes-nous
              </div>

              <div className="bg-white shadow-md px-8 py-12 md:px-16 md:py-16 max-w-xl mx-auto mb-10">
                <h1 className="font-serif text-[#2d2a26] mb-1 leading-none">
                  <span className="block text-[13px] md:text-[16px] uppercase tracking-[0.35em]">A N N E</span>
                </h1>
                <h1 className="font-serif text-[#2d2a26] mb-3 leading-none">
                  <span className="block text-5xl md:text-7xl lg:text-8xl uppercase tracking-[0.15em]">FRERET</span>
                </h1>
                <div className="text-[11px] md:text-[13px] uppercase tracking-[0.35em] text-[#b8935a]">
                  — fleuriste —
                </div>
              </div>

              <div className="w-16 h-px bg-[#b8935a] mx-auto mb-10"></div>

              <p className="text-lg md:text-xl text-[#2d2a26]/70 font-light leading-relaxed max-w-2xl mx-auto italic">
                Quand les fleurs racontent l'histoire d'une vie — de Lessay à Saint-Pair-sur-Mer, 
                chaque bouquet porte l'âme de la Normandie.
              </p>
            </div>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                  Notre Histoire
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8 leading-tight">
                  Une Passion Normande
                </h2>
                
                <div className="w-16 h-px bg-[#b8935a] mb-8"></div>
                
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
                    Le succès de Saint-Pair appelle de nouvelles aventures. En 2014, une deuxième 
                    boutique voit le jour à Jullouville, à quelques kilomètres le long de la côte. 
                    Puis en 2017, c'est Donville-les-Bains qui accueille l'univers Anne Freret. 
                    Et en 2019, l'histoire franchit la frontière bretonne avec l'ouverture d'un 
                    atelier à Dol-de-Bretagne — comme un clin d'œil à ces racines normandes 
                    qui n'ont jamais eu peur de s'étendre.
                  </p>

                  <p>
                    Aujourd'hui, avec quatre boutiques entre Normandie et Bretagne, Anne Freret 
                    est devenue une référence du littoral. De la composition quotidienne aux 
                    grands événements, chaque création porte en elle plus de vingt ans de 
                    savoir-faire — et toute la tendresse de cette petite boutique verte 
                    de Lessay où tout a commencé.
                  </p>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=85"
                  alt="Compositions florales dans un atelier"
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
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                Nos Valeurs
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                L'Excellence au Quotidien
              </h2>
              <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>
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
                  <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
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
                  src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=85"
                  alt="Fleuriste au travail — composition artisanale"
                  className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                  Savoir-faire
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8 leading-tight">
                  L'Art de la Composition
                </h2>
                
                <div className="w-16 h-px bg-[#b8935a] mb-8"></div>
                
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
                    className="text-[#b8935a] underline hover:text-[#b8956a] transition-colors"
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
              
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                Engagement Local
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Fiers d'être Normands
              </h2>
              
              <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>
              
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
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-2">Origine</div>
                  <div className="text-[#2d2a26] font-light">Fleurs locales</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-2">Partenaires</div>
                  <div className="text-[#2d2a26] font-light">Producteurs normands</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-2">Qualité</div>
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
              
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                Rencontrons-nous
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Votre Projet, Notre Passion
              </h2>
              
              <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light mb-12 leading-relaxed">
                Venez découvrir notre atelier et discutons ensemble de vos projets floraux. 
                Une rencontre, une tasse de thé, et laissons parler notre passion commune pour les fleurs.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                <a
                  href="/contact"
                  className="bg-[#b8935a] text-white px-8 py-4 hover:bg-[#b8956a] transition-colors duration-300"
                >
                  Prendre rendez-vous
                </a>
                <a
                  href="/galerie"
                  className="text-[#b8935a] underline hover:text-[#b8956a] transition-colors"
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