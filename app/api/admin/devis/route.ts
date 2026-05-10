import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAdmin, isAuthError } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (isAuthError(auth)) return auth;

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
