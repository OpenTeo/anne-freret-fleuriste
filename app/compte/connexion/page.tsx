'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const inputClass = "w-full px-4 py-3.5 bg-white border border-[#e8e0d8] text-[#2d2a26] placeholder-[#9a9490] focus:outline-none focus:border-[#c4a47a] transition-colors duration-200 text-sm";
  const labelClass = "block text-[10px] tracking-[0.15em] uppercase text-[#2d2a26]/60 mb-2";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      router.push('/compte');
    } else {
      setError(result.error || 'Erreur de connexion');
    }
  };

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
        <section className="py-20 md:py-28">
          <div className="max-w-md mx-auto px-4">
            
            <div className="text-center mb-10">
              <p className="text-[#c4a47a] text-[10px] tracking-[0.3em] uppercase mb-3">Mon compte</p>
              <h1 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-4">Connexion</h1>
              <div className="w-12 h-px bg-[#c4a47a] mx-auto"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4">
                  {error}
                </div>
              )}

              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={inputClass}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-[#c4a47a]" />
                  <span className="text-xs text-[#2d2a26]/60">Se souvenir de moi</span>
                </label>
                <button type="button" className="text-xs text-[#c4a47a] hover:underline">
                  Mot de passe oublié ?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#c4a47a] text-white hover:bg-[#b8956a] transition-colors duration-300 text-sm tracking-wide disabled:opacity-50"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#e8e0d8]"></div></div>
                <div className="relative flex justify-center"><span className="bg-[#faf8f5] px-4 text-xs text-[#2d2a26]/40">ou</span></div>
              </div>
              <p className="text-sm text-[#2d2a26]/60">
                Pas encore de compte ?{' '}
                <Link href="/compte/inscription" className="text-[#c4a47a] hover:underline">
                  Créer un compte
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
