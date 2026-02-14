'use client';

import Link from 'next/link';
import { Heart, Crown, Flower2, Leaf } from 'lucide-react';

const CategoriesShowcase = () => {
  const categories = [
    {
      title: 'Bouquets Frais',
      description: 'Créations quotidiennes pour sublimer vos moments',
      icon: Flower2,
      image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_35.png?v=1706808037',
      href: '/boutique?category=Bouquets',
      count: '12 créations'
    },
    {
      title: 'Mariages',
      description: 'Collections complètes pour votre jour J',
      icon: Crown,
      image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/2_1eed40b5-fab8-414d-9819-7f2592160295.png?v=1684426098',
      href: '/boutique?category=Mariages',
      count: '3 box'
    },
    {
      title: 'Deuil & Hommages',
      description: 'Compositions respectueuses pour l\'éternel',
      icon: Heart,
      image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/9D21A555-DA13-4A1B-B926-909320B670FB.jpg?v=1729195556',
      href: '/boutique?category=Deuil',
      count: '6 formes'
    },
    {
      title: 'Le Choix du Fleuriste',
      description: 'Surprises créées selon notre inspiration',
      icon: Leaf,
      image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      href: '/boutique?category=LeChoixDuFleuriste',
      count: 'Unique'
    }
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-6 font-serif">
            Nos Spécialités Florales
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Explorez nos différents univers floraux, chacun conçu avec passion 
            pour répondre à vos besoins les plus précieux.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            
            return (
              <Link key={category.title} href={category.href}>
                <div className="card group">
                  
                  {/* Image */}
                  <div className="product-image">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${category.image})`
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    
                    {/* Icon */}
                    <div className="absolute top-4 left-4 w-10 h-10 bg-black/60 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>

                    {/* Count */}
                    <div className="absolute top-4 right-4 bg-black/60 rounded-lg px-3 py-1">
                      <span className="text-white text-xs">
                        {category.count}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-serif text-white mb-2 group-hover:text-accent transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;