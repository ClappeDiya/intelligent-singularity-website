import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PageHero } from '@/components/pages/shared/PageHero';
import { SectionHeading } from '@/components/pages/shared/SectionHeading';
import { ProofChip } from '@/components/pages/shared/ProofChip';
import { TimelineEntry } from '@/components/pages/shared/TimelineEntry';
import { EmptyState } from '@/components/pages/shared/EmptyState';
import { StatusPill } from '@/components/pages/shared/StatusPill';
import { OutboundLink } from '@/components/pages/shared/OutboundLink';

describe('PageHero', () => {
  it('renders eyebrow, title, lede', () => {
    const { getByText } = render(
      <PageHero eyebrow="CHANGELOG" title="What changed" lede="A plain record." />
    );
    expect(getByText('CHANGELOG')).toBeTruthy();
    expect(getByText('What changed')).toBeTruthy();
    expect(getByText('A plain record.')).toBeTruthy();
  });
});

describe('SectionHeading', () => {
  it('renders as h2 by default', () => {
    const { container } = render(<SectionHeading>Heading</SectionHeading>);
    expect(container.querySelector('h2')?.textContent).toBe('Heading');
  });
  it('respects `as` prop', () => {
    const { container } = render(<SectionHeading as="h3">Heading</SectionHeading>);
    expect(container.querySelector('h3')?.textContent).toBe('Heading');
  });
});

describe('ProofChip', () => {
  it('renders label and value', () => {
    const { getByText } = render(<ProofChip label="Trackers" value="0" />);
    expect(getByText('Trackers')).toBeTruthy();
    expect(getByText('0')).toBeTruthy();
  });
});

describe('TimelineEntry', () => {
  it('renders time with datetime attr', () => {
    const { container } = render(
      <TimelineEntry date="2026-04-17" title="Release" meta="v0.3.0">
        body
      </TimelineEntry>
    );
    expect(container.querySelector('time')?.getAttribute('datetime')).toBe('2026-04-17');
  });
});

describe('EmptyState', () => {
  it('renders title and body', () => {
    const { getByText } = render(
      <EmptyState title="None yet" body="When one lands, it appears here." />
    );
    expect(getByText('None yet')).toBeTruthy();
  });
});

describe('StatusPill', () => {
  it('renders state label', () => {
    const { getByText } = render(<StatusPill state="operational">All good</StatusPill>);
    expect(getByText('All good')).toBeTruthy();
  });
});

describe('OutboundLink', () => {
  it('adds rel attrs and arrow for external URL', () => {
    const { container, getByText } = render(
      <OutboundLink href="https://example.com">Example</OutboundLink>
    );
    const a = container.querySelector('a');
    expect(a?.getAttribute('rel')).toContain('noreferrer');
    expect(a?.getAttribute('rel')).toContain('external');
    expect(getByText('↗')).toBeTruthy();
  });
  it('renders as Next Link for internal URL', () => {
    const { container } = render(<OutboundLink href="/about">About</OutboundLink>);
    expect(container.querySelector('a')?.getAttribute('rel')).toBeFalsy();
  });
});
