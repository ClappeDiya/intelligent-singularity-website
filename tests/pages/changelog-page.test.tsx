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
