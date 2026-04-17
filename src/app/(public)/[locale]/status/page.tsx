import Link from 'next/link';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

type Surface = {
  name: string;
  domain: string;
  status: 'live' | 'staging' | 'awaiting-approval' | 'infrastructure';
  note: string;
};

const SURFACES: Surface[] = [
  { name: 'Intelligent Singularity (this site)', domain: 'intelligentsingularityinc.com', status: 'live', note: 'Sub-50 KB per page, monitored continuously.' },
  { name: 'Clappe', domain: 'clappe.com', status: 'live', note: 'Flagship ERP. Shipping to real users today.' },
  { name: 'ClapBill', domain: 'clapbill.com', status: 'live', note: 'Multi-tenant invoicing.' },
  { name: 'ClapDiet', domain: 'clapdiet.com', status: 'live', note: 'Lab-guided nutrition and meal planning.' },
  { name: 'ClapMove', domain: 'clap.world', status: 'live', note: 'Joint-health programs and pain tracking.' },
  { name: 'Clapwork', domain: 'clapwork.com', status: 'live', note: 'Trust-first freelance marketplace.' },
  { name: 'Audiflo / SlideFlow', domain: 'audiflo.com', status: 'live', note: 'AI presentation narration.' },
  { name: 'ClapMed', domain: 'clapmed.com', status: 'awaiting-approval', note: 'Agentic EMR. Waiting on a regulator before public launch.' },
  { name: 'ClapPay', domain: 'clappay.com', status: 'awaiting-approval', note: 'Unified financial rails. In review.' },
  { name: 'Apogee', domain: 'apogee.farm', status: 'staging', note: 'Goat-farm management. Invite-only.' },
  { name: 'Nestbitt', domain: 'nestbitt.com', status: 'staging', note: 'AI music generation. Invite-only.' },
  { name: 'DailyWorship', domain: 'dailyworship.com', status: 'staging', note: 'AI worship music, open-source.' },
  { name: 'Gclap', domain: 'gclap.com', status: 'staging', note: 'Open-source email and marketing.' },
  { name: 'FileManager', domain: 'filemanager.clappe.com', status: 'staging', note: 'Cross-platform file operations.' },
  { name: 'RateAds / Feedback Hub', domain: 'rateads.com', status: 'staging', note: 'Community survey and feedback tooling.' },
];

const STATUS_STYLE: Record<Surface['status'], { label: string; color: string; bg: string }> = {
  live: { label: 'Live', color: 'var(--color-mint)', bg: 'rgba(108,143,122,0.1)' },
  staging: { label: 'Staging', color: '#c7a261', bg: 'rgba(199,162,97,0.12)' },
  'awaiting-approval': { label: 'Awaiting approval', color: '#b56b61', bg: 'rgba(181,107,97,0.12)' },
  infrastructure: { label: 'Infrastructure', color: '#7a8b9e', bg: 'rgba(122,139,158,0.12)' },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/status',
    title: 'Platform Status | Intelligent Singularity',
    description:
      'Live status for every product and service in the Intelligent Singularity portfolio. Honest labels: live, staging, awaiting approval, infrastructure.',
  });
}

export default async function StatusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/status',
    name: 'Platform Status | Intelligent Singularity',
    description:
      'Live status and reachability for every surface in the Intelligent Singularity portfolio.',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'Status', pathname: '/status' },
    ],
  });

  const liveCount = SURFACES.filter((s) => s.status === 'live').length;

  return (
    <article className="page-shell-wide">
      <JsonLd id={`status-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`status-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">Status · Reachability</div>
      <h1 className="page-title">Everything we ship, in one list.</h1>
      <p className="page-lead">
        Honest, human-friendly status labels for every product. Clicking a row
        opens the product\u2019s own domain in a new tab.
      </p>

      <section
        aria-label="Status summary"
        className="mb-10 flex flex-wrap gap-3 md:gap-4"
      >
        <div
          className="flex-1 min-w-[200px] rounded-[20px] p-5 md:p-6"
          style={{ background: 'var(--color-paper-soft)' }}
        >
          <div
            className="text-[12.5px] uppercase text-[var(--color-mint)] mb-1"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Live surfaces
          </div>
          <div
            className="text-[var(--color-paper-ink)] leading-none"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 600, letterSpacing: '-0.02em' }}
          >
            {liveCount} of {SURFACES.length}
          </div>
          <div className="text-[13.5px] text-[rgba(20,20,19,0.66)] leading-[1.6] mt-1">
            Reachable right now, any region.
          </div>
        </div>
        <div
          className="flex-1 min-w-[200px] rounded-[20px] p-5 md:p-6"
          style={{ background: 'var(--color-paper-soft)' }}
        >
          <div
            className="text-[12.5px] uppercase text-[var(--color-mint)] mb-1"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Last incident
          </div>
          <div
            className="text-[var(--color-paper-ink)] leading-none"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 600, letterSpacing: '-0.02em' }}
          >
            None recorded
          </div>
          <div className="text-[13.5px] text-[rgba(20,20,19,0.66)] leading-[1.6] mt-1">
            Any incident is published here with a post-mortem.
          </div>
        </div>
        <div
          className="flex-1 min-w-[200px] rounded-[20px] p-5 md:p-6"
          style={{ background: 'var(--color-paper-soft)' }}
        >
          <div
            className="text-[12.5px] uppercase text-[var(--color-mint)] mb-1"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            How we monitor
          </div>
          <div
            className="text-[var(--color-paper-ink)] leading-none"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 2.2vw, 28px)', fontWeight: 600, letterSpacing: '-0.018em' }}
          >
            Uptime Kuma · 60 s
          </div>
          <div className="text-[13.5px] text-[rgba(20,20,19,0.66)] leading-[1.6] mt-1">
            Self-hosted probe on every endpoint.
          </div>
        </div>
      </section>

      <section aria-label="All surfaces" className="flex flex-col gap-3">
        {SURFACES.map((s) => {
          const st = STATUS_STYLE[s.status];
          return (
            <a
              key={s.domain}
              href={`https://${s.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[18px] p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 no-underline text-[var(--color-paper-ink)] transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--color-paper-soft)' }}
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full shrink-0 text-[11.5px] uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                  color: st.color,
                  background: st.bg,
                }}
              >
                <span
                  aria-hidden="true"
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: st.color }}
                />
                {st.label}
              </span>
              <div className="flex-1">
                <div
                  className="text-[18px] leading-[1.2]"
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, letterSpacing: '-0.018em' }}
                >
                  {s.name}
                </div>
                <div
                  className="text-[13px] mt-0.5"
                  style={{ fontFamily: 'var(--font-mono)', color: 'rgba(20,20,19,0.56)' }}
                >
                  {s.domain}
                </div>
              </div>
              <div className="text-[13.5px] text-[rgba(20,20,19,0.7)] md:max-w-[52ch]">
                {s.note}
              </div>
              <span
                aria-hidden="true"
                className="text-[var(--color-mint)] transition-transform group-hover:translate-x-1 shrink-0 md:text-right"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                →
              </span>
            </a>
          );
        })}
      </section>

      <section
        className="mt-14 rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
        style={{ background: 'var(--color-paper-warm)' }}
      >
        <div className="flex-1">
          <div
            className="text-[12.5px] uppercase text-[var(--color-mint)] mb-2"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            See something down?
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
            Tell us what, tell us where.
          </h3>
          <p className="text-[14.5px] leading-[1.7]" style={{ color: 'rgba(20,20,19,0.72)' }}>
            If a surface is unreachable and this page still says &ldquo;Live&rdquo;, we want
            to know. The more specific the report, the faster we fix.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full bg-[var(--color-paper-ink)] text-[var(--color-cream)] text-[13px] uppercase"
          style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
        >
          Report an outage
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </article>
  );
}
