import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { createParcel } from '@/lib/sendcloud';
import { sql } from '@/lib/db';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Config webhook manquante' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
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

  // Générer order_number unique
  const orderNumber = `AF${Date.now().toString().slice(-8)}`.toUpperCase();

  console.log(`📦 Nouvelle commande webhook: ${orderNumber} | Email: ${email} | Montant: ${amount}€`);

  // Parser l'adresse (format: "123 rue Example, 75001 Paris")
  const addressParts = (meta.delivery_address || '').split(', ');
  const streetAddress = addressParts[0] || '';
  const cityParts = addressParts[1]?.split(' ') || [];
  const postalCode = cityParts[0] || '';
  const city = cityParts.slice(1).join(' ') || '';

  // Parser les articles depuis metadata (format JSON attendu dans order_items_json)
  let orderItems: Array<{ name: string; size: string; image?: string; quantity: number; price: number }> = [];
  try {
    if (meta.order_items_json) {
      orderItems = JSON.parse(meta.order_items_json);
    }
  } catch (err) {
    console.error('Erreur parsing order_items_json:', err);
  }

  // Chercher si un compte utilisateur existe avec cet email
  let userId: string | null = null;
  try {
    const userResult = await sql`
      SELECT id FROM users WHERE email = ${email.toLowerCase()}
    `;
    if (userResult.rows.length > 0) {
      userId = userResult.rows[0].id;
    }
  } catch (err) {
    console.error('Erreur recherche user:', err);
  }

  // Sauvegarder la commande en base de données
  try {
    console.log(`💾 Sauvegarde commande ${orderNumber} en base de données...`);
    
    const orderResult = await sql`
      INSERT INTO orders (
        order_number, 
        user_id,
        stripe_session_id,
        customer_email, 
        customer_name, 
        customer_phone,
        delivery_address, 
        delivery_city, 
        delivery_postal_code,
        delivery_mode, 
        delivery_date, 
        card_message,
        total_amount, 
        status
      )
      VALUES (
        ${orderNumber},
        ${userId},
        ${session.id},
        ${email.toLowerCase()},
        ${meta.customer_name || 'Client'},
        ${meta.customer_phone || null},
        ${streetAddress},
        ${city},
        ${postalCode},
        ${meta.delivery_mode || 'local'},
        ${meta.delivery_date || null},
        ${meta.card_message || null},
        ${parseFloat(amount)},
        'confirmed'
      )
      RETURNING id
    `;

    const orderId = orderResult.rows[0].id;

    // Sauvegarder les articles
    if (orderItems.length > 0) {
      for (const item of orderItems) {
        await sql`
          INSERT INTO order_items (
            order_id,
            product_name,
            product_image,
            quantity,
            unit_price,
            total_price
          )
          VALUES (
            ${orderId},
            ${`${item.name} (${item.size})`},
            ${item.image || null},
            ${item.quantity},
            ${item.price},
            ${item.quantity * item.price}
          )
        `;
      }
    }

    console.log(`✅ Commande ${orderNumber} sauvegardée avec succès (ID: ${orderId})`);

  } catch (err) {
    console.error('❌ Erreur sauvegarde commande en BDD:', err);
  }

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

  console.log(`📧 Tentative envoi email à ${email} depuis ${FROM_EMAIL}`);
  
  try {
    const emailResult = await resend.emails.send({
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
    console.log(`✅ Email de confirmation envoyé à ${email}`, emailResult);
  } catch (err) {
    console.error('❌ Erreur envoi email:', err instanceof Error ? err.message : err);
  }

  // Créer le colis SendCloud pour livraisons nationales
  if (meta.delivery_mode === 'colissimo' || meta.delivery_mode === 'chronopost') {
    console.log(`📦 Tentative création colis SendCloud pour ${meta.customer_name} (mode: ${meta.delivery_mode})`);
    
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
      console.log(`✅ Colis SendCloud créé: ${parcel.tracking_number}`);
    } catch (err) {
      console.error('❌ Erreur création colis SendCloud:', err instanceof Error ? err.message : err);
    }
  } else {
    console.log(`ℹ️ Livraison locale (pas de colis SendCloud nécessaire)`);
  }
}
