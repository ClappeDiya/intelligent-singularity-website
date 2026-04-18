import { describe, it, expect } from 'vitest';
import { ROADMAP_SEED } from '@/lib/seed/new-pages/roadmap';

describe('roadmap seed', () => {
  it('contains exactly the six HANDOFF Phase-4 items', () => {
    expect(ROADMAP_SEED).toHaveLength(6);
    const slugs = ROADMAP_SEED.map((r) => r.slug);
    expect(slugs).toEqual(
      expect.arrayContaining([
        'plausible-analytics',
        'uptime-kuma',
        'glitchtip-telemetry',
        'encrypted-backups',
        'green-hosting-badge',
        'launch-v1',
      ])
    );
  });

  it('every item has status, summary, whyItMatters, category', () => {
    for (const r of ROADMAP_SEED) {
      expect(r.status).toMatch(/^(planned|in-progress|shipped|paused|cancelled)$/);
      expect(r.summary.length).toBeGreaterThan(10);
      expect(r.whyItMatters.length).toBeGreaterThan(10);
      expect(r.category).toMatch(/^(website|products|infra|accessibility|green)$/);
    }
  });
});
