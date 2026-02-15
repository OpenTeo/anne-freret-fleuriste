'use client';

import { useState, useEffect } from 'react';

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('newsletter-dismissed');
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('newsletter-dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    localStorage.setItem('newsletter-dismissed', 'true');
    setTimeout(() => setShow(false), 3000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
      
      {/* Modal */}
      <div className="relative bg-[#faf8f5] max-w-md w-full p-8 md:p-10 shadow-2xl">
        {/* Close */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#2d2a26]/40 hover:text-[#2d2a26] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!submitted ? (
          <>
            {/* Icon */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#c4a47a]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-3">Offre de bienvenue</p>
              <h3 className="font-serif text-2xl md:text-3xl text-[#2d2a26] mb-2">
                -10% sur votre première commande
              </h3>
              <p className="text-sm text-[#2d2a26]/60 leading-relaxed">
                Inscrivez-vous à notre newsletter et recevez votre code promo par email. Conseils floraux et nouveautés en exclusivité.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="w-full px-4 py-3 bg-white border border-[#e8e0d8] text-[#2d2a26] text-sm placeholder:text-[#2d2a26]/30 focus:outline-none focus:border-[#c4a47a] transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-[#c4a47a] text-white py-3 text-sm uppercase tracking-[0.15em] hover:bg-[#b8956a] transition-colors"
              >
                Recevoir mon code -10%
              </button>
            </form>

            <p className="text-[10px] text-[#2d2a26]/30 text-center mt-4">
              En vous inscrivant, vous acceptez de recevoir nos emails. Désabonnement possible à tout moment.
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#c4a47a]/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-[#2d2a26] mb-2">Merci !</h3>
            <p className="text-sm text-[#2d2a26]/60">
              Votre code <span className="font-medium text-[#c4a47a]">BIENVENUE10</span> arrive dans votre boîte mail.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
