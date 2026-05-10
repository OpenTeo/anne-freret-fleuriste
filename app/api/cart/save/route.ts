import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth, isAuthError } from '@/lib/api-auth';

export async function POST(req: NextRequest) {
  const user = await requireAuth(req);
  if (isAuthError(user)) return user;

  try {
    const body = await req.json();
    const { items, total } = body;

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'items doit être un tableau' }, { status: 400 });
    }

    // Panier vide = on supprime l'entrée (pas de relance sur panier vide)
    if (items.length === 0) {
      await sql`DELETE FROM carts WHERE user_id = ${user.id}`;
      return NextResponse.json({ success: true });
    }

    await sql`
      INSERT INTO carts (user_id, email, items, total, updated_at)
      VALUES (${user.id}, ${user.email}, ${JSON.stringify(items)}, ${total || 0}, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id) DO UPDATE
      SET items = EXCLUDED.items,
          total = EXCLUDED.total,
          updated_at = CURRENT_TIMESTAMP,
          reminder_sent_at = CASE
            WHEN carts.items::text != EXCLUDED.items::text THEN NULL
            ELSE carts.reminder_sent_at
          END
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur sauvegarde panier:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await requireAuth(req);
  if (isAuthError(user)) return user;

  try {
    await sql`DELETE FROM carts WHERE user_id = ${user.id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression panier:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
