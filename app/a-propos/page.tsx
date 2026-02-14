import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Heart, Award, Leaf, Users, Clock, MapPin } from 'lucide-react';

export default function APropos() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798')`,
            }}
          />
          <div className="absolute inset-0 bg-primary/60" />
          <div className="relative z-10 text-center text-secondary">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4">
              Notre Histoire
            </h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Une passion familiale transmise de génération en génération
            </p>
          </div>
        </section>

        {/* Story section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                <div>
                  <h2 className="font-serif text-4xl font-bold text-primary mb-6">
                    Anne Freret Fleuriste
                  </h2>
                  <div className="space-y-4 text-muted leading-relaxed">
                    <p>
                      Anne Freret est une fleuriste passionnée installée à Barneville-Carteret 
                      en Normandie. Artisan fleuriste reconnue, elle a développé un style 
                      unique mêlant tradition française et inspiration locale normande.
                    </p>
                    <p>
                      Avec une approche artisanale et personnalisée, Anne Freret crée 
                      des compositions florales uniques qui reflètent la beauté naturelle 
                      de la côte normande et l'authenticité du terroir.
                    </p>
                    <p>
                      Chaque création est pensée comme une œuvre d'art éphémère, 
                      destinée à sublimer vos moments les plus précieux avec des 
                      fleurs fraîches et de qualité.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798"
                    alt="Anne Fleur dans son atelier"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-accent text-primary p-4 rounded-lg">
                    <div className="font-serif text-2xl font-bold">⭐⭐⭐⭐⭐</div>
                    <div className="text-sm">Fleuriste 5 étoiles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values section */}
        <section className="py-20 bg-primary text-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Nos Valeurs
              </h2>
              <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
                Ce qui nous guide au quotidien dans la création de nos compositions florales
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="text-accent" size={32} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">
                  Respect de l'environnement
                </h3>
                <p className="text-secondary/80">
                  Nous privilégions les fleurs locales et de saison, 
                  cultivées dans le respect de la nature.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="text-accent" size={32} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">
                  Savoir-faire artisanal
                </h3>
                <p className="text-secondary/80">
                  Chaque création est réalisée à la main avec passion 
                  et attention aux moindres détails.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="text-accent" size={32} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">
                  Excellence
                </h3>
                <p className="text-secondary/80">
                  Nous sélectionnons uniquement les plus belles fleurs 
                  pour vous garantir une qualité premium.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-primary mb-6">
                Notre Équipe
              </h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                Des artisans passionnés au service de vos émotions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798"
                    alt="Camille Moreau"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                  Anne Freret
                </h3>
                <p className="text-accent font-medium mb-3">Artisan Fleuriste</p>
                <p className="text-muted text-sm">
                  Passionnée par l'art floral, Anne crée des compositions uniques 
                  qui reflètent la beauté de la Normandie.
                </p>
              </div>

              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798"
                    alt="Louis Bernard"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                  Louis Bernard
                </h3>
                <p className="text-accent font-medium mb-3">Maître fleuriste</p>
                <p className="text-muted text-sm">
                  Avec 20 ans d'expérience, Louis excelle dans les créations 
                  sur-mesure et les événements d'exception.
                </p>
              </div>

              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798"
                    alt="Emma Durand"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                  Emma Durand
                </h3>
                <p className="text-accent font-medium mb-3">Responsable boutique</p>
                <p className="text-muted text-sm">
                  Emma vous accueille avec le sourire et vous conseille 
                  pour trouver la création parfaite.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats section */}
        <section className="py-16 bg-accent text-primary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Users className="mr-2" size={24} />
                  <span className="font-serif text-3xl font-bold">17</span>
                </div>
                <div className="text-sm">Avis 5 étoiles</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Heart className="mr-2" size={24} />
                  <span className="font-serif text-3xl font-bold">100%</span>
                </div>
                <div className="text-sm">Satisfaction</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="mr-2" size={24} />
                  <span className="font-serif text-3xl font-bold">Normandie</span>
                </div>
                <div className="text-sm">Fleuriste local</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Award className="mr-2" size={24} />
                  <span className="font-serif text-3xl font-bold">Artisan</span>
                </div>
                <div className="text-sm">Qualité premium</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}