import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth, requireAdmin, isAuthError } from '@/lib/api-auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(req);
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;

    const result = await sql`
      SELECT 
        o.*,
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_name', oi.product_name,
            'product_image', oi.product_image,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'total_price', oi.total_price
          )
        ) FILTER (WHERE oi.id IS NOT NULL) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE (o.id = ${id} OR o.order_number = ${id})
      GROUP BY o.id
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });
    }

    // Vérifier ownership (sauf admin)
    const order = result.rows[0];
    if (!auth.is_admin && order.customer_email !== auth.email) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Erreur récupération commande:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Seul un admin peut modifier le statut d'une commande
  const auth = await requireAdmin(req);
  if (isAuthError(auth)) return auth;

  try {
    const { verifyAdminToken } = await import('@/lib/admin-auth');
    const token = req.cookies.get('admin-token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const { id } = await params;
    const body = await req.json();
    const { status, tracking_number } = body;

    if (!status && !tracking_number) {
      return NextResponse.json({ error: 'Aucune mise à jour fournie' }, { status: 400 });
    }

    let result;
    if (status && tracking_number) {
      result = await sql`
        UPDATE orders SET status = ${status}, tracking_number = ${tracking_number}
        WHERE id = ${id} OR order_number = ${id} RETURNING *
      `;
    } else if (status) {
      result = await sql`
        UPDATE orders SET status = ${status}
        WHERE id = ${id} OR order_number = ${id} RETURNING *
      `;
    } else {
      result = await sql`
        UPDATE orders SET tracking_number = ${tracking_number}
        WHERE id = ${id} OR order_number = ${id} RETURNING *
      `;
    }

    if (!result || result.rows.length === 0) {
      return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });
    }

    return NextResponse.json({ order: result.rows[0] });
  } catch (error) {
    console.error('Erreur mise à jour commande:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
