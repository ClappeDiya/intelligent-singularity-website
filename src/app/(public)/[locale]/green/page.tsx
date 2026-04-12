import { Suspense } from 'react';
import { fetchGreen } from '@/lib/payload';
import { bytesToGrams, formatCarbon, formatBytes } from '@/lib/carbon';
import { LexicalRenderer } from '@/components/richtext/LexicalRenderer';

async function GreenContent({ locale }: { locale: string }) {
  const green = await fetchGreen(locale);
  const bytes = 42_000;
  const grams = bytesToGrams(bytes, green.hostingGreenRatio);

  return (
    <article className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px] max-w-[920px] mx-auto">
      <div className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-mint)] mb-5">&mdash; Green</div>
      <h1 className="font-[var(--font-serif)] font-light leading-[1.05] tracking-[-0.025em] mb-12" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
        {green.title}
      </h1>
      <p className="font-[var(--font-serif)] italic text-[22px] leading-[1.55] text-[var(--color-cream-soft)] mb-[72px]">{green.lead}</p>
      <div className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-8 p-5 md:p-9 rounded-sm" style={{ border: '1px solid var(--color-mint-dim)', background: 'rgba(168,230,207,0.03)' }}>
        <div>
          <div className="font-[var(--font-mono)] text-[10px] text-[var(--color-mint)] tracking-[0.2em] uppercase mb-1">This page</div>
          <div className="font-[var(--font-serif)] text-[22px] font-light">{formatBytes(bytes)}</div>
        </div>
        <div>
          <div className="font-[var(--font-mono)] text-[10px] text-[var(--color-mint)] tracking-[0.2em] uppercase mb-1">This visit</div>
          <div className="font-[var(--font-serif)] text-[22px] font-light">{formatCarbon(grams)}</div>
        </div>
        <div>
          <div className="font-[var(--font-mono)] text-[10px] text-[var(--color-mint)] tracking-[0.2em] uppercase mb-1">Hosting</div>
          <div className="font-[var(--font-serif)] text-[22px] font-light">{Math.round(green.hostingGreenRatio * 100)}% renewable</div>
        </div>
        <div>
          <div className="font-[var(--font-mono)] text-[10px] text-[var(--color-mint)] tracking-[0.2em] uppercase mb-1">Third-party</div>
          <div className="font-[var(--font-serif)] text-[22px] font-light">Zero</div>
        </div>
      </div>
      <LexicalRenderer content={green.environmentalStance} className="mb-12" />
    </article>
  );
}

export default async function GreenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">Loading...</div>}>
      <GreenContent locale={locale} />
    </Suspense>
  );
}
