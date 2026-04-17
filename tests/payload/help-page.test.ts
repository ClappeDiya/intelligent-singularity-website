import { describe, it, expect } from 'vitest';
import { HelpPage } from '@/payload/globals/HelpPage';

describe('HelpPage global', () => {
  it('lists emergencyRow, routes, popularQuestions, contactFallback', () => {
    expect(HelpPage.slug).toBe('help-page');
    const names = HelpPage.fields.map((f: any) => f.name);
    expect(names).toEqual(
      expect.arrayContaining([
        'eyebrow', 'title', 'lede',
        'emergencyRow', 'routes', 'popularQuestions', 'contactFallback',
      ])
    );
  });

  it('caps routes at six entries', () => {
    const routes = HelpPage.fields.find((f: any) => f.name === 'routes') as any;
    expect(routes.maxRows).toBe(6);
  });
});
