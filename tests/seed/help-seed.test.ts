import { describe, it, expect } from 'vitest';
import { HELP_PAGE_SEED } from '@/lib/seed/new-pages/help';

describe('help page seed', () => {
  it('has six route groups', () => {
    expect(HELP_PAGE_SEED.routes).toHaveLength(6);
  });

  it('every route has at least one link', () => {
    for (const r of HELP_PAGE_SEED.routes) {
      expect(r.links.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('popularQuestions has exactly three entries', () => {
    expect(HELP_PAGE_SEED.popularQuestions).toHaveLength(3);
  });
});
