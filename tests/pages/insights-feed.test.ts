import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/payload', () => ({
  fetchJournalPosts: async () => ({
    docs: [
      { slug: 'a', title: 'A', subtitle: 's', publishedAt: '2026-04-15T12:00:00Z' },
    ],
  }),
}));

describe('GET /insights/feed.xml', () => {
  it('returns 200 Atom with entries', async () => {
    const mod = await import('@/app/(public)/[locale]/insights/feed.xml/route');
    const res = await mod.GET(new Request('https://x.test/en/insights/feed.xml') as any, {
      params: Promise.resolve({ locale: 'en' }),
    } as any);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toMatch(/application\/atom\+xml/);
    const body = await res.text();
    expect(body).toMatch(/<feed /);
    expect(body).toMatch(/<entry>/);
  });
});
