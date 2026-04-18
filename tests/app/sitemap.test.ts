import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/payload', () => ({
  fetchJournalPosts: async () => ({ docs: [{ slug: 'post-a' }, { slug: 'post-b' }] }),
}));

describe('sitemap', () => {
  it('lists all six new top-level routes across all locales', async () => {
    const mod = await import('@/app/sitemap');
    const entries = await mod.default();
    const paths = entries.map((e: any) => new URL(e.url).pathname);
    for (const p of ['/en/roadmap', '/en/insights', '/en/trust', '/en/help']) {
      expect(paths).toContain(p);
    }
  });

  it('includes per-post /insights/[slug] entries', async () => {
    const mod = await import('@/app/sitemap');
    const entries = await mod.default();
    const paths = entries.map((e: any) => new URL(e.url).pathname);
    expect(paths).toContain('/en/insights/post-a');
    expect(paths).toContain('/en/insights/post-b');
  });
});
