import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Hash un mot de passe avec bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Vérifie un mot de passe contre son hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Génère un token simple (pour session temporaire)
 * Note: Pour production, utiliser JWT avec secret
 */
export function generateSessionToken(): string {
  return crypto.randomUUID();
}

/**
 * Valide un email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valide un mot de passe (min 8 caractères)
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

/**
 * Sanitize user object (enlever password_hash)
 */
export function sanitizeUser(user: any) {
  const { password_hash, ...sanitized } = user;
  return sanitized;
}
