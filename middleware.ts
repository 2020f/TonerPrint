import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'tonerprint-secret-key-2024'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except login)
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('tp_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      const { payload } = await jwtVerify(token, SECRET);
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect admin API routes
  if (pathname.startsWith('/api/admin') ||
      (pathname.startsWith('/api/users') && request.method !== 'GET') ||
      (pathname.startsWith('/api/products') && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) ||
      pathname.match(/^\/api\/orders\/\d+\/status/)) {
    const token = request.cookies.get('tp_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    try {
      const { payload } = await jwtVerify(token, SECRET);
      if (payload.role !== 'admin') {
        return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/products/:path*', '/api/users/:path*', '/api/orders/:path*'],
};
