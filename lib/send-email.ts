// Email sending functions using Resend API
import { resend, FROM_EMAIL } from './resend';
import {
  orderConfirmation,
  shippingNotification,
  deliveryConfirmation,
  subscriptionWelcome,
  subscriptionRenewal,
  passwordReset,
  welcomeEmail,
  reviewRequest,
  type Order,
  type Subscription,
  type User,
} from './email-templates';

export interface EmailResponse {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmation(
  order: Order
): Promise<EmailResponse> {
  try {
    const html = orderConfirmation(order);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: order.shippingAddress.name.includes('@')
        ? order.shippingAddress.name
        : 'client@example.com', // Fallback - in production, get from order.customerEmail
      subject: `Confirmation de commande nº ${order.orderNumber}`,
      html,
    });

    if (error) {
      console.error('Failed to send order confirmation email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to send order confirmation email:', message);
    return { success: false, error: message };
  }
}

/**
 * Send shipping notification email
 */
export async function sendShippingNotification(
  order: Order,
  trackingUrl: string
): Promise<EmailResponse> {
  try {
    const html = shippingNotification(order, trackingUrl);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: order.shippingAddress.name.includes('@')
        ? order.shippingAddress.name
        : 'client@example.com',
      subject: `Votre commande ${order.orderNumber} est en route !`,
      html,
    });

    if (error) {
      console.error('Failed to send shipping notification email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to send shipping notification email:', message);
    return { success: false, error: message };
  }
}

/**
 * Send delivery confirmation email
 */
export async function sendDeliveryConfirmation(
  order: Order
): Promise<EmailResponse> {
  try {
    const html = deliveryConfirmation(order);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: order.shippingAddress.name.includes('@')
        ? order.shippingAddress.name
        : 'client@example.com',
      subject: `Votre commande ${order.orderNumber} a été livrée 🌸`,
      html,
    });

    if (error) {
      console.error('Failed to send delivery confirmation email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to send delivery confirmation email:', message);
    return { success: false, error: message };
  }
}

/**
 * Send subscription welcome email
 */
export async function sendSubscriptionWelcome(
  subscription: Subscription,
  userEmail: string
): Promise<EmailResponse> {
  try {
    const html = subscriptionWelcome(subscription);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: 'Bienvenue dans votre abonnement floral !',
      html,
    });

    if (error) {
      console.error('Failed to send subscription welcome email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to send subscription welcome email:', message);
    return { success: false, error: message };
  }
}

/**
 * Send subscription renewal email
 */
export async function sendSubscriptionRenewal(
  subscription: Subscription,
  userEmail: string
): Promise<EmailResponse> {
  try {
    const html = subscriptionRenewal(subscription);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: 'Votre abonnement a été renouvelé',
      html,
    });

    if (error) {
      console.error('Failed to send subscription renewal email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to send subscription renewal email:', message);
    return { success: false, error: message };
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(
  email: string,
  resetUrl: string
): Promise<EmailResponse> {
  try {
    const html = passwordReset(resetUrl);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Réinitialisation de votre mot de passe',
      html,
    });

    if (error) {
      console.error('Failed to send password reset email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to send password reset email:', message);
    return { success: false, error: message };
  }
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(user: User): Promise<EmailResponse> {
  try {
    const html = welcomeEmail(user);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: `Bienvenue chez Anne Freret, ${user.name} !`,
      html,
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to send welcome email:', message);
    return { success: false, error: message };
  }
}

/**
 * Send review request email
 */
export async function sendReviewRequest(order: Order): Promise<EmailResponse> {
  try {
    const html = reviewRequest(order);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: order.shippingAddress.name.includes('@')
        ? order.shippingAddress.name
        : 'client@example.com',
      subject: 'Partagez votre expérience avec nous 🌸',
      html,
    });

    if (error) {
      console.error('Failed to send review request email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to send review request email:', message);
    return { success: false, error: message };
  }
}
