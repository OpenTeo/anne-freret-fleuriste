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
                <svg viewBox="0 0 600 440" className="w-full" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                  {/* Fond parchemin */}
                  <rect width="600" height="440" fill="#f5f0eb"/>
                  
                  {/* Côte dessinée — trait irrégulier style encre */}
                  <path d="M82 0 Q75 20 78 45 Q70 70 76 95 Q68 120 74 145 Q80 165 72 190 Q78 215 70 240 Q76 265 80 290 Q72 320 78 350 Q84 380 76 410 Q80 430 78 440" stroke="#2d2a26" strokeWidth="1.8" fill="none" opacity="0.6"/>
                  {/* Hachures côte — style gravure */}
                  <path d="M78 20 L68 22 M74 40 L62 43 M76 60 L64 62 M72 80 L60 83 M76 100 L66 103 M70 120 L58 122 M74 140 L64 143 M78 160 L66 162 M72 180 L60 183 M76 200 L64 202 M70 220 L58 223 M74 240 L62 242 M78 260 L66 263 M72 280 L60 282 M76 300 L64 303 M80 320 L68 322 M74 340 L62 343 M78 360 L66 363 M76 380 L64 382 M80 400 L68 402 M76 420 L64 423" stroke="#2d2a26" strokeWidth="0.6" opacity="0.25"/>
                  
                  {/* Petites vagues mer */}
                  <path d="M30 100 Q35 97 40 100 Q45 103 50 100" stroke="#2d2a26" strokeWidth="0.6" fill="none" opacity="0.2"/>
                  <path d="M20 150 Q25 147 30 150 Q35 153 40 150" stroke="#2d2a26" strokeWidth="0.6" fill="none" opacity="0.2"/>
                  <path d="M35 200 Q40 197 45 200 Q50 203 55 200" stroke="#2d2a26" strokeWidth="0.6" fill="none" opacity="0.15"/>
                  <path d="M25 260 Q30 257 35 260 Q40 263 45 260" stroke="#2d2a26" strokeWidth="0.6" fill="none" opacity="0.2"/>
                  <path d="M40 320 Q45 317 50 320 Q55 323 60 320" stroke="#2d2a26" strokeWidth="0.6" fill="none" opacity="0.15"/>
                  <text x="25" y="55" fill="#2d2a26" opacity="0.2" fontSize="11" fontStyle="italic" letterSpacing="0.1em" transform="rotate(-80 25 55)">La Manche</text>

                  {/* Routes — traits fins pointillés */}
                  <path d="M85 200 Q150 195 250 192 Q300 190 350 188 Q450 184 600 178" stroke="#2d2a26" strokeWidth="0.8" fill="none" opacity="0.3" strokeDasharray="8 4"/>
                  <path d="M280 30 Q285 80 288 130 Q290 160 290 190 Q290 250 285 320 Q282 370 280 440" stroke="#2d2a26" strokeWidth="0.6" fill="none" opacity="0.2" strokeDasharray="6 4"/>
                  <path d="M290 190 Q350 140 420 100 Q480 70 540 40" stroke="#2d2a26" strokeWidth="0.6" fill="none" opacity="0.2" strokeDasharray="6 4"/>

                  {/* === GRANVILLE — rempart + tour === */}
                  <g transform="translate(200, 72)">
                    {/* Rempart */}
                    <rect x="-12" y="-8" width="24" height="16" fill="none" stroke="#2d2a26" strokeWidth="1.2" opacity="0.55"/>
                    {/* Créneaux */}
                    <path d="M-12 -8 L-12 -12 L-8 -12 L-8 -8 M-4 -8 L-4 -12 L0 -12 L0 -8 M4 -8 L4 -12 L8 -12 L8 -8" stroke="#2d2a26" strokeWidth="1" fill="none" opacity="0.55"/>
                    {/* Tour */}
                    <line x1="0" y1="-12" x2="0" y2="-20" stroke="#2d2a26" strokeWidth="1" opacity="0.5"/>
                    <path d="M-3 -20 L0 -24 L3 -20" stroke="#2d2a26" strokeWidth="0.8" fill="none" opacity="0.5"/>
                    <text x="0" y="22" textAnchor="middle" fill="#2d2a26" opacity="0.6" fontSize="12" fontStyle="italic">Granville</text>
                  </g>
                  
                  {/* === AVRANCHES — cathédrale === */}
                  <g transform="translate(490, 85)">
                    {/* Base cathédrale */}
                    <rect x="-8" y="-6" width="16" height="12" fill="none" stroke="#2d2a26" strokeWidth="1" opacity="0.5"/>
                    {/* Toit triangulaire */}
                    <path d="M-10 -6 L0 -16 L10 -6" stroke="#2d2a26" strokeWidth="1" fill="none" opacity="0.5"/>
                    {/* Croix */}
                    <line x1="0" y1="-16" x2="0" y2="-22" stroke="#2d2a26" strokeWidth="0.8" opacity="0.5"/>
                    <line x1="-2" y1="-19" x2="2" y2="-19" stroke="#2d2a26" strokeWidth="0.8" opacity="0.5"/>
                    <text x="0" y="20" textAnchor="middle" fill="#2d2a26" opacity="0.6" fontSize="12" fontStyle="italic">Avranches</text>
                  </g>

                  {/* === MONT SAINT-MICHEL — illustration détaillée === */}
                  <g transform="translate(460, 290)">
                    {/* Île/rocher base */}
                    <ellipse cx="0" cy="12" rx="28" ry="8" fill="#2d2a26" opacity="0.08"/>
                    {/* Mont — forme pyramidale */}
                    <path d="M-25 12 Q-20 0 -15 -5 Q-10 -12 -5 -20 Q-2 -30 0 -38 Q2 -30 5 -20 Q10 -12 15 -5 Q20 0 25 12 Z" fill="#2d2a26" opacity="0.1" stroke="#2d2a26" strokeWidth="1.2" />
                    {/* Abbaye au sommet */}
                    <rect x="-6" y="-38" width="12" height="10" fill="none" stroke="#2d2a26" strokeWidth="0.8" opacity="0.6"/>
                    <path d="M-7 -38 L0 -45 L7 -38" stroke="#2d2a26" strokeWidth="0.8" fill="none" opacity="0.6"/>
                    {/* Flèche */}
                    <line x1="0" y1="-45" x2="0" y2="-55" stroke="#2d2a26" strokeWidth="0.8" opacity="0.6"/>
                    {/* Croix au sommet */}
                    <line x1="-2" y1="-53" x2="2" y2="-53" stroke="#2d2a26" strokeWidth="0.7" opacity="0.5"/>
                    {/* Petits bâtiments sur le mont */}
                    <rect x="-10" y="-15" width="5" height="6" fill="none" stroke="#2d2a26" strokeWidth="0.5" opacity="0.35"/>
                    <rect x="5" y="-12" width="4" height="5" fill="none" stroke="#2d2a26" strokeWidth="0.5" opacity="0.35"/>
                    <rect x="-3" y="-28" width="6" height="5" fill="none" stroke="#2d2a26" strokeWidth="0.5" opacity="0.35"/>
                    {/* Rempart bas */}
                    <path d="M-18 5 Q-15 3 -10 2 M10 2 Q15 3 18 5" stroke="#2d2a26" strokeWidth="0.6" opacity="0.3"/>
                    {/* Reflets eau */}
                    <path d="M-20 18 Q-15 16 -10 18 Q-5 20 0 18 Q5 16 10 18 Q15 20 20 18" stroke="#2d2a26" strokeWidth="0.4" fill="none" opacity="0.15"/>
                    <text x="0" y="32" textAnchor="middle" fill="#2d2a26" opacity="0.65" fontSize="11" fontStyle="italic">Mont Saint-Michel</text>
                    <text x="0" y="44" textAnchor="middle" fill="#2d2a26" opacity="0.35" fontSize="8">~ 25 km</text>
                  </g>

                  {/* === JULLOUVILLE — petite maison === */}
                  <g transform="translate(220, 270)">
                    <rect x="-4" y="-3" width="8" height="6" fill="none" stroke="#2d2a26" strokeWidth="0.7" opacity="0.35"/>
                    <path d="M-5 -3 L0 -7 L5 -3" stroke="#2d2a26" strokeWidth="0.7" fill="none" opacity="0.35"/>
                    <text x="10" y="2" fill="#2d2a26" opacity="0.4" fontSize="9" fontStyle="italic">Jullouville</text>
                  </g>

                  {/* === CAROLLES — falaise === */}
                  <g transform="translate(300, 330)">
                    <path d="M-8 4 L-6 -2 L-2 -5 L2 -3 L6 -6 L8 0 L8 4 Z" fill="none" stroke="#2d2a26" strokeWidth="0.8" opacity="0.35"/>
                    <text x="14" y="0" fill="#2d2a26" opacity="0.4" fontSize="9" fontStyle="italic">Carolles</text>
                  </g>

                  {/* === SAINT-PAIR-SUR-MER — boutique + église === */}
                  {/* Église */}
                  <g transform="translate(265, 178)">
                    <rect x="-4" y="-4" width="8" height="10" fill="none" stroke="#2d2a26" strokeWidth="0.8" opacity="0.5"/>
                    <path d="M-5 -4 L0 -10 L5 -4" stroke="#2d2a26" strokeWidth="0.8" fill="none" opacity="0.5"/>
                    <line x1="0" y1="-10" x2="0" y2="-14" stroke="#2d2a26" strokeWidth="0.7" opacity="0.5"/>
                    <line x1="-1.5" y1="-12" x2="1.5" y2="-12" stroke="#2d2a26" strokeWidth="0.7" opacity="0.5"/>
                    <text x="-2" y="16" fill="#2d2a26" opacity="0.35" fontSize="7" fontStyle="italic">Église</text>
                  </g>

                  {/* Bouquet de fleurs = la boutique */}
                  <g transform="translate(310, 170)">
                    {/* Vase */}
                    <path d="M-4 8 Q-5 4 -4 0 Q-3 -2 0 -3 Q3 -2 4 0 Q5 4 4 8 Z" fill="#c4a47a" opacity="0.6" stroke="#2d2a26" strokeWidth="0.8"/>
                    {/* Tiges */}
                    <line x1="-2" y1="-3" x2="-4" y2="-14" stroke="#2d2a26" strokeWidth="0.6" opacity="0.5"/>
                    <line x1="0" y1="-3" x2="0" y2="-16" stroke="#2d2a26" strokeWidth="0.6" opacity="0.5"/>
                    <line x1="2" y1="-3" x2="4" y2="-14" stroke="#2d2a26" strokeWidth="0.6" opacity="0.5"/>
                    {/* Fleurs */}
                    <circle cx="-4" cy="-16" r="3" fill="none" stroke="#2d2a26" strokeWidth="0.6" opacity="0.4"/>
                    <circle cx="0" cy="-18" r="3" fill="none" stroke="#2d2a26" strokeWidth="0.6" opacity="0.4"/>
                    <circle cx="4" cy="-15" r="2.5" fill="none" stroke="#2d2a26" strokeWidth="0.6" opacity="0.4"/>
                    <circle cx="-4" cy="-16" r="1" fill="#c4a47a" opacity="0.5"/>
                    <circle cx="0" cy="-18" r="1" fill="#c4a47a" opacity="0.5"/>
                    <circle cx="4" cy="-15" r="1" fill="#c4a47a" opacity="0.5"/>
                  </g>

                  {/* Nom boutique — calligraphie */}
                  <text x="310" y="198" textAnchor="middle" fill="#2d2a26" fontSize="13" fontWeight="500" fontStyle="italic" opacity="0.8">Anne Freret</text>
                  <text x="310" y="212" textAnchor="middle" fill="#2d2a26" opacity="0.45" fontSize="8" letterSpacing="0.08em">— Fleuriste —</text>
                  <text x="310" y="226" textAnchor="middle" fill="#2d2a26" opacity="0.4" fontSize="7.5">39 Place du Général de Gaulle</text>

                  {/* Nom de ville — grand lettrage */}
                  <text x="290" y="260" textAnchor="middle" fill="#2d2a26" opacity="0.15" fontSize="15" letterSpacing="0.6em">SAINT-PAIR-SUR-MER</text>

                  {/* === Petit voilier en mer === */}
                  <g transform="translate(55, 130)">
                    <path d="M-6 0 L6 0 L4 4 L-4 4 Z" fill="none" stroke="#2d2a26" strokeWidth="0.7" opacity="0.3"/>
                    <line x1="0" y1="0" x2="0" y2="-10" stroke="#2d2a26" strokeWidth="0.6" opacity="0.3"/>
                    <path d="M0 -10 L7 -2 L0 0 Z" fill="#2d2a26" opacity="0.1" stroke="#2d2a26" strokeWidth="0.5"/>
                  </g>

                  {/* === Rose des vents — ornée === */}
                  <g transform="translate(540, 390)">
                    {/* Cercle extérieur */}
                    <circle cx="0" cy="0" r="25" fill="none" stroke="#2d2a26" strokeWidth="0.5" opacity="0.25"/>
                    {/* Points cardinaux — flèches */}
                    <path d="M0 -22 L3 -8 L0 -5 L-3 -8 Z" fill="#2d2a26" opacity="0.35"/>
                    <path d="M0 22 L3 8 L0 5 L-3 8 Z" fill="#2d2a26" opacity="0.15"/>
                    <path d="M-22 0 L-8 -3 L-5 0 L-8 3 Z" fill="#2d2a26" opacity="0.15"/>
                    <path d="M22 0 L8 -3 L5 0 L8 3 Z" fill="#2d2a26" opacity="0.15"/>
                    {/* Diagonales */}
                    <line x1="-14" y1="-14" x2="14" y2="14" stroke="#2d2a26" strokeWidth="0.4" opacity="0.15"/>
                    <line x1="14" y1="-14" x2="-14" y2="14" stroke="#2d2a26" strokeWidth="0.4" opacity="0.15"/>
                    {/* Labels */}
                    <text x="0" y="-28" textAnchor="middle" fill="#2d2a26" opacity="0.5" fontSize="9">N</text>
                    <text x="0" y="34" textAnchor="middle" fill="#2d2a26" opacity="0.3" fontSize="7">S</text>
                    <text x="-30" y="3" textAnchor="middle" fill="#2d2a26" opacity="0.3" fontSize="7">O</text>
                    <text x="30" y="3" textAnchor="middle" fill="#2d2a26" opacity="0.3" fontSize="7">E</text>
                    <circle cx="0" cy="0" r="2" fill="#2d2a26" opacity="0.3"/>
                  </g>

                  {/* Bordure double décorative */}
                  <rect x="6" y="6" width="588" height="428" fill="none" stroke="#2d2a26" strokeWidth="0.6" opacity="0.15"/>
                  <rect x="12" y="12" width="576" height="416" fill="none" stroke="#2d2a26" strokeWidth="0.3" opacity="0.1"/>
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