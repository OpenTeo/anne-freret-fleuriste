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
                <svg viewBox="0 0 600 400" className="w-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Fond parchemin */}
                  <rect width="600" height="400" fill="#f5f0eb"/>
                  
                  {/* Côte — La Manche */}
                  <path d="M0 0 L0 400 L95 400 Q85 350 90 300 Q80 250 85 200 Q75 150 82 100 Q88 50 80 0 Z" fill="#c4a47a" opacity="0.07"/>
                  <path d="M85 0 Q78 30 82 60 Q75 90 80 120 Q72 150 78 180 Q82 210 76 240 Q80 270 85 300 Q78 340 88 400" stroke="#c4a47a" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="5 3"/>
                  <text x="35" y="220" fill="#c4a47a" opacity="0.25" fontSize="11" fontStyle="italic" letterSpacing="0.15em" transform="rotate(-90 35 220)">La Manche</text>

                  {/* Routes principales */}
                  <path d="M90 190 L200 185 L300 180 L430 175 L600 170" stroke="#c4a47a" strokeWidth="1.2" fill="none" opacity="0.35"/>
                  <path d="M300 50 L300 180 L300 380" stroke="#c4a47a" strokeWidth="1" fill="none" opacity="0.25"/>
                  <path d="M300 180 L420 100 L540 40" stroke="#c4a47a" strokeWidth="1" fill="none" opacity="0.25"/>
                  <path d="M300 180 L400 280 L500 370" stroke="#c4a47a" strokeWidth="0.8" fill="none" opacity="0.2"/>
                  
                  {/* Granville — au nord */}
                  <g transform="translate(180, 80)">
                    <circle cx="0" cy="0" r="3" fill="#2d2a26" opacity="0.25"/>
                    <text x="10" y="4" fill="#2d2a26" opacity="0.4" fontSize="10" fontFamily="serif">Granville</text>
                  </g>
                  
                  {/* Avranches — à droite */}
                  <g transform="translate(500, 95)">
                    <circle cx="0" cy="0" r="3" fill="#2d2a26" opacity="0.25"/>
                    <text x="-55" y="-8" fill="#2d2a26" opacity="0.4" fontSize="10" fontFamily="serif">Avranches</text>
                  </g>

                  {/* Mont Saint-Michel — silhouette en bas à droite */}
                  <g transform="translate(480, 310)">
                    {/* Silhouette simplifiée du Mont */}
                    <path d="M-15 5 Q-12 -5 -8 -8 Q-4 -15 -2 -22 Q0 -28 0 -32 Q0 -28 2 -22 Q4 -15 8 -8 Q12 -5 15 5 Z" fill="#c4a47a" opacity="0.35"/>
                    {/* Flèche de l'abbaye */}
                    <line x1="0" y1="-32" x2="0" y2="-38" stroke="#c4a47a" strokeWidth="0.8" opacity="0.4"/>
                    {/* Reflet dans l'eau */}
                    <ellipse cx="0" cy="8" rx="18" ry="3" fill="#c4a47a" opacity="0.08"/>
                    <text x="0" y="22" textAnchor="middle" fill="#2d2a26" opacity="0.45" fontSize="9" fontStyle="italic" fontFamily="serif">Mont Saint-Michel</text>
                    <text x="0" y="33" textAnchor="middle" fill="#2d2a26" opacity="0.3" fontSize="7">~ 25 km</text>
                  </g>

                  {/* Jullouville */}
                  <g transform="translate(230, 260)">
                    <circle cx="0" cy="0" r="2" fill="#2d2a26" opacity="0.2"/>
                    <text x="8" y="4" fill="#2d2a26" opacity="0.3" fontSize="8" fontStyle="italic">Jullouville</text>
                  </g>

                  {/* Carolles */}
                  <g transform="translate(280, 310)">
                    <circle cx="0" cy="0" r="2" fill="#2d2a26" opacity="0.2"/>
                    <text x="8" y="4" fill="#2d2a26" opacity="0.3" fontSize="8" fontStyle="italic">Carolles</text>
                  </g>

                  {/* Église — symbole croix */}
                  <g transform="translate(280, 170)">
                    <line x1="0" y1="-7" x2="0" y2="7" stroke="#2d2a26" strokeWidth="1" opacity="0.4"/>
                    <line x1="-4" y1="-2" x2="4" y2="-2" stroke="#2d2a26" strokeWidth="1" opacity="0.4"/>
                    <text x="8" y="3" fill="#2d2a26" opacity="0.35" fontSize="7" fontStyle="italic">Église</text>
                  </g>
                  
                  {/* Pin boutique — doré, plus grand */}
                  <g transform="translate(310, 172)">
                    <path d="M0-26C-8-26-14.5-19.5-14.5-11.5c0 11 14.5 26 14.5 26s14.5-15 14.5-26C14.5-19.5 8-26 0-26z" fill="#c4a47a"/>
                    <circle cx="0" cy="-13" r="5.5" fill="#faf8f5"/>
                    <circle cx="0" cy="-13" r="2.5" fill="#c4a47a"/>
                  </g>

                  {/* Nom de la boutique */}
                  <text x="310" y="215" textAnchor="middle" fill="#2d2a26" fontSize="12" fontWeight="500" letterSpacing="0.1em" fontFamily="serif">Anne Freret — Fleuriste</text>
                  <text x="310" y="232" textAnchor="middle" fill="#2d2a26" opacity="0.5" fontSize="8.5" letterSpacing="0.05em">39 Place du Général de Gaulle</text>
                  
                  {/* Ville — lettrage large */}
                  <text x="260" y="265" fill="#c4a47a" opacity="0.25" fontSize="13" letterSpacing="0.5em" fontFamily="serif">SAINT-PAIR-SUR-MER</text>
                  
                  {/* Routes labels */}
                  <text x="430" y="168" fill="#2d2a26" opacity="0.2" fontSize="7" fontStyle="italic">D 973</text>
                  <text x="310" y="120" fill="#2d2a26" opacity="0.2" fontSize="7" fontStyle="italic" textAnchor="middle">vers Granville</text>
                  <text x="440" y="85" fill="#2d2a26" opacity="0.2" fontSize="7" fontStyle="italic">vers Avranches</text>
                  
                  {/* Rose des vents */}
                  <g transform="translate(550, 55)">
                    <line x1="0" y1="-20" x2="0" y2="20" stroke="#c4a47a" strokeWidth="0.7" opacity="0.35"/>
                    <line x1="-20" y1="0" x2="20" y2="0" stroke="#c4a47a" strokeWidth="0.7" opacity="0.35"/>
                    <line x1="-12" y1="-12" x2="12" y2="12" stroke="#c4a47a" strokeWidth="0.4" opacity="0.2"/>
                    <line x1="12" y1="-12" x2="-12" y2="12" stroke="#c4a47a" strokeWidth="0.4" opacity="0.2"/>
                    <text x="0" y="-25" textAnchor="middle" fill="#c4a47a" opacity="0.5" fontSize="9" fontFamily="serif">N</text>
                    <circle cx="0" cy="0" r="3" fill="#c4a47a" opacity="0.25"/>
                    <circle cx="0" cy="0" r="1" fill="#c4a47a" opacity="0.4"/>
                  </g>

                  {/* Bordure double décorative */}
                  <rect x="6" y="6" width="588" height="388" fill="none" stroke="#c4a47a" strokeWidth="0.5" opacity="0.2"/>
                  <rect x="12" y="12" width="576" height="376" fill="none" stroke="#c4a47a" strokeWidth="0.3" opacity="0.15"/>
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