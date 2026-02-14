'use client';

import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-black" />
          </div>

          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Restez informé de nos nouveautés
          </h2>
          
          <p className="text-white/70 text-lg mb-8">
            Découvrez en avant-première nos nouvelles créations et bénéficiez d'offres exclusives.
          </p>

          {isSubscribed ? (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-green-400">
              Merci ! Vous êtes maintenant inscrit à notre newsletter.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="btn btn-primary px-6 py-3 whitespace-nowrap inline-flex items-center"
              >
                S'inscrire
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </form>
          )}

          <p className="text-white/50 text-sm mt-4">
            Pas de spam, désinscription possible à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;