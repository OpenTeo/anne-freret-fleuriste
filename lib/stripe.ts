import Stripe from 'stripe';

let _stripe: Stripe | undefined;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY manquante');
  
  _stripe = new Stripe(key, {
    apiVersion: '2026-02-25.clover' as any,
    typescript: true,
  });
  
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    const s = getStripe();
    const value = (s as any)[prop];
    return typeof value === 'function' ? value.bind(s) : value;
  },
});
