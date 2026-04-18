// tests/pages/help-page.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

const HELP = {
  eyebrow: 'HELP',
  title: 'We can usually help in one click.',
  lede: 'Pick the row that sounds most like your question.',
  emergencyRow: { heading: 'Broken now?', body: 'Check status.', href: '/status' },
  routes: [
    {
      id: 'use',
      heading: 'I want to use a product',
      blurb: 'Pick a product.',
      links: [{ label: 'Portfolio', href: '/portfolio', external: false }],
    },
  ],
  popularQuestions: [{ question: 'Do you track me?', answer: 'No.' }],
  contactFallback: { heading: 'Still stuck?', body: 'Write to us.', href: '/contact' },
};

vi.mock('@/lib/payload', () => ({ fetchHelpPage: async () => HELP }));
vi.mock('@/lib/seo', () => ({ buildPageMetadata: () => ({ title: 't' }) }));
vi.mock('@/lib/schema', () => ({ getWebPageSchema: () => ({}), getBreadcrumbSchema: () => ({}) }));

import HelpPageRoute from '@/app/(public)/[locale]/help/page';

describe('/help', () => {
  it('renders emergency row, category heading, popular question, and fallback', async () => {
    const ui = await HelpPageRoute({ params: Promise.resolve({ locale: 'en' }) });
    render(ui as any);
    expect(screen.getByText('Broken now?')).toBeInTheDocument();
    expect(screen.getByText('I want to use a product')).toBeInTheDocument();
    expect(screen.getByText('Do you track me?')).toBeInTheDocument();
    expect(screen.getByText('Still stuck?')).toBeInTheDocument();
  });
});
