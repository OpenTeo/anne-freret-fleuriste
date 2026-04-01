// Email templates for Anne Freret Fleuriste
// All emails use inline CSS for email client compatibility

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  estimatedDelivery?: string;
  trackingNumber?: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  planName: string;
  price: number;
  frequency: string;
  nextDeliveryDate: string;
  manageUrl?: string;
}

export interface User {
  name: string;
  email: string;
}

const BRAND_COLORS = {
  dark: '#2d2a26',
  gold: '#b8935a',
  cream: '#faf8f5',
  textSecondary: '#6b6560',
};

const SITE_URL = 'https://anne-freret-fleuriste.vercel.app';

// Base email template wrapper
function emailWrapper(content: string, preheader = ''): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Anne Freret Fleuriste</title>
  ${preheader ? `<style type="text/css">.preheader{display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;}</style>` : ''}
</head>
<body style="margin: 0; padding: 0; background-color: ${BRAND_COLORS.cream}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  ${preheader ? `<div class="preheader" style="display: none; max-height: 0; overflow: hidden;">${preheader}</div>` : ''}
  
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${BRAND_COLORS.cream};">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(45, 42, 38, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; background-color: ${BRAND_COLORS.cream}; border-bottom: 2px solid ${BRAND_COLORS.gold};">
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 32px; font-weight: normal; color: ${BRAND_COLORS.dark}; letter-spacing: 1px;">
                Anne Freret
              </h1>
              <p style="margin: 5px 0 0; font-size: 12px; color: ${BRAND_COLORS.textSecondary}; letter-spacing: 2px; text-transform: uppercase;">
                Fleuriste
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: ${BRAND_COLORS.cream}; border-top: 1px solid #e5e5e5;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 20px; text-align: center;">
                    <p style="margin: 0 0 10px; font-size: 14px; color: ${BRAND_COLORS.dark}; font-family: Georgia, serif;">
                      <strong>Anne Freret Fleuriste</strong>
                    </p>
                    <p style="margin: 0; font-size: 13px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6;">
                      123 Rue de la Fleur, 75001 Paris, France<br>
                      <a href="tel:+33123456789" style="color: ${BRAND_COLORS.gold}; text-decoration: none;">+33 1 23 45 67 89</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0; text-align: center; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;">
                    <a href="${SITE_URL}" style="display: inline-block; margin: 0 10px; text-decoration: none; color: ${BRAND_COLORS.gold}; font-size: 13px;">Boutique</a>
                    <span style="color: ${BRAND_COLORS.textSecondary};">•</span>
                    <a href="${SITE_URL}/contact" style="display: inline-block; margin: 0 10px; text-decoration: none; color: ${BRAND_COLORS.gold}; font-size: 13px;">Contact</a>
                    <span style="color: ${BRAND_COLORS.textSecondary};">•</span>
                    <a href="${SITE_URL}/account" style="display: inline-block; margin: 0 10px; text-decoration: none; color: ${BRAND_COLORS.gold}; font-size: 13px;">Mon compte</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px; text-align: center;">
                    <p style="margin: 0 0 10px; font-size: 12px; color: ${BRAND_COLORS.textSecondary};">
                      Suivez-nous
                    </p>
                    <a href="https://instagram.com/annefreret" style="display: inline-block; margin: 0 8px; text-decoration: none; color: ${BRAND_COLORS.gold}; font-size: 24px;">📷</a>
                    <a href="https://facebook.com/annefreret" style="display: inline-block; margin: 0 8px; text-decoration: none; color: ${BRAND_COLORS.gold}; font-size: 24px;">📘</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px; text-align: center;">
                    <p style="margin: 0; font-size: 11px; color: ${BRAND_COLORS.textSecondary};">
                      Vous recevez cet email car vous avez passé commande sur notre boutique.<br>
                      <a href="${SITE_URL}/unsubscribe" style="color: ${BRAND_COLORS.textSecondary}; text-decoration: underline;">Se désabonner</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// 1. Order Confirmation
export function orderConfirmation(order: Order): string {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td width="80" style="vertical-align: top;">
              ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 4px; border: 1px solid #e5e5e5;">` : `<div style="width: 70px; height: 70px; background-color: ${BRAND_COLORS.cream}; border-radius: 4px; border: 1px solid #e5e5e5;"></div>`}
            </td>
            <td style="padding-left: 15px; vertical-align: top;">
              <p style="margin: 0 0 5px; font-size: 15px; color: ${BRAND_COLORS.dark}; font-weight: 600;">
                ${item.name}
              </p>
              <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary};">
                Quantité: ${item.quantity}
              </p>
            </td>
            <td style="text-align: right; vertical-align: top; white-space: nowrap;">
              <p style="margin: 0; font-size: 15px; color: ${BRAND_COLORS.dark}; font-weight: 600;">
                ${item.price.toFixed(2)} €
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `
    )
    .join('');

  const content = `
    <h2 style="margin: 0 0 10px; font-family: Georgia, serif; font-size: 26px; font-weight: normal; color: ${BRAND_COLORS.dark};">
      Merci pour votre commande !
    </h2>
    <p style="margin: 0 0 30px; font-size: 15px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6;">
      Nous avons bien reçu votre commande et nous nous occupons de préparer vos magnifiques fleurs avec le plus grand soin.
    </p>
    
    <div style="background-color: ${BRAND_COLORS.cream}; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
      <p style="margin: 0; font-size: 13px; color: ${BRAND_COLORS.textSecondary}; text-transform: uppercase; letter-spacing: 1px;">
        Commande nº
      </p>
      <p style="margin: 5px 0 0; font-size: 20px; color: ${BRAND_COLORS.dark}; font-family: Georgia, serif; font-weight: 600;">
        ${order.orderNumber}
      </p>
    </div>
    
    <h3 style="margin: 0 0 20px; font-family: Georgia, serif; font-size: 18px; font-weight: normal; color: ${BRAND_COLORS.dark}; border-bottom: 1px solid ${BRAND_COLORS.gold}; padding-bottom: 10px;">
      Résumé de votre commande
    </h3>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px;">
      ${itemsHtml}
      <tr>
        <td colspan="3" style="padding-top: 20px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="padding: 8px 0; text-align: right; font-size: 18px; color: ${BRAND_COLORS.dark}; font-weight: 600;">
                Total :
              </td>
              <td style="padding: 8px 0; text-align: right; font-size: 18px; color: ${BRAND_COLORS.dark}; font-weight: 600; width: 120px;">
                ${order.total.toFixed(2)} €
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <h3 style="margin: 30px 0 15px; font-family: Georgia, serif; font-size: 18px; font-weight: normal; color: ${BRAND_COLORS.dark};">
      Adresse de livraison
    </h3>
    <div style="background-color: ${BRAND_COLORS.cream}; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
      <p style="margin: 0; font-size: 15px; color: ${BRAND_COLORS.dark}; line-height: 1.8;">
        ${order.shippingAddress.name}<br>
        ${order.shippingAddress.street}<br>
        ${order.shippingAddress.postalCode} ${order.shippingAddress.city}<br>
        ${order.shippingAddress.country}
      </p>
    </div>
    
    ${order.estimatedDelivery ? `
    <div style="background-color: #f9f9f9; border-left: 3px solid ${BRAND_COLORS.gold}; padding: 15px 20px; margin-bottom: 30px;">
      <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary};">
        <strong style="color: ${BRAND_COLORS.dark};">📦 Livraison estimée :</strong> ${order.estimatedDelivery}
      </p>
    </div>
    ` : ''}
    
    <p style="margin: 30px 0 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6;">
      Vous recevrez un email de confirmation d'expédition dès que votre commande sera en route.
    </p>
    
    <div style="text-align: center; margin-top: 35px;">
      <a href="${SITE_URL}/account/orders/${order.id}" style="display: inline-block; padding: 14px 32px; background-color: ${BRAND_COLORS.gold}; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 15px; font-weight: 600;">
        Suivre ma commande
      </a>
    </div>
  `;

  return emailWrapper(content, `Confirmation de commande ${order.orderNumber}`);
}

// 2. Shipping Notification
export function shippingNotification(order: Order, trackingUrl: string): string {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; width: 80px; height: 80px; background-color: ${BRAND_COLORS.cream}; border-radius: 50%; line-height: 80px; font-size: 40px; margin-bottom: 20px;">
        🚚
      </div>
      <h2 style="margin: 0 0 10px; font-family: Georgia, serif; font-size: 26px; font-weight: normal; color: ${BRAND_COLORS.dark};">
        Votre bouquet est en route !
      </h2>
      <p style="margin: 0; font-size: 15px; color: ${BRAND_COLORS.textSecondary};">
        Commande nº ${order.orderNumber}
      </p>
    </div>
    
    <p style="margin: 0 0 30px; font-size: 15px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6; text-align: center;">
      Bonne nouvelle ! Votre commande a quitté notre atelier et est maintenant entre les mains de notre transporteur.
    </p>
    
    ${order.trackingNumber ? `
    <div style="background-color: ${BRAND_COLORS.cream}; padding: 25px; border-radius: 6px; margin-bottom: 30px; text-align: center;">
      <p style="margin: 0 0 10px; font-size: 13px; color: ${BRAND_COLORS.textSecondary}; text-transform: uppercase; letter-spacing: 1px;">
        Numéro de suivi
      </p>
      <p style="margin: 0 0 20px; font-size: 18px; color: ${BRAND_COLORS.dark}; font-family: monospace; font-weight: 600; letter-spacing: 1px;">
        ${order.trackingNumber}
      </p>
      <a href="${trackingUrl}" style="display: inline-block; padding: 12px 28px; background-color: ${BRAND_COLORS.gold}; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 14px; font-weight: 600;">
        Suivre mon colis
      </a>
    </div>
    ` : ''}
    
    ${order.estimatedDelivery ? `
    <div style="background-color: #f9f9f9; border-left: 3px solid ${BRAND_COLORS.gold}; padding: 15px 20px; margin-bottom: 30px;">
      <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary};">
        <strong style="color: ${BRAND_COLORS.dark};">📅 Livraison prévue :</strong> ${order.estimatedDelivery}
      </p>
    </div>
    ` : ''}
    
    <h3 style="margin: 30px 0 15px; font-family: Georgia, serif; font-size: 18px; font-weight: normal; color: ${BRAND_COLORS.dark};">
      Adresse de livraison
    </h3>
    <div style="background-color: ${BRAND_COLORS.cream}; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
      <p style="margin: 0; font-size: 15px; color: ${BRAND_COLORS.dark}; line-height: 1.8;">
        ${order.shippingAddress.name}<br>
        ${order.shippingAddress.street}<br>
        ${order.shippingAddress.postalCode} ${order.shippingAddress.city}
      </p>
    </div>
    
    <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6; text-align: center;">
      Nous vous enverrons une confirmation dès la livraison effectuée.
    </p>
  `;

  return emailWrapper(content, `Votre commande ${order.orderNumber} est expédiée`);
}

// 3. Delivery Confirmation
export function deliveryConfirmation(order: Order): string {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; width: 80px; height: 80px; background-color: ${BRAND_COLORS.cream}; border-radius: 50%; line-height: 80px; font-size: 40px; margin-bottom: 20px;">
        🌸
      </div>
      <h2 style="margin: 0 0 10px; font-family: Georgia, serif; font-size: 26px; font-weight: normal; color: ${BRAND_COLORS.dark};">
        Votre commande a été livrée !
      </h2>
      <p style="margin: 0; font-size: 15px; color: ${BRAND_COLORS.textSecondary};">
        Commande nº ${order.orderNumber}
      </p>
    </div>
    
    <p style="margin: 0 0 30px; font-size: 15px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6; text-align: center;">
      Nous espérons que vos fleurs vous apportent autant de joie que nous avons eu de plaisir à les préparer pour vous.
    </p>
    
    <div style="background-color: ${BRAND_COLORS.cream}; padding: 30px; border-radius: 6px; margin-bottom: 30px; text-align: center;">
      <h3 style="margin: 0 0 15px; font-family: Georgia, serif; font-size: 20px; font-weight: normal; color: ${BRAND_COLORS.dark};">
        Partagez votre expérience
      </h3>
      <p style="margin: 0 0 20px; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6;">
        Votre avis nous aide à continuer d'offrir le meilleur service possible.
      </p>
      <div style="margin-bottom: 20px; font-size: 28px; letter-spacing: 8px;">
        ⭐⭐⭐⭐⭐
      </div>
      <a href="${SITE_URL}/review/${order.id}" style="display: inline-block; padding: 14px 32px; background-color: ${BRAND_COLORS.gold}; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 15px; font-weight: 600;">
        Laisser un avis
      </a>
    </div>
    
    <h3 style="margin: 30px 0 15px; font-family: Georgia, serif; font-size: 18px; font-weight: normal; color: ${BRAND_COLORS.dark}; border-bottom: 1px solid ${BRAND_COLORS.gold}; padding-bottom: 10px;">
      💐 Conseils d'entretien
    </h3>
    
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.8;">
        <li style="margin-bottom: 10px;">Coupez les tiges en biseau tous les 2-3 jours</li>
        <li style="margin-bottom: 10px;">Changez l'eau régulièrement et nettoyez le vase</li>
        <li style="margin-bottom: 10px;">Placez vos fleurs dans un endroit frais, à l'abri du soleil direct</li>
        <li style="margin-bottom: 10px;">Retirez les feuilles qui trempent dans l'eau</li>
        <li>Utilisez la nourriture pour fleurs fournie pour prolonger leur beauté</li>
      </ul>
    </div>
    
    <p style="margin: 30px 0 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6; text-align: center;">
      Merci de votre confiance. À très bientôt pour de nouvelles créations florales !
    </p>
  `;

  return emailWrapper(content, `Votre commande est livrée - Merci !`);
}

// 4. Subscription Welcome
export function subscriptionWelcome(subscription: Subscription): string {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; width: 80px; height: 80px; background-color: ${BRAND_COLORS.cream}; border-radius: 50%; line-height: 80px; font-size: 40px; margin-bottom: 20px;">
        💐
      </div>
      <h2 style="margin: 0 0 10px; font-family: Georgia, serif; font-size: 26px; font-weight: normal; color: ${BRAND_COLORS.dark};">
        Bienvenue dans notre famille florale !
      </h2>
      <p style="margin: 0; font-size: 15px; color: ${BRAND_COLORS.textSecondary};">
        Votre abonnement est actif
      </p>
    </div>
    
    <p style="margin: 0 0 30px; font-size: 15px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6; text-align: center;">
      Merci d'avoir choisi de recevoir nos créations florales de manière régulière. Nous sommes ravis de vous accompagner avec nos plus beaux bouquets !
    </p>
    
    <div style="background-color: ${BRAND_COLORS.cream}; padding: 30px; border-radius: 6px; margin-bottom: 30px;">
      <h3 style="margin: 0 0 20px; font-family: Georgia, serif; font-size: 20px; font-weight: normal; color: ${BRAND_COLORS.dark}; text-align: center;">
        Détails de votre abonnement
      </h3>
      
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary};">
              Formule
            </p>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; text-align: right;">
            <p style="margin: 0; font-size: 15px; color: ${BRAND_COLORS.dark}; font-weight: 600;">
              ${subscription.planName}
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary};">
              Fréquence
            </p>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; text-align: right;">
            <p style="margin: 0; font-size: 15px; color: ${BRAND_COLORS.dark}; font-weight: 600;">
              ${subscription.frequency}
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary};">
              Prix
            </p>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; text-align: right;">
            <p style="margin: 0; font-size: 15px; color: ${BRAND_COLORS.dark}; font-weight: 600;">
              ${subscription.price.toFixed(2)} €
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0;">
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary};">
              Prochaine livraison
            </p>
          </td>
          <td style="padding: 12px 0; text-align: right;">
            <p style="margin: 0; font-size: 15px; color: ${BRAND_COLORS.gold}; font-weight: 600;">
              ${subscription.nextDeliveryDate}
            </p>
          </td>
        </tr>
      </table>
    </div>
    
    <h3 style="margin: 30px 0 15px; font-family: Georgia, serif; font-size: 18px; font-weight: normal; color: ${BRAND_COLORS.dark}; border-bottom: 1px solid ${BRAND_COLORS.gold}; padding-bottom: 10px;">
      À quoi s'attendre ?
    </h3>
    
    <div style="margin-bottom: 30px;">
      <div style="margin-bottom: 20px;">
        <p style="margin: 0 0 5px; font-size: 15px; color: ${BRAND_COLORS.dark}; font-weight: 600;">
          🌹 Des fleurs fraîches et de saison
        </p>
        <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6;">
          Chaque bouquet est composé avec des fleurs de la plus haute qualité, sélectionnées selon la saison.
        </p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <p style="margin: 0 0 5px; font-size: 15px; color: ${BRAND_COLORS.dark}; font-weight: 600;">
          📦 Livraison soignée
        </p>
        <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6;">
          Vos fleurs arrivent dans un emballage protecteur pour garantir leur fraîcheur.
        </p>
      </div>
      
      <div>
        <p style="margin: 0 0 5px; font-size: 15px; color: ${BRAND_COLORS.dark}; font-weight: 600;">
          ✉️ Notification avant chaque envoi
        </p>
        <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6;">
          Vous recevrez un email quelques jours avant chaque livraison.
        </p>
      </div>
    </div>
    
    ${subscription.manageUrl ? `
    <div style="text-align: center; margin-top: 35px;">
      <a href="${subscription.manageUrl}" style="display: inline-block; padding: 14px 32px; background-color: ${BRAND_COLORS.gold}; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 15px; font-weight: 600;">
        Gérer mon abonnement
      </a>
    </div>
    ` : ''}
  `;

  return emailWrapper(content, `Bienvenue dans votre abonnement floral !`);
}

// 5. Subscription Renewal
export function subscriptionRenewal(subscription: Subscription): string {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; width: 80px; height: 80px; background-color: ${BRAND_COLORS.cream}; border-radius: 50%; line-height: 80px; font-size: 40px; margin-bottom: 20px;">
        ✅
      </div>
      <h2 style="margin: 0 0 10px; font-family: Georgia, serif; font-size: 26px; font-weight: normal; color: ${BRAND_COLORS.dark};">
        Votre abonnement a été renouvelé
      </h2>
      <p style="margin: 0; font-size: 15px; color: ${BRAND_COLORS.textSecondary};">
        ${subscription.planName}
      </p>
    </div>
    
    <p style="margin: 0 0 30px; font-size: 15px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6; text-align: center;">
      Merci de votre fidélité ! Votre paiement a été confirmé et nous préparons déjà votre prochain bouquet.
    </p>
    
    <div style="background-color: ${BRAND_COLORS.cream}; padding: 25px; border-radius: 6px; margin-bottom: 30px; text-align: center;">
      <p style="margin: 0 0 10px; font-size: 13px; color: ${BRAND_COLORS.textSecondary}; text-transform: uppercase; letter-spacing: 1px;">
        Prochaine livraison
      </p>
      <p style="margin: 0 0 5px; font-size: 24px; color: ${BRAND_COLORS.dark}; font-family: Georgia, serif; font-weight: 600;">
        ${subscription.nextDeliveryDate}
      </p>
    </div>
    
    <div style="background-color: #f9f9f9; border-left: 3px solid ${BRAND_COLORS.gold}; padding: 20px; margin-bottom: 30px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding: 8px 0;">
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary};">
              Montant prélevé
            </p>
          </td>
          <td style="padding: 8px 0; text-align: right;">
            <p style="margin: 0; font-size: 16px; color: ${BRAND_COLORS.dark}; font-weight: 600;">
              ${subscription.price.toFixed(2)} €
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0;">
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary};">
              Fréquence
            </p>
          </td>
          <td style="padding: 8px 0; text-align: right;">
            <p style="margin: 0; font-size: 15px; color: ${BRAND_COLORS.dark};">
              ${subscription.frequency}
            </p>
          </td>
        </tr>
      </table>
    </div>
    
    <p style="margin: 0 0 30px; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6; text-align: center;">
      Vous pouvez modifier ou annuler votre abonnement à tout moment depuis votre espace client.
    </p>
    
    ${subscription.manageUrl ? `
    <div style="text-align: center;">
      <a href="${subscription.manageUrl}" style="display: inline-block; padding: 14px 32px; background-color: ${BRAND_COLORS.gold}; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 15px; font-weight: 600;">
        Gérer mon abonnement
      </a>
    </div>
    ` : ''}
    
    <p style="margin: 30px 0 0; font-size: 13px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6; text-align: center; font-style: italic;">
      Merci de faire partie de notre communauté florale ! 🌸
    </p>
  `;

  return emailWrapper(content, `Renouvellement de votre abonnement confirmé`);
}

// 6. Password Reset
export function passwordReset(resetUrl: string): string {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; width: 80px; height: 80px; background-color: ${BRAND_COLORS.cream}; border-radius: 50%; line-height: 80px; font-size: 40px; margin-bottom: 20px;">
        🔐
      </div>
      <h2 style="margin: 0 0 10px; font-family: Georgia, serif; font-size: 26px; font-weight: normal; color: ${BRAND_COLORS.dark};">
        Réinitialisation de mot de passe
      </h2>
    </div>
    
    <p style="margin: 0 0 30px; font-size: 15px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6;">
      Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe.
    </p>
    
    <div style="text-align: center; margin: 35px 0;">
      <a href="${resetUrl}" style="display: inline-block; padding: 16px 40px; background-color: ${BRAND_COLORS.gold}; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px; font-weight: 600;">
        Réinitialiser mon mot de passe
      </a>
    </div>
    
    <div style="background-color: #fff8e6; border: 1px solid ${BRAND_COLORS.gold}; padding: 20px; border-radius: 6px; margin: 30px 0;">
      <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.dark}; line-height: 1.6;">
        <strong>⚠️ Important :</strong> Ce lien est valable pendant <strong>1 heure</strong> uniquement.
      </p>
    </div>
    
    <p style="margin: 30px 0 20px; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6;">
      Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :
    </p>
    
    <div style="background-color: ${BRAND_COLORS.cream}; padding: 15px; border-radius: 4px; word-break: break-all; margin-bottom: 30px;">
      <p style="margin: 0; font-size: 13px; color: ${BRAND_COLORS.textSecondary}; font-family: monospace;">
        ${resetUrl}
      </p>
    </div>
    
    <div style="background-color: #f9f9f9; border-left: 3px solid #e74c3c; padding: 15px 20px; margin-top: 30px;">
      <p style="margin: 0; font-size: 13px; color: ${BRAND_COLORS.dark}; line-height: 1.6;">
        <strong>🛡️ Sécurité :</strong> Si vous n'avez pas demandé cette réinitialisation, ignorez cet email. Votre mot de passe actuel reste inchangé.
      </p>
    </div>
  `;

  return emailWrapper(content, `Réinitialisez votre mot de passe`);
}

// 7. Welcome Email
export function welcomeEmail(user: User): string {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; width: 80px; height: 80px; background-color: ${BRAND_COLORS.cream}; border-radius: 50%; line-height: 80px; font-size: 40px; margin-bottom: 20px;">
        🌷
      </div>
      <h2 style="margin: 0 0 10px; font-family: Georgia, serif; font-size: 28px; font-weight: normal; color: ${BRAND_COLORS.dark};">
        Bienvenue ${user.name} !
      </h2>
      <p style="margin: 0; font-size: 15px; color: ${BRAND_COLORS.textSecondary};">
        Nous sommes ravis de vous accueillir
      </p>
    </div>
    
    <p style="margin: 0 0 30px; font-size: 15px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.8; text-align: center;">
      Merci d'avoir créé votre compte chez Anne Freret Fleuriste. Nous sommes une maison artisanale dédiée à l'art floral depuis trois générations, et nous mettons tout notre savoir-faire au service de vos émotions.
    </p>
    
    <div style="background-color: ${BRAND_COLORS.cream}; padding: 30px; border-radius: 6px; margin-bottom: 30px; text-align: center; border: 2px dashed ${BRAND_COLORS.gold};">
      <p style="margin: 0 0 15px; font-size: 16px; color: ${BRAND_COLORS.dark}; font-weight: 600;">
        🎁 Cadeau de bienvenue
      </p>
      <p style="margin: 0 0 20px; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6;">
        Pour votre première commande, bénéficiez de<br>
        <strong style="font-size: 24px; color: ${BRAND_COLORS.gold}; font-family: Georgia, serif;">10% de réduction</strong>
      </p>
      <div style="background-color: #ffffff; padding: 15px; border-radius: 4px; display: inline-block;">
        <p style="margin: 0; font-size: 20px; color: ${BRAND_COLORS.dark}; font-family: monospace; font-weight: 600; letter-spacing: 2px;">
          BIENVENUE10
        </p>
      </div>
      <p style="margin: 15px 0 0; font-size: 12px; color: ${BRAND_COLORS.textSecondary};">
        Code valable 30 jours sur votre première commande
      </p>
    </div>
    
    <h3 style="margin: 30px 0 20px; font-family: Georgia, serif; font-size: 20px; font-weight: normal; color: ${BRAND_COLORS.dark}; text-align: center; border-bottom: 1px solid ${BRAND_COLORS.gold}; padding-bottom: 15px;">
      Découvrez nos créations
    </h3>
    
    <div style="margin-bottom: 20px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding: 15px; background-color: #f9f9f9; border-radius: 6px; margin-bottom: 15px;">
            <p style="margin: 0 0 5px; font-size: 16px; color: ${BRAND_COLORS.dark}; font-weight: 600;">
              💐 Bouquets sur mesure
            </p>
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6;">
              Compositions personnalisées selon vos goûts et l'occasion
            </p>
          </td>
        </tr>
      </table>
    </div>
    
    <div style="margin-bottom: 20px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding: 15px; background-color: #f9f9f9; border-radius: 6px;">
            <p style="margin: 0 0 5px; font-size: 16px; color: ${BRAND_COLORS.dark}; font-weight: 600;">
              📦 Abonnements floraux
            </p>
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6;">
              Recevez régulièrement nos plus belles créations chez vous
            </p>
          </td>
        </tr>
      </table>
    </div>
    
    <div style="margin-bottom: 30px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding: 15px; background-color: #f9f9f9; border-radius: 6px;">
            <p style="margin: 0 0 5px; font-size: 16px; color: ${BRAND_COLORS.dark}; font-weight: 600;">
              🎉 Événements spéciaux
            </p>
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6;">
              Mariages, baptêmes, événements d'entreprise... Nous créons la magie
            </p>
          </td>
        </tr>
      </table>
    </div>
    
    <div style="text-align: center; margin-top: 35px;">
      <a href="${SITE_URL}" style="display: inline-block; padding: 16px 40px; background-color: ${BRAND_COLORS.gold}; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px; font-weight: 600;">
        Découvrir la boutique
      </a>
    </div>
    
    <p style="margin: 35px 0 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6; text-align: center; font-style: italic;">
      Au plaisir de créer pour vous,<br>
      <strong style="color: ${BRAND_COLORS.dark}; font-style: normal;">L'équipe Anne Freret</strong>
    </p>
  `;

  return emailWrapper(content, `Bienvenue chez Anne Freret Fleuriste !`);
}

// 8. Review Request
export function reviewRequest(order: Order): string {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; width: 80px; height: 80px; background-color: ${BRAND_COLORS.cream}; border-radius: 50%; line-height: 80px; font-size: 40px; margin-bottom: 20px;">
        ⭐
      </div>
      <h2 style="margin: 0 0 10px; font-family: Georgia, serif; font-size: 26px; font-weight: normal; color: ${BRAND_COLORS.dark};">
        Comment avez-vous trouvé votre bouquet ?
      </h2>
      <p style="margin: 0; font-size: 15px; color: ${BRAND_COLORS.textSecondary};">
        Commande nº ${order.orderNumber}
      </p>
    </div>
    
    <p style="margin: 0 0 30px; font-size: 15px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6; text-align: center;">
      Nous espérons que nos fleurs vous ont apporté de la joie ! Votre avis compte énormément pour nous et aide d'autres clients à découvrir nos créations.
    </p>
    
    <div style="background-color: ${BRAND_COLORS.cream}; padding: 35px; border-radius: 6px; margin-bottom: 30px; text-align: center;">
      <p style="margin: 0 0 20px; font-size: 16px; color: ${BRAND_COLORS.dark};">
        Notez votre expérience
      </p>
      
      <div style="margin-bottom: 25px; font-size: 36px; letter-spacing: 10px;">
        ⭐⭐⭐⭐⭐
      </div>
      
      <a href="${SITE_URL}/review/${order.id}" style="display: inline-block; padding: 16px 40px; background-color: ${BRAND_COLORS.gold}; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px; font-weight: 600;">
        Laisser mon avis
      </a>
    </div>
    
    <div style="background-color: #f9f9f9; padding: 25px; border-radius: 6px; margin-bottom: 30px;">
      <h3 style="margin: 0 0 15px; font-family: Georgia, serif; font-size: 18px; font-weight: normal; color: ${BRAND_COLORS.dark};">
        Pourquoi votre avis est important ?
      </h3>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.8;">
        <li style="margin-bottom: 8px;">Il guide d'autres passionnés de fleurs dans leur choix</li>
        <li style="margin-bottom: 8px;">Il nous aide à améliorer continuellement nos services</li>
        <li>Il soutient notre petite entreprise familiale</li>
      </ul>
    </div>
    
    <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6; text-align: center;">
      Cela ne prendra que 2 minutes et fera une énorme différence pour nous ! 🙏
    </p>
    
    <p style="margin: 30px 0 0; font-size: 14px; color: ${BRAND_COLORS.textSecondary}; line-height: 1.6; text-align: center; font-style: italic;">
      Merci infiniment pour votre confiance,<br>
      <strong style="color: ${BRAND_COLORS.dark}; font-style: normal;">Anne & toute l'équipe</strong>
    </p>
  `;

  return emailWrapper(content, `Votre avis nous intéresse ! 🌸`);
}
