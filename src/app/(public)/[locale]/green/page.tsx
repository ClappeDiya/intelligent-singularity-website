import { Suspense } from 'react';
import type { Metadata } from 'next';
import { fetchGreen } from '@/lib/payload';
import { bytesToGrams, formatCarbon, formatBytes } from '@/lib/carbon';
import { LexicalRenderer } from '@/components/richtext/LexicalRenderer';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

type StatProps = {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
};

function StatCard({ label, value, hint, accent }: StatProps) {
  return (
    <div
      className="rounded-[22px] p-6 flex flex-col gap-2"
      style={{
        border: '1px solid rgba(16,185,129,0.18)',
        background: accent
          ? 'linear-gradient(180deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.02) 100%)'
          : 'rgba(255,255,255,0.95)',
      }}
    >
      <div className="label-mono">{label}</div>
      <div
        className="font-semibold leading-none tracking-[-0.03em] gradient-text"
        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3vw, 34px)' }}
      >
        {value}
      </div>
      {hint ? <div className="text-[11px] leading-[1.5]" style={{ color: 'rgba(17,24,39,0.78)' }}>{hint}</div> : null}
    </div>
  );
}

const PRACTICES = [
  {
    label: 'Bundle budget',
    value: '≤ 50 KB / route',
    hint: 'Gzipped. Enforced by CI on every pull request — a build that breaks the budget cannot ship.',
  },
  {
    label: 'Third-party calls',
    value: 'Zero',
    hint: 'No analytics, fonts, pixels, video embeds, social widgets, or CDN round-trips. Audited per build by no-third-party.mjs.',
  },
  {
    label: 'Renderer',
    value: 'Server-first HTML',
    hint: 'Pages render on the server and stream to the browser. Hydration is opt-in, per-component, never global.',
  },
  {
    label: 'Media strategy',
    value: 'System fonts · SVG',
    hint: 'No raster heroes. Inline SVG illustrations. Per-script font subsets loaded only when that script is on the page.',
  },
  {
    label: 'Hosting',
    value: 'Low-PUE VPS',
    hint: 'Self-hosted on a single VPS in Edmonton, Alberta. No CDN. No edge nodes. One origin, one trust boundary.',
  },
  {
    label: 'Offline reach',
    value: 'PWA · Service worker',
    hint: 'Network-first HTML · stale-while-revalidate assets · offline fallback page on every locale.',
  },
  {
    label: 'Reduced motion',
    value: 'Honoured everywhere',
    hint: 'Every animation pauses when prefers-reduced-motion is set. No exceptions, no opt-outs needed.',
  },
  {
    label: 'Paperless by default',
    value: 'Across the platform',
    hint: 'Invoices, medical records, receipts default to digital. Office paper, business cards, and printed marketing collateral are not part of how we operate.',
  },
];

async function GreenContent({ locale }: { locale: string }) {
  const green = await fetchGreen(locale);
  const bytes = 42_000;
  const grams = bytesToGrams(bytes, green.hostingGreenRatio);
  const renewablePct = Math.round(green.hostingGreenRatio * 100);
  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/green',
    name: 'Green Pledge | Intelligent Singularity',
    description:
      'See our environmental commitments, page-weight transparency, and low-emission web performance approach.',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'Green', pathname: '/green' },
    ],
  });

  return (
    <article className="page-shell-wide">
      <JsonLd id={`green-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`green-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">Green · Live telemetry</div>
      <h1 className="page-title">{green.title}</h1>
      <p className="page-lead">{green.lead}</p>

      <figure
        className="mb-10 rounded-[24px] overflow-hidden"
        style={{
          border: '1px solid rgba(16,185,129,0.18)',
          background:
            'radial-gradient(800px 320px at 100% -30%, rgba(16,185,129,0.1), transparent 65%), var(--color-paper-soft)',
        }}
      >
        <img
          src="/illustrations/green-budget.svg"
          alt=""
          loading="lazy"
          decoding="async"
          className="block w-full h-auto"
          width={960}
          height={420}
        />
      </figure>

      <section
        className="mb-14 rounded-[28px] p-8 md:p-10 overflow-hidden relative"
        style={{
          border: '1px solid rgba(16,185,129,0.18)',
          background:
            'radial-gradient(800px 320px at 90% -30%, rgba(16,185,129,0.1), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(240,253,244,0.96) 100%)',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <StatCard label="This page" value={formatBytes(bytes)} hint="HTML + CSS, no trackers" accent />
          <StatCard label="This visit" value={formatCarbon(grams)} hint="CO₂ · Green Web Foundation" />
          <StatCard label="Hosting" value="Self-hosted" hint={`Single VPS · Alberta grid (~${renewablePct}% renewable)`} />
          <StatCard label="Third-party" value="Zero" hint="No pixels · no fonts · no CDN" />
        </div>
      </section>

      <section className="mb-14">
        <div className="label-mono mb-4">Engineering practices</div>
        <h2
          className="mb-6 text-[var(--color-paper-ink)]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 3vw, 42px)',
            lineHeight: 1.08,
            letterSpacing: '-0.028em',
            fontWeight: 600,
          }}
        >
          How the byte budget stays small
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {PRACTICES.map((p) => (
            <div
              key={p.label}
              className="is-card rounded-[18px] p-5 flex flex-col gap-2"
            >
              <div className="label-mono">
                {p.label}
              </div>
              <h3 className="font-semibold mb-1.5" style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', letterSpacing: '-0.015em', color: 'var(--color-paper-ink)', textWrap: 'balance' }}>
                {p.value}
              </h3>
              <p className="text-[14.5px] leading-[1.72]" style={{ color: 'rgba(17,24,39,0.78)' }}>{p.hint}</p>
            </div>
          ))}
        </div>
      </section>

      <LexicalRenderer content={green.environmentalStance} className="editorial-richtext mb-12" />

      <section
        className="rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
        style={{
          border: '1px solid rgba(16,185,129,0.18)',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(20,184,166,0.04))',
        }}
      >
        <div className="flex-1">
          <div className="label-mono mb-2">The pledge</div>
          <h2
            className="mb-3"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(22px, 2.4vw, 30px)',
              letterSpacing: '-0.025em',
              fontWeight: 600,
              color: 'var(--color-paper-ink)',
              textWrap: 'balance',
            }}
          >
            We publish everything. You hold us accountable.
          </h2>
          <p className="text-[14.5px] leading-[1.7]" style={{ color: 'rgba(17,24,39,0.78)' }}>
            Every number on this page is computed live from real measurements. The bundle budget is enforced by CI; the third-party count is audited on every build; the carbon estimate uses Green Web Foundation methodology against the page weight you actually loaded. If something looks wrong, tell us — we will respond in writing within five business days, with the underlying numbers shown.
          </p>
        </div>
        <a
          href="mailto:green@intelligentsingularityinc.com"
          className="btn-primary"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Report an issue
          <span aria-hidden="true">→</span>
        </a>
      </section>
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
    pathname: '/green',
    title: 'Green Pledge | Intelligent Singularity',
    description:
      'See our environmental commitments, page-weight transparency, and low-emission web performance approach.',
  });
}

export default async function GreenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">Loading...</div>}>
      <GreenContent locale={locale} />
    </Suspense>
  );
}
