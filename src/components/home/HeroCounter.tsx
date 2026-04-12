type Props = {
  value: number;
  label: string;
  tagline: string;
  primaryCta: string;
  secondaryCta: string;
};

function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n);
}

export function HeroCounter({ value, label, tagline, primaryCta, secondaryCta }: Props) {
  const text = formatNumber(value);
  const digits = text.split('');

  return (
    <section className="pt-[42px] min-h-screen flex flex-col justify-center relative px-12 pb-20">
      <div
        className="absolute left-12 right-12 top-[44%] h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--color-mint) 12%, var(--color-mint) 88%, transparent 100%)',
          opacity: 0.6,
        }}
        aria-hidden="true"
      />
      <p
        className="text-[var(--color-mint)] text-[11px] uppercase tracking-[0.24em] mb-6 pl-[52px]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        — {label}
      </p>
      <div
        aria-live="polite"
        aria-label={`${value} people still offline`}
        className="font-extralight leading-[0.94] tracking-[-0.04em] mb-8 pl-1"
        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(64px, 11vw, 168px)' }}
      >
        {digits.map((d, i) => (
          <span
            key={i}
            className={i === digits.length - 1 ? 'text-[var(--color-mint)]' : ''}
          >
            {d}
          </span>
        ))}
      </div>
      <p
        className="italic text-[var(--color-cream-soft)] max-w-[760px] mb-9 pl-1"
        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 2.2vw, 30px)', lineHeight: '1.35' }}
      >
        {tagline}
      </p>
      <div className="flex gap-[14px] pl-1">
        <a
          href="/manifesto"
          className="inline-flex items-center gap-2 px-[22px] py-[13px] text-[12px] uppercase tracking-[0.14em] font-semibold"
          style={{
            background: 'var(--color-mint)',
            color: 'var(--color-ink)',
            borderRadius: '2px',
          }}
        >
          {primaryCta}
        </a>
        <a
          href="#flagships"
          className="inline-flex items-center gap-2 px-[22px] py-[13px] text-[12px] uppercase tracking-[0.14em] font-semibold"
          style={{
            background: 'transparent',
            color: 'var(--color-cream)',
            border: '1px solid var(--color-cream-faint)',
            borderRadius: '2px',
          }}
        >
          {secondaryCta}
        </a>
      </div>
    </section>
  );
}
