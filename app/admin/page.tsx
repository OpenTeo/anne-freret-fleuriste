'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardStats from './components/DashboardStats';
import OrdersList from './components/OrdersList';
import ClientsList from './components/ClientsList';
import SubscriptionsList from './components/SubscriptionsList';
import ProductsList from './components/ProductsList';
import ReviewsList from './components/ReviewsList';
import PromoCodesList from './components/PromoCodesList';

type Tab = 'dashboard' | 'orders' | 'clients' | 'products' | 'subscriptions' | 'reviews' | 'promo';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
  { id: 'orders', label: 'Commandes', icon: '📦' },
  { id: 'clients', label: 'Clients', icon: '👥' },
  { id: 'products', label: 'Produits', icon: '🛍️' },
  { id: 'subscriptions', label: 'Abonnements', icon: '🔄' },
  { id: 'reviews', label: 'Avis', icon: '⭐' },
  { id: 'promo', label: 'Codes promo', icon: '🏷️' },
];

const tabTitles: Record<Tab, string> = {
  dashboard: 'Tableau de bord',
  orders: 'Commandes',
  clients: 'Clients',
  products: 'Produits',
  subscriptions: 'Abonnements',
  reviews: 'Avis clients',
  promo: 'Codes promo',
};

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-gradient-to-b from-[#1a1714] to-[#2d2a26] text-white min-h-screen fixed left-0 top-0 z-50 hidden md:flex md:flex-col shadow-2xl">
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-[#b8935a]/10 to-transparent">
          <span className="font-serif text-2xl text-white/95 tracking-wide">Anne Freret</span>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#b8935a] mt-2 font-medium">
            Administration
          </p>
        </div>

        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#b8935a] to-[#b8956a] text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-3 bg-gradient-to-r from-[#b8935a]/5 to-transparent">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs text-white/50 hover:text-[#b8935a] transition-colors duration-200"
          >
            🌐 Voir le site web
          </a>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-2 text-xs text-white/50 hover:text-red-400 transition-colors duration-200 disabled:opacity-50"
          >
            🚪 {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
          </button>
        </div>
      </aside>

      {/* Mobile nav - bottom tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#1a1714] to-[#2d2a26] z-50 border-t border-white/10 shadow-2xl">
        <div className="flex justify-around px-1 py-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all duration-200 min-w-[50px] ${
                activeTab === tab.id ? 'text-[#b8935a]' : 'text-white/50'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-[8px] font-medium leading-tight">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-10 pb-24 md:pb-10 bg-gradient-to-br from-[#faf8f5] to-[#f5f0eb] min-h-screen">
        <h1 className="font-serif text-2xl text-[#2d2a26] mb-8">{tabTitles[activeTab]}</h1>

        {activeTab === 'dashboard' && <DashboardStats />}
        {activeTab === 'orders' && <OrdersList />}
        {activeTab === 'clients' && <ClientsList />}
        {activeTab === 'products' && <ProductsList />}
        {activeTab === 'subscriptions' && <SubscriptionsList />}
        {activeTab === 'reviews' && <ReviewsList />}
        {activeTab === 'promo' && <PromoCodesList />}
      </main>
    </div>
  );
}
