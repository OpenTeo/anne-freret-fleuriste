'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalRevenue: number;
  ordersCount: number;
  pendingCount: number;
  clientsCount: number;
  avgBasket: number;
}

interface DashboardStatsProps {
  onNavigate?: (tab: string) => void;
}

export default function DashboardStats({ onNavigate }: DashboardStatsProps = {}) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();

        const totalRevenue = data.totalRevenue ?? 0;
        const ordersCount = data.ordersCount ?? 0;

        setStats({
          totalRevenue,
          ordersCount,
          pendingCount: data.pendingOrders ?? 0,
          clientsCount: data.clientsCount ?? 0,
          avgBasket: ordersCount > 0 ? totalRevenue / ordersCount : 0,
        });
      } catch (error) {
        console.error('Erreur chargement stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [onNavigate]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white border border-[#e8e0d8] p-5 animate-pulse">
            <div className="h-6 w-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const kpis = [
    { label: 'Chiffre d\'affaires', value: `${stats.totalRevenue.toFixed(0)}€`, icon: '💰' },
    { label: 'Commandes', value: stats.ordersCount.toString(), icon: '📦', sub: `${stats.pendingCount} en attente` },
    { label: 'Clients', value: stats.clientsCount.toString(), icon: '👥' },
    { label: 'Panier moyen', value: `${stats.avgBasket.toFixed(1)}€`, icon: '🛒' },
    { label: 'En attente', value: stats.pendingCount.toString(), icon: '⏳', highlight: stats.pendingCount > 0 },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className={`bg-white border p-5 ${kpi.highlight ? 'border-red-300 bg-red-50/30' : 'border-[#e8e0d8]'}`}
        >
          <p className="text-xl mb-1">{kpi.icon}</p>
          <p className="font-serif text-2xl text-[#2d2a26]">{kpi.value}</p>
          <p className="text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/40 mt-1">{kpi.label}</p>
          {kpi.sub && <p className="text-[10px] text-[#b8935a] mt-0.5">{kpi.sub}</p>}
        </div>
      ))}
    </div>
  );
}
