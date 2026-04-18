import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { LOCALES } from '@/i18n/config';

describe('messages/{locale}.json coverage for new pages', () => {
  const required = [
    ['nav', 'insights'],
    ['footer', 'transparencyLabel'],
    ['pages', 'changelog', 'title'],
    ['pages', 'status', 'title'],
    ['pages', 'roadmap', 'title'],
    ['pages', 'insights', 'title'],
    ['pages', 'trust', 'title'],
    ['pages', 'help', 'title'],
  ];

  function get(obj: any, path: string[]): unknown {
    return path.reduce(
      (v, k) => (v && typeof v === 'object' ? (v as any)[k] : undefined),
      obj
    );
  }

  for (const locale of LOCALES) {
    it(`${locale}.json contains every required key`, () => {
      const data = JSON.parse(
        readFileSync(`messages/${locale}.json`, 'utf8')
      );
      for (const path of required) {
        expect(get(data, path), `${locale} missing ${path.join('.')}`).toBeDefined();
      }
    });
  }
});
