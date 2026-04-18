import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/lib/payload', () => ({
  fetchHomepageContent: async () => ({
    heroLabel: '',
    heroTagline: '',
    heroCtaPrimary: '',
    heroCtaSecondary: '',
    factsTitle: '',
    factsLead: '',
    flagshipsTitle: '',
    flagshipsLead: '',
    seeAllPortfolioLine: '',
    commitmentsTitle: '',
    commitmentsLead: '',
  }),
  fetchITUData: async () => ({ offlineCount: 0 }),
  fetchFlagshipProducts: async () => [],
  fetchCommitments: async () => [],
}));
vi.mock('@/lib/seo', () => ({ buildPageMetadata: () => ({ title: 't' }) }));
vi.mock('@/lib/schema', () => ({ getWebPageSchema: () => ({}), getBreadcrumbSchema: () => ({}) }));
vi.mock('@/lib/carbon', () => ({ bytesToGrams: () => 0 }));
vi.mock('@/components/home/HeroCounter', () => ({ HeroCounter: () => null }));
vi.mock('@/components/home/FactsSection', () => ({ FactsSection: () => null }));
vi.mock('@/components/home/FlagshipsSection', () => ({ FlagshipsSection: () => null }));
vi.mock('@/components/home/CommitmentsSection', () => ({ CommitmentsSection: () => null }));
vi.mock('@/components/home/GreenStrip', () => ({ GreenStrip: () => null }));
vi.mock('@/components/seo/JsonLd', () => ({ JsonLd: () => null }));

import { HomeContent } from '@/components/home/HomeContent';

describe('Home', () => {
  it('renders a "Read our field notes" callout linking to /insights', async () => {
    const ui = await HomeContent({ locale: 'en' });
    render(ui as any);
    const link = screen.getByRole('link', { name: /Read our field notes/i });
    expect(link.getAttribute('href')).toMatch(/\/insights$/);
  });
});
