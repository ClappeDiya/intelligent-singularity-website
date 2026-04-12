import { Suspense } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { SkipToContent } from '@/components/layout/SkipToContent';
import { fetchSiteSettings } from '@/lib/payload';
import { bytesToGrams } from '@/lib/carbon';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const locale = 'en';
  const settings = await fetchSiteSettings(locale);
  const estBytes = 48_000;
  const greenRatio = 0.8;
  const grams = bytesToGrams(estBytes, greenRatio);

  return (
    <>
      <SkipToContent />
      <Suspense>
        <TopBar sizeBytes={estBytes} carbonGrams={grams} locale={locale} />
      </Suspense>
      <ScrollProgress />
      <main id="main-content">{children}</main>
      <Footer locale={locale} studioBlurb={settings.studioBlurb ?? 'A studio building software for universal access. Incorporated in Alberta, Canada.'} />
    </>
  );
}
