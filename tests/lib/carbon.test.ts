import { describe, expect, it } from 'vitest';
import { bytesToGrams, formatCarbon } from '@/lib/carbon';

describe('bytesToGrams', () => {
  it('returns ~0 grams for 0 bytes', () => {
    expect(bytesToGrams(0, 1)).toBe(0);
  });

  it('scales with bytes (100% renewable)', () => {
    // With greenRatio=1, the discount factor is 0, result should be 0
    expect(bytesToGrams(1_000_000_000, 1)).toBe(0);
  });

  it('scales with bytes (0% renewable)', () => {
    // 1 GB at 0% renewable ≈ 0.81g * 1.02 ≈ 0.8262g
    const g = bytesToGrams(1_000_000_000, 0);
    expect(g).toBeGreaterThan(0.82);
    expect(g).toBeLessThan(0.84);
  });

  it('50 KB at 80% green ≈ under 0.02g', () => {
    const g = bytesToGrams(50_000, 0.8);
    expect(g).toBeLessThan(0.02);
    expect(g).toBeGreaterThan(0);
  });
});

describe('formatCarbon', () => {
  it('formats grams with 2 decimals + unit', () => {
    expect(formatCarbon(0.123)).toBe('0.12 g CO₂');
  });

  it('formats very small values', () => {
    expect(formatCarbon(0.00123)).toBe('0.00 g CO₂');
  });
});
