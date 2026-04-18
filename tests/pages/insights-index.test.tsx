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

import InsightsIndex from '@/app/(public)/[locale]/insights/page';

describe('/insights', () => {
  it('renders feature card + remaining posts', async () => {
    const ui = await InsightsIndex({ params: Promise.resolve({ locale: 'en' }), searchParams: Promise.resolve({}) });
    render(ui as any);
    expect(screen.getByText('A post')).toBeInTheDocument();
    expect(screen.getByText('Another')).toBeInTheDocument();
  });
});
