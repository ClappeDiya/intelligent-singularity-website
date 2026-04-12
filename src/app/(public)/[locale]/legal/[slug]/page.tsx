import { Suspense } from 'react';
import { fetchLegalPage } from '@/lib/payload';
import { notFound } from 'next/navigation';
import { LexicalRenderer } from '@/components/richtext/LexicalRenderer';

async function LegalContent({ locale, slug }: { locale: string; slug: string }) {
  const page = await fetchLegalPage(slug);
  if (!page) notFound();
  return (
    <article className="px-12 py-[120px] max-w-[760px] mx-auto">
      <div className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-mint)] mb-5">&mdash; Legal</div>
      <h1 className="font-[var(--font-serif)] font-light leading-[1.05] tracking-[-0.025em] mb-12" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
        {page.title}
      </h1>
      <LexicalRenderer content={page.body} />
      <div className="mt-12 font-[var(--font-mono)] text-[11px] text-[var(--color-cream-faint)]">
        Last updated: {page.lastUpdated}
      </div>
    </article>
  );
}

export default async function LegalSlugPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  return (
    <Suspense fallback={<div className="px-12 py-[120px]">Loading...</div>}>
      <LegalContent locale={locale} slug={slug} />
    </Suspense>
  );
}
