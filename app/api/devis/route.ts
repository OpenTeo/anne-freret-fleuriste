import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { escapeHtml } from '@/lib/sanitize';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawEmail = body.email;
    
    // 🔒 Sanitize tous les champs
    const nom = escapeHtml(body.nom);
    const email = escapeHtml(body.email);
    const telephone = escapeHtml(body.telephone);
    const dateMariage = escapeHtml(body.dateMariage);
    const lieuMariage = escapeHtml(body.lieuMariage);
    const budget = escapeHtml(body.budget);
    const message = escapeHtml(body.message);

    if (!body.nom || !body.email) {
      return NextResponse.json({ error: 'Nom et email requis' }, { status: 400 });
    }

    // Email vers l'équipe
    await resend.emails.send({
      from: 'Anne Freret Fleuriste <noreply@fleuriste-annefreret.com>',
      to: ['evenementiel@fleuriste-annefreret.com'],
      replyTo: rawEmail,
      subject: `Demande de devis mariage \u2014 ${nom}`,
      html: `
        <div style="font-family: Georgia, serif; color: #2d2a26; max-width: 600px;">
          <h2 style="color: #b8935a; font-weight: normal;">Nouvelle demande de devis mariage</h2>
          <hr style="border: none; border-top: 1px solid #e8e0d8; margin: 20px 0;" />
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #b8935a; width: 140px;">Nom</td><td style="padding: 8px 0;">${nom}</td></tr>
            <tr><td style="padding: 8px 0; color: #b8935a;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            ${telephone ? `<tr><td style="padding: 8px 0; color: #b8935a;">T\u00e9l\u00e9phone</td><td style="padding: 8px 0;"><a href="tel:${telephone}">${telephone}</a></td></tr>` : ''}
            ${dateMariage ? `<tr><td style="padding: 8px 0; color: #b8935a;">Date du mariage</td><td style="padding: 8px 0;">${dateMariage}</td></tr>` : ''}
            ${lieuMariage ? `<tr><td style="padding: 8px 0; color: #b8935a;">Lieu</td><td style="padding: 8px 0;">${lieuMariage}</td></tr>` : ''}
            ${budget ? `<tr><td style="padding: 8px 0; color: #b8935a;">Budget estim\u00e9</td><td style="padding: 8px 0;">${budget}</td></tr>` : ''}
          </table>

          ${message ? `
            <hr style="border: none; border-top: 1px solid #e8e0d8; margin: 20px 0;" />
            <p style="color: #b8935a; margin-bottom: 8px;">Message :</p>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          ` : ''}

          <hr style="border: none; border-top: 1px solid #e8e0d8; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9a9490;">
            Envoy\u00e9 depuis le formulaire de devis mariage sur fleuriste-annefreret.com
          </p>
        </div>
      `,
    });

    // Email de confirmation au client
    await resend.emails.send({
      from: 'Anne Freret Fleuriste <noreply@fleuriste-annefreret.com>',
      to: [rawEmail],
      subject: 'Votre demande de devis mariage \u2014 Anne Freret Fleuriste',
      html: `
        <div style="font-family: Georgia, serif; color: #2d2a26; max-width: 600px;">
          <h2 style="color: #b8935a; font-weight: normal;">Merci ${nom} !</h2>
          <p style="line-height: 1.6;">
            Nous avons bien re\u00e7u votre demande de devis pour votre mariage. 
            Notre \u00e9quipe vous r\u00e9pondra personnellement sous 48h.
          </p>
          <p style="line-height: 1.6;">
            En attendant, n'h\u00e9sitez pas \u00e0 nous contacter directement \u00e0 
            <a href="mailto:evenementiel@fleuriste-annefreret.com" style="color: #b8935a;">evenementiel@fleuriste-annefreret.com</a>
          </p>
          <hr style="border: none; border-top: 1px solid #e8e0d8; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9a9490;">Anne Freret Fleuriste \u2014 Saint-Pair-sur-Mer</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur envoi devis:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi' }, { status: 500 });
  }
}
