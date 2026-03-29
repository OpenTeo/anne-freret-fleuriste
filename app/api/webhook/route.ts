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

  // Gestion des events
  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Vérifier si c'est une commande one-time ou un abonnement
      if (session.mode === 'subscription') {
        await handleSubscriptionCheckout(session);
      } else {
        await handleOrderCompleted(session);
      }
    } 
    else if (event.type === 'customer.subscription.created') {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionCreated(subscription);
    }
    else if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionUpdated(subscription);
    }
    else if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionCancelled(subscription);
    }
    else if (event.type === 'invoice.paid') {
      const invoice = event.data.object as Stripe.Invoice;
      // Créer une commande automatique pour chaque paiement d'abonnement
      if (invoice.subscription) {
        await handleSubscriptionInvoicePaid(invoice);
      }
    }
    else if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.subscription) {
        await handleSubscriptionPaymentFailed(invoice);
      }
    }
  } catch (error) {
    console.error('❌ Erreur traitement webhook:', error);
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

// ==================== GESTION ABONNEMENTS STRIPE ====================

async function handleSubscriptionCheckout(session: Stripe.Checkout.Session) {
  console.log('🔄 Checkout abonnement complété:', session.id);
  // L'abonnement sera créé automatiquement par Stripe
  // On le recevra via customer.subscription.created
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const meta = subscription.metadata || {};
  const customerId = subscription.customer as string;
  
  console.log(`✨ Nouvel abonnement Stripe créé: ${subscription.id}`);
  
  try {
    // Récupérer le customer pour avoir l'email
    const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
    const email = customer.email;
    
    if (!email) {
      console.error('❌ Pas d\'email pour le customer');
      return;
    }
    
    // Chercher l'utilisateur
    const userResult = await sql`
      SELECT id FROM users WHERE email = ${email.toLowerCase()}
    `;
    
    let userId = null;
    if (userResult.rows.length > 0) {
      userId = userResult.rows[0].id;
    }
    
    if (!userId) {
      console.error('❌ Utilisateur introuvable pour email:', email);
      return;
    }
    
    const formula = meta.formula || 'signature';
    const frequency = meta.frequency || 'monthly';
    const price = subscription.items.data[0]?.price.unit_amount 
      ? (subscription.items.data[0].price.unit_amount / 100).toFixed(2)
      : '0.00';
    
    // Calculer la prochaine livraison avec notre fonction SQL
    const nextDeliveryResult = await sql`
      SELECT calculate_next_delivery_smart(${frequency}, CURRENT_DATE) as next_delivery
    `;
    const nextDeliveryDate = nextDeliveryResult.rows[0]?.next_delivery;
    
    // Créer l'abonnement en BDD
    await sql`
      INSERT INTO subscriptions (
        user_id,
        formula,
        status,
        frequency,
        price,
        next_delivery_date,
        start_date,
        stripe_subscription_id,
        stripe_customer_id,
        stripe_price_id
      ) VALUES (
        ${userId},
        ${formula},
        'active',
        ${frequency},
        ${price},
        ${nextDeliveryDate},
        CURRENT_DATE,
        ${subscription.id},
        ${customerId},
        ${subscription.items.data[0]?.price.id || null}
      )
    `;
    
    console.log(`✅ Abonnement créé en BDD pour user ${userId}`);
  } catch (error) {
    console.error('❌ Erreur création abonnement en BDD:', error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log(`🔄 Abonnement mis à jour: ${subscription.id}`);
  
  try {
    // Mettre à jour le statut dans notre BDD
    let status = 'active';
    if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
      status = 'cancelled';
    } else if (subscription.pause_collection?.behavior === 'void') {
      status = 'paused';
    }
    
    await sql`
      UPDATE subscriptions
      SET status = ${status}, updated_at = CURRENT_TIMESTAMP
      WHERE stripe_subscription_id = ${subscription.id}
    `;
    
    console.log(`✅ Statut abonnement mis à jour: ${status}`);
  } catch (error) {
    console.error('❌ Erreur mise à jour abonnement:', error);
  }
}

async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  console.log(`❌ Abonnement annulé: ${subscription.id}`);
  
  try {
    await sql`
      UPDATE subscriptions
      SET status = 'cancelled', cancelled_at = CURRENT_TIMESTAMP
      WHERE stripe_subscription_id = ${subscription.id}
    `;
    
    console.log(`✅ Abonnement marqué comme annulé en BDD`);
  } catch (error) {
    console.error('❌ Erreur annulation abonnement:', error);
  }
}

async function handleSubscriptionInvoicePaid(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;
  const email = invoice.customer_email;
  
  console.log(`💳 Invoice payée pour abonnement ${subscriptionId}`);
  
  if (!email) return;
  
  try {
    // Récupérer l'abonnement en BDD
    const subResult = await sql`
      SELECT s.*, u.first_name, u.last_name, u.address, u.city, u.postal_code, u.phone
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      WHERE s.stripe_subscription_id = ${subscriptionId}
    `;
    
    if (subResult.rows.length === 0) {
      console.log('ℹ️ Abonnement non trouvé en BDD (peut-être premier paiement)');
      return;
    }
    
    const sub = subResult.rows[0];
    
    // Générer un numéro de commande
    const orderNumber = `AF-SUB-${Date.now().toString().slice(-8)}`.toUpperCase();
    
    // Créer la commande récurrente
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
        total_amount,
        status
      ) VALUES (
        ${orderNumber},
        ${sub.user_id},
        ${invoice.id},
        ${email},
        ${sub.first_name + ' ' + sub.last_name},
        ${sub.phone || ''},
        ${sub.address || ''},
        ${sub.city || ''},
        ${sub.postal_code || ''},
        'local',
        ${sub.next_delivery_date},
        ${sub.price},
        'confirmed'
      )
      RETURNING id
    `;
    
    const orderId = orderResult.rows[0].id;
    
    // Ajouter l'article (bouquet d'abonnement)
    await sql`
      INSERT INTO order_items (
        order_id,
        product_name,
        quantity,
        unit_price,
        total_price
      ) VALUES (
        ${orderId},
        ${`Abonnement ${sub.formula.charAt(0).toUpperCase() + sub.formula.slice(1)} - ${sub.frequency === 'weekly' ? 'Hebdomadaire' : sub.frequency === 'biweekly' ? 'Bi-mensuel' : 'Mensuel'}`},
        1,
        ${sub.price},
        ${sub.price}
      )
    `;
    
    // Calculer la prochaine livraison
    const nextResult = await sql`
      SELECT calculate_next_delivery_smart(${sub.frequency}, ${sub.next_delivery_date}::DATE) as next_delivery
    `;
    const nextDate = nextResult.rows[0]?.next_delivery;
    
    // Mettre à jour l'abonnement avec la nouvelle date
    await sql`
      UPDATE subscriptions
      SET next_delivery_date = ${nextDate}
      WHERE id = ${sub.id}
    `;
    
    console.log(`✅ Commande abonnement ${orderNumber} créée, prochaine livraison: ${nextDate}`);
    
    // TODO: Envoyer email de confirmation (optionnel)
    
  } catch (error) {
    console.error('❌ Erreur création commande abonnement:', error);
  }
}

async function handleSubscriptionPaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;
  const email = invoice.customer_email;
  
  console.log(`⚠️ Échec paiement pour abonnement ${subscriptionId}`);
  
  if (!email) return;
  
  try {
    // Récupérer l'abonnement en BDD
    const subResult = await sql`
      SELECT s.*, u.first_name
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      WHERE s.stripe_subscription_id = ${subscriptionId}
    `;
    
    if (subResult.rows.length === 0) {
      console.log('ℹ️ Abonnement non trouvé en BDD');
      return;
    }
    
    const sub = subResult.rows[0];
    const amount = invoice.amount_due ? (invoice.amount_due / 100).toFixed(2) : '0.00';
    
    // Envoyer un email d'alerte au client
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: '⚠️ Échec de paiement — Anne Freret Fleuriste',
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
                <h2 style="font-size:18px;color:#d9534f;margin:0 0 8px;">⚠️ Problème de paiement</h2>
                <p style="font-size:14px;color:#2d2a26;opacity:0.7;margin:0 0 24px;line-height:1.6;">
                  Bonjour ${sub.first_name || ''},
                  <br><br>
                  Nous n'avons pas pu débiter votre carte pour votre abonnement fleurs.
                  <br>
                  Montant : <strong>${amount}€</strong>
                </p>

                <div style="background:#fef5f5;padding:16px;border-left:4px solid #d9534f;margin-bottom:24px;">
                  <p style="font-size:13px;color:#2d2a26;margin:0;line-height:1.5;">
                    <strong>Action requise :</strong> Veuillez mettre à jour votre moyen de paiement depuis votre compte pour continuer à recevoir vos fleurs.
                  </p>
                </div>

                <div style="text-align:center;margin-top:24px;">
                  <a href="${(process.env.NEXT_PUBLIC_SITE_URL || '').trim()}/compte" style="display:inline-block;background:#b8935a;color:white;padding:12px 32px;text-decoration:none;border-radius:4px;">
                    Mettre à jour ma carte
                  </a>
                </div>
              </div>

              <div style="text-align:center;margin-top:24px;">
                <p style="font-size:12px;color:#2d2a26;opacity:0.4;line-height:1.6;">
                  Une question ? Répondez directement à cet email.<br>
                  Anne Freret Fleuriste · Barneville-Carteret, Normandie
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
      console.log(`✅ Email d'alerte échec paiement envoyé à ${email}`);
    } catch (err) {
      console.error('❌ Erreur envoi email échec paiement:', err);
    }
    
    // Marquer l'abonnement comme "unpaid" dans notre BDD
    await sql`
      UPDATE subscriptions
      SET status = 'unpaid', updated_at = CURRENT_TIMESTAMP
      WHERE stripe_subscription_id = ${subscriptionId}
    `;
    
    console.log(`✅ Abonnement marqué comme 'unpaid'`);
    
  } catch (error) {
    console.error('❌ Erreur gestion échec paiement:', error);
  }
}
