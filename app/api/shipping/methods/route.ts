import { NextRequest, NextResponse } from 'next/server';
import { getShippingMethods } from '@/lib/sendcloud';
import { requireAdmin, isAuthError } from '@/lib/api-auth';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isAuthError(auth)) return auth;

  try {
    const methods = await getShippingMethods();
    return NextResponse.json({ methods });
  } catch (error) {
    console.error('SendCloud shipping methods error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
