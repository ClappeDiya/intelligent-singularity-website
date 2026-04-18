import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/en',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

import { Footer } from '@/components/layout/Footer';

describe('<Footer>', () => {
  it('renders a Transparency column containing Changelog, Status, Roadmap, Insights', () => {
    render(<Footer locale="en" studioBlurb="blurb" />);
    expect(screen.getByText('Transparency')).toBeInTheDocument();
    for (const label of ['Changelog', 'Status', 'Roadmap', 'Insights']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('places Help under Studio and Trust under Legal', () => {
    render(<Footer locale="en" studioBlurb="blurb" />);
    expect(screen.getByText('Help')).toBeInTheDocument();
    expect(screen.getByText('Trust')).toBeInTheDocument();
  });
});
