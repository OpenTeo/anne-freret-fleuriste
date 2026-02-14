'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

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
    // Here you would typically send the form data to your backend
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
      <main className="min-h-screen">
        {/* Hero section */}
        <section className="bg-primary text-secondary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
              Contactez-nous
            </h1>
            <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
              Nous sommes là pour vous accompagner dans tous vos projets floraux. 
              N'hésitez pas à nous contacter pour un devis personnalisé.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-primary mb-8">
                Informations de contact
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Adresse</h3>
                    <p className="text-muted">
                      Place de l'Église<br />
                      50270 Saint-Pair-sur-Mer, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Téléphone</h3>
                    <p className="text-muted">01 23 45 67 89</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Email</h3>
                    <p className="text-muted">contact@annefreret.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Horaires</h3>
                    <div className="text-muted space-y-1">
                      <p>Lundi - Samedi : 9h00 - 19h00</p>
                      <p>Dimanche : 10h00 - 17h00</p>
                      <p className="text-sm italic">Fermé les jours fériés</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Carte Google Maps</p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-primary mb-8">
                Envoyez-nous un message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
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
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    placeholder="Décrivez votre projet, vos besoins, la date souhaitée..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="w-full bg-accent text-primary font-semibold py-4 px-6 rounded-lg hover:bg-accent/90 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitted ? (
                    <span>Message envoyé ✓</span>
                  ) : (
                    <>
                      <span>Envoyer le message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>

              <p className="text-sm text-muted mt-4">
                * Champs obligatoires. Nous nous engageons à répondre sous 24h.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="bg-primary text-secondary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold mb-4">
              Besoin d'un conseil personnalisé ?
            </h2>
            <p className="text-lg text-secondary/80 mb-8 max-w-2xl mx-auto">
              Nos experts sont disponibles pour vous accompagner dans votre projet. 
              Appelez-nous directement ou prenez rendez-vous en boutique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0123456789"
                className="bg-accent text-primary px-8 py-3 rounded-full font-semibold hover:bg-accent/90 transition-colors"
              >
                Appeler maintenant
              </a>
              <button className="border-2 border-secondary text-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary hover:text-primary transition-colors">
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}