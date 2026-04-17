import { Suspense } from 'react';
import type { Metadata } from 'next';
import { fetchManifesto, fetchCommitments, fetchITUData } from '@/lib/payload';
import { LexicalRenderer } from '@/components/richtext/LexicalRenderer';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

async function ManifestoContent({ locale }: { locale: string }) {
  const [manifesto, commitments, itu] = await Promise.all([
    fetchManifesto(locale),
    fetchCommitments(locale),
    fetchITUData(locale),
  ]);
  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/manifesto',
    name: 'Manifesto | Intelligent Singularity',
    description:
      'Read our manifesto on making enterprise-grade software a basic right for every business and person, online or offline.',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'Manifesto', pathname: '/manifesto' },
    ],
  });

  return (
    <article className="page-shell">
      <JsonLd id={`manifesto-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`manifesto-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">Manifesto · First principles</div>
      <h1 className="page-title">{manifesto.title}</h1>
      <p className="page-lead">{manifesto.lead}</p>
      <section className="max-w-none mb-20">
        <LexicalRenderer content={manifesto.body} className="editorial-richtext mb-20" />
      </section>
      <section
        aria-labelledby="nine-commitments"
        className="mb-16 rounded-[28px] p-7 md:p-10"
        style={{
          border: '1px solid rgba(26,22,18,0.08)',
          background:
            'radial-gradient(900px 280px at 90% -20%, rgba(108,143,122,0.12), transparent 70%), rgba(255,255,255,0.55)',
        }}
      >
        <div
          className="text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-mint)] mb-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Engineering constraints
        </div>
        <h2
          id="nine-commitments"
          className="mb-8 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(32px, 3.8vw, 48px)',
            lineHeight: 1.03,
            letterSpacing: '-0.03em',
            fontWeight: 600,
          }}
        >
          The nine commitments
        </h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {commitments.map((c) => (
            <li key={c.number} className="flex gap-4">
              <div className="shrink-0 pt-1">
                <span
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full text-[12px] font-semibold"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    border: '1px solid rgba(108,143,122,0.3)',
                    color: 'var(--color-mint)',
                    background: 'rgba(108,143,122,0.06)',
                  }}
                >
                  {String(c.number).padStart(2, '0')}
                </span>
              </div>
              <div>
                <div
                  className="text-[22px] text-[var(--color-paper-ink)] mb-1.5"
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15 }}
                >
                  {c.title}
                </div>
                <div className="text-[14.5px] leading-[1.78] text-[rgba(26,22,18,0.7)] max-w-[46ch]">
                  {c.body}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <footer
        className="text-[11.5px] text-[rgba(26,22,18,0.55)] space-y-1.5 pt-6"
        style={{ fontFamily: 'var(--font-mono)', borderTop: '1px solid rgba(26,22,18,0.08)' }}
      >
        <div>
          <span className="uppercase tracking-[0.22em] text-[var(--color-mint)] me-3">Source</span>
          {itu.sourceLabel}
        </div>
        <a href={itu.sourceUrl} className="text-[var(--color-mint)] underline underline-offset-4 break-all">
          {itu.sourceUrl}
        </a>
      </footer>
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/manifesto',
    title: 'Manifesto | Intelligent Singularity',
    description:
      'Read our manifesto on making enterprise-grade software a basic right for every business and person, online or offline.',
  });
}

export default async function ManifestoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">Loading...</div>}>
      <ManifestoContent locale={locale} />
    </Suspense>
  );
}
