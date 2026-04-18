// tests/pages/trust-page.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

const TRUST = {
  eyebrow: 'TRUST',
  title: 'Where to find the proof.',
  lede: 'Every claim links to evidence.',
  pillars: [
    { id: 'security', heading: 'Security', blurb: 'b', href: '/security', proof: [{ label: 'Third-party calls', value: '0' }] },
  ],
  certifications: [],
  subprocessors: [
    { name: "Let's Encrypt", purpose: 'TLS certs', dataAccessed: 'None', location: 'US', href: 'https://letsencrypt.org' },
  ],
  dataResidency: { root: { type: 'root', version: 1, direction: 'ltr', format: '', indent: 0, children: [] } },
  reportIncident: { root: { type: 'root', version: 1, direction: 'ltr', format: '', indent: 0, children: [] } },
  lastReviewedAt: '2026-04-17T00:00:00.000Z',
};

vi.mock('@/lib/payload', () => ({ fetchTrustPage: async () => TRUST }));
vi.mock('@/lib/seo', () => ({ buildPageMetadata: () => ({ title: 't' }) }));
vi.mock('@/lib/schema', () => ({ getWebPageSchema: () => ({}), getBreadcrumbSchema: () => ({}) }));

import TrustPage from '@/app/(public)/[locale]/trust/page';

describe('/trust', () => {
  it('renders pillar headings, subprocessor rows, honest empty certifications block', async () => {
    const ui = await TrustPage({ params: Promise.resolve({ locale: 'en' }) });
    render(ui as any);
    expect(screen.getByText('Where to find the proof.')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.getByText("Let's Encrypt")).toBeInTheDocument();
    expect(screen.getByText(/None yet/i)).toBeInTheDocument();
  });
});
