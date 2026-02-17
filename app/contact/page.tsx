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
                    39 Place du Général de Gaulle<br />
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

              {/* Illustration carte vintage */}
              <div className="mt-12 bg-[#f5f0eb] border border-[#c4a47a]/20 p-6 md:p-8">
                <svg viewBox="0 0 600 360" className="w-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Fond parchemin */}
                  <rect width="600" height="360" fill="#f5f0eb"/>
                  
                  {/* Routes principales — ligne fine style gravure */}
                  <path d="M0 180 L180 180 L300 160 L450 170 L600 150" stroke="#c4a47a" strokeWidth="1.5" fill="none" opacity="0.4"/>
                  <path d="M300 0 L300 160 L300 360" stroke="#c4a47a" strokeWidth="1.5" fill="none" opacity="0.4"/>
                  <path d="M200 360 L250 250 L300 160" stroke="#c4a47a" strokeWidth="1" fill="none" opacity="0.3"/>
                  <path d="M300 160 L380 100 L500 0" stroke="#c4a47a" strokeWidth="1" fill="none" opacity="0.3"/>
                  
                  {/* Mer à gauche */}
                  <path d="M0 0 L0 360 L80 360 L60 300 L70 240 L50 180 L65 120 L55 60 L70 0 Z" fill="#c4a47a" opacity="0.08"/>
                  <path d="M70 0 Q60 40 65 80 Q55 120 60 160 Q50 200 55 240 Q65 280 60 320 Q55 350 65 360" stroke="#c4a47a" strokeWidth="0.8" fill="none" opacity="0.25" strokeDasharray="4 3"/>
                  <text x="25" y="200" fill="#c4a47a" opacity="0.3" fontSize="10" fontStyle="italic" transform="rotate(-90 25 200)">La Manche</text>

                  {/* Église — petit symbole croix */}
                  <g transform="translate(280, 145)">
                    <line x1="0" y1="-8" x2="0" y2="8" stroke="#2d2a26" strokeWidth="1.2" opacity="0.5"/>
                    <line x1="-5" y1="-3" x2="5" y2="-3" stroke="#2d2a26" strokeWidth="1.2" opacity="0.5"/>
                    <text x="8" y="4" fill="#2d2a26" opacity="0.4" fontSize="8" fontStyle="italic">Église</text>
                  </g>
                  
                  {/* Pin boutique — doré */}
                  <g transform="translate(310, 155)">
                    <path d="M0-24C-7.5-24-13.5-18-13.5-10.5c0 10 13.5 24 13.5 24s13.5-14 13.5-24C13.5-18 7.5-24 0-24z" fill="#c4a47a"/>
                    <circle cx="0" cy="-12" r="5" fill="#faf8f5"/>
                    {/* Petite fleur dans le pin */}
                    <circle cx="0" cy="-12" r="2" fill="#c4a47a"/>
                  </g>

                  {/* Nom de la boutique */}
                  <text x="310" y="195" textAnchor="middle" fill="#2d2a26" fontSize="11" fontWeight="500" letterSpacing="0.1em" fontFamily="serif">Anne Freret</text>
                  <text x="310" y="210" textAnchor="middle" fill="#2d2a26" opacity="0.5" fontSize="8" letterSpacing="0.05em">39 Pl. du Général de Gaulle</text>
                  
                  {/* Noms de rues — style ancien */}
                  <text x="400" y="175" fill="#2d2a26" opacity="0.25" fontSize="7" fontStyle="italic">Rue du Gal de Gaulle</text>
                  <text x="310" y="90" fill="#2d2a26" opacity="0.25" fontSize="7" fontStyle="italic" textAnchor="middle">Route d&apos;Avranches</text>
                  <text x="150" y="175" fill="#2d2a26" opacity="0.25" fontSize="7" fontStyle="italic">Vers Granville</text>
                  
                  {/* Ville */}
                  <text x="310" y="240" textAnchor="middle" fill="#c4a47a" opacity="0.35" fontSize="14" letterSpacing="0.4em" fontFamily="serif">SAINT-PAIR-SUR-MER</text>
                  
                  {/* Rose des vents simplifiée */}
                  <g transform="translate(540, 50)">
                    <line x1="0" y1="-18" x2="0" y2="18" stroke="#c4a47a" strokeWidth="0.8" opacity="0.4"/>
                    <line x1="-18" y1="0" x2="18" y2="0" stroke="#c4a47a" strokeWidth="0.8" opacity="0.4"/>
                    <text x="0" y="-22" textAnchor="middle" fill="#c4a47a" opacity="0.5" fontSize="8">N</text>
                    <circle cx="0" cy="0" r="3" fill="#c4a47a" opacity="0.3"/>
                  </g>

                  {/* Bordure décorative intérieure */}
                  <rect x="8" y="8" width="584" height="344" fill="none" stroke="#c4a47a" strokeWidth="0.5" opacity="0.2"/>
                </svg>
                
                <div className="flex items-center justify-between mt-4">
                  <p className="text-[9px] tracking-[0.1em] uppercase text-[#2d2a26]/30">À deux pas de l&apos;église de Saint-Pair-sur-Mer</p>
                  <a 
                    href="https://www.google.com/maps/search/39+Place+du+Général+de+Gaulle+50380+Saint-Pair-sur-Mer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] tracking-[0.15em] uppercase text-[#c4a47a] hover:text-[#2d2a26] transition-colors border-b border-[#c4a47a]/30 pb-0.5"
                  >
                    Voir sur Google Maps
                  </a>
                </div>
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