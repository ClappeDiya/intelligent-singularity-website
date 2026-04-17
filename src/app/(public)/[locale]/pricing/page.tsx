import Link from 'next/link';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

type Principle = { label: string; title: string; body: string };

const PRINCIPLES: Principle[] = [
  {
    label: '01',
    title: 'A free tier you can actually run a business on',
    body: 'Not a trial. Not three invoices and a timer. Every flagship has a free-forever plan with enough room for a one-person business. If you outgrow it, paid tiers add scale — not features.',
  },
  {
    label: '02',
    title: 'Prices adjusted for where you live',
    body: 'A plan that costs twenty dollars in Toronto costs less in Lagos. We use published purchasing-power indices so the same team pays the same relative cost wherever they sign up from.',
  },
  {
    label: '03',
    title: 'Every feature in every tier',
    body: 'AI, automation, multi-store, advanced analytics, integrations — all included at every price. No "enterprise-only" gatekeeping. Higher tiers buy more seats, more volume, more support hours.',
  },
  {
    label: '04',
    title: 'Published prices. No "contact sales."',
    body: 'If you have to email us to learn what something costs, it is not transparent pricing. Every number is on the product\u2019s own site, updated the day we change it.',
  },
  {
    label: '05',
    title: 'No per-seat gouging',
    body: 'Seats matter, but they should not be the only lever. We meter on usage that actually reflects value — transactions, storage, active volumes — and keep seat math simple.',
  },
  {
    label: '06',
    title: 'Stop paying on your terms',
    body: 'Cancel in one click. No retention calls. No "we need a reason." A refund for unused time lands in your account within three business days.',
  },
];

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

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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
      <div className="page-label">Pricing · Our six rules</div>
      <h1 className="page-title">Fair, published, built to last.</h1>
      <p className="page-lead">
        We price each product on its own domain. This page is about the rules
        we follow everywhere — the same rules a one-person shop and a
        five-thousand-person manufacturer pay under.
      </p>

      <section className="mb-14 rounded-[24px] p-8 md:p-10" style={{ background: 'var(--color-paper-warm)' }}>
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 md:gap-12 items-center">
          <div>
            <div
              className="text-[12.5px] uppercase text-[var(--color-mint)] mb-3"
              style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
            >
              Why this exists
            </div>
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
              Enterprise software is expensive because it was designed to be.
            </h2>
            <p className="text-[15.5px] leading-[1.75]" style={{ color: 'rgba(20,20,19,0.78)' }}>
              Six-figure contracts, six-month rollouts, and six layers of
              consultants are not a bug of the industry — they are its
              business model. We reject that model. Our prices exist to keep
              the studio running, not to block small businesses at the door.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-[14.5px] leading-[1.7]" style={{ color: 'rgba(20,20,19,0.78)' }}>
            <p>
              <strong style={{ color: 'var(--color-paper-ink)' }}>Free tier:</strong>{' '}
              enough to run a real business — not a demo sandbox.
            </p>
            <p>
              <strong style={{ color: 'var(--color-paper-ink)' }}>Paid tier:</strong>{' '}
              adds scale (seats, volume, support) — never unlocks features you
              already have.
            </p>
            <p>
              <strong style={{ color: 'var(--color-paper-ink)' }}>Enterprise:</strong>{' '}
              the same product with procurement paperwork, SSO, and a human on
              call. No secret feature set.
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
          {PRINCIPLES.map((p) => (
            <div
              key={p.label}
              className="rounded-[20px] p-6 md:p-7 flex gap-5"
              style={{ background: 'var(--color-paper-soft)' }}
            >
              <span
                className="inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-full text-[13px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                  background: 'rgba(108,143,122,0.1)',
                  color: 'var(--color-mint)',
                }}
              >
                {p.label}
              </span>
              <div>
                <h3
                  className="mb-2 text-[var(--color-paper-ink)]"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(19px, 1.8vw, 22px)',
                    letterSpacing: '-0.02em',
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {p.title}
                </h3>
                <p className="text-[14.5px] leading-[1.72]" style={{ color: 'rgba(20,20,19,0.76)' }}>
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
        style={{ background: 'var(--color-paper-soft)' }}
      >
        <div className="flex-1">
          <div
            className="text-[12.5px] uppercase text-[var(--color-mint)] mb-2"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            See actual prices
          </div>
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
            Each product publishes its own prices.
          </h3>
          <p className="text-[14.5px] leading-[1.7]" style={{ color: 'rgba(20,20,19,0.72)' }}>
            Numbers vary by product and region, but the six rules on this page
            never do. Browse the portfolio to land on the right product, and
            the current prices are on its homepage.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full bg-[var(--color-paper-ink)] text-[var(--color-cream)] text-[13px] uppercase"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            View the portfolio
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full border text-[13px] uppercase text-[var(--color-paper-ink)]"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, borderColor: 'rgba(20,20,19,0.18)' }}
          >
            Talk about pricing
          </Link>
        </div>
      </section>
    </article>
  );
}
