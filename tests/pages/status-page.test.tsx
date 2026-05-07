import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/lib/payload', () => ({
  fetchStatusPage: async () => ({
    kumaBaseUrl: 'https://k',
    kumaSlug: 'is',
    eyebrow: 'STATUS',
    title: 'How everything is running.',
    lede: 'Live data pulled from our public monitor.',
    operationalCopy: 'Operational means every check in the last five minutes passed.',
  }),
}));
vi.mock('@/lib/seo', () => ({ buildPageMetadata: () => ({ title: 't' }) }));
vi.mock('@/lib/schema', () => ({ getWebPageSchema: () => ({}), getBreadcrumbSchema: () => ({}) }));

vi.mock('next-intl/server', () => ({
  getTranslations: async (namespace: string) => (key: string) => {
    const all: Record<string, Record<string, string>> = {
      'pages.status': {
        operational: 'All systems operational',
        degraded: 'Degraded — at least one service affected',
        unavailable: 'Live data unavailable — please retry',
        serviceInterruption: 'Service interruption',
        statusUnknown: 'Status unknown',
        updatedPrefix: 'updated',
        noLiveDataAttempt: 'no live data — last attempt just now',
        connectionFailed: 'We could not reach our public status monitor just now.',
        systemsHeading: 'Systems',
        noData: 'no data',
        sourceOfTruth: 'Source of truth:',
        liveStatusDashboard: 'Live status dashboard',
      },
      'footer.links': { changelog: 'Changelog' },
    };
    return all[namespace]?.[key] ?? key;
  },
}));

const ok = {
  overall: 'operational',
  fetchedAt: '2026-04-17T10:00:00Z',
  groups: [
    {
      name: 'Website',
      monitors: [{ id: 1, name: 'Home', heartbeats: Array(90).fill({ status: 1, time: '2026-04-17T00:00:00Z' }), uptime24h: 1 }],
    },
  ],
};

describe('/status happy path', () => {
  beforeEach(() => vi.resetModules());

  it('renders operational pill when fetcher returns ok', async () => {
    vi.doMock('@/lib/uptime-kuma', () => ({ fetchKumaStatus: async () => ok }));
    const mod = await import('@/app/(public)/[locale]/status/page');
    const ui = await mod.default({ params: Promise.resolve({ locale: 'en' }) });
    render(ui as any);
    expect(screen.getByText(/All systems operational/i)).toBeInTheDocument();
    expect(screen.getByText('Website')).toBeInTheDocument();
  });
});

describe('/status fail-closed path', () => {
  beforeEach(() => vi.resetModules());

  it('renders "Live data unavailable" pill when fetcher returns null', async () => {
    vi.doMock('@/lib/uptime-kuma', () => ({ fetchKumaStatus: async () => null }));
    const mod = await import('@/app/(public)/[locale]/status/page');
    const ui = await mod.default({ params: Promise.resolve({ locale: 'en' }) });
    render(ui as any);
    expect(screen.getByText(/Live data unavailable/i)).toBeInTheDocument();
    // Must never show "operational" when null
    expect(screen.queryByText(/All systems operational/i)).toBeNull();
  });
});
