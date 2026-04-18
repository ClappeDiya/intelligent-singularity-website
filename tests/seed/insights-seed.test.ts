import { describe, it, expect } from 'vitest';
import { INSIGHTS_SEED } from '@/lib/seed/new-pages/insights';

describe('insights seed', () => {
  it('ships exactly three launch posts', () => {
    expect(INSIGHTS_SEED).toHaveLength(3);
  });

  it('each post has >= 1 source and a non-empty body', () => {
    for (const p of INSIGHTS_SEED) {
      expect(p.sources.length).toBeGreaterThanOrEqual(1);
      expect(p.body.root.children.length).toBeGreaterThan(0);
      expect(p.title.length).toBeGreaterThan(3);
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('publishedAt is a parseable ISO date for every post', () => {
    for (const p of INSIGHTS_SEED) {
      expect(Number.isNaN(Date.parse(p.publishedAt))).toBe(false);
    }
  });
});
