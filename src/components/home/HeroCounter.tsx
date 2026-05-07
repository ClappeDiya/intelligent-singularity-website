import Link from 'next/link';

type Props = {
  locale: string;
  value: number;
  label: string;
  tagline: string;
  primaryCta: string;
  secondaryCta: string;
  scrollHint: string;
  scrollHintTarget: string;
};

function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n);
}

export function HeroCounter({ locale, value, label, tagline, primaryCta, secondaryCta, scrollHint, scrollHintTarget }: Props) {
  const text = formatNumber(value);

  return (
    <section className="relative px-4 sm:px-6 md:px-8 lg:px-12 pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24 min-h-[88dvh] flex items-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          maskImage: 'radial-gradient(circle at 50% 40%, black 0%, black 45%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 0%, black 45%, transparent 75%)',
          background:
            'repeating-linear-gradient(0deg, rgba(16,185,129,0.04) 0px, rgba(16,185,129,0.04) 1px, transparent 1px, transparent 48px),' +
            'repeating-linear-gradient(90deg, rgba(16,185,129,0.04) 0px, rgba(16,185,129,0.04) 1px, transparent 1px, transparent 48px)',
        }}
      />
      <div className="relative max-w-[1280px] mx-auto w-full">
        <div className="max-w-[980px] mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 mb-7 px-3 py-1.5 rounded-full"
            style={{
              border: '1px solid rgba(16,185,129,0.2)',
              background: 'rgba(16,185,129,0.06)',
            }}
          >
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-emerald)' }} />
            <span
              className="text-[var(--color-emerald)] text-[10.5px] uppercase tracking-[0.12em]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ITU 2025 · {label}
            </span>
          </div>
          <div
            aria-label={`${value} people still offline, source ITU 2025`}
            className="font-semibold leading-[0.92] tracking-[-0.055em] mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(40px, 10vw, 152px)',
              background: 'linear-gradient(180deg, var(--color-cream) 0%, rgba(246,241,231,0.78) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            {text}
          </div>
          <div className="flex items-center justify-center gap-4 mb-10 flex-wrap">
            <span className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-cream-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
              <span className="text-[var(--color-emerald)]">26%</span> of all people on Earth
            </span>
            <span
              aria-hidden="true"
              className="h-px w-8"
              style={{ background: 'rgba(16,185,129,0.2)' }}
            />
            <span className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-cream-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
              ITU 2025
            </span>
          </div>
          <h1
            className="text-[var(--color-cream)] max-w-[820px] mb-3 mx-auto"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(26px, 3vw, 50px)',
              lineHeight: '1.12',
              letterSpacing: '-0.025em',
              fontWeight: 600,
            }}
          >
            {tagline}
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-10">
            <Link
              href={`/${locale}/manifesto`}
              className="inline-flex items-center justify-center gap-2 px-7 py-[14px] text-[12px] tracking-[0.04em] uppercase font-semibold rounded-full transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #047857, #0f766e)', color: '#fff', boxShadow: '0 10px 28px rgba(16,185,129,0.32)' }}
            >
              {primaryCta}
            </Link>
            <Link
              href="#flagships"
              className="inline-flex items-center justify-center gap-2 px-7 py-[14px] text-[12px] tracking-[0.04em] uppercase font-semibold rounded-full border transition-colors hover:border-[var(--color-emerald)] hover:text-[var(--color-emerald)] text-[var(--color-cream)]"
              style={{ borderColor: 'rgba(16,185,129,0.3)' }}
            >
              {secondaryCta}
            </Link>
          </div>
          <div className="mt-16 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream-faint)]" style={{ fontFamily: 'var(--font-mono)' }}>
            <span className="hidden sm:inline-block w-6 h-px" style={{ background: 'rgba(16,185,129,0.2)' }} aria-hidden="true" />
            <span>{scrollHint} · {scrollHintTarget}</span>
            <span className="hidden sm:inline-block w-6 h-px" style={{ background: 'rgba(16,185,129,0.2)' }} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
