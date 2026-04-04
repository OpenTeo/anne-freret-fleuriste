import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM devis_requests ORDER BY created_at DESC
    `;
    return NextResponse.json({ devis: result.rows });
  } catch (error) {
    console.error('❌ Erreur GET /api/admin/devis:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
