import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export interface AuthUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
}

/**
 * Extraire et vérifier l'utilisateur depuis les headers de requête.
 * Le client envoie X-User-Id dans les headers (stocké en localStorage).
 * On valide en DB que l'utilisateur existe.
 */
async function getAuthUser(req: NextRequest): Promise<AuthUser | null> {
  const userId = req.headers.get('x-user-id');
  if (!userId) return null;

  try {
    const result = await sql`
      SELECT id, email, first_name, last_name, is_admin
      FROM users WHERE id = ${userId}
    `;
    if (result.rows.length === 0) return null;
    return result.rows[0] as AuthUser;
  } catch {
    return null;
  }
}

/**
 * Vérifie que la requête provient d'un utilisateur authentifié.
 * Retourne l'utilisateur ou une Response 401.
 */
export async function requireAuth(req: NextRequest): Promise<AuthUser | NextResponse> {
  const user = await getAuthUser(req);
  if (!user) {
    return NextResponse.json({ error: 'Authentification requise' }, { status: 401 });
  }
  return user;
}

/**
 * Vérifie que la requête provient d'un administrateur.
 * Retourne l'utilisateur admin ou une Response 401/403.
 */
export async function requireAdmin(req: NextRequest): Promise<AuthUser | NextResponse> {
  const user = await getAuthUser(req);
  if (!user) {
    return NextResponse.json({ error: 'Authentification requise' }, { status: 401 });
  }
  if (!user.is_admin) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  }
  return user;
}

/**
 * Helper : vérifie si le résultat est un utilisateur ou une erreur Response.
 */
export function isAuthError(result: AuthUser | NextResponse): result is NextResponse {
  return result instanceof NextResponse;
}
