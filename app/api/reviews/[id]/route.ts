import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';

// Vérifier si l'utilisateur est admin
async function isAdmin() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return false;
    }

    const sessionData = JSON.parse(sessionCookie.value);
    const userId = sessionData.user?.id;

    if (!userId) {
      return false;
    }

    const result = await sql`
      SELECT is_admin FROM users WHERE id = ${userId}
    `;

    return result.rows[0]?.is_admin || false;
  } catch (error) {
    console.error('Erreur vérification admin:', error);
    return false;
  }
}

// Mettre à jour le rating produit
async function updateProductRating(productId: string) {
  try {
    const statsResult = await sql`
      SELECT
        COUNT(*) as count,
        AVG(rating)::numeric(3,2) as average
      FROM reviews
      WHERE product_id = ${productId} AND status = 'approved'
    `;

    const stats = statsResult.rows[0];
    const count = parseInt(stats.count);
    const average = parseFloat(stats.average || 0);

    await sql`
      UPDATE products
      SET
        rating = ${average},
        review_count = ${count}
      WHERE id = ${productId}
    `;
  } catch (error) {
    console.error('Erreur mise à jour rating produit:', error);
  }
}

// PATCH /api/reviews/[id] - Modifier un avis (admin only)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();
    const { status, featured } = body;

    const updates: string[] = [];
    const values: (string | boolean)[] = [];
    let paramIndex = 1;

    if (status) {
      updates.push(`status = $${paramIndex++}`);
      values.push(status);
    }

    if (featured !== undefined) {
      updates.push(`featured = $${paramIndex++}`);
      values.push(featured);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE reviews
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await sql.query(query, values);

    // Si le statut a changé vers 'approved', mettre à jour le rating du produit
    if (status === 'approved' && result.rows[0]?.product_id) {
      await updateProductRating(result.rows[0].product_id);
    }

    return NextResponse.json({
      success: true,
      review: result.rows[0],
    });
  } catch (error: unknown) {
    console.error('❌ Erreur PATCH /api/reviews/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// DELETE /api/reviews/[id] - Supprimer un avis (admin only)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    // Récupérer le product_id avant suppression
    const reviewResult = await sql`
      SELECT product_id FROM reviews WHERE id = ${id}
    `;

    const productId = reviewResult.rows[0]?.product_id;

    await sql`DELETE FROM reviews WHERE id = ${id}`;

    // Mettre à jour le rating du produit
    if (productId) {
      await updateProductRating(productId);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('❌ Erreur DELETE /api/reviews/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
