'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Adresses() {
  const { user, isLoading, updateProfile } = useAuth();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [address, setAddress] = useState('');
  const [addressComplement, setAddressComplement] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    if (!isLoading && !user) router.push('/compte/connexion');
    if (user) {
      setAddress(user.address || '');
      setAddressComplement(user.addressComplement || '');
      setPostalCode(user.postalCode || '');
      setCity(user.city || '');
    }
  }, [user, isLoading, router]);

  const inputClass = "w-full px-4 py-3.5 bg-white border border-[#e8e0d8] text-[#2d2a26] placeholder-[#9a9490] focus:outline-none focus:border-[#c4a47a] transition-colors duration-200 text-sm";
  const labelClass = "block text-[10px] tracking-[0.15em] uppercase text-[#2d2a26]/60 mb-2";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ address, addressComplement, postalCode, city });
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
            <button onClick={() => router.push('/compte')} className="text-[#c4a47a] text-sm hover:underline mb-6 inline-block">← Mon compte</button>
            <h1 className="font-serif text-2xl md:text-3xl text-[#2d2a26] mb-8">Mes adresses</h1>

            <form onSubmit={handleSave} className="space-y-5">
              {saved && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-4">
                  ✓ Adresse mise à jour avec succès
                </div>
              )}
              <div>
                <label className={labelClass}>Adresse</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Numéro et nom de rue" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Complément</label>
                <input type="text" value={addressComplement} onChange={e => setAddressComplement(e.target.value)} placeholder="Appartement, étage..." className={inputClass} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Code postal</label>
                  <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} placeholder="75001" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Ville</label>
                  <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Paris" className={inputClass} />
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-[#c4a47a] text-white hover:bg-[#b8956a] transition-colors duration-300 text-sm">
                Enregistrer l'adresse
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
