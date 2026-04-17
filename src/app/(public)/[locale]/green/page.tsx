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
        border: '1px solid rgba(26,22,18,0.08)',
        background: accent
          ? 'linear-gradient(180deg, rgba(108,143,122,0.1) 0%, rgba(108,143,122,0.02) 100%)'
          : 'rgba(255,255,255,0.6)',
      }}
    >
      <div
        className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-mint)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </div>
      <div
        className="font-semibold text-[var(--color-paper-ink)] leading-none tracking-[-0.03em]"
        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3vw, 34px)' }}
      >
        {value}
      </div>
      {hint ? <div className="text-[12px] text-[rgba(26,22,18,0.6)] leading-[1.55]">{hint}</div> : null}
    </div>
  );
}

const PRACTICES = [
  {
    label: 'Bundle budget',
    value: '≤ 50 KB / route',
    hint: 'Gzipped. Enforced by CI on every pull request.',
  },
  {
    label: 'Third-party calls',
    value: 'Zero',
    hint: 'No analytics, fonts, pixels, or CDN round-trips.',
  },
  {
    label: 'Renderer',
    value: 'Server-first HTML',
    hint: 'Hydration is opt-in, per-component.',
  },
  {
    label: 'Media strategy',
    value: 'System fonts · SVG',
    hint: 'No raster heroes. Glyph sets loaded per script on demand.',
  },
  {
    label: 'Hosting',
    value: 'Low-PUE VPS',
    hint: 'Self-hosted on a single VPS. No CDN, no edge nodes.',
  },
  {
    label: 'Offline reach',
    value: 'PWA · Service worker',
    hint: 'Network-first HTML · stale-while-revalidate assets.',
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

      <section
        className="mb-14 rounded-[28px] p-8 md:p-10 overflow-hidden relative"
        style={{
          border: '1px solid rgba(26,22,18,0.08)',
          background:
            'radial-gradient(800px 320px at 90% -30%, rgba(108,143,122,0.18), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(245,241,234,0.96) 100%)',
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
        <div
          className="text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-mint)] mb-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Engineering practices
        </div>
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
              className="rounded-[20px] p-5 flex flex-col gap-1.5"
              style={{
                border: '1px solid rgba(26,22,18,0.08)',
                background: 'rgba(255,255,255,0.55)',
              }}
            >
              <div
                className="text-[10px] uppercase tracking-[0.22em] text-[rgba(26,22,18,0.52)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {p.label}
              </div>
              <div
                className="text-[18px] text-[var(--color-paper-ink)]"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, letterSpacing: '-0.015em' }}
              >
                {p.value}
              </div>
              <div className="text-[13px] text-[rgba(26,22,18,0.66)] leading-[1.68]">{p.hint}</div>
            </div>
          ))}
        </div>
      </section>

      <LexicalRenderer content={green.environmentalStance} className="editorial-richtext mb-12" />
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
