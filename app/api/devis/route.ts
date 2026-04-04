import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, email, telephone, dateMariage, lieuMariage, budget, message } = body;

    if (!nom || !email) {
      return NextResponse.json({ error: 'Nom et email requis' }, { status: 400 });
    }

    // Email vers l'équipe
    await resend.emails.send({
      from: 'Anne Freret Fleuriste <noreply@fleuriste-annefreret.com>',
      to: ['evenementiel@fleuriste-annefreret.com'],
      replyTo: email,
      subject: `Demande de devis mariage — ${nom}`,
      html: `
        <div style="font-family: Georgia, serif; color: #2d2a26; max-width: 600px;">
          <h2 style="color: #b8935a; font-weight: normal;">Nouvelle demande de devis mariage</h2>
          <hr style="border: none; border-top: 1px solid #e8e0d8; margin: 20px 0;" />
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #b8935a; width: 140px;">Nom</td><td style="padding: 8px 0;">${nom}</td></tr>
            <tr><td style="padding: 8px 0; color: #b8935a;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            ${telephone ? `<tr><td style="padding: 8px 0; color: #b8935a;">Téléphone</td><td style="padding: 8px 0;"><a href="tel:${telephone}">${telephone}</a></td></tr>` : ''}
            ${dateMariage ? `<tr><td style="padding: 8px 0; color: #b8935a;">Date du mariage</td><td style="padding: 8px 0;">${dateMariage}</td></tr>` : ''}
            ${lieuMariage ? `<tr><td style="padding: 8px 0; color: #b8935a;">Lieu</td><td style="padding: 8px 0;">${lieuMariage}</td></tr>` : ''}
            ${budget ? `<tr><td style="padding: 8px 0; color: #b8935a;">Budget estimé</td><td style="padding: 8px 0;">${budget}</td></tr>` : ''}
          </table>

          ${message ? `
            <hr style="border: none; border-top: 1px solid #e8e0d8; margin: 20px 0;" />
            <p style="color: #b8935a; margin-bottom: 8px;">Message :</p>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          ` : ''}

          <hr style="border: none; border-top: 1px solid #e8e0d8; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9a9490;">
            Envoyé depuis le formulaire de devis mariage sur fleuriste-annefreret.com
          </p>
        </div>
      `,
    });

    // Email de confirmation au client
    await resend.emails.send({
      from: 'Anne Freret Fleuriste <noreply@fleuriste-annefreret.com>',
      to: [email],
      subject: 'Votre demande de devis mariage — Anne Freret Fleuriste',
      html: `
        <div style="font-family: Georgia, serif; color: #2d2a26; max-width: 600px;">
          <h2 style="color: #b8935a; font-weight: normal;">Merci ${nom} !</h2>
          <p style="line-height: 1.6;">
            Nous avons bien reçu votre demande de devis pour votre mariage. 
            Notre équipe vous répondra personnellement sous 48h.
          </p>
          <p style="line-height: 1.6;">
            En attendant, n'hésitez pas à nous contacter directement à 
            <a href="mailto:evenementiel@fleuriste-annefreret.com" style="color: #b8935a;">evenementiel@fleuriste-annefreret.com</a>
          </p>
          <hr style="border: none; border-top: 1px solid #e8e0d8; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9a9490;">Anne Freret Fleuriste — Saint-Pair-sur-Mer</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur envoi devis:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi' }, { status: 500 });
  }
}
