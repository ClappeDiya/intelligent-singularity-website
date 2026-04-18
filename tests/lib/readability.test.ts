import { describe, it, expect } from 'vitest';
import { fleschKincaidGrade, exceedsGrade } from '@/lib/readability';

describe('fleschKincaidGrade', () => {
  it('scores a simple sentence at grade 4 or lower', () => {
    const score = fleschKincaidGrade('We write slowly. We cite every claim.');
    expect(score).toBeLessThan(4);
  });

  it('scores a complex sentence above grade 12', () => {
    const text =
      'Notwithstanding the aforementioned contractual obligations, parties shall indemnify one another for any consequential damages arising from unforeseeable jurisdictional ambiguities.';
    expect(fleschKincaidGrade(text)).toBeGreaterThan(12);
  });

  it('returns 0 for empty input', () => {
    expect(fleschKincaidGrade('')).toBe(0);
  });

  it('exceedsGrade works with threshold', () => {
    expect(exceedsGrade('We write. We ship.', 8)).toBe(false);
    expect(
      exceedsGrade(
        'Notwithstanding multifaceted regulatory ambiguities, parties shall indemnify.',
        8
      )
    ).toBe(true);
  });
});
