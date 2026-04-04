'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardStats from './components/DashboardStats';
import OrdersList from './components/OrdersList';
import ClientsList from './components/ClientsList';
import ProductsList from './components/ProductsList';
import SubscriptionsList from './components/SubscriptionsList';
import ReviewsList from './components/ReviewsList';
import PromoCodesList from './components/PromoCodesList';

type Tab = 'dashboard' | 'orders' | 'clients' | 'products' | 'subscriptions' | 'reviews' | 'promos';

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'orders', label: 'Commandes', icon: '📦' },
  { key: 'clients', label: 'Clients', icon: '👥' },
  { key: 'products', label: 'Produits', icon: '🌸' },
  { key: 'subscriptions', label: 'Abonnements', icon: '🔄' },
  { key: 'reviews', label: 'Avis', icon: '⭐' },
  { key: 'promos', label: 'Promos', icon: '🏷️' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [pendingCount, setPendingCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((data) => {
        if (data.pendingOrders !== undefined) setPendingCount(data.pendingOrders);
      })
      .catch(() => {});
  }, [activeTab]);

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats onNavigate={(tab: string) => setActiveTab(tab as Tab)} />;
      case 'orders':
        return <OrdersList />;
      case 'clients':
        return <ClientsList />;
      case 'products':
        return <ProductsList />;
      case 'subscriptions':
        return <SubscriptionsList />;
      case 'reviews':
        return <ReviewsList />;
      case 'promos':
        return <PromoCodesList />;
    }
  };

  const currentTab = tabs.find((t) => t.key === activeTab);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      {/* Sidebar overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar desktop */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#e8e0d8] flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-[#e8e0d8]">
          <h1 className="text-lg font-semibold text-[#2d2a26]">Anne Freret</h1>
          <p className="text-xs text-[#2d2a26]/50 mt-1">Administration</p>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm transition-colors relative ${
                activeTab === tab.key
                  ? 'bg-[#b8935a]/10 text-[#b8935a] font-medium border-r-2 border-[#b8935a]'
                  : 'text-[#2d2a26]/70 hover:bg-[#faf8f5] hover:text-[#2d2a26]'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.key === 'orders' && pendingCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#e8e0d8]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#e8e0d8] px-4 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-[#2d2a26]/70 hover:text-[#2d2a26]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-[#2d2a26]">
            {currentTab?.icon} {currentTab?.label}
          </h2>
        </header>

        <div className="p-4 lg:p-8">{renderContent()}</div>
      </main>

      {/* Bottom nav mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#e8e0d8] flex lg:hidden">
        {tabs.slice(0, 5).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] relative ${
              activeTab === tab.key ? 'text-[#b8935a]' : 'text-[#2d2a26]/50'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.key === 'orders' && pendingCount > 0 && (
              <span className="absolute top-1 right-1/4 bg-red-500 text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
        <button
          onClick={() => setSidebarOpen(true)}
          className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] text-[#2d2a26]/50`}
        >
          <span className="text-lg">•••</span>
          <span>Plus</span>
        </button>
      </nav>
    </div>
  );
}
