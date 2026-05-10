import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

function getPasswordResetSecret(): Uint8Array {
  const s = process.env.PASSWORD_RESET_SECRET || process.env.ADMIN_JWT_SECRET;
  if (!s) throw new Error('PASSWORD_RESET_SECRET non configuré');
  return new TextEncoder().encode(s);
}

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Token et mot de passe requis' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 8 caractères' }, { status: 400 });
    }

    // Vérifier le token
    let payload;
    try {
      const result = await jwtVerify(token, getPasswordResetSecret());
      payload = result.payload;
    } catch {
      return NextResponse.json({ error: 'Lien expiré ou invalide' }, { status: 400 });
    }

    if (payload.type !== 'password-reset' || !payload.userId) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 400 });
    }

    // Vérifier le hash binding — invalide si le mot de passe a déjà été changé
    const userCheck = await sql`
      SELECT password_hash FROM users WHERE id = ${payload.userId as string}
    `;
    if (userCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    const currentHash = userCheck.rows[0].password_hash as string;
    if (payload.hash && currentHash.substring(0, 8) !== payload.hash) {
      return NextResponse.json({ error: 'Ce lien a déjà été utilisé' }, { status: 400 });
    }

    // Hasher le nouveau mot de passe
    const passwordHash = await bcrypt.hash(password, 10);

    // Mettre à jour
    const result = await sql`
      UPDATE users SET password_hash = ${passwordHash} WHERE id = ${payload.userId as string}
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Mot de passe mis à jour' });
  } catch (error) {
    console.error('Erreur reset-password:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
