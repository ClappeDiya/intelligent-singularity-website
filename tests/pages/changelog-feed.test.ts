// tests/pages/changelog-feed.test.ts
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/payload', () => ({
  fetchReleaseNotes: async () => [
    { slug: 'v0.3.0', version: '0.3.0', releaseDate: '2026-04-12T10:00:00Z', gitTag: 'v0.3.0', gitSha: 'abc1234', title: 'Honest launch', summary: 'First public release.' },
  ],
}));

describe('GET /changelog/feed.xml', () => {
  it('returns 200 with Atom XML body', async () => {
    const mod = await import('@/app/(public)/[locale]/changelog/feed.xml/route');
    const res = await mod.GET(new Request('https://x.test/en/changelog/feed.xml') as any, {
      params: Promise.resolve({ locale: 'en' }),
    } as any);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toMatch(/application\/atom\+xml/);
    const body = await res.text();
    expect(body).toMatch(/<feed xmlns="http:\/\/www\.w3\.org\/2005\/Atom"/);
    expect(body).toMatch(/<entry>[\s\S]*Honest launch/);
  });
});
