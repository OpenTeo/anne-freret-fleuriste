'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Identifiants invalides');
      }
    } catch {
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-[#2d2a26] tracking-wide">Anne Freret</h1>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#b8935a] mt-2 font-medium">
            Administration
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#e8e0d8] rounded-lg p-8 shadow-sm"
        >
          <h2 className="font-serif text-xl text-[#2d2a26] mb-6 text-center">Connexion</h2>

          {error && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2d2a26] mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[#e8e0d8] rounded-lg text-[#2d2a26] focus:outline-none focus:border-[#b8935a] transition-colors"
                placeholder="admin@annefreret.fr"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2d2a26] mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-[#e8e0d8] rounded-lg text-[#2d2a26] focus:outline-none focus:border-[#b8935a] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 py-3 bg-gradient-to-r from-[#b8935a] to-[#a07d45] text-white rounded-lg font-medium hover:from-[#a07d45] hover:to-[#8c6b3a] transition-all disabled:opacity-50"
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-xs text-[#2d2a26]/40 mt-6">
          Accès réservé aux administrateurs
        </p>
      </div>
    </div>
  );
}
