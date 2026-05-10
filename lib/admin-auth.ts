import { SignJWT, jwtVerify } from 'jose';

function getSecret(): Uint8Array {
  const s = process.env.ADMIN_JWT_SECRET;
  if (!s) throw new Error('ADMIN_JWT_SECRET non configuré');
  return new TextEncoder().encode(s);
}

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
    .sign(getSecret());
}

export async function verifyAdminToken(
  token: string
): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (!payload.is_admin) return null;
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}
