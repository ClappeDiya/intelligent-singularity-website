import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HomeContent } from '@/components/home/HomeContent';
import { HomeSkeleton } from '@/components/home/HomeSkeleton';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.home' });
  return buildPageMetadata({
    locale,
    pathname: '/',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent locale={locale} />
    </Suspense>
  );
}
