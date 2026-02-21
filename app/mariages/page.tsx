'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
        <section className="py-24 md:py-32 bg-[#faf8f5]">
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-8">
                Mariages d'Exception
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2d2a26] mb-8 leading-tight">
                Votre Grand Jour Sublimé
              </h1>

              <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>

              <p className="text-xl text-[#2d2a26] mb-12 font-light leading-relaxed max-w-2xl mx-auto">
                Créations florales d'exception pour faire de votre mariage 
                un moment inoubliable, empreint d'émotion et de beauté.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="#devis"
                  className="inline-block bg-[#b8935a] text-white px-8 py-4 hover:bg-[#b8956a] transition-colors duration-300"
                >
                  Demander un devis
                </a>
                <a
                  href="mailto:evenementiel@fleuriste-annefreret.com"
                  className="text-[#b8935a] hover:text-[#b8956a] transition-colors font-light"
                >
                  ✉ evenementiel@fleuriste-annefreret.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Collections */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                Collections Mariage
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Nos Créations
              </h2>
              <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>
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
            <div className="bg-white p-12 text-center border border-[#b8935a]/20">
              <h3 className="text-3xl font-serif text-[#2d2a26] mb-6">
                Création Sur-Mesure
              </h3>
              <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
              <p className="text-xl text-[#2d2a26] font-light mb-8 max-w-2xl mx-auto leading-relaxed">
                Votre mariage est unique ? Nous créons ensemble des compositions florales 
                personnalisées qui correspondent parfaitement à vos rêves.
              </p>
              <a 
                href="#devis"
                className="text-[#b8935a] underline hover:text-[#b8956a] transition-colors"
              >
                Discutons de votre projet
              </a>
            </div>
          </div>
        </section>

        {/* Box Mariage */}
        <section className="py-24 md:py-32 bg-[#faf8f5]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-[#b8935a] text-[10px] tracking-[0.25em] uppercase mb-4">Nos créations</p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-4">Box Mariage</h2>
              <div className="w-12 h-px bg-[#b8935a] mx-auto mb-6" />
              <p className="text-sm text-[#2d2a26]/50 font-light max-w-lg mx-auto leading-relaxed">
                Bouquet de mariée, peigne floral et boutonnière assortie — tout ce qu&#39;il faut pour le plus beau jour.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {mockProducts
                .filter(p => p.name.includes('Box Mariage') || p.name.includes('Box Champêtre'))
                .map(product => (
                  <Link key={product.id} href={`/produit/${product.slug}`} className="group">
                    <div className="relative aspect-square overflow-hidden bg-[#f5f0eb] mb-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <h3 className="font-serif text-base text-[#2d2a26] group-hover:text-[#b8935a] transition-colors mb-1">{product.name}</h3>
                    <p className="text-sm font-serif text-[#2d2a26]/60">{product.price.toFixed(2)}€</p>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Galerie */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                Galerie
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Nos Réalisations
              </h2>
              <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>
              <p className="text-xl text-[#2d2a26] font-light max-w-2xl mx-auto leading-relaxed">
                Découvrez nos plus belles créations pour vous inspirer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=600',
                'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=600',
                'https://images.pexels.com/photos/1128782/pexels-photo-1128782.jpeg?auto=compress&cs=tinysrgb&w=600',
                'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=600',
                'https://images.pexels.com/photos/1045541/pexels-photo-1045541.jpeg?auto=compress&cs=tinysrgb&w=600',
                'https://images.pexels.com/photos/4234545/pexels-photo-4234545.jpeg?auto=compress&cs=tinysrgb&w=600'
              ].map((image, index) => (
                <div 
                  key={index}
                  className="aspect-[4/5] overflow-hidden group"
                >
                  <img
                    src={image}
                    alt={['Table champêtre fleurie', 'Allée cérémonie fleurs roses', 'Centre de table bougies dorées', 'Table banquet eucalyptus', 'Chaises mariés décorées', 'Arche florale cérémonie en jardin'][index]}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>

            <div className="text-center">
              <a 
                href="/galerie"
                className="text-[#b8935a] underline hover:text-[#b8956a] transition-colors"
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
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                Notre Approche
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Un Accompagnement Complet
              </h2>
              <div className="w-16 h-px bg-[#b8935a] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">Consultation</h3>
                <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Rencontre personnalisée pour comprendre vos goûts et l'ambiance souhaitée.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">Création</h3>
                <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  Réalisation de vos compositions avec possibilité d'ajustements.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-4">Livraison</h3>
                <div className="w-16 h-px bg-[#b8935a] mx-auto mb-6"></div>
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
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">
                  Demande de Devis
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                  Parlons de Votre Projet
                </h2>
                <div className="w-16 h-px bg-[#b8935a] mx-auto mb-8"></div>
                <p className="text-xl text-[#2d2a26] font-light leading-relaxed">
                  Partagez-nous les détails de votre projet pour recevoir une proposition personnalisée.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-3">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#b8935a] focus:outline-none transition-colors font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-3">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#b8935a] focus:outline-none transition-colors font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-3">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#b8935a] focus:outline-none transition-colors font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-3">
                      Date du mariage
                    </label>
                    <input
                      type="date"
                      name="dateMariage"
                      value={formData.dateMariage}
                      onChange={handleInputChange}
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#b8935a] focus:outline-none transition-colors font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-3">
                      Lieu de la cérémonie
                    </label>
                    <input
                      type="text"
                      name="lieuMariage"
                      value={formData.lieuMariage}
                      onChange={handleInputChange}
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#b8935a] focus:outline-none transition-colors font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-3">
                      Budget estimé
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#b8935a] focus:outline-none transition-colors font-light"
                    >
                      <option value="">Sélectionner un budget</option>
                      <option value="500-1000">500€ - 1 000€</option>
                      <option value="1000-2000">1 000€ - 2 000€</option>
                      <option value="2000-3500">2 000€ - 3 500€</option>
                      <option value="3500-5000">3 500€ - 5 000€</option>
                      <option value="5000+">5 000€ et plus</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-3">
                    Décrivez votre projet
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Partagez-nous vos idées, votre style, vos couleurs préférées..."
                    className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] placeholder-[#2d2a26]/50 focus:border-[#b8935a] focus:outline-none transition-colors resize-none font-light"
                  />
                </div>

                <div className="text-center pt-6">
                  <button
                    type="submit"
                    className="bg-[#b8935a] text-white px-8 py-4 hover:bg-[#b8956a] transition-colors duration-300"
                  >
                    Envoyer ma demande
                  </button>

                  <p className="text-[#2d2a26] text-sm mt-6 font-light">
                    Réponse sous 24h • Devis gratuit et sans engagement
                  </p>
                  <p className="text-[#2d2a26]/60 text-sm mt-3 font-light">
                    Vous pouvez aussi nous écrire directement à{' '}
                    <a href="mailto:evenementiel@fleuriste-annefreret.com" className="text-[#b8935a] hover:text-[#b8956a] transition-colors">
                      evenementiel@fleuriste-annefreret.com
                    </a>
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