import { describe, it, expect, vi } from 'vitest';

vi.mock('payload', () => ({
  getPayload: async () => ({
    find: async () => ({ docs: [] }),
    create: async () => ({ id: 'new' }),
    updateGlobal: async () => ({ ok: true }),
  }),
}));

vi.mock('@payload-config', () => ({ default: {} }));

describe('POST /api/seed-new-pages', () => {
  it('returns 403 in production without a secret', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    const mod = await import('@/app/api/seed-new-pages/route');
    const req = new Request('https://x.test/api/seed-new-pages');
    const res = await mod.POST(req as any);
    expect(res.status).toBe(403);
    vi.unstubAllEnvs();
  });

  it('returns 200 + log in non-production', async () => {
    vi.stubEnv('NODE_ENV', 'test');
    const mod = await import('@/app/api/seed-new-pages/route');
    const req = new Request('https://x.test/api/seed-new-pages');
    const res = await mod.POST(req as any);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(Array.isArray(body.log)).toBe(true);
    vi.unstubAllEnvs();
  });
});
