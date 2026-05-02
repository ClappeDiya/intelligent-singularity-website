import Link from 'next/link';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import { fetchFaqPage } from '@/lib/payload';
import { FAQ_PAGE_SEED } from '@/lib/seed/new-pages/faq';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/faq',
    title: 'FAQ | Intelligent Singularity',
    description:
      'Honest answers about the studio, our products, privacy practices, and how to partner with Intelligent Singularity.',
  });
}

async function FaqContent({ locale }: { locale: string }) {
  const cmsPage = (await fetchFaqPage(locale).catch(() => null)) as any;
  const page: any = cmsPage ?? FAQ_PAGE_SEED;

  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/faq',
    name: 'FAQ | Intelligent Singularity',
    description:
      'Honest answers about the studio, our products, privacy practices, and how to partner with Intelligent Singularity.',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'FAQ', pathname: '/faq' },
    ],
  });

  return (
    <article className="page-shell-wide">
      <JsonLd id={`faq-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`faq-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">{page.eyebrow}</div>
      <h1 className="page-title">{page.title}</h1>
      <p className="page-lead">{page.lede}</p>

      <div className="flex flex-col gap-14">
        {(page.sections ?? []).map((section: any, si: number) => (
          <section key={section.title} aria-labelledby={`faq-${si}`}>
            <div
              className="mb-6 flex items-baseline gap-4"
              style={{ borderBottom: '1px solid rgba(16,185,129,0.15)', paddingBottom: '14px' }}
            >
              <div className="label-mono">{String(si + 1).padStart(2, '0')}</div>
              <h2
                id={`faq-${si}`}
                className="text-[var(--color-paper-ink)]"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(26px, 3vw, 38px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  fontWeight: 600,
                }}
              >
                {section.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {(section.items ?? []).map((it: any, i: number) => (
                <details key={i} className="is-card rounded-[20px] p-6 md:p-7">
                  <summary
                    className="cursor-pointer list-none flex items-start justify-between gap-4 text-[17px] md:text-[18px]"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 600,
                      color: 'var(--color-paper-ink)',
                      letterSpacing: '-0.015em',
                      lineHeight: 1.25,
                    }}
                  >
                    <span>{it.q}</span>
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: 'rgba(16,185,129,0.1)',
                        color: 'var(--color-emerald-ink)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '14px',
                      }}
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-[15px] leading-[1.78]" style={{ color: 'rgba(17,24,39,0.72)' }}>
                    {it.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section
        className="mt-20 rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
        style={{
          border: '1px solid rgba(16,185,129,0.18)',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(20,184,166,0.04))',
        }}
      >
        <div className="flex-1">
          <div className="label-mono mb-2">{page.stillStuckCta?.eyebrow}</div>
          <h3
            className="mb-2 text-[var(--color-paper-ink)]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(22px, 2.4vw, 30px)',
              letterSpacing: '-0.025em',
              fontWeight: 600,
              lineHeight: 1.15,
            }}
          >
            {page.stillStuckCta?.heading}
          </h3>
          <p className="text-[15px] leading-[1.7] max-w-[50ch]" style={{ color: 'rgba(17,24,39,0.78)' }}>
            {page.stillStuckCta?.body}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link href="/contact" className="btn-primary" style={{ fontFamily: 'var(--font-mono)' }}>
            Open the form
            <span aria-hidden="true">→</span>
          </Link>
          <a
            href={`mailto:${page.stillStuckCta?.email}`}
            className="btn-outline"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Email directly
          </a>
        </div>
      </section>
    </article>
  );
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">Loading...</div>}>
      <FaqContent locale={locale} />
    </Suspense>
  );
}
