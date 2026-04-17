'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api-client';

interface Order {
  id: string;
  order_number: string;
  customer_type: 'particulier' | 'professionnel';
  customer_siren: string | null;
  customer_name: string;
  customer_email: string;
  total_amount: string;
  status: string;
  delivery_mode: string;
  tracking_number?: string;
  created_at: string;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Confirmée', color: 'bg-blue-100 text-blue-800' },
  preparing: { label: 'En préparation', color: 'bg-purple-100 text-purple-800' },
  shipped: { label: 'Expédiée', color: 'bg-indigo-100 text-indigo-800' },
  delivered: { label: 'Livrée', color: 'bg-green-100 text-green-800' },
};

const orderStatusFlow: string[] = ['pending', 'confirmed', 'preparing', 'shipped', 'delivered'];

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const loadOrders = async () => {
    try {
      const res = await apiFetch('/api/orders');
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Erreur chargement commandes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const advanceStatus = async (orderId: string, currentStatus: string) => {
    const idx = orderStatusFlow.indexOf(currentStatus);
    if (idx < 0 || idx >= orderStatusFlow.length - 1) return;

    const nextStatus = orderStatusFlow[idx + 1];

    try {
      const res = await apiFetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (res.ok) {
        loadOrders();
      }
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
    }
  };

  const updateTracking = async (orderId: string, trackingNumber: string) => {
    try {
      const res = await apiFetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tracking_number: trackingNumber }),
      });

      if (res.ok) {
        loadOrders();
      }
    } catch (error) {
      console.error('Erreur mise à jour tracking:', error);
    }
  };

  const filteredOrders = orders.filter((o) => statusFilter === 'all' || o.status === statusFilter);

  if (isLoading) {
    return <div className="text-center py-8 text-[#2d2a26]/40">Chargement...</div>;
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 text-sm rounded ${
            statusFilter === 'all' ? 'bg-[#b8935a] text-white' : 'bg-white text-[#2d2a26] border border-[#e8e0d8]'
          }`}
        >
          Toutes ({orders.length})
        </button>
        {Object.entries(statusLabels).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key)}
            className={`px-3 py-1.5 text-sm rounded ${
              statusFilter === key ? 'bg-[#b8935a] text-white' : 'bg-white text-[#2d2a26] border border-[#e8e0d8]'
            }`}
          >
            {label} ({orders.filter((o) => o.status === key).length})
          </button>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-white border border-[#e8e0d8] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e8e0d8] bg-[#f5f0eb]">
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">N° Commande</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Client</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Montant</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Statut</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Livraison</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Date</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-[#2d2a26]/40">
                  Aucune commande
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-[#e8e0d8] hover:bg-[#faf8f5]">
                  <td className="p-3 font-medium text-[#2d2a26]">{order.order_number}</td>
                  <td className="p-3">
                    <div className="text-[#2d2a26]">{order.customer_name}</div>
                    <div className="text-[10px] text-[#2d2a26]/40">{order.customer_email}</div>
                  </td>
                  <td className="p-3 text-[#2d2a26]">{parseFloat(order.total_amount).toFixed(2)}€</td>
                  <td className="p-3">
                    <span className={`inline-block px-2 py-0.5 text-[10px] rounded ${statusLabels[order.status]?.color}`}>
                      {statusLabels[order.status]?.label}
                    </span>
                  </td>
                  <td className="p-3 text-[#2d2a26]/60 text-xs">{order.delivery_mode}</td>
                  <td className="p-3 text-[#2d2a26]/60 text-xs">
                    {new Date(order.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => advanceStatus(order.id, order.status)}
                      disabled={order.status === 'delivered'}
                      className="text-[#b8935a] hover:text-[#b8956a] text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {order.status === 'delivered' ? '✓ Terminée' : '→ Avancer'}
                    </button>
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
