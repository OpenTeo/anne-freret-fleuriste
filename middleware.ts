import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'fallback-dev-secret-change-me'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip login page and login/logout API
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/admin/auth/')
  ) {
    return NextResponse.next();
  }

  // Protect /admin and /api/admin
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, SECRET);
      if (!payload.is_admin) throw new Error('Not admin');
      return NextResponse.next();
    } catch {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
      }
      const response = NextResponse.redirect(
        new URL('/admin/login', request.url)
      );
      response.cookies.delete('admin-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
