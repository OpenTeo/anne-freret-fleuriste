'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import DashboardStats from './components/DashboardStats';
import OrdersList from './components/OrdersList';
import ClientsList from './components/ClientsList';
import SubscriptionsList from './components/SubscriptionsList';
import ProductsList from './components/ProductsList';

type Tab = 'dashboard' | 'orders' | 'clients' | 'subscriptions' | 'products';

export default function AdminNew() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  useEffect(() => {
    if (!isLoading && (!user || !user.is_admin)) {
      router.push('/compte/connexion');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user?.is_admin) return null;

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { id: 'orders', label: 'Commandes', icon: '📦' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'products', label: 'Produits', icon: '🛍️' },
    { id: 'subscriptions', label: 'Abonnements', icon: '🔄' },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-gradient-to-b from-[#1a1714] to-[#2d2a26] text-white min-h-screen fixed left-0 top-0 z-50 hidden md:flex md:flex-col shadow-2xl">
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-[#b8935a]/10 to-transparent">
          <Link href="/" className="font-serif text-2xl text-white/95 tracking-wide">
            Anne Freret
          </Link>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#b8935a] mt-2 font-medium">Administration</p>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#b8935a] to-[#b8956a] text-white shadow-lg transform scale-105'
                  : 'text-white/70 hover:text-white hover:bg-white/10 hover:transform hover:scale-102'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-4 bg-gradient-to-r from-[#b8935a]/5 to-transparent">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-white/50 hover:text-[#b8935a] transition-colors duration-200"
          >
            🌐 Voir le site web
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#b8935a] to-[#b8956a] rounded-full flex items-center justify-center text-white text-sm font-serif shadow-md">
              AF
            </div>
            <div>
              <p className="text-sm text-white/90 font-medium">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-[10px] text-[#b8935a] uppercase tracking-wider">Administrateur</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile nav - bottom tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#1a1714] to-[#2d2a26] z-50 border-t border-white/10 safe-area-pb shadow-2xl">
        <div className="flex justify-around px-1 py-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 ${
                activeTab === tab.id ? 'text-[#b8935a] transform scale-110' : 'text-white/50'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-[9px] font-medium">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-10 pb-24 md:pb-10 bg-gradient-to-br from-[#faf8f5] to-[#f5f0eb] min-h-screen">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-8">Tableau de bord</h1>
            <DashboardStats />

            {/* Quick links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#e8e0d8] p-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Actions rapides</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="w-full text-left px-3 py-2 text-sm text-[#2d2a26] hover:bg-[#f5f0eb] rounded"
                  >
                    📦 Gérer les commandes
                  </button>
                  <button
                    onClick={() => setActiveTab('clients')}
                    className="w-full text-left px-3 py-2 text-sm text-[#2d2a26] hover:bg-[#f5f0eb] rounded"
                  >
                    👥 Voir les clients
                  </button>
                  <button
                    onClick={() => setActiveTab('subscriptions')}
                    className="w-full text-left px-3 py-2 text-sm text-[#2d2a26] hover:bg-[#f5f0eb] rounded"
                  >
                    🔄 Gérer les abonnements
                  </button>
                </div>
              </div>

              <div className="bg-white border border-[#e8e0d8] p-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Activité récente</h3>
                <p className="text-sm text-[#2d2a26]/60">Dernières commandes et actions...</p>
              </div>

              <div className="bg-white border border-[#e8e0d8] p-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">À faire</h3>
                <p className="text-sm text-[#2d2a26]/60">Tâches en attente...</p>
              </div>
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-8">Commandes</h1>
            <OrdersList />
          </div>
        )}

        {/* Clients */}
        {activeTab === 'clients' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-8">Clients</h1>
            <ClientsList />
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-8">Produits</h1>
            <ProductsList />
          </div>
        )}

        {/* Subscriptions */}
        {activeTab === 'subscriptions' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-8">Abonnements</h1>
            <SubscriptionsList />
          </div>
        )}
      </main>
    </div>
  );
}
