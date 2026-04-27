import Link from 'next/link';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import { fetchPricingPage } from '@/lib/payload';
import { PRICING_PAGE_SEED } from '@/lib/seed/new-pages/pricing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/pricing',
    title: 'Pricing Philosophy | Intelligent Singularity',
    description:
      'How we price every product: free-forever tier, purchasing-power-adjusted rates, every feature in every tier, published prices, no contact sales.',
  });
}

async function PricingContent({ locale }: { locale: string }) {
  const cmsPage = (await fetchPricingPage(locale).catch(() => null)) as any;
  const page: any = cmsPage ?? PRICING_PAGE_SEED;

  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/pricing',
    name: 'Pricing Philosophy | Intelligent Singularity',
    description:
      'Our pricing rules: free tier, fair-by-region pricing, every feature in every tier, no contact-sales.',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'Pricing', pathname: '/pricing' },
    ],
  });

  return (
    <article className="page-shell-wide">
      <JsonLd id={`pricing-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`pricing-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">{page.eyebrow}</div>
      <h1 className="page-title">{page.title}</h1>
      <p className="page-lead">{page.lede}</p>

      <section
        className="mb-14 rounded-[24px] p-8 md:p-10"
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(20,184,166,0.06))',
          border: '1px solid rgba(16,185,129,0.15)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 md:gap-12 items-center">
          <div>
            <div className="label-mono mb-3">{page.whyThisExists?.eyebrow}</div>
            <h2
              className="mb-4 text-[var(--color-paper-ink)]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(26px, 3vw, 40px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                fontWeight: 600,
              }}
            >
              {page.whyThisExists?.heading}
            </h2>
            <p className="text-[15.5px] leading-[1.75]" style={{ color: 'rgba(17,24,39,0.72)' }}>
              {page.whyThisExists?.body}
            </p>
          </div>
          <div className="flex flex-col gap-4 text-[14.5px] leading-[1.7]" style={{ color: 'rgba(17,24,39,0.72)' }}>
            <p>
              <strong style={{ color: 'var(--color-emerald-ink)' }}>Free tier:</strong>{' '}
              {page.whyThisExists?.freeTierLine?.replace(/^Free tier — /i, '')}
            </p>
            <p>
              <strong style={{ color: 'var(--color-emerald-ink)' }}>Paid tier:</strong>{' '}
              {page.whyThisExists?.paidTierLine?.replace(/^Paid tier — /i, '')}
            </p>
            <p>
              <strong style={{ color: 'var(--color-emerald-ink)' }}>Enterprise:</strong>{' '}
              {page.whyThisExists?.enterpriseLine?.replace(/^Enterprise — /i, '')}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="rules-heading" className="mb-14">
        <h2
          id="rules-heading"
          className="mb-6 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          Six rules every product ships under
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {(page.principles ?? []).map((p: any) => (
            <div key={p.label} className="is-card rounded-[20px] p-6 md:p-7 flex gap-5">
              <span
                className="inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-full text-[12px] font-semibold"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(20,184,166,0.12))',
                  color: 'var(--color-emerald-ink)',
                  border: '1px solid rgba(16,185,129,0.2)',
                }}
              >
                {p.label}
              </span>
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(19px, 1.8vw, 22px)',
                    letterSpacing: '-0.02em',
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: 'var(--color-paper-ink)',
                    textWrap: 'balance',
                  }}
                >
                  {p.title}
                </h3>
                <p className="text-[14.5px] leading-[1.72]" style={{ color: 'rgba(17,24,39,0.7)' }}>
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="anti-patterns-heading" className="mb-14">
        <h2
          id="anti-patterns-heading"
          className="mb-3 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          What we will not do
        </h2>
        <p className="text-[15px] leading-[1.7] mb-6 max-w-[60ch]" style={{ color: 'rgba(17,24,39,0.7)' }}>
          The anti-patterns below are common in business software. We have decided against each of them, in writing, in advance — so neither we nor a future us can quietly bring them back.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {(page.antiPatterns ?? []).map((a: any) => (
            <div
              key={a.title}
              className="is-card rounded-[20px] p-6 md:p-7"
              style={{ borderLeft: '3px solid rgba(220,38,38,0.35)' }}
            >
              <h3
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(18px, 1.8vw, 22px)',
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: 'var(--color-paper-ink)',
                  textWrap: 'balance',
                }}
              >
                {a.title}
              </h3>
              <p className="text-[14.5px] leading-[1.72]" style={{ color: 'rgba(17,24,39,0.7)' }}>
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="example-heading" className="mb-14">
        <h2
          id="example-heading"
          className="mb-3 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          The same product, three customers
        </h2>
        <p className="text-[15px] leading-[1.7] mb-6 max-w-[60ch]" style={{ color: 'rgba(17,24,39,0.7)' }}>
          A worked example — illustrative, not a price quote — to show how the six rules play out in practice. Specific numbers live on each product&rsquo;s own page.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {(page.workedExample ?? []).map((row: any) => (
            <div key={row.who} className="is-card rounded-[20px] p-6 md:p-7">
              <div className="label-mono mb-2">{row.tier}</div>
              <h3
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(17px, 1.6vw, 20px)',
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: 'var(--color-paper-ink)',
                  textWrap: 'balance',
                }}
              >
                {row.who}
              </h3>
              <p className="text-[14px] leading-[1.7] mb-3" style={{ color: 'rgba(17,24,39,0.72)' }}>
                {row.what}
              </p>
              <p className="text-[13px] leading-[1.6]" style={{ color: 'rgba(17,24,39,0.55)', fontStyle: 'italic' }}>
                {row.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
        style={{
          border: '1px solid rgba(16,185,129,0.18)',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(20,184,166,0.04))',
        }}
      >
        <div className="flex-1">
          <div className="label-mono mb-2">{page.seePricesCta?.eyebrow}</div>
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
            {page.seePricesCta?.heading}
          </h3>
          <p className="text-[14.5px] leading-[1.7]" style={{ color: 'rgba(17,24,39,0.68)' }}>
            {page.seePricesCta?.body}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/portfolio" className="btn-primary" style={{ fontFamily: 'var(--font-mono)' }}>
            View the portfolio
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/contact" className="btn-outline" style={{ fontFamily: 'var(--font-mono)' }}>
            Talk about pricing
          </Link>
        </div>
      </section>
    </article>
  );
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">Loading...</div>}>
      <PricingContent locale={locale} />
    </Suspense>
  );
}
