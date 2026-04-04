import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAdmin, isAuthError } from '@/lib/api-auth';

// GET /api/products/[id] - Détails d'un produit (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await sql`SELECT * FROM products WHERE id = ${id}`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 });
    }

    return NextResponse.json({ product: result.rows[0] });
  } catch (error: unknown) {
    console.error('❌ Erreur GET /api/products/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PATCH /api/products/[id] - Modifier un produit (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, category, price, images, stock, is_active, featured } = body;

    // Récupérer le produit actuel
    const current = await sql`SELECT * FROM products WHERE id = ${id}`;
    if (current.rows.length === 0) {
      return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 });
    }

    const p = current.rows[0];
    const newName = name !== undefined ? name : p.name;
    const newSlug = name !== undefined
      ? name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
      : p.slug;

    const result = await sql`
      UPDATE products SET
        name = ${newName},
        slug = ${newSlug},
        description = ${description !== undefined ? description : p.description},
        category = ${category !== undefined ? category : p.category},
        price = ${price !== undefined ? price : p.price},
        images = ${images !== undefined ? JSON.stringify(images) : p.images},
        stock = ${stock !== undefined ? stock : p.stock},
        is_active = ${is_active !== undefined ? is_active : p.is_active},
        featured = ${featured !== undefined ? featured : p.featured},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({ success: true, product: result.rows[0] });
  } catch (error: unknown) {
    console.error('❌ Erreur PATCH /api/products/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE /api/products/[id] - Désactiver un produit (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const result = await sql`
      UPDATE products SET is_active = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} RETURNING *
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Produit désactivé' });
  } catch (error: unknown) {
    console.error('❌ Erreur DELETE /api/products/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
