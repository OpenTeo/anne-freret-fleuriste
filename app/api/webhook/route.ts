import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { createParcel } from '@/lib/sendcloud';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Config webhook manquante' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleOrderCompleted(session);
  }

  return NextResponse.json({ received: true });
}

async function handleOrderCompleted(session: Stripe.Checkout.Session) {
  const meta = session.metadata || {};
  const email = session.customer_email;
  const amount = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00';

  if (!email) return;

  const deliveryDate = meta.delivery_date
    ? new Date(meta.delivery_date + 'T12:00:00').toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    : 'À confirmer';

  const deliveryModeLabel =
    meta.delivery_mode === 'local' ? '🌸 Livraison locale (à la main)' :
    meta.delivery_mode === 'colissimo' ? '📦 Colissimo (48h)' :
    meta.delivery_mode === 'chronopost' ? '⚡ Chronopost Express (24h)' :
    'Livraison';

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Merci pour votre commande ! 🌿 — Anne Freret Fleuriste`,
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
              <h2 style="font-size:18px;color:#2d2a26;margin:0 0 8px;">Merci ${meta.customer_name || ''} !</h2>
              <p style="font-size:14px;color:#2d2a26;opacity:0.7;margin:0 0 24px;line-height:1.6;">
                Votre commande a bien été enregistrée. Nous préparons vos créations florales avec soin.
              </p>

              <div style="border-top:1px solid #e8e0d8;padding-top:20px;margin-top:20px;">
                <table style="width:100%;font-size:14px;color:#2d2a26;">
                  <tr>
                    <td style="padding:8px 0;color:#2d2a26;opacity:0.5;">Articles</td>
                    <td style="padding:8px 0;text-align:right;">${meta.order_items || '—'}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#2d2a26;opacity:0.5;">Livraison</td>
                    <td style="padding:8px 0;text-align:right;">${deliveryModeLabel}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#2d2a26;opacity:0.5;">Date prévue</td>
                    <td style="padding:8px 0;text-align:right;">${deliveryDate}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#2d2a26;opacity:0.5;">Adresse</td>
                    <td style="padding:8px 0;text-align:right;">${meta.delivery_address || '—'}</td>
                  </tr>
                  ${meta.card_message ? `
                  <tr>
                    <td style="padding:8px 0;color:#2d2a26;opacity:0.5;">Message carte</td>
                    <td style="padding:8px 0;text-align:right;font-style:italic;">"${meta.card_message}"</td>
                  </tr>` : ''}
                </table>
              </div>

              <div style="border-top:1px solid #e8e0d8;padding-top:16px;margin-top:16px;text-align:right;">
                <span style="font-size:12px;color:#2d2a26;opacity:0.5;text-transform:uppercase;letter-spacing:1px;">Total</span>
                <span style="font-size:24px;color:#2d2a26;margin-left:12px;">${amount} €</span>
              </div>
            </div>

            <div style="text-align:center;margin-top:24px;">
              <p style="font-size:12px;color:#2d2a26;opacity:0.4;line-height:1.6;">
                Une question ? Répondez directement à cet email ou appelez-nous.<br>
                Anne Freret Fleuriste · Barneville-Carteret, Normandie
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log(`✅ Email de confirmation envoyé à ${email}`);
  } catch (err) {
    console.error('Erreur envoi email:', err);
  }

  // Créer le colis SendCloud pour livraisons nationales
  if (meta.delivery_mode === 'colissimo' || meta.delivery_mode === 'chronopost') {
    try {
      const addressParts = (meta.delivery_address || '').split(', ');
      const cityParts = addressParts[1]?.split(' ') || [];

      const parcel = await createParcel({
        name: meta.customer_name || '',
        address: addressParts[0] || '',
        city: cityParts.slice(1).join(' ') || '',
        postalCode: cityParts[0] || '',
        country: 'FR',
        email,
        phone: '',
        orderNumber: session.id.slice(-8).toUpperCase(),
        weight: 1.5,
        shipmentMethod: 8, // À ajuster selon les méthodes disponibles
      });
      console.log(`📦 Colis SendCloud créé: ${parcel.tracking_number}`);
    } catch (err) {
      console.error('Erreur création colis SendCloud:', err);
    }
  }
}
