import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Wordmark } from '@/components/brand/Wordmark';

describe('Wordmark', () => {
  it('renders the company name', () => {
    const { getByText } = render(<Wordmark />);
    expect(getByText(/intelligent/i)).toBeInTheDocument();
    expect(getByText(/singularity/i)).toBeInTheDocument();
  });

  it('has the brand serif font family', () => {
    const { container } = render(<Wordmark />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/wordmark/);
  });
});
