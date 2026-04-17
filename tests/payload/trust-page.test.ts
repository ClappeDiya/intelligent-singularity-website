import { describe, it, expect } from 'vitest';
import { TrustPage } from '@/payload/globals/TrustPage';

describe('TrustPage global', () => {
  it('lists pillars, subprocessors, certifications, dataResidency, reportIncident', () => {
    expect(TrustPage.slug).toBe('trust-page');
    const names = TrustPage.fields.map((f: any) => f.name);
    expect(names).toEqual(
      expect.arrayContaining([
        'eyebrow', 'title', 'lede', 'pillars', 'certifications',
        'dataResidency', 'subprocessors', 'reportIncident', 'lastReviewedAt',
      ])
    );
  });

  it('requires subprocessor name/purpose/location', () => {
    const subs = TrustPage.fields.find((f: any) => f.name === 'subprocessors') as any;
    const byName = Object.fromEntries(subs.fields.map((f: any) => [f.name, f]));
    expect(byName.name.required).toBe(true);
    expect(byName.purpose.required).toBe(true);
    expect(byName.location.required).toBe(true);
  });
});
