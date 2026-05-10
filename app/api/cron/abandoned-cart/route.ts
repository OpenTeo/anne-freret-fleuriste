import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { resend, FROM_EMAIL } from '@/lib/resend';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    // Nettoyage : supprimer les paniers de plus de 7 jours
    await sql`DELETE FROM carts WHERE updated_at < NOW() - INTERVAL '7 days'`;

    // Paniers abandonnés : inactifs > 1h, relance non encore envoyée, non vides
    const result = await sql`
      SELECT c.user_id, c.email, c.items, c.total, u.first_name
      FROM carts c
      JOIN users u ON c.user_id = u.id
      WHERE c.updated_at < NOW() - INTERVAL '1 hour'
        AND c.reminder_sent_at IS NULL
        AND jsonb_array_length(c.items) > 0
    `;

    let sent = 0;
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();

    for (const cart of result.rows) {
      try {
        const items = cart.items as Array<{ name: string; size?: string; quantity: number; price: number }>;

        const itemLines = items
          .filter((i) => i.name && !i.name.toLowerCase().includes('carte message'))
          .map(
            (i) =>
              `<li style="margin:4px 0;font-size:14px;color:#2d2a26;">${i.name}${i.size ? ` — ${i.size}` : ''} × ${i.quantity}</li>`
          )
          .join('');

        if (!itemLines) continue;

        await resend.emails.send({
          from: FROM_EMAIL,
          to: cart.email,
          subject: `🌸 Votre panier vous attend — Anne Freret Fleuriste`,
          html: `
            <!DOCTYPE html>
            <html lang="fr">
            <head><meta charset="utf-8"></head>
            <body style="margin:0;padding:0;background:#faf8f5;font-family:Georgia,'Times New Roman',serif;">
              <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
                <div style="text-align:center;margin-bottom:32px;">
                  <h1 style="font-size:24px;color:#2d2a26;margin:0;">Anne Freret</h1>
                  <p style="font-size:12px;color:#b8935a;letter-spacing:3px;margin:4px 0 0;">FLEURISTE</p>
                </div>

                <div style="background:white;border:1px solid #e8e0d8;padding:32px;">
                  <h2 style="font-size:18px;color:#2d2a26;margin:0 0 16px;">Vous avez oublié quelque chose 🌺</h2>
                  <p style="font-size:14px;color:#2d2a26;opacity:0.7;margin:0 0 20px;line-height:1.6;">
                    Bonjour ${cart.first_name || ''},<br><br>
                    Vous avez laissé des créations dans votre panier. Elles n'attendent que vous.
                  </p>

                  <ul style="padding:0 0 0 20px;margin:0 0 24px;">
                    ${itemLines}
                  </ul>

                  <div style="text-align:center;margin-top:8px;">
                    <a href="${siteUrl}/panier" style="display:inline-block;background:#b8935a;color:white;padding:12px 32px;text-decoration:none;font-family:Georgia,serif;">
                      Finaliser ma commande
                    </a>
                  </div>
                </div>

                <div style="text-align:center;margin-top:24px;">
                  <p style="font-size:12px;color:#2d2a26;opacity:0.4;line-height:1.6;">
                    Anne Freret Fleuriste · Saint-Pair-sur-Mer, Normandie
                  </p>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        await sql`
          UPDATE carts SET reminder_sent_at = CURRENT_TIMESTAMP WHERE user_id = ${cart.user_id}
        `;
        sent++;
        console.log(`✅ Relance panier envoyée à ${cart.email}`);
      } catch (err) {
        console.error(`❌ Erreur relance panier à ${cart.email}:`, err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `${sent} relance(s) envoyée(s) sur ${result.rows.length} panier(s) abandonné(s)`,
    });
  } catch (error) {
    console.error('❌ Erreur cron abandoned-cart:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
