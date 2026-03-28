import { Resend } from 'resend';

let _resend: Resend | null = null;

export function getResend() {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY manquante dans .env.local');
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export const resend = new Proxy({} as Resend, {
  get(_, prop) {
    const instance = getResend();
    return (instance as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const FROM_EMAIL = 'Anne Freret Fleuriste <commandes@anne-freret.fr>';
