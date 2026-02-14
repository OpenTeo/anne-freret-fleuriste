'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Inscription() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptCgv, setAcceptCgv] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const inputClass = "w-full px-4 py-3.5 bg-white border border-[#e8e0d8] text-[#2d2a26] placeholder-[#9a9490] focus:outline-none focus:border-[#c4a47a] transition-colors duration-200 text-sm";
  const labelClass = "block text-[10px] tracking-[0.15em] uppercase text-[#2d2a26]/60 mb-2";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    if (!acceptCgv) {
      setError('Veuillez accepter les conditions générales de vente');
      return;
    }

    setLoading(true);
    const result = await register({ firstName, lastName, email, phone, password });
    setLoading(false);

    if (result.success) {
      router.push('/compte');
    } else {
      setError(result.error || "Erreur lors de l'inscription");
    }
  };

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
        <section className="py-16 md:py-24">
          <div className="max-w-lg mx-auto px-4">
            
            <div className="text-center mb-10">
              <p className="text-[#c4a47a] text-[10px] tracking-[0.3em] uppercase mb-3">Bienvenue</p>
              <h1 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-4">Créer un compte</h1>
              <div className="w-12 h-px bg-[#c4a47a] mx-auto mb-4"></div>
              <p className="text-[#2d2a26]/50 text-sm">
                Rejoignez Anne Freret pour suivre vos commandes, gérer votre abonnement et profiter d'offres exclusives.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Prénom *</label>
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Marie" required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Nom *</label>
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Dupont" required className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" required className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Téléphone *</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="06 12 34 56 78" required className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Mot de passe *</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimum 8 caractères" required className={inputClass} />
                <div className="mt-2 flex gap-1">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      password.length >= i * 3 ? (password.length >= 12 ? 'bg-green-400' : password.length >= 8 ? 'bg-[#c4a47a]' : 'bg-orange-300') : 'bg-[#e8e0d8]'
                    }`} />
                  ))}
                </div>
                <p className="text-[10px] text-[#2d2a26]/40 mt-1">
                  {password.length === 0 ? '' : password.length < 8 ? 'Trop court' : password.length < 12 ? 'Correct' : 'Excellent'}
                </p>
              </div>

              <div>
                <label className={labelClass}>Confirmer le mot de passe *</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirmez votre mot de passe" required className={inputClass} />
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">Les mots de passe ne correspondent pas</p>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    onClick={() => setAcceptCgv(!acceptCgv)}
                    className={`w-5 h-5 mt-0.5 border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      acceptCgv ? 'bg-[#c4a47a] border-[#c4a47a]' : 'border-[#e8e0d8]'
                    }`}
                  >
                    {acceptCgv && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className="text-xs text-[#2d2a26]/60 leading-relaxed">
                    J'accepte les <Link href="/cgv" className="text-[#c4a47a] underline">conditions générales de vente</Link> et la <Link href="/mentions-legales" className="text-[#c4a47a] underline">politique de confidentialité</Link> *
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    onClick={() => setNewsletter(!newsletter)}
                    className={`w-5 h-5 mt-0.5 border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      newsletter ? 'bg-[#c4a47a] border-[#c4a47a]' : 'border-[#e8e0d8]'
                    }`}
                  >
                    {newsletter && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className="text-xs text-[#2d2a26]/60">
                    Je souhaite recevoir les offres exclusives et actualités d'Anne Freret par email
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#c4a47a] text-white hover:bg-[#b8956a] transition-colors duration-300 text-sm tracking-wide disabled:opacity-50"
              >
                {loading ? 'Création du compte...' : 'Créer mon compte'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-[#2d2a26]/60">
                Déjà un compte ?{' '}
                <Link href="/compte/connexion" className="text-[#c4a47a] hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
