import { resend, FROM_EMAIL } from './resend';

interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  totalAmount: string;
  trackingNumber?: string;
  trackingUrl?: string;
  deliveryMode?: string;
}

function emailTemplate(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#faf8f5;font-family:Georgia,'Times New Roman',serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="font-size:24px;color:#2d2a26;margin:0;">Anne Freret</h1>
      <p style="font-size:12px;color:#b8935a;letter-spacing:3px;margin:4px 0 0;">FLEURISTE</p>
    </div>
    <div style="background:white;border:1px solid #e8e0d8;padding:32px;">
      ${content}
    </div>
    <div style="text-align:center;margin-top:24px;">
      <p style="font-size:12px;color:#2d2a26;opacity:0.4;">Anne Freret Fleuriste · Saint-Pair-sur-Mer</p>
    </div>
  </div>
</body>
</html>`;
}

// Email quand commande confirmée (statut: confirmed)
export async function sendOrderConfirmedEmail(data: OrderEmailData) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: data.customerEmail,
    subject: `Commande confirmée ✅ — ${data.orderNumber}`,
    html: emailTemplate('Commande confirmée', `
      <h2 style="font-size:18px;color:#2d2a26;margin:0 0 16px;">Commande confirmée ✅</h2>
      <p style="color:#2d2a26;opacity:0.7;line-height:1.6;">
        Bonjour ${data.customerName},<br><br>
        Votre commande <strong>${data.orderNumber}</strong> est confirmée. Notre équipe prépare vos créations florales avec le plus grand soin.
      </p>
      <div style="background:#f5f0eb;padding:16px;margin:20px 0;text-align:center;">
        <p style="font-size:20px;color:#2d2a26;margin:0;"><strong>${data.totalAmount} €</strong></p>
      </div>
      <p style="color:#2d2a26;opacity:0.5;font-size:13px;">Vous recevrez un email dès que votre commande sera expédiée.</p>
    `),
  });
}

// Email quand commande en préparation (statut: preparing)
export async function sendOrderPreparingEmail(data: OrderEmailData) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: data.customerEmail,
    subject: `Votre bouquet est en préparation 💐 — ${data.orderNumber}`,
    html: emailTemplate('En préparation', `
      <h2 style="font-size:18px;color:#2d2a26;margin:0 0 16px;">Votre bouquet est en cours de création 💐</h2>
      <p style="color:#2d2a26;opacity:0.7;line-height:1.6;">
        Bonjour ${data.customerName},<br><br>
        Notre équipe compose votre commande <strong>${data.orderNumber}</strong> en ce moment même.
        Chaque fleur est sélectionnée et assemblée à la main dans notre atelier de Saint-Pair-sur-Mer.
      </p>
      <p style="color:#2d2a26;opacity:0.5;font-size:13px;">Prochaine étape : l'expédition ! Vous serez notifié(e) par email.</p>
    `),
  });
}

// Email quand commande expédiée (statut: shipped)
export async function sendOrderShippedEmail(data: OrderEmailData) {
  const trackingSection = data.trackingNumber ? `
    <div style="background:#f5f0eb;padding:16px;margin:20px 0;">
      <p style="font-size:13px;color:#2d2a26;margin:0 0 8px;"><strong>N° de suivi :</strong> ${data.trackingNumber}</p>
      <p style="font-size:13px;color:#2d2a26;margin:0;"><strong>Mode :</strong> ${data.deliveryMode === 'chronopost' ? 'Chronopost Express (24h)' : 'Colissimo (48h)'}</p>
    </div>
    ${data.trackingUrl ? `
    <div style="text-align:center;margin-top:24px;">
      <a href="${data.trackingUrl}" style="display:inline-block;background:#b8935a;color:white;padding:12px 32px;text-decoration:none;">Suivre mon colis</a>
    </div>` : ''}
  ` : '';

  return resend.emails.send({
    from: FROM_EMAIL,
    to: data.customerEmail,
    subject: `Votre commande est en route ! 🚚 — ${data.orderNumber}`,
    html: emailTemplate('Commande expédiée', `
      <h2 style="font-size:18px;color:#2d2a26;margin:0 0 16px;">Votre commande est en route ! 🚚</h2>
      <p style="color:#2d2a26;opacity:0.7;line-height:1.6;">
        Bonjour ${data.customerName},<br><br>
        Votre commande <strong>${data.orderNumber}</strong> a été confiée au transporteur.
      </p>
      ${trackingSection}
    `),
  });
}

// Email quand commande livrée (statut: delivered)
export async function sendOrderDeliveredEmail(data: OrderEmailData) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: data.customerEmail,
    subject: `Commande livrée 🌸 — ${data.orderNumber}`,
    html: emailTemplate('Commande livrée', `
      <h2 style="font-size:18px;color:#2d2a26;margin:0 0 16px;">Votre commande est arrivée ! 🌸</h2>
      <p style="color:#2d2a26;opacity:0.7;line-height:1.6;">
        Bonjour ${data.customerName},<br><br>
        Votre commande <strong>${data.orderNumber}</strong> a été livrée avec succès. Nous espérons que vos fleurs vous apporteront beaucoup de bonheur !
      </p>
      <div style="background:#f5f0eb;padding:16px;margin:20px 0;">
        <p style="font-size:14px;color:#2d2a26;margin:0;text-align:center;">
          <strong>Conseils fraîcheur :</strong> coupez les tiges en biais, changez l'eau tous les 2 jours, et éloignez vos fleurs des fruits 🍎
        </p>
      </div>
      <p style="color:#2d2a26;opacity:0.5;font-size:13px;">Vous avez aimé ? Laissez-nous un avis, ça nous fait toujours plaisir !</p>
    `),
  });
}

// Email quand commande annulée (statut: cancelled)
export async function sendOrderCancelledEmail(data: OrderEmailData) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: data.customerEmail,
    subject: `Commande annulée — ${data.orderNumber}`,
    html: emailTemplate('Commande annulée', `
      <h2 style="font-size:18px;color:#2d2a26;margin:0 0 16px;">Commande annulée</h2>
      <p style="color:#2d2a26;opacity:0.7;line-height:1.6;">
        Bonjour ${data.customerName},<br><br>
        Votre commande <strong>${data.orderNumber}</strong> (${data.totalAmount} €) a été annulée.
        Si un paiement a été effectué, le remboursement sera traité sous 5 à 10 jours ouvrés.
      </p>
      <p style="color:#2d2a26;opacity:0.5;font-size:13px;">Une question ? Répondez directement à cet email.</p>
    `),
  });
}

// Dispatch selon le statut
export async function sendStatusChangeEmail(
  status: string,
  data: OrderEmailData
): Promise<boolean> {
  try {
    switch (status) {
      case 'confirmed':
        await sendOrderConfirmedEmail(data);
        break;
      case 'preparing':
        await sendOrderPreparingEmail(data);
        break;
      case 'shipped':
        await sendOrderShippedEmail(data);
        break;
      case 'delivered':
        await sendOrderDeliveredEmail(data);
        break;
      case 'cancelled':
        await sendOrderCancelledEmail(data);
        break;
      default:
        console.log(`Pas d'email pour le statut: ${status}`);
        return false;
    }
    console.log(`✅ Email "${status}" envoyé à ${data.customerEmail} pour ${data.orderNumber}`);
    return true;
  } catch (err) {
    console.error(`❌ Erreur envoi email "${status}" à ${data.customerEmail}:`, err);
    return false;
  }
}
