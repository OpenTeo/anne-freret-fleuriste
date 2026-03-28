import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    keyPrefix: process.env.STRIPE_SECRET_KEY?.slice(0, 20) || 'missing',
    hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    hasResend: !!process.env.RESEND_API_KEY,
    hasSendcloud: !!process.env.SENDCLOUD_PUBLIC_KEY,
  });
}
