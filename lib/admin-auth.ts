import { SignJWT, jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'fallback-dev-secret-change-me'
);

export interface AdminPayload {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_admin: true;
}

export async function createAdminToken(user: AdminPayload): Promise<string> {
  return new SignJWT({
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    is_admin: true,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET);
}

export async function verifyAdminToken(
  token: string
): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    if (!payload.is_admin) return null;
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}
