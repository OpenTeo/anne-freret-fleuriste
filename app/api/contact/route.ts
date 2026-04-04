import { NextRequest, NextResponse } from 'next/server';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { escapeHtml } from '@/lib/sanitize';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  // Rate limit: 3 requêtes / 15 min par IP
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  if (!rateLimit(ip, 3, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Trop de messages envoyés. Réessayez dans quelques minutes.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Validation email basique
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    // Mapping des sujets
    const subjectLabels: Record<string, string> = {
      devis: 'Demande de devis',
      mariage: 'Décoration de mariage',
      evenement: 'Événement spécial',
      abonnement: 'Abonnement fleurs',
      renseignement: 'Renseignement général',
      autre: 'Autre',
    };
    const subjectLabel = subjectLabels[subject] || subject;

    // Envoyer l'email
    await resend.emails.send({
      from: FROM_EMAIL,
      to: 'contact@fleuriste-annefreret.com',
      replyTo: email,
      subject: `[Site web] ${subjectLabel} — ${escapeHtml(name)}`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background:#faf8f5;font-family:Georgia,'Times New Roman',serif;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            <div style="text-align:center;margin-bottom:24px;">
              <h1 style="font-size:20px;color:#2d2a26;margin:0;">Nouveau message — Site web</h1>
            </div>
            <div style="background:white;border:1px solid #e8e0d8;padding:24px;">
              <table style="width:100%;font-size:14px;color:#2d2a26;">
                <tr>
                  <td style="padding:8px 0;color:#2d2a26;opacity:0.5;vertical-align:top;width:100px;">Nom</td>
                  <td style="padding:8px 0;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#2d2a26;opacity:0.5;vertical-align:top;">Email</td>
                  <td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#b8935a;">${escapeHtml(email)}</a></td>
                </tr>
                ${phone ? `<tr>
                  <td style="padding:8px 0;color:#2d2a26;opacity:0.5;vertical-align:top;">Téléphone</td>
                  <td style="padding:8px 0;">${escapeHtml(phone)}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding:8px 0;color:#2d2a26;opacity:0.5;vertical-align:top;">Sujet</td>
                  <td style="padding:8px 0;">${escapeHtml(subjectLabel)}</td>
                </tr>
              </table>
              <div style="border-top:1px solid #e8e0d8;margin-top:16px;padding-top:16px;">
                <p style="font-size:12px;color:#2d2a26;opacity:0.5;margin:0 0 8px;">Message :</p>
                <p style="font-size:14px;color:#2d2a26;line-height:1.6;margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur envoi message contact:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi du message' }, { status: 500 });
  }
}
