import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Heart, Leaf, Award, Users, Clock, MapPin, Star, Flower2 } from 'lucide-react';

export default function LaMarque() {
  const values = [
    {
      icon: Leaf,
      title: 'Artisanat Local',
      description: 'Chaque création est réalisée à la main avec des fleurs fraîches, privilégiant les producteurs locaux de Normandie.'
    },
    {
      icon: Heart,
      title: 'Passion & Émotion',
      description: 'Nous mettons tout notre cœur dans chaque composition pour transmettre vos sentiments les plus précieux.'
    },
    {
      icon: Award,
      title: 'Qualité Exceptionnelle',
      description: 'Une sélection rigoureuse des plus belles fleurs pour garantir fraîcheur et beauté de nos créations.'
    },
    {
      icon: Clock,
      title: 'Service Personnalisé',
      description: 'Un accompagnement sur-mesure pour répondre à vos besoins uniques et sublimer vos moments importants.'
    }
  ];

  const team = [
    {
      name: 'Anne Freret',
      role: 'Fondatrice & Artiste Florale',
      image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      description: 'Passionnée de botanique depuis l\'enfance, Anne a transformé sa passion en art de vivre normand.'
    },
    {
      name: 'Marie Dubois',
      role: 'Créatrice Florale',
      image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      description: 'Spécialiste des mariages et événements, Marie apporte sa sensibilité artistique à chaque création.'
    },
    {
      name: 'Pierre Martin',
      role: 'Conseil & Livraison',
      image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      description: 'Expert en service client, Pierre assure le lien entre nos créations et vos émotions.'
    }
  ];

  return (
    <>
      <Header />
      
      <main className="pt-20 bg-[#faf8f5]">
        
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div 
            className="absolute inset-0 hero-parallax opacity-30"
            style={{
              backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Flower2 className="w-6 h-6 text-[#b8956a]" />
                <span className="text-[#b8956a] text-sm font-medium uppercase tracking-wider">
                  L'histoire d'une passion
                </span>
                <Flower2 className="w-6 h-6 text-[#b8956a]" />
              </div>

              <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">
                Anne Freret
                <span className="text-gradient block">Fleuriste</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 font-light leading-relaxed">
                Une histoire d'amour entre la Normandie et l'art floral, 
                où chaque création raconte l'émotion de l'instant présent.
              </p>

              <div className="flex items-center justify-center space-x-8 text-white/80">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-[#b8956a]" />
                  <span>Saint-Pair-sur-Mer</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-[#b8956a]" />
                  <span>Depuis 2009</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-[#b8956a]" />
                  <span>15 ans d'expertise</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-24 bg-gradient-to-b from-[#f5f3f0] to-[#ffffff]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-8">
                  Notre
                  <span className="text-gradient block md:inline md:ml-4">Histoire</span>
                </h2>
                
                <div className="space-y-6 text-[#6b6560] leading-relaxed">
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

                <div className="flex items-center space-x-6 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-serif font-bold text-[#b8956a] mb-1">500+</div>
                    <div className="text-[#6b6560] text-sm">Clients satisfaits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-serif font-bold text-[#b8956a] mb-1">50+</div>
                    <div className="text-[#6b6560] text-sm">Mariages accompagnés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-serif font-bold text-[#b8956a] mb-1">15</div>
                    <div className="text-[#6b6560] text-sm">Années d'expérience</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798"
                    alt="Anne Freret dans son atelier"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#b8956a]/20 rounded-full blur-2xl" />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#7d8c6e]/20 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-24 bg-[#f5f0eb]">
          <div className="container mx-auto px-4 lg:px-8">
            
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-6">
                Nos
                <span className="text-gradient block md:inline md:ml-4">Valeurs</span>
              </h2>
              <p className="text-xl text-[#6b6560] max-w-3xl mx-auto">
                Les principes qui guident notre travail quotidien et donnent du sens 
                à chacune de nos créations florales.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-3xl p-8 border border-[#e8e0d8] hover:border-[#b8956a]/30 transition-all hover-lift text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#b8956a]/20 to-[#b8956a]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-[#b8956a]" />
                    </div>
                    
                    <h3 className="font-serif text-xl text-[#2d2a26] mb-4">
                      {value.title}
                    </h3>
                    
                    <p className="text-[#6b6560] leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Notre Équipe */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-6">
                Notre
                <span className="text-gradient block md:inline md:ml-4">Équipe</span>
              </h2>
              <p className="text-xl text-[#6b6560] max-w-2xl mx-auto">
                Des artistes passionnés qui donnent vie à vos émotions 
                à travers l'art floral.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div 
                  key={index}
                  className="bg-[#faf8f5] rounded-3xl overflow-hidden border border-[#e8e0d8] hover:border-[#b8956a]/30 transition-all hover-lift"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover hover-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  
                  <div className="p-8 text-center">
                    <h3 className="font-serif text-xl text-[#2d2a26] mb-2">
                      {member.name}
                    </h3>
                    <p className="text-[#b8956a] font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-[#6b6560] text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement Local */}
        <section className="py-24 bg-[#f5f0eb]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="bg-gradient-to-r from-[#faf8f5] to-white rounded-3xl p-8 md:p-16 border border-[#b8956a]/20">
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-6">
                    Engagement
                    <span className="text-gradient block md:inline md:ml-4">Local</span>
                  </h2>
                  
                  <div className="space-y-6 text-[#6b6560]">
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

                  <div className="flex items-center space-x-6 mt-8">
                    <div className="flex items-center space-x-2">
                      <Leaf className="w-5 h-5 text-[#7d8c6e]" />
                      <span className="text-[#6b6560] text-sm">Fleurs locales</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-[#b8956a]" />
                      <span className="text-[#6b6560] text-sm">Producteurs partenaires</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-[#b8956a]" />
                      <span className="text-[#6b6560] text-sm">Qualité garantie</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[#b8956a]/20 to-[#7d8c6e]/10 rounded-full mb-6">
                    <MapPin className="w-16 h-16 text-[#b8956a]" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#2d2a26] mb-3">
                    Fiers d'être Normands
                  </h3>
                  <p className="text-[#6b6560]">
                    Saint-Pair-sur-Mer • Cotentin • Normandie
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Contact */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              
              <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-6">
                Rencontrons-nous
              </h2>
              
              <p className="text-xl text-[#6b6560] mb-8">
                Venez découvrir notre atelier et discutons ensemble de vos projets floraux. 
                Une rencontre, une tasse de thé, et laissons parler notre passion commune pour les fleurs.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a
                  href="/contact"
                  className="btn-primary px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-3"
                >
                  <Users className="w-5 h-5" />
                  <span>Prendre rendez-vous</span>
                </a>
                <a
                  href="/galerie"
                  className="btn-secondary px-8 py-4 rounded-full text-lg font-semibold"
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