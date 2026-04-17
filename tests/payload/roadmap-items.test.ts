import { describe, it, expect } from 'vitest';
import { RoadmapItems } from '@/payload/collections/RoadmapItems';

describe('RoadmapItems collection', () => {
  it('exposes status enum with required set of values', () => {
    expect(RoadmapItems.slug).toBe('roadmap-items');
    const status = RoadmapItems.fields.find((f: any) => f.name === 'status') as any;
    expect(status.options).toEqual(
      expect.arrayContaining(['planned', 'in-progress', 'shipped', 'paused', 'cancelled'])
    );
    expect(status.required).toBe(true);
  });

  it('localises title, summary, whyItMatters', () => {
    const byName = Object.fromEntries(
      RoadmapItems.fields.map((f: any) => [f.name, f])
    );
    expect(byName.title.localized).toBe(true);
    expect(byName.summary.localized).toBe(true);
    expect(byName.whyItMatters.localized).toBe(true);
  });

  it('holds gitRefs as an array of text', () => {
    const gitRefs = RoadmapItems.fields.find((f: any) => f.name === 'gitRefs') as any;
    expect(gitRefs.type).toBe('array');
  });
});
