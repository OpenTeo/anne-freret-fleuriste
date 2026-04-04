import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { hashPassword, isValidEmail, isValidPassword, sanitizeUser } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!rateLimit(ip, 5, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Trop de tentatives. Réessayez dans quelques minutes.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { email, password, firstName, lastName, phone } = body;

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 8 caractères' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existing = await sql`
      SELECT id FROM users WHERE email = ${email.toLowerCase()}
    `;

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: 'Un compte existe déjà avec cet email' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Créer utilisateur
    const result = await sql`
      INSERT INTO users (email, password_hash, first_name, last_name, phone)
      VALUES (${email.toLowerCase()}, ${passwordHash}, ${firstName}, ${lastName}, ${phone || null})
      RETURNING id, email, first_name, last_name, phone, loyalty_points, total_spent, is_admin, created_at
    `;

    const user = sanitizeUser(result.rows[0]);

    return NextResponse.json({ 
      success: true, 
      user 
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur register:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du compte' },
      { status: 500 }
    );
  }
}
