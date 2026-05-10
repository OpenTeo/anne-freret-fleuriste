import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        u.first_name,
        u.last_name,
        u.email,
        u.phone,
        u.address,
        u.city,
        u.postal_code,
        u.created_at,
        COALESCE(os.total_spent, 0) as total_spent,
        COALESCE(os.orders_count, 0) as orders_count
      FROM users u
      LEFT JOIN (
        SELECT customer_email, COUNT(*) as orders_count, SUM(total_amount) as total_spent
        FROM orders WHERE status != 'cancelled'
        GROUP BY customer_email
      ) os ON os.customer_email = u.email
      WHERE u.is_admin = false
      ORDER BY u.created_at DESC
    `;

    // Build CSV
    const headers = ['Prénom', 'Nom', 'Email', 'Téléphone', 'Adresse', 'Ville', 'Code postal', 'Inscrit le', 'Total dépensé', 'Nb commandes'];
    const rows = result.rows.map(r => [
      r.first_name || '',
      r.last_name || '',
      r.email,
      r.phone || '',
      (r.address || '').replace(/"/g, '""'),
      r.city || '',
      r.postal_code || '',
      new Date(r.created_at).toLocaleDateString('fr-FR'),
      parseFloat(r.total_spent).toFixed(2),
      r.orders_count,
    ].map(v => `"${v}"`).join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="clients_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('❌ Erreur GET /api/admin/export/clients:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
