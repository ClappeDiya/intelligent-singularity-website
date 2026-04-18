import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HeartbeatGrid } from '@/components/pages/status/HeartbeatGrid';

describe('<HeartbeatGrid>', () => {
  it('renders exactly 90 cells, aria-label includes uptime percent', () => {
    const hb = Array.from({ length: 90 }, (_, i) => ({ status: (i % 30 === 0 ? 0 : 1) as 0 | 1, time: '2026-04-17T00:00:00Z' }));
    const { container, getByRole } = render(<HeartbeatGrid heartbeats={hb} uptime24h={0.98} />);
    const cells = container.querySelectorAll('[data-hb-cell]');
    expect(cells.length).toBe(90);
    const grid = getByRole('img');
    expect(grid.getAttribute('aria-label')).toMatch(/uptime/i);
  });
});
