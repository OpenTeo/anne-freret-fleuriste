import { Resend } from 'resend';

const resend = new Resend('re_X4Kwi2M2_PnkcgjFBvnLUdaycmfh6BuVv');
const TO = 'teo.ledanois@orange.fr';
const FROM = 'Anne Freret Fleuriste <commandes@fleuriste-annefreret.com>';

const { data, error } = await resend.emails.send({
  from: FROM,
  to: TO,
  subject: 'Confirmation de commande #AF-2026-001 — Anne Freret Fleuriste',
  html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;padding:0;background:#f5f0eb;font-family:Georgia,serif;">
<div style="max-width:600px;margin:0 auto;background:#faf8f5;border:1px solid #e8e0d8;">
  <div style="background:#2d2a26;padding:30px;text-align:center;">
    <h1 style="color:#faf8f5;font-size:22px;font-weight:300;margin:0;letter-spacing:2px;">Anne Freret Fleuriste</h1>
    <p style="color:#b8935a;font-size:11px;letter-spacing:3px;margin:8px 0 0;text-transform:uppercase;">Artisan fleuriste · Depuis 2001</p>
  </div>
  <div style="padding:40px 30px;text-align:center;">
    <div style="width:50px;height:50px;border-radius:50%;background:#b8935a;margin:0 auto 20px;line-height:50px;color:#fff;font-size:22px;">✓</div>
    <h2 style="color:#2d2a26;font-size:24px;font-weight:300;margin:0 0 10px;">Merci pour votre commande</h2>
    <p style="color:#b8935a;font-size:13px;letter-spacing:1px;">COMMANDE #AF-2026-001</p>
    <div style="width:40px;height:1px;background:#b8935a;margin:20px auto;"></div>
    <p style="color:#6b6560;font-size:15px;line-height:1.7;">Votre commande a bien été enregistrée. Notre équipe prépare vos fleurs avec le plus grand soin.</p>
  </div>
  <div style="padding:0 30px 30px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr style="border-bottom:1px solid #e8e0d8;">
        <td style="padding:15px 0;color:#2d2a26;font-size:14px;">Bouquet "Élégance Parisienne"</td>
        <td style="padding:15px 0;text-align:right;color:#b8935a;font-size:14px;">65,00 €</td>
      </tr>
      <tr style="border-bottom:1px solid #e8e0d8;">
        <td style="padding:15px 0;color:#2d2a26;font-size:14px;">Roses "Jardin Secret" (12 tiges)</td>
        <td style="padding:15px 0;text-align:right;color:#b8935a;font-size:14px;">45,00 €</td>
      </tr>
      <tr style="border-bottom:1px solid #e8e0d8;">
        <td style="padding:15px 0;color:#2d2a26;font-size:14px;">Composition "Harmonie Champêtre"</td>
        <td style="padding:15px 0;text-align:right;color:#b8935a;font-size:14px;">55,00 €</td>
      </tr>
      <tr>
        <td style="padding:20px 0;color:#2d2a26;font-size:16px;font-weight:bold;">Total</td>
        <td style="padding:20px 0;text-align:right;color:#2d2a26;font-size:16px;font-weight:bold;">165,00 €</td>
      </tr>
    </table>
  </div>
  <div style="background:#f5f0eb;padding:25px 30px;margin:0 30px 30px;border-radius:8px;">
    <p style="color:#2d2a26;font-size:13px;font-weight:bold;margin:0 0 8px;">📦 Livraison estimée</p>
    <p style="color:#6b6560;font-size:14px;margin:0;">Vendredi 4 avril 2026</p>
    <p style="color:#2d2a26;font-size:13px;font-weight:bold;margin:15px 0 8px;">📍 Adresse de livraison</p>
    <p style="color:#6b6560;font-size:14px;margin:0;">42 Avenue des Champs-Élysées<br>75008 Paris, France</p>
  </div>
  <div style="text-align:center;padding:0 30px 30px;">
    <a href="https://anne-freret-fleuriste.vercel.app/compte/commandes" style="display:inline-block;background:#b8935a;color:#fff;padding:14px 32px;text-decoration:none;font-size:13px;letter-spacing:1px;text-transform:uppercase;border-radius:50px;">Suivre ma commande</a>
  </div>
  <div style="background:#2d2a26;padding:25px;text-align:center;">
    <p style="color:#faf8f5;font-size:12px;margin:0 0 5px;">Anne Freret Fleuriste — Granville, Normandie</p>
    <p style="color:#9a9490;font-size:11px;margin:0;">fleuriste-annefreret.com</p>
  </div>
</div></body></html>`
});

if (error) console.error('❌', error);
else console.log('✅ Email envoyé à', TO, '— ID:', data.id);
