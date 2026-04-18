import { describe, it, expect } from 'vitest';
import { TRUST_PAGE_SEED } from '@/lib/seed/new-pages/trust';

describe('trust page seed', () => {
  it('has 4+ pillars and 4 subprocessors, all real', () => {
    expect(TRUST_PAGE_SEED.pillars.length).toBeGreaterThanOrEqual(4);
    expect(TRUST_PAGE_SEED.subprocessors).toHaveLength(4);
    const names = TRUST_PAGE_SEED.subprocessors.map((s) => s.name);
    expect(names).toEqual(
      expect.arrayContaining([
        "Let's Encrypt",
        'Mailcow (self-hosted)',
        'Contabo',
        'Dokploy',
      ])
    );
  });

  it('each subprocessor has name, purpose, and location', () => {
    for (const s of TRUST_PAGE_SEED.subprocessors) {
      expect(s.name).toBeTruthy();
      expect(s.purpose).toBeTruthy();
      expect(s.location).toBeTruthy();
    }
  });

  it('certifications array is empty at launch — honest empty state', () => {
    expect(TRUST_PAGE_SEED.certifications).toEqual([]);
  });
});
