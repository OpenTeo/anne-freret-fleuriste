import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

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
        COALESCE(u.total_spent, 0) as total_spent,
        COUNT(o.id) as orders_count
      FROM users u
      LEFT JOIN orders o ON o.customer_email = u.email
      WHERE u.is_admin = false
      GROUP BY u.id
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
