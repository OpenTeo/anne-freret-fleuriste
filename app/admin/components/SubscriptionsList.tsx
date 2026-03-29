'use client';

import { useEffect, useState } from 'react';

interface Subscription {
  id: string;
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  formula: 'essentiel' | 'signature' | 'prestige';
  status: 'active' | 'paused' | 'cancelled';
  frequency: 'weekly' | 'biweekly' | 'monthly';
  price: string;
  next_delivery_date: string;
  start_date: string;
  created_at: string;
}

const formulaLabels: Record<string, { label: string; color: string }> = {
  essentiel: { label: '🌿 Essentiel', color: 'bg-green-100 text-green-800' },
  signature: { label: '🌸 Signature', color: 'bg-pink-100 text-pink-800' },
  prestige: { label: '👑 Prestige', color: 'bg-amber-100 text-amber-800' },
};

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: 'Actif', color: 'bg-green-100 text-green-800' },
  paused: { label: 'En pause', color: 'bg-yellow-100 text-yellow-800' },
  cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-800' },
};

const frequencyLabels: Record<string, string> = {
  weekly: 'Hebdo',
  biweekly: 'Bi-mensuel',
  monthly: 'Mensuel',
};

export default function SubscriptionsList() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const loadSubscriptions = async () => {
    try {
      const url = statusFilter === 'all' ? '/api/subscriptions' : `/api/subscriptions?status=${statusFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      setSubscriptions(data.subscriptions || []);
    } catch (error) {
      console.error('Erreur chargement abonnements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, [statusFilter]);

  const changeStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/subscriptions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        loadSubscriptions();
      }
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
    }
  };

  const mrr = subscriptions
    .filter((s) => s.status === 'active')
    .reduce((sum, s) => {
      const price = parseFloat(s.price);
      if (s.frequency === 'weekly') return sum + price * 4;
      if (s.frequency === 'biweekly') return sum + price * 2;
      return sum + price;
    }, 0);

  if (isLoading) {
    return <div className="text-center py-8 text-[#2d2a26]/40">Chargement...</div>;
  }

  return (
    <div>
      {/* MRR */}
      <div className="mb-6 bg-white border border-[#e8e0d8] p-6">
        <div className="flex items-end gap-2">
          <span className="font-serif text-3xl text-[#2d2a26]">{mrr.toFixed(0)}€</span>
          <span className="text-[10px] text-[#2d2a26]/40 mb-1 tracking-[0.12em] uppercase">MRR (Revenu mensuel récurrent)</span>
        </div>
        <p className="text-xs text-[#2d2a26]/60 mt-2">
          {subscriptions.filter((s) => s.status === 'active').length} abonnements actifs
        </p>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 text-sm rounded ${
            statusFilter === 'all' ? 'bg-[#b8935a] text-white' : 'bg-white text-[#2d2a26] border border-[#e8e0d8]'
          }`}
        >
          Tous ({subscriptions.length})
        </button>
        {Object.entries(statusLabels).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key)}
            className={`px-3 py-1.5 text-sm rounded ${
              statusFilter === key ? 'bg-[#b8935a] text-white' : 'bg-white text-[#2d2a26] border border-[#e8e0d8]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Subscriptions table */}
      <div className="bg-white border border-[#e8e0d8] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e8e0d8] bg-[#f5f0eb]">
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Client</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Formule</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Fréquence</th>
              <th className="p-3 text-right text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Prix</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Prochaine livraison</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Statut</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-[#2d2a26]/40">
                  Aucun abonnement
                </td>
              </tr>
            ) : (
              subscriptions.map((sub) => (
                <tr key={sub.id} className="border-b border-[#e8e0d8] hover:bg-[#faf8f5]">
                  <td className="p-3">
                    <div className="text-[#2d2a26]">
                      {sub.first_name} {sub.last_name}
                    </div>
                    <div className="text-[10px] text-[#2d2a26]/40">{sub.email}</div>
                  </td>
                  <td className="p-3">
                    <span className={`inline-block px-2 py-0.5 text-[10px] rounded ${formulaLabels[sub.formula]?.color}`}>
                      {formulaLabels[sub.formula]?.label}
                    </span>
                  </td>
                  <td className="p-3 text-[#2d2a26]/60 text-xs">{frequencyLabels[sub.frequency]}</td>
                  <td className="p-3 text-right text-[#2d2a26] font-medium">{parseFloat(sub.price).toFixed(2)}€</td>
                  <td className="p-3 text-[#2d2a26]/60 text-xs">
                    {sub.next_delivery_date ? new Date(sub.next_delivery_date).toLocaleDateString('fr-FR') : '-'}
                  </td>
                  <td className="p-3">
                    <span className={`inline-block px-2 py-0.5 text-[10px] rounded ${statusLabels[sub.status]?.color}`}>
                      {statusLabels[sub.status]?.label}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      {sub.status === 'active' && (
                        <button
                          onClick={() => changeStatus(sub.id, 'paused')}
                          className="text-xs text-yellow-600 hover:text-yellow-700"
                          title="Mettre en pause"
                        >
                          ⏸
                        </button>
                      )}
                      {sub.status === 'paused' && (
                        <button
                          onClick={() => changeStatus(sub.id, 'active')}
                          className="text-xs text-green-600 hover:text-green-700"
                          title="Réactiver"
                        >
                          ▶️
                        </button>
                      )}
                      {sub.status !== 'cancelled' && (
                        <button
                          onClick={() => changeStatus(sub.id, 'cancelled')}
                          className="text-xs text-red-600 hover:text-red-700"
                          title="Annuler"
                        >
                          ❌
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
