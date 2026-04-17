import { describe, it, expect } from 'vitest';
import { ReleaseNotes } from '@/payload/collections/ReleaseNotes';

describe('ReleaseNotes collection', () => {
  it('uses slug as identifier and exposes required fields', () => {
    expect(ReleaseNotes.slug).toBe('release-notes');
    const fieldNames = ReleaseNotes.fields.map((f: any) => f.name);
    expect(fieldNames).toEqual(
      expect.arrayContaining([
        'slug', 'version', 'releaseDate', 'gitTag', 'gitSha',
        'title', 'summary', 'changes', 'authors', 'status',
      ])
    );
  });

  it('marks slug, version, releaseDate, gitTag, gitSha as required', () => {
    const byName = Object.fromEntries(
      ReleaseNotes.fields.map((f: any) => [f.name, f])
    );
    for (const n of ['slug', 'version', 'releaseDate', 'gitTag', 'gitSha']) {
      expect(byName[n].required, `${n} required`).toBe(true);
    }
  });

  it('localises title/summary/changes', () => {
    const byName = Object.fromEntries(
      ReleaseNotes.fields.map((f: any) => [f.name, f])
    );
    expect(byName.title.localized).toBe(true);
    expect(byName.summary.localized).toBe(true);
    expect(byName.changes.localized).toBe(true);
  });
});
