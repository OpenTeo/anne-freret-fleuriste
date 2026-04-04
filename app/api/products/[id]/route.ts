import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET /api/products/[id] - Détails d'un produit
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await sql`SELECT * FROM products WHERE id = ${id}`;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Produit introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json({ product: result.rows[0] });
  } catch (error: unknown) {
    console.error('❌ Erreur GET /api/products/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// PATCH /api/products/[id] - Modifier un produit (admin uniquement)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Vérifier auth admin
    const { verifyAdminToken } = await import('@/lib/admin-auth');
    const token = request.cookies.get('admin-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const admin = await verifyAdminToken(token);
    if (!admin) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    console.log('PATCH /api/products/', id, 'body keys:', Object.keys(body), 'images type:', typeof body.images, Array.isArray(body.images), 'tags type:', typeof body.tags, Array.isArray(body.tags));
    const {
      name,
      description,
      category,
      price,
      images,
      stock,
      is_active,
      featured,
      tags,
      sizes,
      variants,
      rating,
      review_count,
      original_price,
      in_stock,
    } = body;

    // Format text[] columns as PostgreSQL array literals
    const formatTextArray = (arr: string[] | null | undefined): string => {
      if (!arr || !Array.isArray(arr) || arr.length === 0) return '{}';
      return `{${arr.join(',')}}`;
    };

    const updates: string[] = [];
    const values: (string | number | boolean | null)[] = [];
    let paramCount = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramCount++}`);
      values.push(name);
      
      // Mettre à jour le slug aussi
      const slug = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+$/, '');
      updates.push(`slug = $${paramCount++}`);
      values.push(slug);
    }

    if (description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(description);
    }

    if (category !== undefined) {
      updates.push(`category = $${paramCount++}`);
      values.push(category);
    }

    if (price !== undefined) {
      updates.push(`price = $${paramCount++}`);
      values.push(price);
    }

    if (images !== undefined) {
      updates.push(`images = $${paramCount++}`);
      values.push(formatTextArray(images));
    }

    if (stock !== undefined) {
      updates.push(`stock = $${paramCount++}`);
      values.push(stock);
    }

    if (is_active !== undefined) {
      updates.push(`is_active = $${paramCount++}`);
      values.push(is_active);
    }

    if (featured !== undefined) {
      updates.push(`featured = $${paramCount++}`);
      values.push(featured);
    }

    if (tags !== undefined) {
      updates.push(`tags = $${paramCount++}`);
      values.push(formatTextArray(tags));
    }

    if (sizes !== undefined) {
      updates.push(`sizes = $${paramCount++}`);
      values.push(JSON.stringify(sizes));
    }

    if (variants !== undefined) {
      updates.push(`variants = $${paramCount++}`);
      values.push(JSON.stringify(variants));
    }

    if (rating !== undefined) {
      updates.push(`rating = $${paramCount++}`);
      values.push(rating);
    }

    if (review_count !== undefined) {
      updates.push(`review_count = $${paramCount++}`);
      values.push(review_count);
    }

    if (original_price !== undefined) {
      updates.push(`original_price = $${paramCount++}`);
      values.push(original_price);
    }

    if (in_stock !== undefined) {
      updates.push(`in_stock = $${paramCount++}`);
      values.push(in_stock);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'Aucune modification fournie' },
        { status: 400 }
      );
    }

    const result = await sql.query(
      `UPDATE products 
       SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
       WHERE id = $${paramCount}
       RETURNING *`,
      [...values, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Produit introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: result.rows[0],
    });
  } catch (error: unknown) {
    console.error('❌ Erreur PATCH /api/products/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Supprimer un produit (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { verifyAdminToken } = await import('@/lib/admin-auth');
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const { id } = await params;

    // Soft delete: désactiver au lieu de supprimer
    const result = await sql`
      UPDATE products
      SET is_active = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Produit introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Produit désactivé',
    });
  } catch (error: unknown) {
    console.error('❌ Erreur DELETE /api/products/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
