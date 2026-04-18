import React from 'react';

function formatDate(value: string, locale = 'en'): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric', month: 'long', day: 'numeric',
    }).format(d);
  } catch {
    return value;
  }
}

export function TimelineEntry({
  id, date, title, meta, children, locale,
}: {
  id?: string;
  date: string;
  title: React.ReactNode;
  meta?: React.ReactNode;
  children: React.ReactNode;
  locale?: string;
}) {
  const display = formatDate(date, locale);
  return (
    <li id={id} className="py-6 md:py-8 border-t" style={{ borderColor: 'rgba(246,241,231,0.08)' }}>
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-3">
        <time
          dateTime={date}
          className="text-[12px] uppercase tracking-[0.16em] shrink-0"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-mint-ink)' }}
        >
          {display}
        </time>
        <h3
          className="text-[20px] md:text-[22px] leading-[1.25] tracking-[-0.01em] text-[var(--color-cream)]"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {title}
        </h3>
        {meta ? (
          <span
            className="text-[11px] uppercase tracking-[0.16em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-cream-faint)' }}
          >
            {meta}
          </span>
        ) : null}
      </div>
      <div className="text-[15px] leading-[1.75] text-[var(--color-cream-dim)]">
        {children}
      </div>
    </li>
  );
}
