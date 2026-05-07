import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroCounter } from '@/components/home/HeroCounter';

describe('HeroCounter', () => {
  it('renders the number with comma separators', () => {
    const { container } = render(
      <HeroCounter
        locale="en"
        value={2_199_847_302}
        label="People still offline, worldwide"
        tagline="We exist until this number is zero."
        primaryCta="Read the manifesto →"
        secondaryCta="Meet the studio"
        scrollHint="Scroll"
        scrollHintTarget="the gap in numbers"
      />
    );
    expect(container.textContent).toContain('2,199,847,302');
    expect(container.textContent).toContain('People still offline, worldwide');
    expect(container.textContent).toContain('We exist until this number is zero.');
  });

  it('prefixes the locale on the manifesto link', () => {
    const { container } = render(
      <HeroCounter
        locale="zh-CN"
        value={2_199_847_302}
        label="X"
        tagline="Y"
        primaryCta="A"
        secondaryCta="B"
        scrollHint="Scroll"
        scrollHintTarget="the gap in numbers"
      />
    );
    const manifestoLink = container.querySelector('a[href="/zh-CN/manifesto"]');
    expect(manifestoLink).not.toBeNull();
  });

  it('exposes the figure to assistive tech via aria-label', () => {
    const { container } = render(
      <HeroCounter
        locale="en"
        value={2_199_847_302}
        label="X"
        tagline="Y"
        primaryCta="A"
        secondaryCta="B"
        scrollHint="Scroll"
        scrollHintTarget="the gap in numbers"
      />
    );
    const labelled = container.querySelector('[aria-label*="2199847302"], [aria-label*="people still offline"]');
    expect(labelled).not.toBeNull();
  });
});
