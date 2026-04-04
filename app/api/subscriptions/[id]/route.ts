import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth, isAuthError } from '@/lib/api-auth';

// Helper: vérifier ownership d'un abonnement
async function checkOwnership(auth: { id: string; is_admin: boolean }, subId: string) {
  const result = await sql`
    SELECT s.*, u.email, u.first_name, u.last_name, u.phone,
           u.address, u.city, u.postal_code
    FROM subscriptions s
    JOIN users u ON s.user_id = u.id
    WHERE s.id = ${subId}
  `;
  if (result.rows.length === 0) return null;
  const sub = result.rows[0];
  if (!auth.is_admin && sub.user_id !== auth.id) return 'forbidden';
  return sub;
}

// GET /api/subscriptions/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const sub = await checkOwnership(auth, id);

    if (sub === null) return NextResponse.json({ error: 'Abonnement introuvable' }, { status: 404 });
    if (sub === 'forbidden') return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });

    return NextResponse.json({ subscription: sub });
  } catch (error: unknown) {
    console.error('❌ Erreur GET /api/subscriptions/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PATCH /api/subscriptions/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const sub = await checkOwnership(auth, id);
    if (sub === null) return NextResponse.json({ error: 'Abonnement introuvable' }, { status: 404 });
    if (sub === 'forbidden') return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });

    const body = await request.json();
    const { status, frequency, price, next_delivery_date, pause_reason } = body;

    // Construire la mise à jour avec des valeurs sûres
    const newStatus = status !== undefined ? status : sub.status;
    const newFrequency = frequency !== undefined ? frequency : sub.frequency;
    const newPrice = price !== undefined ? price : sub.price;
    const newNextDelivery = next_delivery_date !== undefined ? next_delivery_date : sub.next_delivery_date;
    const newPauseReason = pause_reason !== undefined ? pause_reason : sub.pause_reason;

    // Valider la fréquence si fournie
    if (frequency && !['weekly', 'biweekly', 'monthly'].includes(frequency)) {
      return NextResponse.json({ error: 'Fréquence invalide' }, { status: 400 });
    }

    const result = await sql`
      UPDATE subscriptions SET
        status = ${newStatus},
        frequency = ${newFrequency},
        price = ${newPrice},
        next_delivery_date = ${newNextDelivery},
        pause_reason = ${newPauseReason},
        cancelled_at = CASE WHEN ${newStatus} = 'cancelled' THEN CURRENT_TIMESTAMP ELSE cancelled_at END,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Abonnement introuvable' }, { status: 404 });
    }

    return NextResponse.json({ success: true, subscription: result.rows[0] });
  } catch (error: unknown) {
    console.error('❌ Erreur PATCH /api/subscriptions/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE /api/subscriptions/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const sub = await checkOwnership(auth, id);
    if (sub === null) return NextResponse.json({ error: 'Abonnement introuvable' }, { status: 404 });
    if (sub === 'forbidden') return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });

    await sql`
      UPDATE subscriptions
      SET status = 'cancelled', cancelled_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true, message: 'Abonnement annulé' });
  } catch (error: unknown) {
    console.error('❌ Erreur DELETE /api/subscriptions/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
