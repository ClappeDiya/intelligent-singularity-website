import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HeartbeatGrid } from '@/components/pages/status/HeartbeatGrid';

describe('<HeartbeatGrid>', () => {
  it('renders exactly 90 cells and surfaces the parent-supplied aria-label', () => {
    const hb = Array.from({ length: 90 }, (_, i) => ({ status: (i % 30 === 0 ? 0 : 1) as 0 | 1, time: '2026-04-17T00:00:00Z' }));
    const { container, getByRole } = render(
      <HeartbeatGrid heartbeats={hb} ariaLabel="Uptime over the last 90 days, 98.00% in the last 24 hours." />
    );
    const cells = container.querySelectorAll('[data-hb-cell]');
    expect(cells.length).toBe(90);
    const grid = getByRole('img');
    expect(grid.getAttribute('aria-label')).toMatch(/uptime/i);
    expect(grid.getAttribute('aria-label')).toContain('98.00%');
  });
});
