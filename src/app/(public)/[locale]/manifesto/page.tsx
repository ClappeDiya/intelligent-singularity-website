import { Suspense } from 'react';
import { fetchManifesto, fetchCommitments, fetchITUData } from '@/lib/payload';
import { LexicalRenderer } from '@/components/richtext/LexicalRenderer';

async function ManifestoContent({ locale }: { locale: string }) {
  const [manifesto, commitments, itu] = await Promise.all([
    fetchManifesto(locale),
    fetchCommitments(locale),
    fetchITUData(locale),
  ]);

  return (
    <article className="px-12 py-[120px] max-w-[920px] mx-auto">
      <div className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-mint)] mb-5">&mdash; Manifesto</div>
      <h1 className="font-[var(--font-serif)] font-light leading-[1.05] tracking-[-0.025em] mb-12" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
        {manifesto.title}
      </h1>
      <p className="font-[var(--font-serif)] italic text-[22px] leading-[1.55] text-[var(--color-cream-soft)] mb-[72px]">{manifesto.lead}</p>
      <section className="prose prose-invert max-w-none text-[18px] leading-[1.65] mb-20">
        <LexicalRenderer content={manifesto.body} className="mb-20" />
      </section>
      <section className="mb-20">
        <h2 className="font-[var(--font-serif)] text-[36px] mb-8">The nine commitments</h2>
        <ol className="space-y-6">
          {commitments.map((c) => (
            <li key={c.number}>
              <div className="font-[var(--font-mono)] text-[11px] text-[var(--color-mint)] tracking-[0.15em] mb-1">{String(c.number).padStart(2, '0')}</div>
              <div className="font-[var(--font-serif)] text-[22px] mb-1">{c.title}</div>
              <div className="text-[14px] text-[var(--color-cream-dim)] leading-[1.6]">{c.body}</div>
            </li>
          ))}
        </ol>
      </section>
      <footer className="text-[12px] text-[var(--color-cream-faint)] font-[var(--font-mono)] space-y-1">
        <div>Source: {itu.sourceLabel}</div>
        <a href={itu.sourceUrl} className="text-[var(--color-mint)]">{itu.sourceUrl}</a>
      </footer>
    </article>
  );
}

export default async function ManifestoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<div className="px-12 py-[120px]">Loading...</div>}>
      <ManifestoContent locale={locale} />
    </Suspense>
  );
}
