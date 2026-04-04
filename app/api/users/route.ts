import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET /api/users - Liste des utilisateurs (admin only)
export async function GET(request: NextRequest) {
  try {
    // Vérifier auth admin
    const { verifyAdminToken } = await import('@/lib/admin-auth');
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const isAdmin = searchParams.get('isAdmin');

    // Requête avec stats commandes jointes
    let result;

    if (isAdmin === 'false' && search) {
      const searchPattern = `%${search}%`;
      result = await sql`
        SELECT 
          u.id, u.email, u.first_name, u.last_name, u.phone,
          u.address, u.postal_code, u.city, u.is_admin,
          u.created_at, u.updated_at,
          COALESCE(os.orders_count, 0) as orders_count,
          COALESCE(os.total_spent, 0) as total_spent
        FROM users u
        LEFT JOIN (
          SELECT customer_email, COUNT(*) as orders_count, SUM(total_amount) as total_spent
          FROM orders WHERE status != 'cancelled'
          GROUP BY customer_email
        ) os ON os.customer_email = u.email
        WHERE u.is_admin = false
        AND (
          LOWER(u.first_name || ' ' || u.last_name) LIKE LOWER(${searchPattern})
          OR LOWER(u.email) LIKE LOWER(${searchPattern})
        )
        ORDER BY u.created_at DESC
      `;
    } else if (isAdmin === 'false') {
      result = await sql`
        SELECT 
          u.id, u.email, u.first_name, u.last_name, u.phone,
          u.address, u.postal_code, u.city, u.is_admin,
          u.created_at, u.updated_at,
          COALESCE(os.orders_count, 0) as orders_count,
          COALESCE(os.total_spent, 0) as total_spent
        FROM users u
        LEFT JOIN (
          SELECT customer_email, COUNT(*) as orders_count, SUM(total_amount) as total_spent
          FROM orders WHERE status != 'cancelled'
          GROUP BY customer_email
        ) os ON os.customer_email = u.email
        WHERE u.is_admin = false
        ORDER BY u.created_at DESC
      `;
    } else if (search) {
      const searchPattern = `%${search}%`;
      result = await sql`
        SELECT 
          u.id, u.email, u.first_name, u.last_name, u.phone,
          u.address, u.postal_code, u.city, u.is_admin,
          u.created_at, u.updated_at,
          COALESCE(os.orders_count, 0) as orders_count,
          COALESCE(os.total_spent, 0) as total_spent
        FROM users u
        LEFT JOIN (
          SELECT customer_email, COUNT(*) as orders_count, SUM(total_amount) as total_spent
          FROM orders WHERE status != 'cancelled'
          GROUP BY customer_email
        ) os ON os.customer_email = u.email
        WHERE LOWER(u.first_name || ' ' || u.last_name) LIKE LOWER(${searchPattern})
          OR LOWER(u.email) LIKE LOWER(${searchPattern})
        ORDER BY u.created_at DESC
      `;
    } else {
      result = await sql`
        SELECT 
          u.id, u.email, u.first_name, u.last_name, u.phone,
          u.address, u.postal_code, u.city, u.is_admin,
          u.created_at, u.updated_at,
          COALESCE(os.orders_count, 0) as orders_count,
          COALESCE(os.total_spent, 0) as total_spent
        FROM users u
        LEFT JOIN (
          SELECT customer_email, COUNT(*) as orders_count, SUM(total_amount) as total_spent
          FROM orders WHERE status != 'cancelled'
          GROUP BY customer_email
        ) os ON os.customer_email = u.email
        ORDER BY u.created_at DESC
      `;
    }

    return NextResponse.json({ users: result.rows });
  } catch (error: unknown) {
    console.error('❌ Erreur GET /api/users:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
