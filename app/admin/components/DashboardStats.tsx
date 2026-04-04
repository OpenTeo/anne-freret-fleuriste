'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalRevenue: number;
  monthRevenue: number;
  weekRevenue: number;
  ordersCount: number;
  pendingOrders: number;
  clientsCount: number;
  activeSubscriptions: number;
  subscriptionsByPlan: { essentiel: number; signature: number; prestige: number };
  topProducts: Array<{ name: string; count: number; revenue: number }>;
  recentOrders: Array<{
    id: string;
    order_number: string;
    customer_name: string;
    customer_email: string;
    total_amount: number;
    status: string;
    created_at: string;
  }>;
  lowStockProducts: Array<{ id: string; name: string; stock: number }>;
  pendingReviews: number;
}

const statusBadge: Record<string, { label: string; cls: string }> = {
  pending: { label: 'En attente', cls: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Confirmée', cls: 'bg-blue-100 text-blue-800' },
  shipped: { label: 'Expédiée', cls: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Livrée', cls: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Annulée', cls: 'bg-red-100 text-red-800' },
};

function fmt(n: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
}

export default function DashboardStats({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#b8935a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center py-12 text-[#2d2a26]/40">Erreur de chargement</div>;
  }

  const maxProduct = stats.topProducts.length > 0 ? Math.max(...stats.topProducts.map((p) => p.count)) : 1;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="CA Total" value={fmt(stats.totalRevenue)} icon="💰" />
        <KPICard label="CA ce mois" value={fmt(stats.monthRevenue)} icon="📈" />
        <KPICard
          label="Commandes"
          value={String(stats.ordersCount)}
          icon="📦"
          badge={stats.pendingOrders > 0 ? `${stats.pendingOrders} en attente` : undefined}
        />
        <KPICard label="Clients" value={String(stats.clientsCount)} icon="👥" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-white border border-[#e8e0d8] rounded-lg p-6">
          <h3 className="text-sm font-semibold text-[#2d2a26] mb-4">5 dernières commandes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#2d2a26]/50 text-xs">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Client</th>
                  <th className="pb-2 text-right">Montant</th>
                  <th className="pb-2 text-right">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e0d8]">
                {stats.recentOrders.map((order) => {
                  const badge = statusBadge[order.status] || { label: order.status, cls: 'bg-gray-100 text-gray-800' };
                  return (
                    <tr key={order.id} className="hover:bg-[#faf8f5]">
                      <td className="py-2.5 text-[#2d2a26]/70">
                        {new Date(order.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-2.5 text-[#2d2a26]">{order.customer_name || '—'}</td>
                      <td className="py-2.5 text-right font-medium text-[#2d2a26]">
                        {fmt(Number(order.total_amount))}
                      </td>
                      <td className="py-2.5 text-right">
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${badge.cls}`}>
                          {badge.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {stats.recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-[#2d2a26]/40">
                      Aucune commande
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white border border-[#e8e0d8] rounded-lg p-6">
          <h3 className="text-sm font-semibold text-[#2d2a26] mb-4">Top 5 produits</h3>
          <div className="space-y-3">
            {stats.topProducts.map((product, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#2d2a26] truncate mr-2">{product.name}</span>
                  <span className="text-[#2d2a26]/60 whitespace-nowrap">
                    {product.count} vendus · {fmt(product.revenue)}
                  </span>
                </div>
                <div className="w-full bg-[#e8e0d8]/40 rounded-full h-2">
                  <div
                    className="bg-[#b8935a] h-2 rounded-full transition-all"
                    style={{ width: `${(product.count / maxProduct) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {stats.topProducts.length === 0 && (
              <p className="text-sm text-[#2d2a26]/40">Aucune donnée</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <div className="bg-white border border-[#e8e0d8] rounded-lg p-6">
          <h3 className="text-sm font-semibold text-[#2d2a26] mb-4">⚠️ Alertes</h3>
          <div className="space-y-3">
            {stats.pendingOrders > 0 && (
              <button
                onClick={() => onNavigate('orders')}
                className="w-full flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm hover:bg-yellow-100 transition-colors"
              >
                <span className="text-yellow-800">
                  📦 {stats.pendingOrders} commande{stats.pendingOrders > 1 ? 's' : ''} en attente
                </span>
                <span className="text-yellow-600">→</span>
              </button>
            )}
            {stats.lowStockProducts.length > 0 && (
              <button
                onClick={() => onNavigate('products')}
                className="w-full flex items-start justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm hover:bg-orange-100 transition-colors text-left"
              >
                <div className="text-orange-800">
                  <p className="font-medium">🔴 Stock bas ({stats.lowStockProducts.length} produit{stats.lowStockProducts.length > 1 ? 's' : ''})</p>
                  <p className="text-xs mt-1 text-orange-600">
                    {stats.lowStockProducts.slice(0, 3).map((p) => `${p.name} (${p.stock})`).join(', ')}
                    {stats.lowStockProducts.length > 3 ? '…' : ''}
                  </p>
                </div>
                <span className="text-orange-600">→</span>
              </button>
            )}
            {stats.pendingReviews > 0 && (
              <button
                onClick={() => onNavigate('reviews')}
                className="w-full flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm hover:bg-blue-100 transition-colors"
              >
                <span className="text-blue-800">
                  ⭐ {stats.pendingReviews} avis à modérer
                </span>
                <span className="text-blue-600">→</span>
              </button>
            )}
            {stats.pendingOrders === 0 && stats.lowStockProducts.length === 0 && stats.pendingReviews === 0 && (
              <p className="text-sm text-green-600 py-2">✅ Aucune alerte — tout est en ordre !</p>
            )}
          </div>
        </div>

        {/* Subscriptions */}
        <div className="bg-white border border-[#e8e0d8] rounded-lg p-6">
          <h3 className="text-sm font-semibold text-[#2d2a26] mb-4">🔄 Abonnements actifs</h3>
          <div className="text-3xl font-bold text-[#b8935a] mb-4">{stats.activeSubscriptions}</div>
          <div className="space-y-2">
            {(['essentiel', 'signature', 'prestige'] as const).map((plan) => (
              <div key={plan} className="flex items-center justify-between text-sm">
                <span className="capitalize text-[#2d2a26]">{plan}</span>
                <span className="font-medium text-[#2d2a26]">{stats.subscriptionsByPlan[plan]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({
  label,
  value,
  icon,
  badge,
}: {
  label: string;
  value: string;
  icon: string;
  badge?: string;
}) {
  return (
    <div className="bg-white border border-[#e8e0d8] rounded-lg p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[#2d2a26]/50 uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-[#2d2a26] mt-1">{value}</p>
          {badge && (
            <p className="text-xs text-red-600 font-medium mt-1">{badge}</p>
          )}
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}
