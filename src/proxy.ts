import createIntlMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

export default function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host') ?? '';

  // Admin lockdown
  if (url.pathname.startsWith('/admin') && !host.startsWith('admin.')) {
    return NextResponse.redirect(new URL('/', `https://${host}`));
  }
  if (host.startsWith('admin.')) {
    const allowed = (process.env.ADMIN_ALLOWED_IPS ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      '';
    if (allowed.length > 0 && !allowed.includes(ip)) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // Skip intl middleware for admin/api routes
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api')) {
    const response = NextResponse.next();
    applySecurityHeaders(response);
    return response;
  }

  const response = intlMiddleware(request);

  applySecurityHeaders(response);

  return response;
}

function applySecurityHeaders(response: NextResponse) {
  const nonce = generateNonce();
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  );
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload',
  );
  response.headers.set('X-Nonce', nonce);
  response.headers.set('X-Page-Bytes-Source', 'proxy');
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|api/\\[).*)',
  ],
};
