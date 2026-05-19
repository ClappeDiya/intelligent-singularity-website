// tests/pages/changelog-page.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

const RELEASES = [
  {
    slug: 'v0.3.0',
    version: '0.3.0',
    releaseDate: '2026-04-12T10:20:30Z',
    gitTag: 'v0.3.0',
    gitSha: 'abc1234',
    title: 'Honest launch',
    summary: 'First public release.',
    changes: [
      { type: 'added', entry: 'Changelog page' },
      { type: 'fixed', entry: 'Homepage counter skew' },
    ],
    authors: [{ username: 'md' }],
    status: 'published',
  },
];

vi.mock('@/lib/payload', () => ({ fetchReleaseNotes: async () => RELEASES }));
vi.mock('@/lib/seo', () => ({ buildPageMetadata: () => ({ title: 't' }) }));
vi.mock('@/lib/schema', () => ({ getWebPageSchema: () => ({}), getBreadcrumbSchema: () => ({}) }));
vi.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string) => ({
    honestNote: 'Honest note',
    loading: 'Loading...',
    feedLabel: 'Subscribe:',
    rssFeed: 'RSS feed',
    eyebrow: 'CHANGELOG · CORPORATE SITE',
    title: 'What changed, in order.',
    lede: 'Every visible change we have made to this corporate site, dated and tied to the commit behind it.',
    firstVersionTitle: 'This is the first version.',
    firstVersionBody: 'No tags have been cut yet. The first release entry will appear here once v1.0 is tagged.',
    viewRepoCta: 'View the repository',
    releasesHeading: 'Releases',
  }[key] ?? key),
}));

import ChangelogPage from '@/app/(public)/[locale]/changelog/page';

describe('/changelog', () => {
  it('renders version, tag link, sha, and change entries', async () => {
    const ui = await ChangelogPage({ params: Promise.resolve({ locale: 'en' }) });
    render(ui as any);
    expect(screen.getByText(/v0\.3\.0/)).toBeInTheDocument();
    expect(screen.getByText('Changelog page')).toBeInTheDocument();
    expect(screen.getByText('Homepage counter skew')).toBeInTheDocument();
    expect(screen.getByText(/abc1234/)).toBeInTheDocument();
  });

  it('renders empty-state block when no releases exist', async () => {
    vi.resetModules();
    vi.doMock('@/lib/payload', () => ({ fetchReleaseNotes: async () => [] }));
    const mod = await import('@/app/(public)/[locale]/changelog/page');
    const ui = await mod.default({ params: Promise.resolve({ locale: 'en' }) });
    render(ui as any);
    expect(screen.getByText(/first version/i)).toBeInTheDocument();
  });
});
