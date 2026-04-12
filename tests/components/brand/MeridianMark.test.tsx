import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MeridianMark } from '@/components/brand/MeridianMark';

describe('MeridianMark', () => {
  it('renders an SVG with one line and one circle', () => {
    const { container } = render(<MeridianMark size={28} />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('width')).toBe('28');
    expect(svg?.getAttribute('height')).toBe('28');
    expect(container.querySelectorAll('line').length).toBe(1);
    expect(container.querySelectorAll('circle').length).toBeGreaterThanOrEqual(1);
  });

  it('is marked aria-hidden (decorative)', () => {
    const { container } = render(<MeridianMark size={28} />);
    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('uses var(--color-mint) for the stroke and fill', () => {
    const { container } = render(<MeridianMark size={28} />);
    const stroke = container.querySelector('line')?.getAttribute('stroke');
    const fill = container.querySelector('circle[data-role="dot"]')?.getAttribute('fill');
    expect(stroke).toBe('var(--color-mint)');
    expect(fill).toBe('var(--color-mint)');
  });
});
