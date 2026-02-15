'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockProducts } from '@/lib/mock-data';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demande de devis:', formData);
  };

  return (
    <>
      <Header />
      
      <main className="bg-[#faf8f5] min-h-screen pt-20">
        
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div 
            className="absolute inset-0 w-full h-screen"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1400&q=85)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          >
            <div className="absolute inset-0 bg-[#faf8f5]/80" />
          </div>
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-8">
                Mariages d'Exception
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2d2a26] mb-8 leading-tight">
                Votre Grand Jour Sublimé
              </h1>

              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>

              <p className="text-xl text-[#2d2a26] mb-12 font-light leading-relaxed max-w-2xl mx-auto">
                Créations florales d'exception pour faire de votre mariage 
                un moment inoubliable, empreint d'émotion et de beauté.
              </p>

              <a
                href="#devis"
                className="inline-block bg-[#c4a47a] text-white px-8 py-4 hover:bg-[#b8956a] transition-colors duration-300"
              >
                Demander un devis
              </a>
            </div>
          </div>
        </section>

        {/* Collections */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                Collections Mariage
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Nos Créations
              </h2>
              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
              <p className="text-xl text-[#2d2a26] font-light max-w-3xl mx-auto leading-relaxed">
                Trois univers distincts, chacun conçu pour refléter votre personnalité 
                et l'atmosphère unique de votre célébration.
              </p>
            </div>

            {weddingProducts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
                {weddingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Service Sur-Mesure */}
            <div className="bg-white p-12 text-center border border-[#c4a47a]/20">
              <h3 className="text-3xl font-serif text-[#2d2a26] mb-6">
                Création Sur-Mesure
              </h3>
              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-6"></div>
              <p className="text-xl text-[#2d2a26] font-light mb-8 max-w-2xl mx-auto leading-relaxed">
                Votre mariage est unique ? Nous créons ensemble des compositions florales 
                personnalisées qui correspondent parfaitement à vos rêves.
              </p>
              <a 
                href="#devis"
                className="text-[#c4a47a] underline hover:text-[#b8956a] transition-colors"
              >
                Discutons de votre projet
              </a>
            </div>
          </div>
        </section>

        {/* Galerie */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                Galerie
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Nos Réalisations
              </h2>
              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
              <p className="text-xl text-[#2d2a26] font-light max-w-2xl mx-auto leading-relaxed">
                Découvrez nos plus belles créations pour vous inspirer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=85',
                'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=85',
                'https://images.pexels.com/photos/1128782/pexels-photo-1128782.jpeg?auto=compress&cs=tinysrgb&w=600',
                'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=600',
                'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=85',
                'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=85'
              ].map((image, index) => (
                <div 
                  key={index}
                  className="aspect-[4/5] overflow-hidden group"
                >
                  <img
                    src={image}
                    alt={['Table champêtre fleurie', 'Allée cérémonie fleurs roses', 'Centre de table bougies dorées', 'Table banquet eucalyptus', 'Chaises mariés décorées', 'Bouquet de mariée'][index]}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>

            <div className="text-center">
              <a 
                href="/galerie"
                className="text-[#c4a47a] underline hover:text-[#b8956a] transition-colors"
              >
                Voir toute la galerie
              </a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                Notre Approche
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Un Accompagnement Complet
              </h2>
              <div className="w-16 h-px bg-[#c4a47a] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">Consultation</h3>
                <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Rencontre personnalisée pour comprendre vos goûts et l'ambiance souhaitée.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">Création</h3>
                <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Réalisation de vos compositions avec possibilité d'ajustements.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">Livraison</h3>
                <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Installation le jour de votre mariage pour une journée sans stress.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Formulaire de Devis */}
        <section id="devis" className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              
              <div className="text-center mb-12">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                  Demande de Devis
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                  Parlons de Votre Projet
                </h2>
                <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
                <p className="text-xl text-[#2d2a26] font-light leading-relaxed">
                  Partagez-nous les détails de votre projet pour recevoir une proposition personnalisée.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#c4a47a] mb-3">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#c4a47a] focus:outline-none transition-colors font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#c4a47a] mb-3">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#c4a47a] focus:outline-none transition-colors font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#c4a47a] mb-3">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#c4a47a] focus:outline-none transition-colors font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#c4a47a] mb-3">
                      Date du mariage
                    </label>
                    <input
                      type="date"
                      name="dateMariage"
                      value={formData.dateMariage}
                      onChange={handleInputChange}
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#c4a47a] focus:outline-none transition-colors font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#c4a47a] mb-3">
                      Lieu de la cérémonie
                    </label>
                    <input
                      type="text"
                      name="lieuMariage"
                      value={formData.lieuMariage}
                      onChange={handleInputChange}
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#c4a47a] focus:outline-none transition-colors font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#c4a47a] mb-3">
                      Budget estimé
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#c4a47a] focus:outline-none transition-colors font-light"
                    >
                      <option value="">Sélectionner un budget</option>
                      <option value="100-200">100€ - 200€</option>
                      <option value="200-400">200€ - 400€</option>
                      <option value="400-800">400€ - 800€</option>
                      <option value="800+">800€ et plus</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-[#c4a47a] mb-3">
                    Décrivez votre projet
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Partagez-nous vos idées, votre style, vos couleurs préférées..."
                    className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] placeholder-[#2d2a26]/50 focus:border-[#c4a47a] focus:outline-none transition-colors resize-none font-light"
                  />
                </div>

                <div className="text-center pt-6">
                  <button
                    type="submit"
                    className="bg-[#c4a47a] text-white px-8 py-4 hover:bg-[#b8956a] transition-colors duration-300"
                  >
                    Envoyer ma demande
                  </button>

                  <p className="text-[#2d2a26] text-sm mt-6 font-light">
                    Réponse sous 24h • Devis gratuit et sans engagement
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}