import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { createParcel } from '@/lib/sendcloud';
import { sql } from '@/lib/db';
import Stripe from 'stripe';

import { escapeHtml } from '@/lib/sanitize';

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

  // Parser les articles depuis metadata OU depuis line_items Stripe (fallback)
  let orderItems: Array<{ name: string; size: string; image?: string; quantity: number; price: number }> = [];
  try {
    if (meta.order_items_json) {
      orderItems = JSON.parse(meta.order_items_json);
    }
  } catch (err) {
    console.error('Erreur parsing order_items_json (peut-être tronqué > 500 chars):', err);
  }

  // Fallback: récupérer depuis Stripe line_items si orderItems est vide
  if (orderItems.length === 0) {
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
      orderItems = lineItems.data
        .filter(item => !item.description?.includes('Livraison') && !item.description?.includes('Carte message'))
        .map(item => {
          const desc = item.description || '';
          const sizeMatch = desc.match(/Taille\s*:\s*([^,]+)/);
          return {
            name: item.description?.split('Taille :')[0]?.trim() || (typeof item.price?.product === 'object' && 'name' in item.price.product ? item.price.product.name : undefined) || 'Produit',
            size: sizeMatch ? sizeMatch[1].trim() : 'Standard',
            quantity: item.quantity || 1,
            price: (item.amount_total || 0) / 100 / (item.quantity || 1),
            image: undefined,
          };
        });
      console.log(`ℹ️ Reconstruit ${orderItems.length} articles depuis Stripe line_items (metadata tronquée)`);
    } catch (lineErr) {
      console.error('Impossible de récupérer line_items depuis Stripe:', lineErr);
    }
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

    // Incrémenter le compteur d'utilisation du code promo
    if (meta.promo_code) {
      try {
        await sql`
          UPDATE promo_codes SET used_count = used_count + 1 WHERE LOWER(code) = LOWER(${meta.promo_code})
        `;
        console.log(`🎟️ Code promo ${meta.promo_code} utilisé, compteur incrémenté`);
      } catch (promoErr) {
        console.error('Erreur incrémentation promo:', promoErr);
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
              <h2 style="font-size:18px;color:#2d2a26;margin:0 0 8px;">Merci ${escapeHtml(meta.customer_name || '')} !</h2>
              <p style="font-size:14px;color:#2d2a26;opacity:0.7;margin:0 0 24px;line-height:1.6;">
                Votre commande a bien été enregistrée. Nous préparons vos créations florales avec soin.
              </p>

              <div style="border-top:1px solid #e8e0d8;padding-top:20px;margin-top:20px;">
                <table style="width:100%;font-size:14px;color:#2d2a26;">
                  <tr>
                    <td style="padding:8px 0;color:#2d2a26;opacity:0.5;">Articles</td>
                    <td style="padding:8px 0;text-align:right;">${escapeHtml(meta.order_items || '—')}</td>
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
                    <td style="padding:8px 0;text-align:right;">${escapeHtml(meta.delivery_address || '—')}</td>
                  </tr>
                  ${meta.card_message ? `
                  <tr>
                    <td style="padding:8px 0;color:#2d2a26;opacity:0.5;">Message carte</td>
                    <td style="padding:8px 0;text-align:right;font-style:italic;">"${escapeHtml(meta.card_message)}"</td>
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
                Anne Freret Fleuriste · Saint-Pair-sur-Mer, Normandie
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
  if (meta.delivery_mode === 'chronopost') {
    console.log(`📦 Tentative création colis SendCloud pour ${meta.customer_name} (mode: chronopost)`);
    
    try {
      const parcel = await createParcel({
        name: meta.customer_name || '',
        address: streetAddress,
        city: city,
        postalCode: postalCode,
        country: 'FR',
        email,
        phone: meta.customer_phone || '',
        orderNumber: orderNumber,
        weight: 1.5,
        // SendCloud shipping method IDs pour France (Chronopost)
        // Chrono 13 0-2kg = 1394, Chrono 13 2-5kg = 1395
        // Chrono 18 0-2kg = 1345, Chrono 18 2-5kg = 1346
        shipmentMethod: 1394, // Chrono 13 0-2kg (bouquets ~1.5kg)
      });
      
      const trackingNumber = parcel.tracking_number || '';
      const trackingUrl = parcel.tracking_url || '';
      const labelUrl = parcel.label?.label_printer || parcel.label?.normal_printer?.[0] || '';
      
      console.log(`✅ Colis SendCloud créé: ${trackingNumber}`);
      
      // Sauvegarder le tracking en DB
      await sql`
        UPDATE orders 
        SET tracking_number = ${trackingNumber},
            tracking_url = ${trackingUrl},
            label_url = ${labelUrl},
            sendcloud_parcel_id = ${parcel.id},
            shipped_at = NOW(),
            status = 'shipped'
        WHERE order_number = ${orderNumber}
      `;
      
      // Envoyer email d'expédition au client
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: `Votre commande est en route ! 🚚 — Anne Freret Fleuriste`,
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
                  <h2 style="font-size:18px;color:#2d2a26;margin:0 0 8px;">Votre commande est en route ! 🚚</h2>
                  <p style="font-size:14px;color:#2d2a26;opacity:0.7;margin:0 0 24px;line-height:1.6;">
                    ${meta.customer_name || ''}, votre colis a été confié au transporteur.
                  </p>
                  <div style="background:#f5f0eb;padding:16px;margin-bottom:20px;">
                    <p style="font-size:13px;color:#2d2a26;margin:0 0 8px;"><strong>N° de suivi :</strong> ${trackingNumber}</p>
                    <p style="font-size:13px;color:#2d2a26;margin:0 0 8px;"><strong>Commande :</strong> ${orderNumber}</p>
                    <p style="font-size:13px;color:#2d2a26;margin:0;"><strong>Mode :</strong> ${meta.delivery_mode === 'chronopost' ? 'Chronopost Express (24h)' : 'Colissimo (48h)'}</p>
                  </div>
                  ${trackingUrl ? `
                  <div style="text-align:center;margin-top:24px;">
                    <a href="${trackingUrl}" style="display:inline-block;background:#b8935a;color:white;padding:12px 32px;text-decoration:none;">Suivre mon colis</a>
                  </div>` : ''}
                </div>
                <div style="text-align:center;margin-top:24px;">
                  <p style="font-size:12px;color:#2d2a26;opacity:0.4;">Anne Freret Fleuriste · Saint-Pair-sur-Mer</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
        console.log(`✅ Email expédition envoyé à ${email}`);
      } catch (emailErr) {
        console.error('❌ Erreur envoi email expédition:', emailErr);
      }
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
    
    // Email de confirmation du renouvellement
    try {
      const formulaLabels: Record<string, string> = {
        essentiel: '🌿 Essentiel',
        signature: '🌸 Signature',
        prestige: '🌹 Prestige'
      };
      const frequencyLabels: Record<string, string> = {
        weekly: 'Hebdomadaire',
        biweekly: 'Bi-mensuel',
        monthly: 'Mensuel'
      };
      const deliveryDate = sub.next_delivery_date
        ? new Date(sub.next_delivery_date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
        : 'prochainement';
      const nextDeliveryFormatted = nextDate
        ? new Date(nextDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
        : '';
      const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();

      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `💐 Votre bouquet ${formulaLabels[sub.formula] || sub.formula} est en préparation !`,
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
                <h2 style="font-size:18px;color:#2d2a26;margin:0 0 8px;">Votre bouquet est en route 🌺</h2>
                <p style="font-size:14px;color:#2d2a26;opacity:0.7;margin:0 0 24px;line-height:1.6;">
                  Bonjour ${escapeHtml(sub.first_name || '')},<br><br>
                  Votre abonnement <strong>${formulaLabels[sub.formula] || sub.formula}</strong> (${frequencyLabels[sub.frequency] || sub.frequency}) a bien été renouvelé.
                </p>

                <table style="width:100%;border-collapse:collapse;font-size:14px;color:#2d2a26;">
                  <tr style="border-bottom:1px solid #e8e0d8;">
                    <td style="padding:12px 0;opacity:0.6;">Commande</td>
                    <td style="padding:12px 0;text-align:right;font-weight:600;">${orderNumber}</td>
                  </tr>
                  <tr style="border-bottom:1px solid #e8e0d8;">
                    <td style="padding:12px 0;opacity:0.6;">Livraison prévue</td>
                    <td style="padding:12px 0;text-align:right;">${deliveryDate}</td>
                  </tr>
                  <tr style="border-bottom:1px solid #e8e0d8;">
                    <td style="padding:12px 0;opacity:0.6;">Montant</td>
                    <td style="padding:12px 0;text-align:right;">${sub.price}€</td>
                  </tr>
                  ${nextDeliveryFormatted ? `
                  <tr>
                    <td style="padding:12px 0;opacity:0.6;">Prochain renouvellement</td>
                    <td style="padding:12px 0;text-align:right;">${nextDeliveryFormatted}</td>
                  </tr>` : ''}
                </table>

                <div style="text-align:center;margin-top:24px;">
                  <a href="${siteUrl}/compte/mes-abonnements" style="display:inline-block;background:#b8935a;color:white;padding:12px 32px;text-decoration:none;">
                    Gérer mon abonnement
                  </a>
                </div>
              </div>

              <div style="text-align:center;margin-top:24px;">
                <p style="font-size:12px;color:#2d2a26;opacity:0.4;line-height:1.6;">
                  Une question ? Répondez directement à cet email.<br>
                  Anne Freret Fleuriste · Saint-Pair-sur-Mer, Normandie
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
      console.log(`✅ Email renouvellement envoyé à ${email}`);
    } catch (emailErr) {
      console.error('❌ Erreur envoi email renouvellement:', emailErr);
    }
    
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
                  Bonjour ${escapeHtml(sub.first_name || '')},
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
                  Anne Freret Fleuriste · Saint-Pair-sur-Mer, Normandie
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
