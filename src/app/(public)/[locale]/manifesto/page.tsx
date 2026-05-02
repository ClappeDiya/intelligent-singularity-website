import { Suspense } from 'react';
import type { Metadata } from 'next';
import { fetchManifesto, fetchCommitments, fetchITUData } from '@/lib/payload';
import { LexicalRenderer } from '@/components/richtext/LexicalRenderer';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import { PledgeRings } from '@/components/illustrations/PledgeRings';
import { OfflineGlobe } from '@/components/illustrations/OfflineGlobe';

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
        aria-labelledby="globe-heading"
        className="mb-16 rounded-[28px] p-7 md:p-10"
        style={{
          border: '1px solid rgba(16,185,129,0.18)',
          background:
            'radial-gradient(900px 280px at 10% -20%, rgba(16,185,129,0.06), transparent 70%), rgba(255,255,255,0.95)',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:gap-10">
          <div className="shrink-0 mb-6 md:mb-0">
            <OfflineGlobe size={220} />
          </div>
          <div className="flex-1">
            <div className="label-mono mb-2">The 26 percent</div>
            <h2
              id="globe-heading"
              className="mb-3"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(22px, 2.4vw, 30px)',
                letterSpacing: '-0.025em',
                fontWeight: 600,
                lineHeight: 1.15,
                color: 'var(--color-paper-ink)',
                textWrap: 'balance',
              }}
            >
              Two-point-two billion people are still offline today.
            </h2>
            <p className="text-[15px] leading-[1.7] max-w-[60ch]" style={{ color: 'rgba(17,24,39,0.8)' }}>
              The lighter dots above are the people already online. The darker, ringed dots are the people who are not. Ninety-six percent of the offline population lives in low- and middle-income countries. Universal-access engineering is what closes that gap. The nine commitments below are how we hold ourselves to it.
            </p>
          </div>
        </div>
      </section>
      <section
        aria-labelledby="nine-commitments"
        className="mb-16 rounded-[28px] p-7 md:p-10"
        style={{
          border: '1px solid rgba(16,185,129,0.18)',
          background:
            'radial-gradient(900px 280px at 90% -20%, rgba(16,185,129,0.08), transparent 70%), rgba(255,255,255,0.95)',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:gap-10 mb-8">
          <div className="flex-1">
            <h2
              id="commitments-heading"
              className="text-[var(--color-paper-ink)]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 3.2vw, 44px)',
                letterSpacing: '-0.035em',
                lineHeight: 1.04,
                fontWeight: 600,
                textWrap: 'balance',
              }}
            >
              The nine commitments
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] max-w-[60ch]" style={{ color: 'rgba(17,24,39,0.8)' }}>
              Nine concentric rings — every product ships against every one of them, every release. The list is not a wishlist. It is the engineering contract.
            </p>
          </div>
          <div className="hidden md:block shrink-0" style={{ width: 200 }}>
            <PledgeRings count={commitments.length || 9} size={200} />
          </div>
        </div>
        <ol className="flex flex-col gap-5">
          {commitments.map((c, i) => (
            <li
              key={c.id}
              className="is-card flex gap-6 md:gap-8 items-start rounded-[20px] p-6 md:p-7 animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span
                className="shrink-0 text-[12px] font-semibold w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(20,184,166,0.12))',
                  color: 'var(--color-emerald-ink)',
                  border: '1px solid rgba(16,185,129,0.2)',
                }}
              >
                {String(c.number).padStart(2, '0')}
              </span>
              <div>
                <h3
                  className="font-semibold text-[var(--color-paper-ink)] mb-2"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(19px, 1.7vw, 22px)',
                    lineHeight: 1.18,
                    letterSpacing: '-0.02em',
                    textWrap: 'balance',
                  }}
                >
                  {c.title}
                </h3>
                <p className="text-[14.5px] leading-[1.78]" style={{ color: 'rgba(17,24,39,0.8)' }}>{c.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <footer
        className="pt-8 border-t text-[13px]"
        style={{ borderColor: 'rgba(16,185,129,0.15)', fontFamily: 'var(--font-mono)' }}
      >
        <div className="label-mono mb-2">
          Source data
        </div>
        {itu.sourceLabel}
        <a href={itu.sourceUrl} className="text-[var(--color-emerald-ink)] underline underline-offset-4 break-all">
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
