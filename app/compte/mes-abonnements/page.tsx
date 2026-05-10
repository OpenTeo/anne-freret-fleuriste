'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { apiFetch } from '@/lib/api-client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface Subscription {
  id: string;
  formula: 'essentiel' | 'signature' | 'prestige';
  status: 'active' | 'paused' | 'cancelled';
  frequency: 'weekly' | 'biweekly' | 'monthly';
  price: string;
  next_delivery_date: string;
  start_date: string;
  stripe_subscription_id: string;
}

const formulaLabels: Record<string, string> = {
  essentiel: '🌿 Essentiel',
  signature: '🌸 Signature',
  prestige: '👑 Prestige',
};

const frequencyLabels: Record<string, string> = {
  weekly: 'Chaque lundi',
  biweekly: 'Les 1er et 15 du mois',
  monthly: 'Le 1er du mois',
};

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: 'Actif', color: 'bg-green-100 text-green-800' },
  paused: { label: 'En pause', color: 'bg-yellow-100 text-yellow-800' },
  cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-800' },
};

export default function MesAbonnements() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/compte/connexion');
      return;
    }

    if (user) {
      loadSubscriptions();
    }
  }, [user, isLoading, router]);

  const loadSubscriptions = async () => {
    try {
      const res = await apiFetch('/api/subscriptions');
      if (!res.ok) throw new Error('Erreur serveur');
      const data = await res.json();
      setSubscriptions(data.subscriptions || []);
      setError('');
    } catch (err) {
      console.error('Erreur chargement abonnements:', err);
      setError('Impossible de charger vos abonnements. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const pauseSubscription = async (id: string) => {
    if (!confirm('Mettre en pause cet abonnement ?')) return;

    try {
      const res = await apiFetch(`/api/subscriptions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'paused' }),
      });

      if (res.ok) {
        loadSubscriptions();
      } else {
        setError('Impossible de mettre en pause. Veuillez réessayer.');
      }
    } catch {
      setError('Impossible de mettre en pause. Vérifiez votre connexion.');
    }
  };

  const resumeSubscription = async (id: string) => {
    try {
      const res = await apiFetch(`/api/subscriptions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'active' }),
      });

      if (res.ok) {
        loadSubscriptions();
      } else {
        setError('Impossible de réactiver. Veuillez réessayer.');
      }
    } catch {
      setError('Impossible de réactiver. Vérifiez votre connexion.');
    }
  };

  const cancelSubscription = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir annuler cet abonnement ? Cette action est irréversible.')) return;

    try {
      const res = await apiFetch(`/api/subscriptions/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        loadSubscriptions();
      } else {
        setError("Impossible d'annuler l'abonnement. Veuillez réessayer.");
      }
    } catch {
      setError("Impossible d'annuler l'abonnement. Vérifiez votre connexion.");
    }
  };

  if (isLoading || loading) {
    return (
      <>
        <Header />
        <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <p className="text-center text-[#2d2a26]/60">Chargement...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <button onClick={() => router.push('/compte')} className="text-[#b8935a] text-sm hover:underline mb-6 inline-block">
              ← Mon compte
            </button>

            <h1 className="font-serif text-2xl md:text-3xl text-[#2d2a26] mb-8">Mes abonnements</h1>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            {subscriptions.length === 0 ? (
              <div className="bg-white border border-[#e8e0d8] p-8 text-center">
                <p className="text-[#2d2a26]/60 mb-6">Vous n'avez pas encore d'abonnement.</p>
                <button
                  onClick={() => router.push('/abonnement')}
                  className="bg-[#b8935a] text-white px-6 py-3 hover:bg-[#b8956a] transition-colors"
                >
                  Découvrir nos abonnements
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {subscriptions.map((sub) => (
                  <div key={sub.id} className="bg-white border border-[#e8e0d8] p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-serif text-xl text-[#2d2a26] mb-1">
                          {formulaLabels[sub.formula]}
                        </h3>
                        <p className="text-sm text-[#2d2a26]/60">{frequencyLabels[sub.frequency]}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded ${statusLabels[sub.status]?.color}`}>
                        {statusLabels[sub.status]?.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-[#e8e0d8]">
                      <div>
                        <p className="text-xs text-[#2d2a26]/50 uppercase tracking-wider mb-1">Prix</p>
                        <p className="text-lg font-medium text-[#2d2a26]">{parseFloat(sub.price).toFixed(2)}€</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#2d2a26]/50 uppercase tracking-wider mb-1">Prochaine livraison</p>
                        <p className="text-sm text-[#2d2a26]">
                          {sub.next_delivery_date 
                            ? new Date(sub.next_delivery_date).toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                              })
                            : '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#2d2a26]/50 uppercase tracking-wider mb-1">Membre depuis</p>
                        <p className="text-sm text-[#2d2a26]">
                          {new Date(sub.start_date).toLocaleDateString('fr-FR', {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      {sub.status === 'active' && (
                        <>
                          <button
                            onClick={() => pauseSubscription(sub.id)}
                            className="px-4 py-2 text-sm border border-[#e8e0d8] text-[#2d2a26] hover:border-[#b8935a] transition-colors"
                          >
                            ⏸ Mettre en pause
                          </button>
                          <button
                            onClick={() => cancelSubscription(sub.id)}
                            className="px-4 py-2 text-sm border border-red-300 text-red-700 hover:bg-red-50 transition-colors"
                          >
                            ❌ Annuler l'abonnement
                          </button>
                        </>
                      )}
                      {sub.status === 'paused' && (
                        <button
                          onClick={() => resumeSubscription(sub.id)}
                          className="px-4 py-2 text-sm bg-[#b8935a] text-white hover:bg-[#b8956a] transition-colors"
                        >
                          ▶️ Réactiver
                        </button>
                      )}
                      {sub.status === 'cancelled' && (
                        <p className="text-sm text-[#2d2a26]/60 italic">Abonnement annulé</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
