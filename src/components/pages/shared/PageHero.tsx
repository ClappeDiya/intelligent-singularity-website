export function PageHero({
  eyebrow, title, lede,
}: { eyebrow: string; title: string; lede: string }) {
  return (
    <header className="px-4 sm:px-6 md:px-8 lg:px-12 pt-[96px] md:pt-[140px] pb-12 md:pb-16">
      <div className="max-w-[1360px] mx-auto">
        <div
          className="text-[11px] uppercase tracking-[0.24em] mb-6"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-mint)' }}
        >
          {eyebrow}
        </div>
        <h1
          className="font-normal text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-cream)] max-w-[18ch]"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {title}
        </h1>
        <p className="mt-6 md:mt-8 text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.7] text-[var(--color-cream-dim)] max-w-[60ch]">
          {lede}
        </p>
      </div>
    </header>
  );
}
