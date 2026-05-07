import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/lib/payload', () => ({
  fetchJournalPosts: async () => ({
    docs: [
      { slug: 'a', title: 'A post', subtitle: 'sub', publishedAt: '2026-04-15T12:00:00Z', readingTime: 4, tags: [{ tag: 'access' }] },
      { slug: 'b', title: 'Another', subtitle: 'sub', publishedAt: '2026-04-10T12:00:00Z', readingTime: 3, tags: [] },
    ],
    totalPages: 1,
    page: 1,
  }),
}));
vi.mock('@/lib/seo', () => ({ buildPageMetadata: () => ({ title: 't' }) }));
vi.mock('@/lib/schema', () => ({ getWebPageSchema: () => ({}), getBreadcrumbSchema: () => ({}) }));
vi.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string) => ({
    honestNote: 'Honest note',
    loading: 'Loading...',
    eyebrow: 'INSIGHTS · FIELD NOTES FROM THE STUDIO',
    title: 'Thinking in public.',
    lede: 'Field notes on universal access, AI-augmented engineering, the offline 2.2 billion, and the long arc of artificial intelligence — written to be understood, not to impress.',
    subscribeLabel: 'Subscribe:',
    rssFeed: 'RSS feed',
    readMore: 'Read →',
    minutesRead: 'min read',
  }[key] ?? key),
}));

import InsightsIndex from '@/app/(public)/[locale]/insights/page';

describe('/insights', () => {
  it('renders feature card + remaining posts', async () => {
    const ui = await InsightsIndex({ params: Promise.resolve({ locale: 'en' }), searchParams: Promise.resolve({}) });
    render(ui as any);
    expect(screen.getByText('A post')).toBeInTheDocument();
    expect(screen.getByText('Another')).toBeInTheDocument();
  });
});
