import { Resend } from 'resend';

const resend = new Resend('re_X4Kwi2M2_PnkcgjFBvnLUdaycmfh6BuVv');

async function test() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Anne Freret Fleuriste <commandes@fleuriste-annefreret.com>',
      to: 'contact.ledanois@gmail.com',
      subject: '✅ Test Resend — Anne Freret Fleuriste',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #faf8f5; padding: 40px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2d2a26; font-weight: 300; font-size: 24px;">Anne Freret Fleuriste</h1>
            <div style="width: 40px; height: 1px; background: #b8935a; margin: 15px auto;"></div>
          </div>
          <p style="color: #2d2a26; font-size: 16px; line-height: 1.6;">
            Ceci est un email de test. Si tu le reçois, Resend fonctionne correctement avec le domaine 
            <strong>fleuriste-annefreret.com</strong>.
          </p>
          <p style="color: #b8935a; font-size: 14px; margin-top: 20px;">
            — Cash, copilote de Téo
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Erreur Resend:', error);
    } else {
      console.log('✅ Email envoyé! ID:', data.id);
    }
  } catch (err) {
    console.error('❌ Erreur:', err.message);
  }
}

test();
