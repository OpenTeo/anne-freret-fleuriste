'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Order } from '@/lib/supabase';

interface OrderWithItems extends Order {
  order_items: Array<{
    id: string;
    product_name: string;
    product_image: string | null;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
}

export default function Commandes() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

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
      const res = await fetch(`/api/orders?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error('Erreur chargement commandes:', err);
    } finally {
      setLoading(false);
    }
  };

  const statusLabels: Record<string, string> = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    preparing: 'En préparation',
    shipped: 'Expédiée',
    delivered: 'Livrée',
  };

  const deliveryModeLabels: Record<string, string> = {
    local: '🌸 Livraison locale',
    colissimo: '📦 Colissimo',
    chronopost: '⚡ Chronopost Express',
  };

  if (isLoading || !user) return null;

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <button onClick={() => router.push('/compte')} className="text-[#b8935a] text-sm hover:underline mb-6 inline-block">
              ← Mon compte
            </button>
            <h1 className="font-serif text-2xl md:text-3xl text-[#2d2a26] mb-8">Mes commandes</h1>

            {loading ? (
              <div className="bg-white border border-[#e8e0d8] p-12 text-center">
                <p className="text-[#2d2a26]/60">Chargement...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white border border-[#e8e0d8] p-12 text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-[#b8935a]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <p className="text-[#2d2a26]/60 mb-4">Vous n'avez pas encore de commande</p>
                <button onClick={() => router.push('/boutique')} className="text-[#b8935a] text-sm hover:underline">
                  Découvrir notre boutique →
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white border border-[#e8e0d8] p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="font-serif text-lg text-[#2d2a26]">Commande {order.order_number}</h2>
                        <p className="text-sm text-[#2d2a26]/60">
                          {new Date(order.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-[#b8935a]/10 text-[#b8935a] text-sm rounded">
                        {statusLabels[order.status]}
                      </span>
                    </div>

                    <div className="border-t border-[#e8e0d8] pt-4 space-y-3">
                      {order.order_items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          {item.product_image && (
                            <img src={item.product_image} alt={item.product_name} className="w-16 h-16 object-cover rounded" />
                          )}
                          <div className="flex-1">
                            <p className="text-[#2d2a26]">{item.product_name}</p>
                            <p className="text-sm text-[#2d2a26]/60">
                              Quantité : {item.quantity} × {item.unit_price.toFixed(2)} €
                            </p>
                          </div>
                          <p className="text-[#2d2a26] font-medium">{item.total_price.toFixed(2)} €</p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-[#e8e0d8] mt-4 pt-4 text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#2d2a26]/60">Livraison</span>
                        <span className="text-[#2d2a26]">{deliveryModeLabels[order.delivery_mode]}</span>
                      </div>
                      {order.delivery_date && (
                        <div className="flex justify-between">
                          <span className="text-[#2d2a26]/60">Date prévue</span>
                          <span className="text-[#2d2a26]">
                            {new Date(order.delivery_date + 'T12:00:00').toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                            })}
                          </span>
                        </div>
                      )}
                      {order.tracking_number && (
                        <div className="flex justify-between">
                          <span className="text-[#2d2a26]/60">Suivi</span>
                          <span className="text-[#b8935a] font-mono text-xs">{order.tracking_number}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-[#e8e0d8]">
                        <span className="text-[#2d2a26] font-medium">Total</span>
                        <span className="text-[#2d2a26] font-medium text-lg">{order.total_amount.toFixed(2)} €</span>
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
