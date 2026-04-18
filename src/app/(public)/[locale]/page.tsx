import { Suspense } from 'react';
import type { Metadata } from 'next';
import { HomeContent } from '@/components/home/HomeContent';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/',
    title: 'Intelligent Singularity | Software For Universal Access',
    description:
      'A mission-driven studio building AI-augmented software for universal access across business, health, finance, and work.',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">Loading...</div>}>
      <HomeContent locale={locale} />
    </Suspense>
  );
}
