import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const SALT_ROUNDS = 10;

function getUserSecret(): Uint8Array {
  const secret = process.env.USER_JWT_SECRET || process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error('USER_JWT_SECRET non configuré');
  return new TextEncoder().encode(secret);
}

export async function createUserToken(userId: string): Promise<string> {
  return new SignJWT({ userId, type: 'user-session' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getUserSecret());
}

export async function verifyUserToken(token: string): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getUserSecret());
    if (payload.type !== 'user-session' || !payload.userId) return null;
    return { userId: payload.userId as string };
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

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
