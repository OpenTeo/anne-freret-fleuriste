import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { createParcel } from '@/lib/sendcloud';
import { supabase } from '@/lib/supabase';
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

  // Parser les articles depuis metadata (format JSON attendu dans order_items_json)
  let orderItems: Array<{ name: string; size: string; image?: string; quantity: number; price: number }> = [];
  try {
    if (meta.order_items_json) {
      orderItems = JSON.parse(meta.order_items_json);
    }
  } catch (err) {
    console.error('Erreur parsing order_items_json:', err);
  }

  // Parser l'adresse (format: "123 rue Example, 75001 Paris")
  const addressParts = (meta.delivery_address || '').split(', ');
  const streetAddress = addressParts[0] || '';
  const cityParts = addressParts[1]?.split(' ') || [];
  const postalCode = cityParts[0] || '';
  const city = cityParts.slice(1).join(' ') || '';

  try {
    // 1. Insérer la commande dans Supabase
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        stripe_session_id: session.id,
        customer_name: meta.customer_name || 'Client',
        customer_email: email,
        customer_phone: meta.customer_phone || null,
        delivery_address: streetAddress,
        delivery_city: city,
        delivery_postal_code: postalCode,
        delivery_mode: meta.delivery_mode || 'local',
        delivery_date: meta.delivery_date || null,
        card_message: meta.card_message || null,
        total_amount: parseFloat(amount),
        status: 'confirmed',
      })
      .select()
      .single();

    if (orderError) {
      console.error('Erreur insertion commande:', orderError);
      throw orderError;
    }

    // 2. Insérer les articles
    if (orderItems.length > 0 && order) {
      const itemsToInsert = orderItems.map((item) => ({
        order_id: order.id,
        product_name: `${item.name} (${item.size})`,
        product_image: item.image || null,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.quantity * item.price,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(itemsToInsert);

      if (itemsError) {
        console.error('Erreur insertion articles:', itemsError);
      }
    }

    console.log(`✅ Commande ${orderNumber} sauvegardée dans Supabase`);
  } catch (err) {
    console.error('Erreur sauvegarde commande:', err);
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
