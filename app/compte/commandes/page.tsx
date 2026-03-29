'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name: string;
  delivery_address: string;
  delivery_city: string;
  delivery_postal_code: string;
  delivery_mode: string;
  delivery_date: string | null;
  total_amount: number;
  status: string;
  tracking_number: string | null;
  created_at: string;
  items: OrderItem[];
}

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  preparing: 'En préparation',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée'
};

const deliveryModeLabels: Record<string, string> = {
  local: 'Livraison locale',
  colissimo: 'Colissimo',
  chronopost: 'Chronopost Express'
};

export default function Commandes() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoading && !user) router.push('/compte/connexion');
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/orders?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error('Erreur chargement commandes:', err);
      setError('Impossible de charger les commandes');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || !user) {
    return (
      <>
        <Header />
        <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="animate-pulse">
              <div className="h-8 bg-[#e8e0d8] rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-[#e8e0d8] rounded w-1/2"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-8">
              <h1 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-2">Mes commandes</h1>
              <p className="text-[#2d2a26]/60 text-sm">Suivi de vos achats</p>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#b8935a]"></div>
                <p className="text-[#2d2a26]/60 text-sm mt-4">Chargement...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded text-red-600 text-sm">
                {error}
              </div>
            )}

            {!loading && !error && orders.length === 0 && (
              <div className="bg-white border border-[#e8e0d8] p-8 md:p-12 text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-[#b8935a]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h2 className="font-serif text-xl text-[#2d2a26] mb-3">Aucune commande</h2>
                <p className="text-[#2d2a26]/60 text-sm mb-6">
                  Vous n'avez pas encore passé de commande.
                </p>
                <a 
                  href="/boutique" 
                  className="inline-block px-8 py-3 bg-[#b8935a] text-white hover:bg-[#a17f4a] transition-colors text-sm"
                >
                  Découvrir nos créations
                </a>
              </div>
            )}

            {!loading && !error && orders.length > 0 && (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white border border-[#e8e0d8] overflow-hidden">
                    {/* Header commande */}
                    <div className="p-4 md:p-6 border-b border-[#e8e0d8] bg-[#faf8f5]">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <p className="text-[10px] tracking-[0.15em] uppercase text-[#2d2a26]/40 mb-1">
                            Commande
                          </p>
                          <p className="font-medium text-[#2d2a26]">{order.order_number}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-[10px] tracking-[0.15em] uppercase text-[#2d2a26]/40 mb-1">
                              Date
                            </p>
                            <p className="text-sm text-[#2d2a26]">
                              {new Date(order.created_at).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] tracking-[0.15em] uppercase text-[#2d2a26]/40 mb-1">
                              Statut
                            </p>
                            <span className={`inline-block px-3 py-1 text-xs ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                              order.status === 'confirmed' ? 'bg-[#b8935a]/10 text-[#b8935a]' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {statusLabels[order.status] || order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Articles */}
                    <div className="p-4 md:p-6">
                      <div className="space-y-4">
                        {order.items && order.items.filter(item => item.id).map((item) => (
                          <div key={item.id} className="flex gap-4">
                            {item.product_image && (
                              <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                <img 
                                  src={item.product_image} 
                                  alt={item.product_name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-[#2d2a26] mb-1">{item.product_name}</p>
                              <p className="text-sm text-[#2d2a26]/60">
                                Quantité : {item.quantity} × {parseFloat(item.unit_price.toString()).toFixed(2)} €
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-[#2d2a26]">
                                {parseFloat(item.total_price.toString()).toFixed(2)} €
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Infos livraison */}
                      <div className="mt-6 pt-6 border-t border-[#e8e0d8]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-[10px] tracking-[0.15em] uppercase text-[#2d2a26]/40 mb-2">
                              Livraison
                            </p>
                            <p className="text-[#2d2a26]">{deliveryModeLabels[order.delivery_mode] || order.delivery_mode}</p>
                            <p className="text-[#2d2a26]/60 mt-1">
                              {order.delivery_address}
                              <br />
                              {order.delivery_postal_code} {order.delivery_city}
                            </p>
                          </div>
                          {order.tracking_number && (
                            <div>
                              <p className="text-[10px] tracking-[0.15em] uppercase text-[#2d2a26]/40 mb-2">
                                Suivi
                              </p>
                              <p className="text-[#b8935a] font-medium">{order.tracking_number}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Total */}
                      <div className="mt-6 pt-6 border-t border-[#e8e0d8] flex justify-between items-center">
                        <span className="text-[#2d2a26]/60 text-sm">Total</span>
                        <span className="font-serif text-2xl text-[#2d2a26]">
                          {parseFloat(order.total_amount.toString()).toFixed(2)} €
                        </span>
                      </div>
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
