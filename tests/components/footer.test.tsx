import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useTranslations: () => (key: string) => key,
}));

vi.mock('next-intl/server', () => ({
  getTranslations: async (namespace: string) => (key: string) => {
    const all: Record<string, Record<string, string>> = {
      footer: {
        studioLabel: 'Studio',
        transparencyLabel: 'Transparency',
        legalLabel: 'Legal',
        languagesLabel: '14 Languages',
        zeroTrackers: '0 trackers',
        zeroThirdParty: '0 third-party calls',
        legalEnglishOnly: 'Legal pages are maintained in English only.',
        helpLabel: 'Help',
        trustLabel: 'Trust',
        alberta: '© 2026 Intelligent Singularity Inc.',
        startConversation: 'Start a conversation',
        languagesBlurb: 'Every public page ships in fourteen languages.',
        selfHostedChip: 'Self-hosted on a single VPS',
        'links.flagships': 'Flagships',
        'links.careers': 'Careers',
        'links.press': 'Press',
        'links.changelog': 'Changelog',
        'links.status': 'Status',
        'links.roadmap': 'Roadmap',
        'links.greenPledge': 'Green pledge',
        'links.privacy': 'Privacy',
        'links.terms': 'Terms',
        'links.accessibility': 'Accessibility',
        'links.cookies': 'Cookies',
      },
      nav: {
        manifesto: 'Manifesto',
        portfolio: 'Portfolio',
        about: 'About',
        contact: 'Contact',
        insights: 'Insights',
        security: 'Security',
        pricing: 'Pricing',
        faq: 'FAQ',
      },
    };
    return all[namespace]?.[key] ?? key;
  },
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/en',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

import { Footer } from '@/components/layout/Footer';

describe('<Footer>', () => {
  it('renders a Transparency column containing Changelog, Status, Roadmap, Insights', async () => {
    const tree = await Footer({ locale: 'en', studioBlurb: 'blurb' });
    render(tree);
    expect(screen.getByText('Transparency')).toBeInTheDocument();
    for (const label of ['Changelog', 'Status', 'Roadmap', 'Insights']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('places Help under Studio and Trust under Legal', async () => {
    const tree = await Footer({ locale: 'en', studioBlurb: 'blurb' });
    render(tree);
    expect(screen.getByText('Help')).toBeInTheDocument();
    expect(screen.getByText('Trust')).toBeInTheDocument();
  });
});
