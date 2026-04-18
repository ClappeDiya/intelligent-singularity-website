import { describe, it, expect } from 'vitest';
import { STATUS_PAGE_SEED } from '@/lib/seed/new-pages/status';

describe('status page seed', () => {
  it('points at the real Uptime Kuma endpoint', () => {
    expect(STATUS_PAGE_SEED.kumaBaseUrl).toBe('https://status.intelligentsingularityinc.com');
    expect(STATUS_PAGE_SEED.kumaSlug).toBe('is');
  });

  it('defines at least five monitor groups', () => {
    expect(STATUS_PAGE_SEED.groups.length).toBeGreaterThanOrEqual(5);
  });
});
