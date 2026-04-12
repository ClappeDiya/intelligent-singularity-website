import { describe, expect, it } from 'vitest';
import { GET } from '@/app/api/health/route';

describe('/api/health', () => {
  it('returns ok status', async () => {
    const res = await GET();
    const body = await res.json();
    expect(body.status).toBe('ok');
    expect(body.timestamp).toBeDefined();
  });
});
