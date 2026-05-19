import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl/middleware', () => ({
  default: () => () => new Response(null, { status: 200 }),
}));

vi.mock('next/server', () => ({
  NextResponse: {
    next: () => new Response(null, { status: 200 }),
    redirect: (url: URL) => new Response(null, { status: 307, headers: { location: url.toString() } }),
  },
}));

import proxy from '@/proxy';

function makeRequest(pathname: string) {
  return {
    nextUrl: new URL(`https://intelligentsingularityinc.com${pathname}`),
    headers: new Headers({ host: 'intelligentsingularityinc.com' }),
  } as any;
}

describe('proxy honeypot routing', () => {
  it.each(['/admin-login', '/wp-admin', '/phpmyadmin'])(
    'lets %s reach its route handler instead of redirecting or localizing',
    (pathname) => {
      const response = proxy(makeRequest(pathname));
      expect(response.status).toBe(200);
      expect(response.headers.get('location')).toBeNull();
      expect(response.headers.get('content-security-policy')).toContain("default-src 'self'");
    },
  );

  it('still redirects the real Payload admin path on the public host', () => {
    const response = proxy(makeRequest('/admin'));
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('https://intelligentsingularityinc.com/');
  });
});
