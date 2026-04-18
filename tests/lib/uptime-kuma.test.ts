import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchKumaStatus } from '@/lib/uptime-kuma';

const OK_STATUS = {
  publicGroupList: [
    { name: 'Website', monitorList: [{ id: 1, name: 'Home', heartbeat: [{ status: 1 }] }] },
  ],
};
const OK_HEARTBEAT = { heartbeatList: { '1': Array(90).fill({ status: 1, ping: 142, time: '2026-04-17T00:00:00Z' }) }, uptimeList: { '1_24': 1, '1_720': 0.9998 } };

function mockFetchSequence(responses: any[]) {
  let i = 0;
  global.fetch = vi.fn(async () => {
    const r = responses[i++] ?? responses[responses.length - 1];
    if (r instanceof Error) throw r;
    return { ok: r.ok ?? true, status: r.status ?? 200, json: async () => r.body ?? {} } as any;
  });
}

describe('fetchKumaStatus', () => {
  beforeEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('returns data on happy path', async () => {
    mockFetchSequence([{ body: OK_STATUS }, { body: OK_HEARTBEAT }]);
    const data = await fetchKumaStatus({ baseUrl: 'https://k', slug: 'is' });
    expect(data).not.toBeNull();
    expect(data!.groups[0].name).toBe('Website');
    expect(data!.groups[0].monitors[0].heartbeats.length).toBe(90);
  });

  it('returns null when status endpoint returns 500', async () => {
    mockFetchSequence([{ ok: false, status: 500, body: {} }]);
    const data = await fetchKumaStatus({ baseUrl: 'https://k', slug: 'is' });
    expect(data).toBeNull();
  });

  it('returns null when fetch throws (network error)', async () => {
    mockFetchSequence([new Error('ECONNREFUSED')]);
    const data = await fetchKumaStatus({ baseUrl: 'https://k', slug: 'is' });
    expect(data).toBeNull();
  });

  it('applies a 3s timeout via AbortSignal.timeout', async () => {
    const slow = new Promise<any>(() => {});
    global.fetch = vi.fn(() => slow) as any;
    const data = await fetchKumaStatus({ baseUrl: 'https://k', slug: 'is', timeoutMs: 5 });
    expect(data).toBeNull();
  });
});
