import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroCounter } from '@/components/home/HeroCounter';

describe('HeroCounter', () => {
  it('renders the number with comma separators', () => {
    const { container } = render(
      <HeroCounter
        value={2_199_847_302}
        label="People still offline, worldwide"
        tagline="We exist until this number is zero."
        primaryCta="Read the manifesto →"
        secondaryCta="Meet the studio"
      />
    );
    expect(container.textContent).toContain('2,199,847,302');
    expect(container.textContent).toContain('People still offline, worldwide');
    expect(container.textContent).toContain('We exist until this number is zero.');
  });

  it('uses aria-live=polite for the counter', () => {
    const { container } = render(
      <HeroCounter
        value={2_199_847_302}
        label="X"
        tagline="Y"
        primaryCta="A"
        secondaryCta="B"
      />
    );
    const live = container.querySelector('[aria-live="polite"]');
    expect(live).not.toBeNull();
  });
});
