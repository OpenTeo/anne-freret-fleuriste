'use client';

import { useEffect, useState } from 'react';

interface Subscription {
  id: string;
  user_id: string;
  formula: string;
  plan: string;
  frequency: string;
  status: string;
  price: number;
  stripe_subscription_id: string;
  next_delivery_date: string;
  start_date: string;
  cancelled_at: string | null;
  created_at: string;
  // Joined
  customer_name?: string;
  customer_email?: string;
}

const statusBadge: Record<string, { label: string; cls: string }> = {
  active: { label: 'Actif', cls: 'bg-green-100 text-green-800' },
  paused: { label: 'En pause', cls: 'bg-yellow-100 text-yellow-800' },
  cancelled: { label: 'Annulé', cls: 'bg-red-100 text-red-800' },
};

function fmt(n: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
}

export default function SubscriptionsList() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [formulaFilter, setFormulaFilter] = useState('');

  useEffect(() => {
    fetch('/api/subscriptions')
      .then((r) => r.json())
      .then((data) => setSubscriptions(data.subscriptions || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = subscriptions.filter((s) => {
    if (statusFilter && s.status !== statusFilter) return false;
    if (formulaFilter && (s.formula || '').toLowerCase() !== formulaFilter.toLowerCase()) return false;
    return true;
  });

  const activeCount = subscriptions.filter((s) => s.status === 'active').length;
  const mrr = subscriptions
    .filter((s) => s.status === 'active')
    .reduce((sum, s) => sum + Number(s.price || 0), 0);

  const byFormula = subscriptions
    .filter((s) => s.status === 'active')
    .reduce(
      (acc, s) => {
        const key = (s.formula || 'autre').toLowerCase();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#b8935a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-[#e8e0d8] rounded-lg p-5">
          <p className="text-xs text-[#2d2a26]/50 uppercase tracking-wider">MRR</p>
          <p className="text-2xl font-bold text-[#b8935a] mt-1">{fmt(mrr)}</p>
        </div>
        <div className="bg-white border border-[#e8e0d8] rounded-lg p-5">
          <p className="text-xs text-[#2d2a26]/50 uppercase tracking-wider">Abonnements actifs</p>
          <p className="text-2xl font-bold text-[#2d2a26] mt-1">{activeCount}</p>
        </div>
        <div className="bg-white border border-[#e8e0d8] rounded-lg p-5">
          <p className="text-xs text-[#2d2a26]/50 uppercase tracking-wider">Par formule</p>
          <div className="flex gap-3 mt-2">
            {Object.entries(byFormula).map(([key, count]) => (
              <span key={key} className="text-sm text-[#2d2a26]">
                <span className="capitalize font-medium">{key}</span>: {count}
              </span>
            ))}
            {Object.keys(byFormula).length === 0 && (
              <span className="text-sm text-[#2d2a26]/40">Aucun</span>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-[#e8e0d8] rounded-lg text-sm bg-white focus:outline-none focus:border-[#b8935a] text-[#2d2a26]"
        >
          <option value="">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="paused">En pause</option>
          <option value="cancelled">Annulé</option>
        </select>
        <select
          value={formulaFilter}
          onChange={(e) => setFormulaFilter(e.target.value)}
          className="px-4 py-2.5 border border-[#e8e0d8] rounded-lg text-sm bg-white focus:outline-none focus:border-[#b8935a] text-[#2d2a26]"
        >
          <option value="">Toutes les formules</option>
          <option value="essentiel">Essentiel</option>
          <option value="signature">Signature</option>
          <option value="prestige">Prestige</option>
        </select>
      </div>

      <p className="text-xs text-[#2d2a26]/50 mb-3">
        {filtered.length} abonnement{filtered.length > 1 ? 's' : ''}
      </p>

      {/* Table */}
      <div className="bg-white border border-[#e8e0d8] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#faf8f5] text-[#2d2a26]/50 text-xs uppercase">
                <th className="text-left px-4 py-3">Client</th>
                <th className="text-left px-4 py-3">Formule</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Fréquence</th>
                <th className="text-right px-4 py-3">Prix</th>
                <th className="text-center px-4 py-3">Statut</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Prochaine livraison</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Date début</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e0d8]">
              {filtered.map((sub) => {
                const badge = statusBadge[sub.status] || {
                  label: sub.status,
                  cls: 'bg-gray-100 text-gray-800',
                };
                return (
                  <tr key={sub.id} className="hover:bg-[#faf8f5] transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#2d2a26]">{sub.customer_name || '—'}</p>
                      <p className="text-xs text-[#2d2a26]/50">{sub.customer_email || ''}</p>
                    </td>
                    <td className="px-4 py-3 capitalize text-[#2d2a26]">{sub.formula || '—'}</td>
                    <td className="px-4 py-3 text-[#2d2a26]/60 hidden md:table-cell">
                      {sub.frequency || '—'}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-[#2d2a26]">
                      {fmt(Number(sub.price))}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${badge.cls}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#2d2a26]/60 hidden lg:table-cell">
                      {sub.next_delivery_date
                        ? new Date(sub.next_delivery_date).toLocaleDateString('fr-FR')
                        : '—'}
                    </td>
                    <td className="px-4 py-3 text-[#2d2a26]/60 hidden lg:table-cell">
                      {sub.start_date
                        ? new Date(sub.start_date).toLocaleDateString('fr-FR')
                        : '—'}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[#2d2a26]/40">
                    Aucun abonnement trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
