import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { escapeHtml } from '@/lib/sanitize';

// GET /api/cron/subscription-reminders
// Appelé chaque jour à 8h — envoie un rappel pour les livraisons du lendemain
export async function GET(request: NextRequest) {
  // Vérifier le secret cron (Vercel envoie ce header)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    // Rappel uniquement pour les livraisons locales (Anne livre elle-même)
    // Les abonnements Chronopost reçoivent le suivi via Sendcloud automatiquement
    const result = await sql`
      SELECT s.*, u.email, u.first_name, u.last_name
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      WHERE s.status = 'active'
        AND s.next_delivery_date = CURRENT_DATE + INTERVAL '1 day'
        AND (s.delivery_mode = 'local' OR s.delivery_mode IS NULL)
    `;

    const subs = result.rows;
    let sent = 0;

    for (const sub of subs) {
      if (!sub.email) continue;

      const formulaLabels: Record<string, string> = {
        essentiel: '🌿 Essentiel',
        signature: '🌸 Signature',
        prestige: '🌹 Prestige'
      };

      const deliveryDate = new Date(sub.next_delivery_date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });

      const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();

      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: sub.email,
          subject: `🌺 Votre bouquet arrive demain !`,
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
                  <h2 style="font-size:18px;color:#2d2a26;margin:0 0 8px;">Votre bouquet arrive demain ! 🌺</h2>
                  <p style="font-size:14px;color:#2d2a26;opacity:0.7;margin:0 0 24px;line-height:1.6;">
                    Bonjour ${escapeHtml(sub.first_name || '')},<br><br>
                    Votre bouquet <strong>${formulaLabels[sub.formula] || sub.formula}</strong> sera livré 
                    <strong>${deliveryDate}</strong>.<br><br>
                    Assurez-vous d'être disponible ou de prévoir un endroit sûr pour la réception.
                  </p>

                  <div style="background:#f5f0eb;padding:16px;border-left:4px solid #b8935a;margin-bottom:24px;">
                    <p style="font-size:13px;color:#2d2a26;margin:0;line-height:1.5;">
                      <strong>💡 Conseil :</strong> Préparez un vase propre avec de l'eau fraîche pour accueillir votre bouquet dès réception.
                    </p>
                  </div>

                  <div style="text-align:center;margin-top:24px;">
                    <a href="${siteUrl}/compte/mes-abonnements" style="display:inline-block;background:#b8935a;color:white;padding:12px 32px;text-decoration:none;">
                      Gérer mon abonnement
                    </a>
                  </div>
                </div>

                <div style="text-align:center;margin-top:24px;">
                  <p style="font-size:12px;color:#2d2a26;opacity:0.4;line-height:1.6;">
                    Une question ? Répondez directement à cet email.<br>
                    Anne Freret Fleuriste · Saint-Pair-sur-Mer, Normandie
                  </p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
        sent++;
        console.log(`✅ Rappel envoyé à ${sub.email}`);
      } catch (err) {
        console.error(`❌ Erreur envoi rappel à ${sub.email}:`, err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `${sent} rappel(s) envoyé(s) sur ${subs.length} abonnement(s) à livrer demain`
    });
  } catch (error) {
    console.error('❌ Erreur cron subscription-reminders:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
