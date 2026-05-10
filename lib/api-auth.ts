import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyAdminToken } from '@/lib/admin-auth';
import { verifyUserToken } from '@/lib/auth';

export interface AuthUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
}

async function getAuthUser(req: NextRequest): Promise<AuthUser | null> {
  const userToken = req.cookies.get('user-token')?.value;
  if (!userToken) return null;

  const payload = await verifyUserToken(userToken);
  if (!payload) return null;

  try {
    const result = await sql`
      SELECT id, email, first_name, last_name, is_admin
      FROM users WHERE id = ${payload.userId}
    `;
    if (result.rows.length === 0) return null;
    return result.rows[0] as AuthUser;
  } catch {
    return null;
  }
}

export async function requireAuth(req: NextRequest): Promise<AuthUser | NextResponse> {
  const user = await getAuthUser(req);
  if (!user) {
    return NextResponse.json({ error: 'Authentification requise' }, { status: 401 });
  }
  return user;
}

export async function requireAdmin(req: NextRequest): Promise<AuthUser | NextResponse> {
  // Tentative 1 : x-user-id header (session utilisateur classique)
  const user = await getAuthUser(req);
  if (user) {
    if (!user.is_admin) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }
    return user;
  }

  // Tentative 2 : admin-token cookie JWT (session panel admin)
  const adminToken = req.cookies.get('admin-token')?.value;
  if (adminToken) {
    const payload = await verifyAdminToken(adminToken);
    if (payload) {
      return {
        id: payload.id,
        email: payload.email,
        first_name: payload.first_name,
        last_name: payload.last_name,
        is_admin: true,
      };
    }
  }

  return NextResponse.json({ error: 'Authentification requise' }, { status: 401 });
}

export function isAuthError(result: AuthUser | NextResponse): result is NextResponse {
  return result instanceof NextResponse;
}
