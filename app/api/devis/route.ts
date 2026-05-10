import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { escapeHtml } from '@/lib/sanitize';

const EVENTS_EMAIL = process.env.EVENTS_EMAIL || 'evenementiel@fleuriste-annefreret.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.nom || !body.email) {
      return NextResponse.json({ error: 'Nom et email requis' }, { status: 400 });
    }

    const rawEmail = body.email;

    const esc = (v: unknown) => (v ? escapeHtml(String(v)) : null);

    const nom = escapeHtml(String(body.nom));
    const email = escapeHtml(String(body.email));
    const telephone = esc(body.telephone);
    const dateMariage = esc(body.dateMariage);
    const lieuMariage = esc(body.lieuMariage);
    const budget = esc(body.budget);
    const message = esc(body.message);

    // Sauvegarde en base — données jamais perdues même si Resend échoue
    await sql`
      INSERT INTO devis_requests (nom, email, telephone, date_mariage, lieu_mariage, budget, message)
      VALUES (
        ${nom},
        ${email},
        ${telephone},
        ${body.dateMariage || null},
        ${lieuMariage},
        ${budget},
        ${message}
      )
    `;

    // Emails non-bloquants : un échec email ne fait pas échouer la demande
    resend.emails.send({
      from: FROM_EMAIL,
      to: [EVENTS_EMAIL],
      replyTo: rawEmail,
      subject: `Demande de devis mariage — ${nom}`,
      html: `
        <div style="font-family: Georgia, serif; color: #2d2a26; max-width: 600px;">
          <h2 style="color: #b8935a; font-weight: normal;">Nouvelle demande de devis mariage</h2>
          <hr style="border: none; border-top: 1px solid #e8e0d8; margin: 20px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #b8935a; width: 140px;">Nom</td><td style="padding: 8px 0;">${nom}</td></tr>
            <tr><td style="padding: 8px 0; color: #b8935a;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            ${telephone ? `<tr><td style="padding: 8px 0; color: #b8935a;">Telephone</td><td style="padding: 8px 0;"><a href="tel:${telephone}">${telephone}</a></td></tr>` : ''}
            ${dateMariage ? `<tr><td style="padding: 8px 0; color: #b8935a;">Date du mariage</td><td style="padding: 8px 0;">${dateMariage}</td></tr>` : ''}
            ${lieuMariage ? `<tr><td style="padding: 8px 0; color: #b8935a;">Lieu</td><td style="padding: 8px 0;">${lieuMariage}</td></tr>` : ''}
            ${budget ? `<tr><td style="padding: 8px 0; color: #b8935a;">Budget estime</td><td style="padding: 8px 0;">${budget}</td></tr>` : ''}
          </table>
          ${message ? `
            <hr style="border: none; border-top: 1px solid #e8e0d8; margin: 20px 0;" />
            <p style="color: #b8935a; margin-bottom: 8px;">Message :</p>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          ` : ''}
          <hr style="border: none; border-top: 1px solid #e8e0d8; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9a9490;">Envoye depuis fleuriste-annefreret.com</p>
        </div>
      `,
    }).catch((err) => console.error('Erreur email equipe devis:', err));

    resend.emails.send({
      from: 'Anne Freret Fleuriste <noreply@fleuriste-annefreret.com>',
      to: [rawEmail],
      subject: 'Votre demande de devis mariage — Anne Freret Fleuriste',
      html: `
        <div style="font-family: Georgia, serif; color: #2d2a26; max-width: 600px;">
          <h2 style="color: #b8935a; font-weight: normal;">Merci ${nom} !</h2>
          <p style="line-height: 1.6;">
            Nous avons bien recu votre demande de devis pour votre mariage.
            Notre equipe vous repondra personnellement sous 48h.
          </p>
          <p style="line-height: 1.6;">
            En attendant, n'hesitez pas a nous contacter directement a
            <a href="mailto:${EVENTS_EMAIL}" style="color: #b8935a;">${EVENTS_EMAIL}</a>
          </p>
          <hr style="border: none; border-top: 1px solid #e8e0d8; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9a9490;">Anne Freret Fleuriste — Saint-Pair-sur-Mer</p>
        </div>
      `,
    }).catch((err) => console.error('Erreur email confirmation devis client:', err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur devis:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
