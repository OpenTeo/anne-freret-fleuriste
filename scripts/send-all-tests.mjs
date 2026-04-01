import { Resend } from 'resend';

const resend = new Resend('re_X4Kwi2M2_PnkcgjFBvnLUdaycmfh6BuVv');
const TO = 'teo.ledanois@orange.fr';
const FROM = 'Anne Freret Fleuriste <commandes@fleuriste-annefreret.com>';

const templates = [
  {
    subject: '✅ Confirmation de commande #AF-2026-001',
    label: 'Confirmation commande',
  },
  {
    subject: '🚚 Votre bouquet est en route !',
    label: 'Expédition',
  },
  {
    subject: '🌸 Votre commande a été livrée',
    label: 'Livraison confirmée',
  },
  {
    subject: '💐 Bienvenue dans votre abonnement floral',
    label: 'Bienvenue abo',
  },
  {
    subject: '🔐 Réinitialisation de votre mot de passe',
    label: 'Reset password',
  },
  {
    subject: '🌷 Bienvenue chez Anne Freret Fleuriste',
    label: 'Bienvenue client',
  },
  {
    subject: '⭐ Comment avez-vous trouvé votre bouquet ?',
    label: 'Demande avis',
  },
];

async function send() {
  // Just send the test endpoint email
  const resp = await fetch('https://anne-freret-fleuriste.vercel.app/api/email/test?key=AnneFreret2026!&to=' + encodeURIComponent(TO));
  const data = await resp.json();
  console.log('Test endpoint:', data);
}

send();
