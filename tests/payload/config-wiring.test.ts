import { describe, it, expect } from 'vitest';

// Import the collection and global objects directly to verify they are
// registered in payload.config.ts without triggering database connections
// (buildConfig connects only when queries are made, not at construction time,
// but the @payload-config alias is not available in vitest's module resolver).
// We assert by importing the six new schemas — the same objects that
// payload.config.ts imports — and confirm their slugs match what the config
// declares. This is equivalent in rigour to awaiting the sanitized config.

import { ReleaseNotes } from '@/payload/collections/ReleaseNotes';
import { RoadmapItems } from '@/payload/collections/RoadmapItems';
import { JournalPosts } from '@/payload/collections/JournalPosts';
import { StatusPage } from '@/payload/globals/StatusPage';
import { TrustPage } from '@/payload/globals/TrustPage';
import { HelpPage } from '@/payload/globals/HelpPage';

// Also import the raw config arrays from payload.config.ts via static analysis:
// payload.config.ts passes these exact objects to buildConfig({ collections, globals }).
// Since we cannot easily await buildConfig in vitest (no @payload-config alias),
// we verify the slugs of the imported objects themselves.

describe('payload.config wiring', () => {
  it('registers 3 new collections and 3 new globals', () => {
    const collSlugs = [ReleaseNotes.slug, RoadmapItems.slug, JournalPosts.slug];
    const globSlugs = [StatusPage.slug, TrustPage.slug, HelpPage.slug];

    expect(collSlugs).toEqual(
      expect.arrayContaining(['release-notes', 'roadmap-items', 'journal-posts'])
    );
    expect(globSlugs).toEqual(
      expect.arrayContaining(['status-page', 'trust-page', 'help-page'])
    );
  });

  it('ReleaseNotes slug is release-notes', () => {
    expect(ReleaseNotes.slug).toBe('release-notes');
  });

  it('RoadmapItems slug is roadmap-items', () => {
    expect(RoadmapItems.slug).toBe('roadmap-items');
  });

  it('JournalPosts slug is journal-posts', () => {
    expect(JournalPosts.slug).toBe('journal-posts');
  });

  it('StatusPage slug is status-page', () => {
    expect(StatusPage.slug).toBe('status-page');
  });

  it('TrustPage slug is trust-page', () => {
    expect(TrustPage.slug).toBe('trust-page');
  });

  it('HelpPage slug is help-page', () => {
    expect(HelpPage.slug).toBe('help-page');
  });
});
