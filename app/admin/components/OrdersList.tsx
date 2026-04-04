'use client';

import { useEffect, useState, useCallback } from 'react';
import OrderDetail from './OrderDetail';

interface OrderItem {
  product_name: string;
  product_image?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  size?: string;
  variant?: string;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  status: string;
  delivery_address: string;
  delivery_city: string;
  delivery_postal_code: string;
  delivery_mode: string;
  delivery_date: string;
  card_message: string;
  tracking_number: string;
  tracking_url: string;
  label_url: string;
  sendcloud_parcel_id: number | null;
  shipped_at: string;
  delivered_at: string;
  created_at: string;
  items: OrderItem[] | null;
  shipping_address: Record<string, string> | null;
}

const statuses = [
  { value: '', label: 'Tous' },
  { value: 'pending', label: 'En attente' },
  { value: 'confirmed', label: 'Confirmée' },
  { value: 'shipped', label: 'Expédiée' },
  { value: 'delivered', label: 'Livrée' },
  { value: 'cancelled', label: 'Annulée' },
];

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

const PER_PAGE = 20;

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedOrderItems, setSelectedOrderItems] = useState<OrderItem[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (e) {
      console.error('Erreur chargement commandes:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (e) {
      console.error('Erreur changement statut:', e);
    } finally {
      setUpdatingId(null);
    }
  };

  const openDetail = async (order: Order) => {
    setSelectedOrder(order);
    // Try to fetch order_items from DB
    try {
      const res = await fetch(`/api/orders/${order.id}`);
      const data = await res.json();
      setSelectedOrderItems(data.order_items || []);
    } catch {
      setSelectedOrderItems([]);
    }
  };

  // Filter and search
  const filtered = orders.filter((o) => {
    if (statusFilter && o.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        (o.order_number || '').toLowerCase().includes(q) ||
        (o.customer_name || '').toLowerCase().includes(q) ||
        (o.customer_email || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [statusFilter, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#b8935a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Rechercher par n°, nom ou email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-[#e8e0d8] rounded-lg text-sm bg-white focus:outline-none focus:border-[#b8935a] text-[#2d2a26]"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2d2a26]/30">🔍</span>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-[#e8e0d8] rounded-lg text-sm bg-white focus:outline-none focus:border-[#b8935a] text-[#2d2a26]"
        >
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Count */}
      <p className="text-xs text-[#2d2a26]/50 mb-3">
        {filtered.length} commande{filtered.length > 1 ? 's' : ''}
        {statusFilter && ` · filtre: ${statuses.find((s) => s.value === statusFilter)?.label}`}
      </p>

      {/* Table */}
      <div className="bg-white border border-[#e8e0d8] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#faf8f5] text-[#2d2a26]/50 text-xs uppercase">
                <th className="text-left px-4 py-3">N° commande</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Client</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Email</th>
                <th className="text-right px-4 py-3">Montant</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Livraison</th>
                <th className="text-center px-4 py-3">Statut</th>
                <th className="text-center px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e0d8]">
              {paginated.map((order) => {
                const badge = statusBadge[order.status] || {
                  label: order.status,
                  cls: 'bg-gray-100 text-gray-800',
                };
                return (
                  <tr key={order.id} className="hover:bg-[#faf8f5] transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-[#b8935a]">
                      {order.order_number || order.id.slice(0, 8)}
                    </td>
                    <td className="px-4 py-3 text-[#2d2a26]/70">
                      {new Date(order.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3 text-[#2d2a26] font-medium">
                      {order.customer_name || '—'}
                    </td>
                    <td className="px-4 py-3 text-[#2d2a26]/60 hidden md:table-cell">
                      {order.customer_email || '—'}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-[#2d2a26]">
                      {fmt(Number(order.total_amount))}
                    </td>
                    <td className="px-4 py-3 text-[#2d2a26]/60 hidden lg:table-cell">
                      {order.delivery_mode || '—'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        disabled={updatingId === order.id}
                        className={`text-xs rounded-full px-2 py-1 border-0 cursor-pointer ${badge.cls} ${
                          updatingId === order.id ? 'opacity-50' : ''
                        }`}
                      >
                        {statuses
                          .filter((s) => s.value)
                          .map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => openDetail(order)}
                        className="text-xs text-[#b8935a] hover:text-[#a07d4a] font-medium hover:underline"
                      >
                        Voir détail
                      </button>
                    </td>
                  </tr>
                );
              })}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-[#2d2a26]/40">
                    Aucune commande trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm border border-[#e8e0d8] rounded-lg disabled:opacity-30 hover:border-[#b8935a] transition-colors"
          >
            ←
          </button>
          <span className="text-sm text-[#2d2a26]/60">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm border border-[#e8e0d8] rounded-lg disabled:opacity-30 hover:border-[#b8935a] transition-colors"
          >
            →
          </button>
        </div>
      )}

      {/* Order detail modal */}
      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          orderItems={selectedOrderItems}
          onClose={() => {
            setSelectedOrder(null);
            setSelectedOrderItems([]);
          }}
        />
      )}
    </div>
  );
}
