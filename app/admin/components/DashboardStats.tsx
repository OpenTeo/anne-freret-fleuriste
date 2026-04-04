'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalRevenue: number;
  monthRevenue: number;
  weekRevenue: number;
  ordersTotal: number;
  ordersPending: number;
  clientsTotal: number;
  topProducts: { name: string; total_sold: number; total_revenue: number }[];
  recentOrders: { id: string; order_number: string; customer_name: string; total_amount: string; status: string; created_at: string }[];
  activeSubscriptions: { plan: string; count: number }[];
  lowStock: { id: string; name: string; stock: number }[];
  pendingReviewsCount: number;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Confirmée', color: 'bg-blue-100 text-blue-800' },
  preparing: { label: 'En préparation', color: 'bg-purple-100 text-purple-800' },
  shipped: { label: 'Expédiée', color: 'bg-indigo-100 text-indigo-800' },
  delivered: { label: 'Livrée', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-800' },
};

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        if (!res.ok) throw new Error('Erreur API');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Erreur chargement stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white border border-[#e8e0d8] rounded-lg p-5 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return <p className="text-[#2d2a26]/40 text-center py-8">Erreur de chargement des statistiques.</p>;

  const maxProductRevenue = stats.topProducts.length > 0
    ? Math.max(...stats.topProducts.map(p => parseFloat(String(p.total_revenue))))
    : 1;

  const kpis = [
    { label: 'CA Total', value: `${stats.totalRevenue.toFixed(0)} €`, icon: '💰', sub: `${stats.weekRevenue.toFixed(0)} € cette semaine` },
    { label: 'CA ce mois', value: `${stats.monthRevenue.toFixed(0)} €`, icon: '📈' },
    { label: 'Commandes', value: stats.ordersTotal.toString(), icon: '📦', sub: stats.ordersPending > 0 ? `${stats.ordersPending} en attente` : undefined, highlight: stats.ordersPending > 0 },
    { label: 'Clients', value: stats.clientsTotal.toString(), icon: '👥' },
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className={`bg-white border rounded-lg p-5 ${kpi.highlight ? 'border-[#b8935a] shadow-md' : 'border-[#e8e0d8]'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/50 font-medium">{kpi.label}</p>
              <span className="text-xl">{kpi.icon}</span>
            </div>
            <p className="font-serif text-2xl text-[#2d2a26]">{kpi.value}</p>
            {kpi.sub && <p className="text-xs text-[#b8935a] mt-1">{kpi.sub}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Produits */}
        <div className="bg-white border border-[#e8e0d8] rounded-lg p-6">
          <h3 className="font-serif text-lg text-[#2d2a26] mb-4">🏆 Top 5 Produits</h3>
          {stats.topProducts.length === 0 ? (
            <p className="text-sm text-[#2d2a26]/40">Aucune vente pour le moment</p>
          ) : (
            <div className="space-y-3">
              {stats.topProducts.map((product, idx) => {
                const revenue = parseFloat(String(product.total_revenue));
                const pct = (revenue / maxProductRevenue) * 100;
                return (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#2d2a26] truncate mr-2">{product.name}</span>
                      <span className="text-[#2d2a26]/60 whitespace-nowrap">{product.total_sold} vendus · {revenue.toFixed(0)} €</span>
                    </div>
                    <div className="w-full bg-[#f5f0eb] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#b8935a] to-[#d4af7a] h-2 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Commandes récentes */}
        <div className="bg-white border border-[#e8e0d8] rounded-lg p-6">
          <h3 className="font-serif text-lg text-[#2d2a26] mb-4">📦 Commandes récentes</h3>
          {stats.recentOrders.length === 0 ? (
            <p className="text-sm text-[#2d2a26]/40">Aucune commande</p>
          ) : (
            <div className="space-y-2">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-[#e8e0d8] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[#2d2a26]">{order.customer_name}</p>
                    <p className="text-[10px] text-[#2d2a26]/40">
                      {order.order_number} · {new Date(order.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block px-2 py-0.5 text-[10px] rounded ${statusLabels[order.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                      {statusLabels[order.status]?.label || order.status}
                    </span>
                    <span className="text-sm font-medium text-[#2d2a26]">{parseFloat(order.total_amount).toFixed(0)} €</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertes */}
        <div className="bg-white border border-[#e8e0d8] rounded-lg p-6">
          <h3 className="font-serif text-lg text-[#2d2a26] mb-4">⚠️ Alertes</h3>
          <div className="space-y-3">
            {stats.lowStock.length > 0 && (
              <div>
                <p className="text-xs font-medium text-red-600 uppercase tracking-wide mb-2">Stock bas</p>
                {stats.lowStock.map((p) => (
                  <div key={p.id} className="flex justify-between text-sm py-1.5 border-b border-[#e8e0d8] last:border-0">
                    <span className="text-[#2d2a26]">{p.name}</span>
                    <span className={`font-medium ${p.stock === 0 ? 'text-red-600' : 'text-orange-500'}`}>
                      {p.stock === 0 ? '🔴 Rupture' : `🟠 ${p.stock} restants`}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {stats.pendingReviewsCount > 0 && (
              <div className="flex items-center gap-2 text-sm text-[#2d2a26] bg-yellow-50 rounded p-3">
                <span>📝</span>
                <span>{stats.pendingReviewsCount} avis en attente de modération</span>
              </div>
            )}
            {stats.lowStock.length === 0 && stats.pendingReviewsCount === 0 && (
              <p className="text-sm text-green-600">✅ Aucune alerte</p>
            )}
          </div>
        </div>

        {/* Abonnements actifs */}
        <div className="bg-white border border-[#e8e0d8] rounded-lg p-6">
          <h3 className="font-serif text-lg text-[#2d2a26] mb-4">🔄 Abonnements actifs</h3>
          {stats.activeSubscriptions.length === 0 ? (
            <p className="text-sm text-[#2d2a26]/40">Aucun abonnement actif</p>
          ) : (
            <div className="space-y-2">
              {stats.activeSubscriptions.map((sub) => (
                <div key={sub.plan} className="flex justify-between items-center py-2 border-b border-[#e8e0d8] last:border-0">
                  <span className="text-sm text-[#2d2a26] capitalize">{sub.plan}</span>
                  <span className="inline-block px-3 py-1 text-sm bg-[#b8935a]/10 text-[#b8935a] rounded-full font-medium">
                    {sub.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
