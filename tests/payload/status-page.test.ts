import { describe, it, expect } from 'vitest';
import { StatusPage } from '@/payload/globals/StatusPage';

describe('StatusPage global', () => {
  it('is keyed by status-page slug and holds Kuma config', () => {
    expect(StatusPage.slug).toBe('status-page');
    const names = StatusPage.fields.map((f: any) => f.name);
    expect(names).toEqual(
      expect.arrayContaining(['kumaBaseUrl', 'kumaSlug', 'eyebrow', 'title', 'lede', 'groups'])
    );
  });

  it('localises title/lede and requires kumaBaseUrl/kumaSlug', () => {
    const byName = Object.fromEntries(StatusPage.fields.map((f: any) => [f.name, f]));
    expect(byName.title.localized).toBe(true);
    expect(byName.lede.localized).toBe(true);
    expect(byName.kumaBaseUrl.required).toBe(true);
    expect(byName.kumaSlug.required).toBe(true);
  });
});
