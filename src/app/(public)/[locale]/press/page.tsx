import Link from 'next/link';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

type Quote = { text: string; who: string; role: string };

const QUOTES: Quote[] = [
  {
    text:
      'Great software is not a luxury good. It is a basic right for every business and every person doing honest work anywhere in the world.',
    who: 'Dr. Md Diya',
    role: 'Founder, Intelligent Singularity',
  },
  {
    text:
      'A child in Oslo and a child in rural Malawi should reach for the same software. That is not an aspiration. It is the constraint every product ships against.',
    who: 'Intelligent Singularity',
    role: 'Studio Manifesto · 2026',
  },
];

type FastFact = { label: string; value: string };

const FACT_SHEET: FastFact[] = [
  { label: 'Founded', value: '2024 · Alberta, Canada' },
  { label: 'Founder', value: 'Dr. Md Diya' },
  { label: 'Team size', value: 'Small, remote, AI-augmented' },
  { label: 'Funding', value: 'Bootstrapped · self-funded' },
  { label: 'Portfolio', value: '14 tools · 5 shipping live' },
  { label: 'Languages', value: '14 — covering over 4 billion speakers' },
  { label: 'Stack', value: 'One shared platform across every product' },
  { label: 'Website footprint', value: 'Under 50 KB per page · zero trackers' },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/press',
    title: 'Press & Media | Intelligent Singularity',
    description:
      'Press kit, fact sheet, approved quotes, and direct contact for journalists and researchers covering Intelligent Singularity.',
  });
}

export default async function PressPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/press',
    name: 'Press & Media | Intelligent Singularity',
    description:
      'Press kit, fact sheet, approved quotes, and direct contact for journalists and researchers covering Intelligent Singularity.',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'Press', pathname: '/press' },
    ],
  });

  return (
    <article className="page-shell-wide">
      <JsonLd id={`press-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`press-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">Press · Media room</div>
      <h1 className="page-title">Write something true about us.</h1>
      <p className="page-lead">
        Everything here is approved for publication — with attribution. For
        anything else, email press@intelligentsingularityinc.com and a human
        will reply within one business day.
      </p>

      <section aria-labelledby="fact-heading" className="mb-14">
        <h2
          id="fact-heading"
          className="mb-6 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          Fact sheet
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {FACT_SHEET.map((f) => (
            <div
              key={f.label}
              className="rounded-[18px] p-5"
              style={{ background: 'var(--color-paper-soft)' }}
            >
              <dt
                className="text-[11.5px] uppercase mb-2"
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, color: 'rgba(20,20,19,0.58)' }}
              >
                {f.label}
              </dt>
              <dd
                className="text-[16px] leading-[1.35] text-[var(--color-paper-ink)]"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, letterSpacing: '-0.01em' }}
              >
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="quotes-heading" className="mb-14">
        <h2
          id="quotes-heading"
          className="mb-6 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          Approved quotes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {QUOTES.map((q, i) => (
            <figure
              key={i}
              className="rounded-[24px] p-7 md:p-8 flex flex-col justify-between gap-5"
              style={{ background: 'var(--color-paper-warm)' }}
            >
              <blockquote
                className="text-[var(--color-paper-ink)]"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(19px, 2vw, 24px)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.02em',
                  fontWeight: 500,
                }}
              >
                “{q.text}”
              </blockquote>
              <figcaption>
                <div className="text-[14px] text-[var(--color-paper-ink)]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
                  {q.who}
                </div>
                <div
                  className="text-[11.5px] uppercase mt-1"
                  style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, color: 'rgba(20,20,19,0.58)' }}
                >
                  {q.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section aria-labelledby="kit-heading" className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <h2 id="kit-heading" className="sr-only">Brand assets</h2>
        <div
          className="rounded-[22px] p-6 md:p-7 flex flex-col gap-3"
          style={{ background: 'var(--color-paper-soft)' }}
        >
          <div
            className="text-[12.5px] uppercase text-[var(--color-mint)]"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Brand name
          </div>
          <p className="text-[15px] leading-[1.7]" style={{ color: 'rgba(20,20,19,0.78)' }}>
            Write <strong style={{ color: 'var(--color-paper-ink)' }}>Intelligent Singularity</strong> on
            first reference and <strong style={{ color: 'var(--color-paper-ink)' }}>the studio</strong> on
            subsequent mentions. The legal entity is{' '}
            <strong style={{ color: 'var(--color-paper-ink)' }}>Intelligent Singularity Inc.</strong>,
            incorporated in Alberta, Canada.
          </p>
        </div>
        <div
          className="rounded-[22px] p-6 md:p-7 flex flex-col gap-3"
          style={{ background: 'var(--color-paper-soft)' }}
        >
          <div
            className="text-[12.5px] uppercase text-[var(--color-mint)]"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Founder reference
          </div>
          <p className="text-[15px] leading-[1.7]" style={{ color: 'rgba(20,20,19,0.78)' }}>
            <strong style={{ color: 'var(--color-paper-ink)' }}>Dr. Md Diya</strong> on first reference,{' '}
            <strong style={{ color: 'var(--color-paper-ink)' }}>Diya</strong> thereafter. Pronouns:
            he/him. Photos and a short bio are available on request.
          </p>
        </div>
      </section>

      <section
        className="rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
        style={{ background: 'var(--color-paper-ink)', color: 'var(--color-cream)' }}
      >
        <div className="flex-1">
          <div
            className="text-[12.5px] uppercase text-[var(--color-mint)] mb-2"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Direct contact
          </div>
          <h3
            className="mb-2"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(22px, 2.4vw, 30px)',
              letterSpacing: '-0.025em',
              fontWeight: 600,
              lineHeight: 1.15,
            }}
          >
            Need a quote, background, or founder interview?
          </h3>
          <p className="text-[14.5px] leading-[1.7] text-[var(--color-cream-dim)] max-w-[54ch]">
            Email press@intelligentsingularityinc.com with your deadline. A
            human reads every message and replies within one business day.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:press@intelligentsingularityinc.com"
            className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full bg-[var(--color-cream)] text-[var(--color-paper-ink)] text-[13px] uppercase"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            press@…
            <span aria-hidden="true">→</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full border text-[13px] uppercase text-[var(--color-cream)]"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, borderColor: 'rgba(246,241,231,0.24)' }}
          >
            Contact form
          </Link>
        </div>
      </section>
    </article>
  );
}
