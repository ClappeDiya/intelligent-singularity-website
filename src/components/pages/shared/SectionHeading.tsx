import React from 'react';

export function SectionHeading({
  as: Tag = 'h2',
  id,
  children,
}: { as?: 'h2' | 'h3'; id?: string; children: React.ReactNode }) {
  const size = Tag === 'h2'
    ? 'text-[clamp(1.5rem,2.4vw,2rem)]'
    : 'text-[clamp(1.125rem,1.6vw,1.375rem)]';
  return (
    <Tag
      id={id}
      className={`${size} font-normal tracking-[-0.015em] leading-[1.2] text-[var(--color-paper-ink)] mb-6`}
      style={{ fontFamily: 'var(--font-serif)' }}
    >
      {children}
    </Tag>
  );
}
