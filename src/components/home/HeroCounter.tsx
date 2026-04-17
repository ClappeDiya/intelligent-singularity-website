import Link from 'next/link';

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

  return (
    <section className="relative px-4 sm:px-6 md:px-8 lg:px-12 pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28 min-h-[94vh] flex items-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          maskImage: 'radial-gradient(circle at 50% 40%, black 0%, black 45%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 0%, black 45%, transparent 75%)',
          background:
            'repeating-linear-gradient(0deg, rgba(108,143,122,0.045) 0px, rgba(108,143,122,0.045) 1px, transparent 1px, transparent 48px),' +
            'repeating-linear-gradient(90deg, rgba(108,143,122,0.045) 0px, rgba(108,143,122,0.045) 1px, transparent 1px, transparent 48px)',
        }}
      />
      <h1 className="sr-only">Intelligent Singularity — {label}</h1>
      <div className="relative max-w-[1280px] mx-auto w-full">
        <div className="max-w-[980px] mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-8 px-3 py-1.5 rounded-full"
            style={{
              border: '1px solid rgba(246,241,231,0.14)',
              background: 'rgba(246,241,231,0.04)',
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full animate-ping" style={{ background: 'var(--color-mint)', opacity: 0.6 }} />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: 'var(--color-mint)' }} />
            </span>
            <span
              className="text-[var(--color-mint)] text-[10.5px] uppercase tracking-[0.28em]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Live · {label}
            </span>
          </div>
          <div
            aria-live="polite"
            aria-label={`${value} people still offline`}
            className="font-semibold leading-[0.92] tracking-[-0.055em] mb-5"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(56px, 10vw, 152px)',
              background: 'linear-gradient(180deg, var(--color-cream) 0%, rgba(246,241,231,0.78) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            {text}
          </div>
          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
            <span className="text-[10.5px] uppercase tracking-[0.26em] text-[var(--color-cream-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
              <span className="text-[var(--color-mint)]">26%</span> of all people on Earth
            </span>
            <span
              aria-hidden="true"
              className="h-px w-8"
              style={{ background: 'rgba(246,241,231,0.16)' }}
            />
            <span className="text-[10.5px] uppercase tracking-[0.26em] text-[var(--color-cream-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
              ITU 2025
            </span>
          </div>
          <p
            className="text-[var(--color-cream)] max-w-[820px] mb-14 mx-auto"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(26px, 3vw, 50px)',
              lineHeight: '1.12',
              letterSpacing: '-0.025em',
              fontWeight: 600,
            }}
          >
            {tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/manifesto"
              className="inline-flex items-center justify-center gap-2 px-7 py-[14px] text-[12px] tracking-[0.04em] uppercase font-semibold rounded-full bg-[var(--color-cream)] text-[var(--color-ink)] transition-transform hover:-translate-y-0.5"
              style={{ color: 'var(--color-ink)', boxShadow: '0 10px 28px rgba(0,0,0,0.22)' }}
            >
              {primaryCta}
            </Link>
            <Link
              href="#flagships"
              className="inline-flex items-center justify-center gap-2 px-7 py-[14px] text-[12px] tracking-[0.04em] uppercase font-semibold rounded-full border text-[var(--color-cream)] transition-colors hover:border-[var(--color-mint)] hover:text-[var(--color-mint)]"
              style={{ borderColor: 'rgba(246,241,231,0.24)' }}
            >
              {secondaryCta}
            </Link>
          </div>
          <div className="mt-20 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream-faint)]" style={{ fontFamily: 'var(--font-mono)' }}>
            <span className="hidden sm:inline-block w-6 h-px" style={{ background: 'rgba(246,241,231,0.2)' }} aria-hidden="true" />
            <span>Scroll · the gap in numbers</span>
            <span className="hidden sm:inline-block w-6 h-px" style={{ background: 'rgba(246,241,231,0.2)' }} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
