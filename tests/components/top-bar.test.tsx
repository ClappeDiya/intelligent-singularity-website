import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/faq',
}));

import { TopBar } from '@/components/layout/TopBar';

describe('<TopBar>', () => {
  it('includes Insights between Portfolio and About', () => {
    render(<TopBar locale="en" />);
    const links = screen.getAllByRole('link').map((a) => a.textContent?.trim());
    const order = ['Portfolio', 'Insights', 'About'];
    let i = 0;
    for (const l of links) {
      if (l === order[i]) i += 1;
      if (i === order.length) break;
    }
    expect(i).toBe(order.length);
  });
});
