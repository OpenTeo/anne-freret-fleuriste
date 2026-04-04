'use client';

import { useState } from 'react';

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

export default function OrderDetail({
  order,
  orderItems,
  onClose,
}: {
  order: Order;
  orderItems: OrderItem[];
  onClose: () => void;
}) {
  const [downloadingLabel, setDownloadingLabel] = useState(false);
  const badge = statusBadge[order.status] || { label: order.status, cls: 'bg-gray-100 text-gray-800' };

  // Use order_items from DB if available, otherwise fall back to order.items JSONB
  const items = orderItems.length > 0 ? orderItems : (order.items || []);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const itemsHtml = items
      .map(
        (item) => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #e8e0d8">${item.product_name}${item.size ? ` — ${item.size}` : ''}${item.variant ? ` (${item.variant})` : ''}</td>
          <td style="padding:8px;border-bottom:1px solid #e8e0d8;text-align:center">${item.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #e8e0d8;text-align:right">${Number(item.unit_price).toFixed(2)} €</td>
          <td style="padding:8px;border-bottom:1px solid #e8e0d8;text-align:right">${Number(item.total_price).toFixed(2)} €</td>
        </tr>`
      )
      .join('');

    printWindow.document.write(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Bon de commande ${order.order_number}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; color: #2d2a26; padding: 40px; max-width: 800px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #b8935a; padding-bottom: 20px; }
    .header h1 { font-size: 24px; color: #b8935a; }
    .header p { font-size: 12px; color: #666; margin-top: 4px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
    .info-block h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #b8935a; margin-bottom: 8px; }
    .info-block p { font-size: 13px; line-height: 1.6; }
    .card-message { background: #faf8f5; border: 1px solid #e8e0d8; padding: 12px 16px; margin-bottom: 24px; font-style: italic; border-radius: 4px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th { background: #faf8f5; padding: 10px 8px; text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e8e0d8; }
    .total-row { font-weight: bold; font-size: 16px; }
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e8e0d8; font-size: 12px; color: #666; }
    .print-btn { display: block; margin: 0 auto 20px; padding: 10px 24px; background: #b8935a; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; }
    @media print {
      .print-btn { display: none; }
      body { padding: 20px; }
    }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">🖨️ Imprimer</button>
  <div class="header">
    <h1>Anne Freret Fleuriste</h1>
    <p>Saint-Pair-sur-Mer</p>
  </div>
  <div style="text-align:right;margin-bottom:20px">
    <p><strong>Commande ${order.order_number}</strong></p>
    <p style="font-size:13px;color:#666">${new Date(order.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
  </div>
  <div class="info-grid">
    <div class="info-block">
      <h3>Client</h3>
      <p><strong>${order.customer_name || '—'}</strong></p>
      <p>${order.customer_email || ''}</p>
      <p>${order.customer_phone || ''}</p>
    </div>
    <div class="info-block">
      <h3>Livraison</h3>
      <p>${order.delivery_address || ''}</p>
      <p>${order.delivery_postal_code || ''} ${order.delivery_city || ''}</p>
      <p>Mode: ${order.delivery_mode || '—'}</p>
      ${order.delivery_date ? `<p>Date prévue: ${new Date(order.delivery_date).toLocaleDateString('fr-FR')}</p>` : ''}
    </div>
  </div>
  ${order.card_message ? `<div class="card-message">💐 "${order.card_message}"</div>` : ''}
  <table>
    <thead><tr>
      <th>Produit</th>
      <th style="text-align:center">Qté</th>
      <th style="text-align:right">Prix unit.</th>
      <th style="text-align:right">Total</th>
    </tr></thead>
    <tbody>
      ${itemsHtml}
      <tr class="total-row">
        <td colspan="3" style="padding:12px 8px;text-align:right;border-top:2px solid #2d2a26">Total TTC</td>
        <td style="padding:12px 8px;text-align:right;border-top:2px solid #2d2a26">${Number(order.total_amount).toFixed(2)} €</td>
      </tr>
    </tbody>
  </table>
  <div class="footer">Merci pour votre commande — Anne Freret Fleuriste</div>
</body>
</html>`);
    printWindow.document.close();
  };

  const handleDownloadLabel = async () => {
    setDownloadingLabel(true);
    try {
      const res = await fetch(`/api/admin/shipping/label?parcel_id=${order.sendcloud_parcel_id}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `etiquette-${order.order_number}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error('Erreur téléchargement étiquette:', e);
    } finally {
      setDownloadingLabel(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#e8e0d8] px-6 py-4 flex items-center justify-between rounded-t-lg">
          <div>
            <h2 className="text-lg font-semibold text-[#2d2a26]">
              Commande {order.order_number}
            </h2>
            <p className="text-xs text-[#2d2a26]/50">
              {new Date(order.created_at).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 text-xs rounded-full font-medium ${badge.cls}`}>
              {badge.label}
            </span>
            <button onClick={onClose} className="text-[#2d2a26]/40 hover:text-[#2d2a26] text-xl">
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Client + Livraison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#b8935a] font-semibold mb-2">Client</h3>
              <p className="text-sm font-medium text-[#2d2a26]">{order.customer_name || '—'}</p>
              <p className="text-sm text-[#2d2a26]/70">{order.customer_email}</p>
              {order.customer_phone && (
                <p className="text-sm text-[#2d2a26]/70">{order.customer_phone}</p>
              )}
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#b8935a] font-semibold mb-2">Livraison</h3>
              <p className="text-sm text-[#2d2a26]">{order.delivery_address || '—'}</p>
              <p className="text-sm text-[#2d2a26]">
                {order.delivery_postal_code} {order.delivery_city}
              </p>
              <p className="text-sm text-[#2d2a26]/70 mt-1">
                Mode : {order.delivery_mode || '—'}
              </p>
              {order.delivery_date && (
                <p className="text-sm text-[#2d2a26]/70">
                  Date prévue : {new Date(order.delivery_date).toLocaleDateString('fr-FR')}
                </p>
              )}
            </div>
          </div>

          {/* Card message */}
          {order.card_message && (
            <div className="bg-[#faf8f5] border border-[#e8e0d8] rounded-lg p-4">
              <h3 className="text-xs uppercase tracking-wider text-[#b8935a] font-semibold mb-2">
                💐 Message carte
              </h3>
              <p className="text-sm italic text-[#2d2a26]">&ldquo;{order.card_message}&rdquo;</p>
            </div>
          )}

          {/* Items table */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#b8935a] font-semibold mb-3">Articles</h3>
            <div className="border border-[#e8e0d8] rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#faf8f5] text-[#2d2a26]/50 text-xs uppercase">
                    <th className="text-left px-4 py-2.5">Produit</th>
                    <th className="text-center px-4 py-2.5">Qté</th>
                    <th className="text-right px-4 py-2.5">Prix unit.</th>
                    <th className="text-right px-4 py-2.5">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8e0d8]">
                  {items.map((item, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 text-[#2d2a26]">
                        {item.product_name}
                        {item.size && <span className="text-[#2d2a26]/50 text-xs ml-1">— {item.size}</span>}
                        {item.variant && <span className="text-[#2d2a26]/50 text-xs ml-1">({item.variant})</span>}
                      </td>
                      <td className="px-4 py-3 text-center text-[#2d2a26]">{item.quantity}</td>
                      <td className="px-4 py-3 text-right text-[#2d2a26]/70">{fmt(Number(item.unit_price))}</td>
                      <td className="px-4 py-3 text-right font-medium text-[#2d2a26]">{fmt(Number(item.total_price))}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[#faf8f5]">
                    <td colSpan={3} className="px-4 py-3 text-right font-semibold text-[#2d2a26]">
                      Total TTC
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-lg text-[#2d2a26]">
                      {fmt(Number(order.total_amount))}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Tracking */}
          {(order.tracking_number || order.tracking_url) && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="text-xs uppercase tracking-wider text-purple-600 font-semibold mb-2">
                📍 Suivi
              </h3>
              {order.tracking_number && (
                <p className="text-sm text-[#2d2a26]">N° : {order.tracking_number}</p>
              )}
              {order.tracking_url && (
                <a
                  href={order.tracking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#b8935a] hover:underline"
                >
                  Suivre le colis →
                </a>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-[#e8e0d8]">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-sm bg-[#2d2a26] text-white rounded-lg hover:bg-[#2d2a26]/90 transition-colors"
            >
              🖨️ Imprimer bon de commande
            </button>
            {order.sendcloud_parcel_id && (
              <button
                onClick={handleDownloadLabel}
                disabled={downloadingLabel}
                className="px-4 py-2 text-sm bg-[#b8935a] text-white rounded-lg hover:bg-[#b8935a]/90 transition-colors disabled:opacity-50"
              >
                {downloadingLabel ? '⏳ Téléchargement…' : '📄 Télécharger étiquette'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
