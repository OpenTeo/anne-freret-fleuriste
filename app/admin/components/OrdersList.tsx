'use client';

import { useEffect, useState } from 'react';

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  unit_price: string;
  total_price: string;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  total_amount: string;
  status: string;
  delivery_mode: string;
  shipping_address: string;
  tracking_number?: string;
  created_at: string;
  items?: OrderItem[];
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  confirmed: { label: 'Confirmée', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  preparing: { label: 'En préparation', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  shipped: { label: 'Expédiée', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  delivered: { label: 'Livrée', color: 'bg-green-100 text-green-800 border-green-200' },
};

const allStatuses = ['pending', 'confirmed', 'preparing', 'shipped', 'delivered'];

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      // Fetch all orders via admin stats + regular endpoint
      const res = await fetch('/api/orders?userId=all');
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

  const changeStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) loadOrders();
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (dateFilter) {
      const orderDate = new Date(o.created_at).toISOString().split('T')[0];
      if (orderDate < dateFilter) return false;
    }
    return true;
  });

  if (isLoading) {
    return <div className="text-center py-8 text-[#2d2a26]/40">Chargement...</div>;
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 text-sm rounded-lg transition ${
              statusFilter === 'all' ? 'bg-[#b8935a] text-white' : 'bg-white text-[#2d2a26] border border-[#e8e0d8] hover:border-[#b8935a]'
            }`}
          >
            Toutes ({orders.length})
          </button>
          {Object.entries(statusLabels).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`px-3 py-1.5 text-sm rounded-lg transition ${
                statusFilter === key ? 'bg-[#b8935a] text-white' : 'bg-white text-[#2d2a26] border border-[#e8e0d8] hover:border-[#b8935a]'
              }`}
            >
              {label} ({orders.filter((o) => o.status === key).length})
            </button>
          ))}
        </div>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-3 py-1.5 text-sm border border-[#e8e0d8] rounded-lg text-[#2d2a26] focus:outline-none focus:border-[#b8935a]"
        />
        {dateFilter && (
          <button onClick={() => setDateFilter('')} className="text-xs text-[#b8935a] hover:underline">
            Réinitialiser date
          </button>
        )}
      </div>

      {/* Orders table */}
      <div className="bg-white border border-[#e8e0d8] rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e8e0d8] bg-[#f5f0eb]">
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">N° Commande</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Client</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Montant</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Statut</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Date</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-[#2d2a26]/40">Aucune commande</td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <>
                  <tr
                    key={order.id}
                    className={`border-b border-[#e8e0d8] hover:bg-[#faf8f5] cursor-pointer ${expandedOrder === order.id ? 'bg-[#faf8f5]' : ''}`}
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <td className="p-3 font-medium text-[#2d2a26]">{order.order_number}</td>
                    <td className="p-3">
                      <div className="text-[#2d2a26]">{order.customer_name}</div>
                      <div className="text-[10px] text-[#2d2a26]/40">{order.customer_email}</div>
                    </td>
                    <td className="p-3 text-[#2d2a26] font-medium">{parseFloat(order.total_amount).toFixed(2)} €</td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-0.5 text-[10px] rounded border ${statusLabels[order.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                        {statusLabels[order.status]?.label || order.status}
                      </span>
                    </td>
                    <td className="p-3 text-[#2d2a26]/60 text-xs">
                      {new Date(order.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={order.status}
                        onChange={(e) => changeStatus(order.id, e.target.value)}
                        className="text-xs border border-[#e8e0d8] rounded px-2 py-1 text-[#2d2a26] focus:outline-none focus:border-[#b8935a] bg-white"
                      >
                        {allStatuses.map((s) => (
                          <option key={s} value={s}>{statusLabels[s]?.label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {/* Expanded detail */}
                  {expandedOrder === order.id && (
                    <tr key={`${order.id}-detail`} className="bg-[#f5f0eb]/50">
                      <td colSpan={6} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-wide text-[#2d2a26]/50 mb-1">Articles</p>
                            {order.items && Array.isArray(order.items) ? (
                              <ul className="space-y-1">
                                {order.items.filter((item: OrderItem) => item.id).map((item: OrderItem, idx: number) => (
                                  <li key={idx} className="text-sm text-[#2d2a26]">
                                    {item.product_name} × {item.quantity} — {parseFloat(item.total_price).toFixed(2)} €
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-[#2d2a26]/40">Détails non disponibles</p>
                            )}
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-wide text-[#2d2a26]/50 mb-1">Adresse de livraison</p>
                            <p className="text-sm text-[#2d2a26]">{order.shipping_address || 'Non renseignée'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-wide text-[#2d2a26]/50 mb-1">Livraison</p>
                            <p className="text-sm text-[#2d2a26]">{order.delivery_mode || '-'}</p>
                            {order.tracking_number && (
                              <p className="text-xs text-[#b8935a] mt-1">Suivi: {order.tracking_number}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
