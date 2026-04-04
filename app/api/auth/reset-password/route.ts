import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'fallback');

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
      const result = await jwtVerify(token, SECRET);
      payload = result.payload;
    } catch {
      return NextResponse.json({ error: 'Lien expiré ou invalide' }, { status: 400 });
    }

    if (payload.type !== 'password-reset' || !payload.userId) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 400 });
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur reset-password:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
