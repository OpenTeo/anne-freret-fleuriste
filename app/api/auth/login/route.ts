import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyPassword, sanitizeUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Chercher utilisateur
    const result = await sql`
      SELECT * FROM users WHERE email = ${email.toLowerCase()}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Vérifier mot de passe
    const isValid = await verifyPassword(password, user.password_hash);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Retourner user sans password_hash
    const sanitized = sanitizeUser(user);

    return NextResponse.json({
      success: true,
      user: sanitized
    });

  } catch (error) {
    console.error('Erreur login:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
