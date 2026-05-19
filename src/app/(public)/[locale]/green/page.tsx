import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
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
      {hint ? <div className="text-[11px] leading-[1.5]" style={{ color: 'var(--color-paper-ink-muted)' }}>{hint}</div> : null}
    </div>
  );
}

const PRACTICE_SLUGS = [
  'bundleBudget',
  'thirdPartyCalls',
  'renderer',
  'mediaStrategy',
  'hosting',
  'offlineReach',
  'reducedMotion',
  'paperless',
] as const;

async function GreenContent({ locale }: { locale: string }) {
  const green = await fetchGreen(locale);
  const t = await getTranslations('pages.green');
  const tCommon = await getTranslations('common');
  const bytes = 42_000;
  const grams = bytesToGrams(bytes, green.hostingGreenRatio);
  const renewablePct = Math.round(green.hostingGreenRatio * 100);
  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/green',
    name: t('schemaName'),
    description: t('schemaDescription'),
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: tCommon('breadcrumbHome'), pathname: '/' },
      { name: t('breadcrumbCurrent'), pathname: '/green' },
    ],
  });

  return (
    <article className="page-shell-wide">
      <JsonLd id={`green-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`green-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">{t('liveTelemetryEyebrow')}</div>
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
        {/* Decorative SVG: native <img> is leaner than next/image runtime against the 50 KB budget. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
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
          <StatCard label={t('statThisPageLabel')} value={formatBytes(bytes)} hint={t('statThisPageHint')} accent />
          <StatCard label={t('statThisVisitLabel')} value={formatCarbon(grams)} hint={t('statThisVisitHint')} />
          <StatCard label={t('statHostingLabel')} value={t('statHostingValue')} hint={t('statHostingHint', { percent: renewablePct })} />
          <StatCard label={t('statThirdPartyLabel')} value={t('statThirdPartyValue')} hint={t('statThirdPartyHint')} />
        </div>
      </section>

      <section className="mb-14">
        <div className="label-mono mb-4">{t('engineeringPracticesEyebrow')}</div>
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
          {t('byteBudgetHeading')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {PRACTICE_SLUGS.map((slug) => (
            <div
              key={slug}
              className="is-card rounded-[18px] p-5 flex flex-col gap-2"
            >
              <div className="label-mono">
                {t(`practices.${slug}.label` as 'practices.bundleBudget.label')}
              </div>
              <h3 className="font-semibold mb-1.5" style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', letterSpacing: '-0.015em', color: 'var(--color-paper-ink)', textWrap: 'balance' }}>
                {t(`practices.${slug}.value` as 'practices.bundleBudget.value')}
              </h3>
              <p className="text-[14.5px] leading-[1.72]" style={{ color: 'var(--color-paper-ink-muted)' }}>
                {t(`practices.${slug}.hint` as 'practices.bundleBudget.hint')}
              </p>
            </div>
          ))}
        </div>
      </section>

      <LexicalRenderer content={green.environmentalStance} className="editorial-richtext mb-12" />

      <section
        className="rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-stretch md:items-center gap-6"
        style={{
          border: '1px solid rgba(16,185,129,0.18)',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(20,184,166,0.04))',
        }}
      >
        <div className="flex-1">
          <div className="label-mono mb-2">{t('pledgeEyebrow')}</div>
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
            {t('pledgeHeading')}
          </h2>
          <p className="text-[14.5px] leading-[1.7]" style={{ color: 'var(--color-paper-ink-muted)' }}>
            {t('pledgeBody')}
          </p>
        </div>
        <a
          href="mailto:green@intelligentsingularityinc.com"
          className="btn-primary"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {t('reportIssueCta')}
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
  const t = await getTranslations({ locale, namespace: 'pages.green' });
  return buildPageMetadata({
    locale,
    pathname: '/green',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function GreenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <GreenContent locale={locale} />;
}
