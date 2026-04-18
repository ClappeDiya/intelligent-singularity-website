import { describe, it, expect } from 'vitest';
import { parseGitTagLines, toReleaseNote, CHANGELOG_SEED } from '@/lib/seed/new-pages/changelog';

describe('changelog seed helpers', () => {
  it('parseGitTagLines extracts sha, tag, date from porcelain format', () => {
    const lines = [
      'abc1234 tag: v0.3.0 2026-04-12T10:20:30+00:00',
      'def5678 tag: v0.2.1 2026-03-01T00:00:00+00:00',
    ];
    const out = parseGitTagLines(lines);
    expect(out).toEqual([
      { sha: 'abc1234', tag: 'v0.3.0', date: '2026-04-12T10:20:30+00:00' },
      { sha: 'def5678', tag: 'v0.2.1', date: '2026-03-01T00:00:00+00:00' },
    ]);
  });

  it('toReleaseNote produces draft record for git-tag-derived entry', () => {
    const note = toReleaseNote({ sha: 'abc1234', tag: 'v0.3.0', date: '2026-04-12T10:20:30+00:00' });
    expect(note.slug).toBe('v0.3.0');
    expect(note.version).toBe('0.3.0');
    expect(note.gitTag).toBe('v0.3.0');
    expect(note.gitSha).toBe('abc1234');
    expect(note.status).toBe('draft');
    expect(note.title).toBe('Release 0.3.0');
  });

  it('ignores lines that do not match tag pattern', () => {
    expect(parseGitTagLines(['garbage line', ''])).toEqual([]);
  });

  it('CHANGELOG_SEED preserves the 5 pre-v1.0 narrative entries, each with real gitSha', () => {
    expect(CHANGELOG_SEED).toHaveLength(5);
    for (const entry of CHANGELOG_SEED) {
      expect(entry.status).toBe('published');
      expect(entry.gitSha).toMatch(/^[0-9a-f]{7,40}$/);
      expect(entry.gitTag).toBe('pre-v1.0');
      expect(entry.version).toBe('pre-1.0');
      expect(entry.title.length).toBeGreaterThan(0);
      expect(entry.summary.length).toBeGreaterThan(0);
    }
    const slugs = CHANGELOG_SEED.map((e) => e.slug);
    expect(slugs).toContain('entry-2026-04-17');
    expect(slugs).toContain('entry-2026-03-20');
  });
});
