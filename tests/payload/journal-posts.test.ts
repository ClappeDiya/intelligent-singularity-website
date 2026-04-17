import { describe, it, expect } from 'vitest';
import { JournalPosts } from '@/payload/collections/JournalPosts';

describe('JournalPosts collection', () => {
  it('uses slug key and exposes rich text body plus sources array', () => {
    expect(JournalPosts.slug).toBe('journal-posts');
    const names = JournalPosts.fields.map((f: any) => f.name);
    expect(names).toEqual(
      expect.arrayContaining([
        'slug', 'title', 'subtitle', 'author', 'publishedAt', 'updatedAt',
        'readingTime', 'body', 'sources', 'tags', 'coverImage', 'status',
      ])
    );
  });

  it('requires at least one source row', () => {
    const sources = JournalPosts.fields.find((f: any) => f.name === 'sources') as any;
    expect(sources.type).toBe('array');
    expect(sources.minRows).toBe(1);
  });

  it('auto-derives readingTime via a beforeChange hook', () => {
    const hooks = (JournalPosts.hooks ?? {}) as any;
    expect(hooks.beforeChange).toBeDefined();
    expect(hooks.beforeChange.length).toBeGreaterThan(0);
  });
});
