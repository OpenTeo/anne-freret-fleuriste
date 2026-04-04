import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { SignJWT } from 'jose';
import { resend, FROM_EMAIL } from '@/lib/resend';

const SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'fallback');

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 });
    }

    const result = await sql`
      SELECT id, email, first_name FROM users WHERE email = ${email.toLowerCase()}
    `;

    // Toujours retourner succès (ne pas révéler si l'email existe)
    if (result.rows.length === 0) {
      return NextResponse.json({ success: true });
    }

    const user = result.rows[0];

    // Créer un token de reset (expire en 1h)
    const token = await new SignJWT({ userId: user.id, type: 'password-reset' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(SECRET);

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://anne-freret-fleuriste.vercel.app').trim();
    const resetUrl = `${siteUrl}/compte/reset-password?token=${token}`;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: 'Réinitialisation de votre mot de passe — Anne Freret',
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background:#faf8f5;font-family:Georgia,serif;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            <div style="text-align:center;margin-bottom:32px;">
              <h1 style="font-size:24px;color:#2d2a26;margin:0;">Anne Freret</h1>
              <p style="font-size:12px;color:#b8935a;letter-spacing:3px;margin:4px 0 0;">FLEURISTE</p>
            </div>
            <div style="background:white;border:1px solid #e8e0d8;padding:32px;">
              <h2 style="font-size:18px;color:#2d2a26;margin:0 0 16px;">Bonjour ${user.first_name || ''} !</h2>
              <p style="color:#2d2a26;opacity:0.7;line-height:1.6;margin:0 0 24px;">
                Vous avez demandé la réinitialisation de votre mot de passe. 
                Cliquez sur le bouton ci-dessous pour en choisir un nouveau.
              </p>
              <div style="text-align:center;margin:24px 0;">
                <a href="${resetUrl}" style="display:inline-block;background:#b8935a;color:white;padding:14px 32px;text-decoration:none;">
                  Réinitialiser mon mot de passe
                </a>
              </div>
              <p style="color:#2d2a26;opacity:0.4;font-size:13px;line-height:1.5;">
                Ce lien expire dans 1 heure. Si vous n'avez pas fait cette demande, ignorez cet email.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur forgot-password:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
