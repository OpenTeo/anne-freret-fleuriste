import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendStatusChangeEmail } from '@/lib/order-emails';
import { requireAdmin, isAuthError } from '@/lib/api-auth';

const VALID_STATUSES = ['pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled'];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Statut invalide. Valeurs acceptées: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    // Mettre à jour le statut + récupérer les infos pour l'email
    const result = await sql`
      UPDATE orders 
      SET status = ${status}, 
          updated_at = NOW(),
          shipped_at = CASE WHEN ${status} = 'shipped' AND shipped_at IS NULL THEN NOW() ELSE shipped_at END,
          delivered_at = CASE WHEN ${status} = 'delivered' AND delivered_at IS NULL THEN NOW() ELSE delivered_at END
      WHERE id = ${id}
      RETURNING id, status, order_number, customer_name, customer_email, total_amount, tracking_number, tracking_url, delivery_mode
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });
    }

    const order = result.rows[0];

    // Envoyer l'email de notification (async, ne bloque pas la réponse)
    if (order.customer_email) {
      sendStatusChangeEmail(status, {
        customerName: order.customer_name || 'Client',
        customerEmail: order.customer_email,
        orderNumber: order.order_number,
        totalAmount: Number(order.total_amount).toFixed(2),
        trackingNumber: order.tracking_number || undefined,
        trackingUrl: order.tracking_url || undefined,
        deliveryMode: order.delivery_mode || undefined,
      }).catch(err => {
        console.error('Email notification failed (non-blocking):', err);
      });
    }

    return NextResponse.json({ order: { id: order.id, status: order.status }, emailSent: true });
  } catch (error) {
    console.error('❌ Erreur PATCH /api/admin/orders/[id]/status:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
