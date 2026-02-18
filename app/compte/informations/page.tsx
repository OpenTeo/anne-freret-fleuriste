'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Informations() {
  const { user, isLoading, updateProfile } = useAuth();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!isLoading && !user) router.push('/compte/connexion');
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user, isLoading, router]);

  const inputClass = "w-full px-4 py-3.5 bg-white border border-[#e8e0d8] text-[#2d2a26] placeholder-[#9a9490] focus:outline-none focus:border-[#b8935a] transition-colors duration-200 text-sm";
  const labelClass = "block text-[10px] tracking-[0.15em] uppercase text-[#2d2a26]/60 mb-2";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ firstName, lastName, email, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (isLoading || !user) return null;

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
        <section className="py-16 md:py-24">
          <div className="max-w-lg mx-auto px-4">
            <button onClick={() => router.push('/compte')} className="text-[#b8935a] text-sm hover:underline mb-6 inline-block">← Mon compte</button>
            
            <h1 className="font-serif text-2xl md:text-3xl text-[#2d2a26] mb-8">Mes informations</h1>

            <form onSubmit={handleSave} className="space-y-5">
              {saved && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-4">
                  ✓ Informations mises à jour avec succès
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Prénom</label>
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Nom</label>
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Téléphone</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} />
              </div>
              <button type="submit" className="w-full py-4 bg-[#b8935a] text-white hover:bg-[#b8956a] transition-colors duration-300 text-sm">
                Enregistrer les modifications
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
