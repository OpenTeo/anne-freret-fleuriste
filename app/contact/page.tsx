'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-20">
        
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-8">
              Contact
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2d2a26] mb-8 leading-tight">
              Parlons de Votre Projet
            </h1>

            <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>

            <p className="text-xl text-[#2d2a26] font-light max-w-2xl mx-auto leading-relaxed">
              Nous sommes là pour vous accompagner dans tous vos projets floraux. 
              N'hésitez pas à nous contacter pour un devis personnalisé.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-6 lg:px-8 pb-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Informations de Contact */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                Informations
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif text-[#2d2a26] mb-8">
                Nous Trouver
              </h2>

              <div className="w-16 h-px bg-[#c4a47a] mb-12"></div>
              
              <div className="space-y-12">
                <div>
                  <h3 className="text-xl font-serif text-[#2d2a26] mb-3">Adresse</h3>
                  <p className="text-[#2d2a26] font-light leading-relaxed">
                    Place de l'Église<br />
                    50270 Saint-Pair-sur-Mer<br />
                    France
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-[#2d2a26] mb-3">Téléphone</h3>
                  <a 
                    href="tel:0233502615" 
                    className="text-[#c4a47a] font-light hover:text-[#b8956a] transition-colors"
                  >
                    02 33 50 26 15
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-[#2d2a26] mb-3">Email</h3>
                  <a 
                    href="mailto:contact@annefreret.com" 
                    className="text-[#c4a47a] font-light hover:text-[#b8956a] transition-colors"
                  >
                    contact@annefreret.com
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-[#2d2a26] mb-3">Horaires</h3>
                  <div className="text-[#2d2a26] font-light leading-relaxed space-y-1">
                    <p>Lundi - Samedi : 9h00 - 19h00</p>
                    <p>Dimanche : 10h00 - 17h00</p>
                    <p className="text-sm text-[#c4a47a]">Fermé les jours fériés</p>
                  </div>
                </div>
              </div>

              {/* Carte placeholder */}
              <div className="mt-12 h-64 bg-white border border-[#c4a47a]/20 flex items-center justify-center">
                <p className="text-[#2d2a26] font-light">Carte de localisation</p>
              </div>
            </div>

            {/* Formulaire de Contact */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                Message
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif text-[#2d2a26] mb-8">
                Écrivez-nous
              </h2>

              <div className="w-16 h-px bg-[#c4a47a] mb-12"></div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[11px] uppercase tracking-[0.2em] text-[#c4a47a] mb-3">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#e8e0d8] text-[#2d2a26] font-light focus:outline-none focus:border-[#c4a47a] transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-[11px] uppercase tracking-[0.2em] text-[#c4a47a] mb-3">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e0d8] text-[#2d2a26] font-light focus:outline-none focus:border-[#c4a47a] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-[11px] uppercase tracking-[0.2em] text-[#c4a47a] mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#e8e0d8] text-[#2d2a26] font-light focus:outline-none focus:border-[#c4a47a] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[11px] uppercase tracking-[0.2em] text-[#c4a47a] mb-3">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#e8e0d8] text-[#2d2a26] font-light focus:outline-none focus:border-[#c4a47a] transition-colors"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="devis">Demande de devis</option>
                    <option value="mariage">Décoration de mariage</option>
                    <option value="evenement">Événement spécial</option>
                    <option value="abonnement">Abonnement fleurs</option>
                    <option value="renseignement">Renseignement général</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] uppercase tracking-[0.2em] text-[#c4a47a] mb-3">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-[#e8e0d8] text-[#2d2a26] font-light focus:outline-none focus:border-[#c4a47a] transition-colors resize-none"
                    placeholder="Décrivez votre projet, vos besoins, la date souhaitée..."
                  />
                </div>

                <div className="text-center pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitted}
                    className="bg-[#c4a47a] text-white px-8 py-4 hover:bg-[#b8956a] transition-colors duration-300 disabled:opacity-50"
                  >
                    {isSubmitted ? 'Message envoyé ✓' : 'Envoyer le message'}
                  </button>

                  <p className="text-[#2d2a26] text-sm font-light mt-6">
                    * Champs obligatoires. Nous nous engageons à répondre sous 24h.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
              Conseil Personnalisé
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif text-[#2d2a26] mb-8">
              Besoin d'un Accompagnement ?
            </h2>
            
            <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
            
            <p className="text-xl text-[#2d2a26] font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Nos experts sont disponibles pour vous accompagner dans votre projet. 
              Appelez-nous directement ou prenez rendez-vous en boutique.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <a
                href="tel:0233502615"
                className="bg-[#c4a47a] text-white px-8 py-4 hover:bg-[#b8956a] transition-colors duration-300"
              >
                Appeler maintenant
              </a>
              <a
                href="/boutique"
                className="text-[#c4a47a] underline hover:text-[#b8956a] transition-colors py-4"
              >
                Découvrir nos créations
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}