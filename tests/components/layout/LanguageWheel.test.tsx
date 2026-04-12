import { describe, expect, it } from 'vitest';

// Re-export private helper for testing, or re-declare
function replaceLocaleInPath(path: string, newLocale: string): string {
  const LOCALES = ['en', 'zh-CN', 'es', 'hi', 'ar', 'fr', 'pt', 'bn', 'ru', 'ur', 'id', 'sw', 'yo', 'ha'];
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0 && LOCALES.includes(segments[0])) {
    segments[0] = newLocale;
    return '/' + segments.join('/');
  }
  return `/${newLocale}${path}`;
}

describe('replaceLocaleInPath', () => {
  it('replaces locale segment at start', () => {
    expect(replaceLocaleInPath('/en/manifesto', 'fr')).toBe('/fr/manifesto');
  });
  it('inserts locale for unlocalized path', () => {
    expect(replaceLocaleInPath('/manifesto', 'fr')).toBe('/fr/manifesto');
  });
  it('handles root path', () => {
    expect(replaceLocaleInPath('/en', 'ar')).toBe('/ar');
  });
});
