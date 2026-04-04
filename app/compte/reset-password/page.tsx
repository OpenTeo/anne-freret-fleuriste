'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erreur');
      }

      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setStatus('error');
    }
  };

  if (!token) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#faf8f5] pt-32 pb-20 px-4">
          <div className="max-w-md mx-auto text-center">
            <p className="text-[#2d2a26]/60">Lien invalide. Veuillez refaire une demande de réinitialisation.</p>
            <Link href="/compte/connexion" className="text-[#b8935a] underline mt-4 inline-block">
              Retour à la connexion
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#faf8f5] pt-32 pb-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-2">Nouveau mot de passe</h1>
            <div className="w-12 h-px bg-[#b8935a] mx-auto" />
          </div>

          {status === 'success' ? (
            <div className="bg-white border border-[#e8e0d8] p-8 text-center">
              <p className="text-2xl mb-3">✅</p>
              <p className="text-[#2d2a26] mb-4">Mot de passe mis à jour avec succès !</p>
              <Link
                href="/compte/connexion"
                className="inline-block bg-[#b8935a] text-white px-6 py-3 text-sm uppercase tracking-[0.1em] hover:bg-[#a6834e] transition-colors"
              >
                Se connecter
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-[#e8e0d8] p-8 space-y-5">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-2">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#b8935a] focus:outline-none font-light"
                  placeholder="Minimum 8 caractères"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-2">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#b8935a] focus:outline-none font-light"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#b8935a] text-white py-3 text-sm uppercase tracking-[0.1em] hover:bg-[#a6834e] transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'En cours...' : 'Valider'}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f5]" />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
