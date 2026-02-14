'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockProducts } from '@/lib/mock-data';
import { Heart, Crown, Sparkles, Calendar, MapPin, Users, Phone, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';

export default function Mariages() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    dateMariage: '',
    lieuMariage: '',
    nombreInvites: '',
    budget: '',
    message: ''
  });

  const weddingProducts = mockProducts.filter(product => product.category === 'Mariages');

  const weddingBoxes = [
    {
      id: 'champetre',
      name: 'Box Champêtre Lila',
      price: 118.90,
      image: 'https://fleuriste-annefreret.com/cdn/shop/files/1_2898336f-1c54-4008-a6e6-cfed21832288.png',
      description: 'Nos "Box Mariage" se composent d\'un bouquet et d\'un peigne pour la mariée et d\'une boutonnière assortie pour le marié. Composition : Amarante, miscanthus, phalaris, grain d\'aneth, limonium, gypsophile, lagurus, stipa. Fleurs séchées.',
      includes: [
        'Bouquet mariée (20cm × 25cm, finition cordelette)',
        'Peigne fleuri (10cm environ)',
        'Boutonnière marié (épingle, 7cm)',
      ],
      style: 'Champêtre, romantique, naturel'
    },
    {
      id: 'exotique',
      name: 'Box Mariage Exotique',
      price: 139.90,
      image: 'https://fleuriste-annefreret.com/cdn/shop/files/1_6af69be8-d1fe-44a6-9936-308639ed93d2.png',
      description: 'Nos "Box Mariage" se composent d\'un bouquet et d\'un peigne pour la mariée et d\'une boutonnière assortie pour le marié. Bouquet de 25cm de diamètre pour 30cm de hauteur environ, finition cordelette.',
      includes: [
        'Bouquet exotique (25cm × 30cm, finition cordelette)',
        'Peigne fleuri assorti (10cm)',
        'Boutonnière marié (épingle, 7cm)',
      ],
      style: 'Exotique, coloré, original'
    },
    {
      id: 'plage',
      name: 'Box Mariage sur la Plage',
      price: 118.90,
      image: 'https://fleuriste-annefreret.com/cdn/shop/files/1_9527aac4-f297-4808-945b-908cf90e1a8e.png',
      description: 'Nos "Box Mariage" se composent d\'un bouquet et d\'un peigne pour la mariée et d\'une boutonnière assortie pour le marié. Inspiration marine et naturelle pour une cérémonie en bord de mer.',
      includes: [
        'Bouquet marin (20cm × 25cm, finition cordelette)',
        'Peigne fleuri assorti (10cm)',
        'Boutonnière marié (épingle, 7cm)',
      ],
      style: 'Marin, bohème, naturel'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Demande de devis:', formData);
  };

  return (
    <>
      <Header />
      
      <main className="pt-20 bg-[#faf8f5]">
        
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div 
            className="absolute inset-0 hero-parallax"
            style={{
              backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Heart className="w-6 h-6 text-[#c9a96e] fill-current" />
                <span className="text-[#c9a96e] text-sm font-medium uppercase tracking-wider">
                  Mariages d'Exception
                </span>
                <Heart className="w-6 h-6 text-[#c9a96e] fill-current" />
              </div>

              <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">
                Votre Grand Jour
                <span className="text-gradient block">Sublimé</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 font-light leading-relaxed">
                Créations florales d'exception pour faire de votre mariage 
                un moment inoubliable, empreint d'émotion et de beauté.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a
                  href="#devis"
                  className="btn-primary px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-3"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Demander un devis</span>
                </a>
                <a 
                  href="tel:+33233043782"
                  className="btn-secondary px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-3"
                >
                  <Phone className="w-5 h-5" />
                  <span>02 33 50 26 15</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Wedding Boxes */}
        <section className="py-24 bg-gradient-to-b from-[#faf8f5] to-[#f5f3f0]">
          <div className="container mx-auto px-4 lg:px-8">
            
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-6">
                Nos Collections
                <span className="text-gradient block md:inline md:ml-4">Mariage</span>
              </h2>
              <p className="text-xl text-[#6b6560] max-w-3xl mx-auto">
                Trois univers distincts, chacun conçu pour refléter votre personnalité 
                et l'atmosphère unique de votre célébration.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {weddingBoxes.map((box, index) => (
                <div 
                  key={box.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#c9a96e]/10 hover:border-[#c9a96e]/30 transition-all duration-500 hover-lift shadow-lg hover:shadow-xl"
                >
                  <div className="relative h-80 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center hover-zoom"
                      style={{
                        backgroundImage: `url(${box.image})`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-6 left-6">
                      <div className="w-12 h-12 bg-[#b8956a]/20 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center">
                        <Crown className="w-6 h-6 text-[#b8956a]" />
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="text-right">
                        <span className="inline-block bg-[#b8956a] text-white px-4 py-2 rounded-full font-bold text-lg">
                          {box.price.toFixed(2).replace('.', ',')}€
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="font-serif text-2xl text-[#2d2a26] mb-3">
                      {box.name}
                    </h3>
                    
                    <p className="text-[#6b6560] mb-6 leading-relaxed">
                      {box.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-medium text-[#b8956a] mb-3">Composition incluse :</h4>
                      <ul className="space-y-2">
                        {box.includes.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-2 text-[#6b6560]">
                            <Sparkles className="w-4 h-4 text-[#b8956a] mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6 p-4 bg-[#b8956a]/5 rounded-lg border border-[#b8956a]/10">
                      <p className="text-[#b8956a] text-sm">
                        <strong>Style :</strong> {box.style}
                      </p>
                    </div>

                    <button className="w-full btn-primary py-3 rounded-lg font-semibold hover-lift">
                      Choisir cette collection
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Service */}
            <div className="bg-gradient-to-r from-white to-[#f9f7f4] rounded-3xl p-8 md:p-12 border border-[#b8956a]/20 text-center shadow-lg">
              <Crown className="w-16 h-16 text-[#b8956a] mx-auto mb-6" />
              <h3 className="font-serif text-3xl text-[#2d2a26] mb-4">
                Création Sur-Mesure
              </h3>
              <p className="text-xl text-[#6b6560] mb-8 max-w-2xl mx-auto">
                Votre mariage est unique ? Nous créons ensemble des compositions florales 
                personnalisées qui correspondent parfaitement à vos rêves.
              </p>
              <a 
                href="#devis"
                className="btn-secondary px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center space-x-3"
              >
                <Heart className="w-5 h-5" />
                <span>Discutons de votre projet</span>
              </a>
            </div>
          </div>
        </section>

        {/* Galerie d'Inspirations */}
        <section className="py-24 bg-[#f5f3f0]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-6">
                Galerie
                <span className="text-gradient block md:inline md:ml-4">d'Inspirations</span>
              </h2>
              <p className="text-xl text-[#6b6560] max-w-2xl mx-auto">
                Découvrez nos plus belles réalisations pour vous inspirer et imaginer votre jour parfait.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/2_1eed40b5-fab8-414d-9819-7f2592160295.png?v=1684426098',
                  title: 'Bouquet Romantique',
                  style: 'Champêtre • Roses et pivoines'
                },
                {
                  image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
                  title: 'Arche Florale',
                  style: 'Bohème • Fleurs sauvages'
                },
                {
                  image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_35.png?v=1706808037',
                  title: 'Décoration de Table',
                  style: 'Élégant • Orchidées blanches'
                },
                {
                  image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/2_1eed40b5-fab8-414d-9819-7f2592160295.png?v=1684426098',
                  title: 'Boutonnière Assortie',
                  style: 'Classique • Rose et eucalyptus'
                },
                {
                  image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
                  title: 'Couronne de Fleurs',
                  style: 'Bohème • Fleurs des champs'
                },
                {
                  image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_35.png?v=1706808037',
                  title: 'Composition d\'Église',
                  style: 'Majestueux • Lys et roses blanches'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-serif text-xl mb-2">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.style}</p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#b8956a]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a 
                href="/galerie"
                className="btn-secondary px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center space-x-3"
              >
                <span>Voir toute la galerie</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-6">
                Notre Accompagnement
                <span className="text-gradient block md:inline md:ml-4">Complet</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#b8956a]/20 to-[#b8956a]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-[#b8956a]" />
                </div>
                <h3 className="font-serif text-xl text-[#2d2a26] mb-3">Consultation Personnalisée</h3>
                <p className="text-[#6b6560]">
                  Rencontre pour comprendre vos goûts, votre style et l'ambiance souhaitée.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#7d8c6e]/20 to-[#7d8c6e]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-[#7d8c6e]" />
                </div>
                <h3 className="font-serif text-xl text-[#2d2a26] mb-3">Création & Essayage</h3>
                <p className="text-[#6b6560]">
                  Réalisation de vos compositions avec possibilité d'ajustements jusqu'à perfection.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#b8956a]/20 to-[#b8956a]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-[#b8956a]" />
                </div>
                <h3 className="font-serif text-xl text-[#2d2a26] mb-3">Livraison Jour J</h3>
                <p className="text-[#6b6560]">
                  Installation et livraison le jour de votre mariage pour une journée sans stress.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section id="devis" className="py-24 bg-gradient-to-b from-[#f5f3f0] to-[#ffffff]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-6">
                  Demander un
                  <span className="text-gradient block md:inline md:ml-4">Devis</span>
                </h2>
                <p className="text-xl text-[#6b6560]">
                  Partagez-nous les détails de votre projet pour recevoir une proposition personnalisée.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 border border-[#b8956a]/20 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  
                  <div>
                    <label className="block text-[#2d2a26] font-medium mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#faf8f5] border border-[#b8956a]/20 rounded-lg px-4 py-3 text-[#2d2a26] focus:border-[#b8956a] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2d2a26] font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#faf8f5] border border-[#b8956a]/20 rounded-lg px-4 py-3 text-[#2d2a26] focus:border-[#b8956a] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2d2a26] font-medium mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="w-full bg-[#faf8f5] border border-[#b8956a]/20 rounded-lg px-4 py-3 text-[#2d2a26] focus:border-[#b8956a] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2d2a26] font-medium mb-2">
                      Date du mariage
                    </label>
                    <input
                      type="date"
                      name="dateMariage"
                      value={formData.dateMariage}
                      onChange={handleInputChange}
                      className="w-full bg-[#faf8f5] border border-[#b8956a]/20 rounded-lg px-4 py-3 text-[#2d2a26] focus:border-[#b8956a] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2d2a26] font-medium mb-2">
                      Lieu de la cérémonie
                    </label>
                    <input
                      type="text"
                      name="lieuMariage"
                      value={formData.lieuMariage}
                      onChange={handleInputChange}
                      className="w-full bg-[#faf8f5] border border-[#b8956a]/20 rounded-lg px-4 py-3 text-[#2d2a26] focus:border-[#b8956a] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2d2a26] font-medium mb-2">
                      Budget estimé
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full bg-[#faf8f5] border border-[#b8956a]/20 rounded-lg px-4 py-3 text-[#2d2a26] focus:border-[#b8956a] focus:outline-none transition-colors"
                    >
                      <option value="">Sélectionner un budget</option>
                      <option value="100-200">100€ - 200€</option>
                      <option value="200-400">200€ - 400€</option>
                      <option value="400-800">400€ - 800€</option>
                      <option value="800+">800€ et plus</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-[#2d2a26] font-medium mb-2">
                    Décrivez votre projet
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Partagez-nous vos idées, votre style, vos couleurs préférées..."
                    className="w-full bg-[#faf8f5] border border-[#b8956a]/20 rounded-lg px-4 py-3 text-[#2d2a26] placeholder-[#6b6560] focus:border-[#b8956a] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-4 rounded-lg text-lg font-semibold flex items-center justify-center space-x-3 hover-lift"
                >
                  <Mail className="w-5 h-5" />
                  <span>Envoyer ma demande</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-[#6b6560] text-sm text-center mt-4">
                  Réponse sous 24h • Devis gratuit et sans engagement
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}