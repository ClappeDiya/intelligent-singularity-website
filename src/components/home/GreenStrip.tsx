import { formatCarbon } from '@/lib/carbon';

type Props = { pageBytes: number; carbonGrams: number };

type StatProps = { label: string; value: string; unit?: string; hint?: string };

function Stat({ label, value, unit, hint }: StatProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-emerald)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </div>
      <div
        className="font-semibold leading-none tracking-[-0.04em]"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(28px, 3.2vw, 44px)',
          color: 'var(--color-cream)',
        }}
      >
        {value}
        {unit && (
          <span
            className="text-[0.4em] align-super ml-0.5"
            style={{ color: 'var(--color-emerald)' }}
          >
            {unit}
          </span>
        )}
      </div>
      {hint ? (
        <div className="text-[11px] text-[var(--color-cream-faint)] leading-[1.6]" style={{ fontFamily: 'var(--font-mono)' }}>
          {hint}
        </div>
      ) : null}
    </div>
  );
}

export function GreenStrip({ pageBytes, carbonGrams }: Props) {
  const kb = (pageBytes / 1024).toFixed(1);
  return (
    <div
      className="home-story-panel home-story-panel--dark"
      style={{
        paddingTop: 'clamp(36px, 4vw, 56px)',
        paddingBottom: 'clamp(36px, 4vw, 56px)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-10 lg:gap-16 items-start">
        <div>
          <div
            className="text-[10.5px] uppercase tracking-[0.12em] mb-4 text-[var(--color-emerald)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Live Carbon Receipt
          </div>
          <div
            className="font-semibold tracking-[-0.035em] leading-[1.05] text-[var(--color-cream)] mb-4"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3.4vw, 44px)' }}
          >
            Every visit leaves an energy footprint. This is ours.
          </div>
          <p className="text-[15px] leading-[1.8] text-[var(--color-cream-soft)] max-w-[48ch]">
            We measure page weight in kilobytes and embodied carbon in grams. Both stay radically
            small because we send nothing we do not need — no fonts from CDNs, no trackers, no
            hidden scripts calling home.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-8">
          <Stat label="This page weighs" value={`${kb} KB`} hint="Budget: under 50 KB per route, gzip" />
          <Stat label="Your visit emitted" value={formatCarbon(carbonGrams)} hint="Computed with the Green Web Foundation model" />
          <Stat label="Our hosting" value="Self-hosted" hint="Single VPS · no CDN · Alberta grid" />
          <Stat label="Third-party calls" value="Zero" hint="No CDNs, fonts, analytics, pixels" />
        </div>
      </div>
    </div>
  );
}
