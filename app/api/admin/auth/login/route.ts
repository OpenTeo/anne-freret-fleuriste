import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcryptjs from 'bcryptjs';
import { createAdminToken } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    const result = await sql`
      SELECT id, email, first_name, last_name, password_hash, is_admin
      FROM users
      WHERE email = ${email} AND is_admin = true
    `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    const user = result.rows[0];
    const valid = await bcryptjs.compare(password, user.password_hash);

    if (!valid) {
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    const token = await createAdminToken({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      is_admin: true,
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24h
    });

    return response;
  } catch (error) {
    console.error('❌ Erreur POST /api/admin/auth/login:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
