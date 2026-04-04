'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    // Toujours afficher "envoyé" (sécurité)
    setStatus('sent');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#faf8f5] pt-32 pb-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-2">Mot de passe oublié</h1>
            <div className="w-12 h-px bg-[#b8935a] mx-auto mb-4" />
            <p className="text-sm text-[#2d2a26]/60 font-light">
              Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </div>

          {status === 'sent' ? (
            <div className="bg-white border border-[#e8e0d8] p-8 text-center">
              <p className="text-2xl mb-3">📧</p>
              <p className="text-[#2d2a26] mb-2 font-medium">Email envoyé !</p>
              <p className="text-sm text-[#2d2a26]/60 font-light mb-6">
                Si un compte existe avec cette adresse, vous recevrez un lien de réinitialisation.
                Vérifiez aussi vos spams.
              </p>
              <Link href="/compte/connexion" className="text-[#b8935a] text-sm underline">
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-[#e8e0d8] p-8 space-y-5">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-2">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#b8935a] focus:outline-none font-light"
                  placeholder="votre@email.com"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#b8935a] text-white py-3 text-sm uppercase tracking-[0.1em] hover:bg-[#a6834e] transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le lien'}
              </button>
              <p className="text-center">
                <Link href="/compte/connexion" className="text-[#b8935a] text-sm underline">
                  Retour à la connexion
                </Link>
              </p>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
