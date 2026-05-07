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

vi.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string) => {
    const labels: Record<string, string> = {
      eyebrow: 'ROADMAP · IN PUBLIC',
      title: 'What we are building.',
      lede: 'In public. No vaporware. Every item is on the studio side — corporate-site work, shared infrastructure, and the cross-cutting commitments that touch every product.',
      statusInProgress: 'In progress',
      statusPlanned: 'Planned',
      statusShipped: 'Shipped',
      statusPaused: 'Paused',
      byStatusLabel: 'By status',
      emptyColumn: 'Nothing in this column right now. New work appears here as it moves stages.',
      ctaEyebrow: 'Missing something?',
      ctaHeading: 'Tell us what you need.',
      ctaBody: 'If there is a feature, tool, or fix that would make a real difference to you, send us a note.',
      ctaButton: 'Send a note',
    };
    return labels[key] ?? key;
  },
}));

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

  it('renders empty columns with a friendly placeholder rather than hiding them', async () => {
    const ui = await RoadmapPage({ params: Promise.resolve({ locale: 'en' }) });
    render(ui as any);
    // Shipped + Paused have no items in fixture — they should show the placeholder copy.
    expect(screen.getAllByText(/Nothing in this column/i).length).toBeGreaterThanOrEqual(2);
  });

  it('shows a counted summary tally for every status', async () => {
    const ui = await RoadmapPage({ params: Promise.resolve({ locale: 'en' }) });
    render(ui as any);
    expect(screen.getByText(/Planned · 1/i)).toBeInTheDocument();
    expect(screen.getByText(/In progress · 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Shipped · 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Paused · 0/i)).toBeInTheDocument();
  });
});
