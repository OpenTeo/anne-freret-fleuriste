import { NextResponse } from 'next/server';

export async function GET() {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  return NextResponse.json({
    hasSecret: !!webhookSecret,
    secretLength: webhookSecret?.length || 0,
    secretStart: webhookSecret?.substring(0, 10) || 'N/A',
    secretEnd: webhookSecret?.substring(webhookSecret.length - 10) || 'N/A',
    hasTrim: webhookSecret !== webhookSecret?.trim(),
    trimmedLength: webhookSecret?.trim().length || 0,
    // Debug whitespace
    charCodes: webhookSecret ? [
      webhookSecret.charCodeAt(0), // premier caractère
      webhookSecret.charCodeAt(webhookSecret.length - 1), // dernier caractère
    ] : [],
  });
}
