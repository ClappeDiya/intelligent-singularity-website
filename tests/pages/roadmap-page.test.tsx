// tests/pages/roadmap-page.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

const ITEMS = [
  { slug: 'a', title: 'A planned thing', summary: 's', category: 'infra', status: 'planned', ordering: 10, whyItMatters: 'w', gitRefs: [] },
  { slug: 'b', title: 'B in progress', summary: 's', category: 'infra', status: 'in-progress', ordering: 20, whyItMatters: 'w', gitRefs: [{ ref: 'https://x/pr/1' }] },
];

vi.mock('@/lib/payload', () => ({ fetchRoadmapItems: async () => ITEMS }));
vi.mock('@/lib/seo', () => ({ buildPageMetadata: () => ({ title: 't' }) }));
vi.mock('@/lib/schema', () => ({ getWebPageSchema: () => ({}), getBreadcrumbSchema: () => ({}) }));

import RoadmapPage from '@/app/(public)/[locale]/roadmap/page';

describe('/roadmap', () => {
  it('groups by status and renders every non-empty column', async () => {
    const ui = await RoadmapPage({ params: Promise.resolve({ locale: 'en' }) });
    render(ui as any);
    // Column headings (regex — may also match card titles containing the same word)
    expect(screen.getAllByText(/Planned/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/In progress/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('A planned thing')).toBeInTheDocument();
    expect(screen.getByText('B in progress')).toBeInTheDocument();
  });

  it('renders empty columns as "(none)" rather than hiding them', async () => {
    const ui = await RoadmapPage({ params: Promise.resolve({ locale: 'en' }) });
    render(ui as any);
    // Shipped + Paused have no items in fixture
    expect(screen.getAllByText(/\(none\)/i).length).toBeGreaterThanOrEqual(2);
  });
});
