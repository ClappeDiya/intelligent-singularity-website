import { fetchLegalPage } from '@/lib/payload';
import { notFound } from 'next/navigation';

export default async function LegalSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await fetchLegalPage(slug);
  if (!page) notFound();
  return (
    <article className="px-12 py-[120px] max-w-[760px] mx-auto">
      <div className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-mint)] mb-5">&mdash; Legal</div>
      <h1 className="font-[var(--font-serif)] font-light leading-[1.05] tracking-[-0.025em] mb-12" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
        {page.title}
      </h1>
      <pre className="whitespace-pre-wrap text-[16px] font-[var(--font-serif)]">
        {JSON.stringify(page.body, null, 2)}
      </pre>
      <div className="mt-12 font-[var(--font-mono)] text-[11px] text-[var(--color-cream-faint)]">
        Last updated: {page.lastUpdated}
      </div>
    </article>
  );
}
