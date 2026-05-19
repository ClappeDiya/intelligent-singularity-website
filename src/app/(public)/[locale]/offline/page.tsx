import Link from 'next/link';
import { MeridianMark } from '@/components/brand/MeridianMark';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.offline' });
  return buildPageMetadata({
    locale,
    pathname: '/offline',
    title: t('metaTitle'),
    description: t('metaDescription'),
    noindex: true,
  });
}

export default async function OfflinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('common');
  return (
    <section className="min-h-[100dvh] flex flex-col items-center justify-center gap-8 px-6 py-24">
      <MeridianMark size={72} />
      <div
        className="label-mono"
      >
        {t('offlineEyebrow')}
      </div>
      <h1
        className="text-center text-[var(--color-paper-ink)]"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(40px, 6vw, 68px)',
          letterSpacing: '-0.035em',
          lineHeight: 1.02,
          fontWeight: 600,
        }}
      >
        {t('offlineTitle')}
      </h1>
      <p
        className="text-center italic max-w-[560px]"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(17px, 1.6vw, 20px)',
          lineHeight: 1.55,
          color: 'var(--color-paper-ink-soft)',
        }}
      >
        {t('offlineBody')}
      </p>
      <Link
        href={`/${locale}`}
        className="btn-outline mt-2"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {t('offlineReturnHome')}
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
