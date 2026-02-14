import Image from 'next/image';
import { Leaf, Heart, Award } from 'lucide-react';

export default function About() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              L'Art Floral en Normandie
            </h2>
            
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Anne Freret perpétue la tradition de l'art floral français avec passion 
              et savoir-faire. Notre boutique à Barneville-Carteret est devenue une 
              référence pour les amateurs de belles fleurs et de créations uniques 
              en Normandie.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Leaf className="text-accent w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-white mb-2">Écologique</h3>
                <p className="text-sm text-white/70">Fleurs fraîches et pratiques durables</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="text-accent w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-white mb-2">Artisanal</h3>
                <p className="text-sm text-white/70">Créations uniques faites main</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="text-accent w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-white mb-2">Excellence</h3>
                <p className="text-sm text-white/70">Qualité premium garantie</p>
              </div>
            </div>

            <p className="text-white/80">
              Chaque création est pensée comme une œuvre d'art éphémère, 
              destinée à marquer les moments importants de votre vie.
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <Image
                src="https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetderoses.jpg?v=1737559058"
                alt="Créations Anne Freret Fleuriste"
                width={400}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Badge */}
            <div className="absolute top-6 left-6 bg-accent text-black px-4 py-2 rounded-full text-sm font-semibold">
              15 ans d'expérience
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}