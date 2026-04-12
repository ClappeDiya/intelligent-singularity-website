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
    <section className="pt-[42px] min-h-[80vh] md:min-h-screen flex flex-col justify-center relative px-4 sm:px-6 md:px-8 lg:px-12 pb-20">
      <h1 className="sr-only">Intelligent Singularity — {label}</h1>
      <div
        className="absolute start-4 end-4 sm:start-6 sm:end-6 md:start-8 md:end-8 lg:start-12 lg:end-12 top-[44%] h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--color-mint) 12%, var(--color-mint) 88%, transparent 100%)',
          opacity: 0.6,
        }}
        aria-hidden="true"
      />
      <p
        className="text-[var(--color-mint)] text-[11px] uppercase tracking-[0.24em] mb-6 ps-0 md:ps-[52px]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        — {label}
      </p>
      <div
        aria-live="polite"
        aria-label={`${value} people still offline`}
        className="font-extralight leading-[0.94] tracking-[-0.04em] mb-4 ps-1"
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
      <div className="flex items-center gap-3 mb-6 ps-1">
        <span className="text-sm md:text-base" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-mint)', opacity: 0.8 }}>
          26% of all people on Earth
        </span>
        <span className="h-px flex-1 bg-[var(--color-mint)] opacity-20" aria-hidden="true" />
      </div>
      <p
        className="italic text-[var(--color-cream-soft)] max-w-[760px] mb-9 ps-1"
        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 2.2vw, 30px)', lineHeight: '1.35' }}
      >
        {tagline}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-[14px] ps-1">
        <a
          href="/manifesto"
          className="inline-flex items-center justify-center gap-2 px-[22px] py-[13px] text-[12px] uppercase tracking-[0.14em] font-semibold"
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
          className="inline-flex items-center justify-center gap-2 px-[22px] py-[13px] text-[12px] uppercase tracking-[0.14em] font-semibold"
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
