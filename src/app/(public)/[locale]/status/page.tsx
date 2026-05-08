// src/app/(public)/[locale]/status/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import { fetchStatusPage } from '@/lib/payload';
import { fetchKumaStatus, type KumaStatus } from '@/lib/uptime-kuma';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import { PageHero } from '@/components/pages/shared/PageHero';
import { HeartbeatGrid } from '@/components/pages/status/HeartbeatGrid';

const getCachedKuma = unstable_cache(
  async (baseUrl: string, slug: string) => fetchKumaStatus({ baseUrl, slug }),
  ['kuma-status'],
  { tags: ['status'], revalidate: 60 }
);

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/status',
    title: 'Status | Intelligent Singularity',
    description: 'Live system status for the website and its infrastructure.',
  });
}

function overallPill(s: KumaStatus | null, t: (k: string) => string) {
  if (!s) return { label: t('unavailable'), color: 'rgba(246,241,231,0.2)' };
  if (s.overall === 'operational') return { label: t('operational'), color: 'var(--color-emerald)' };
  if (s.overall === 'degraded') return { label: t('degraded'), color: '#E1B054' };
  if (s.overall === 'down') return { label: t('serviceInterruption'), color: '#C24B4B' };
  return { label: t('statusUnknown'), color: 'rgba(246,241,231,0.2)' };
}

export default async function StatusPageRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const settings = (await fetchStatusPage(locale)) as any;
  const data = await getCachedKuma(settings.kumaBaseUrl, settings.kumaSlug);
  const t = await getTranslations('pages.status');
  const tFooterLinks = await getTranslations('footer.links');
  const pill = overallPill(data, t);

  return (
    <article className="page-shell-wide">
      <JsonLd
        id={`status-schema-${locale}`}
        data={getWebPageSchema({ locale, pathname: '/status', name: 'Status', description: 'Live systems status.' })}
      />
      <JsonLd
        id={`status-breadcrumb-${locale}`}
        data={getBreadcrumbSchema({
          locale,
          crumbs: [
            { name: 'Home', pathname: '/' },
            { name: 'Status', pathname: '/status' },
          ],
        })}
      />

      <PageHero eyebrow={settings.eyebrow} title={settings.title} lede={settings.lede} />

      <section
        aria-label={t('overallStatusAria')}
        className="mb-10 rounded-[22px] p-7 md:p-8 flex flex-col md:flex-row md:items-center gap-4 border"
        style={{ background: 'rgba(240,253,244,0.9)', borderColor: 'rgba(16,185,129,0.2)' }}
      >
        <span
          aria-hidden="true"
          className="inline-block w-3 h-3 rounded-full"
          style={{ background: pill.color }}
        />
        <p
          className="flex-1"
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 600, color: 'var(--color-paper-ink)' }}
        >
          {pill.label}
        </p>
        <p
          className="text-[12.5px]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-paper-ink-soft)' }}
        >
          {data
            ? <>{t('updatedPrefix')} <time dateTime={data.fetchedAt}>{new Date(data.fetchedAt).toISOString().replace('T', ' ').slice(0, 16)}Z</time></>
            : <>{t('noLiveDataAttempt')}</>}
        </p>
      </section>

      {!data ? (
        <p className="mb-10 text-[14px]" style={{ color: 'var(--color-paper-ink-muted)' }}>
          {t('connectionFailed')}
        </p>
      ) : (
        <section aria-labelledby="systems" className="mb-14">
          <h2 id="systems" className="sr-only">{t('systemsHeading')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.groups.map((g) => (
              <div key={g.name} className="is-card rounded-[20px] p-6 md:p-7">
                <h3 className="label-mono mb-5">
                  {g.name}
                </h3>
                <ul className="flex flex-col gap-4">
                  {g.monitors.map((m) => (
                    <li key={m.id}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, color: 'var(--color-paper-ink)' }}>{m.name}</span>
                        <span className="text-[12px]" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(20,20,19,0.78)' }}>
                          {typeof m.uptime24h === 'number' ? `${(m.uptime24h * 100).toFixed(2)}% · 24h` : t('noData')}
                        </span>
                      </div>
                      <div className="mt-2">
                        <HeartbeatGrid heartbeats={m.heartbeats} uptime24h={m.uptime24h} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {settings.operationalCopy ? (
        <p className="max-w-[60ch] text-[14.5px] leading-[1.75] mb-12" style={{ color: 'var(--color-paper-ink-muted)' }}>
          {settings.operationalCopy}
        </p>
      ) : null}

      <nav className="text-[13px]" aria-label={t('externalNavAria')}>
        {t('sourceOfTruth')}{' '}
        <a
          href={`${settings.kumaBaseUrl}/status/${settings.kumaSlug}`}
          target="_blank"
          rel="noreferrer external"
          className="underline underline-offset-4 decoration-[rgba(16,185,129,0.4)] hover:decoration-[var(--color-emerald-ink)]"
          style={{ color: 'var(--color-emerald-ink)' }}
        >
          {t('liveStatusDashboard')}
          <span className="sr-only">{t('opensInNewTab')}</span>
          <span aria-hidden="true" className="ms-1">↗</span>
        </a>
        {' · '}
        <Link href={`/${locale}/changelog`} style={{ color: 'var(--color-emerald-ink)' }}>{tFooterLinks('changelog')}</Link>
      </nav>
    </article>
  );
}
