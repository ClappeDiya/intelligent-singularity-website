import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { TopBar } from '@/components/layout/TopBar';
import { Footer } from '@/components/layout/Footer';
import { ServiceWorkerRegister } from '@/components/layout/ServiceWorkerRegister';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { SkipToContent } from '@/components/layout/SkipToContent';
import { fetchSiteSettings } from '@/lib/payload';
import { bytesToGrams } from '@/lib/carbon';
import { LOCALES, isRtl, type Locale } from '@/i18n/config';
import { loadScriptFont } from '@/app/fonts';
import { HtmlLang } from '@/components/layout/HtmlLang';

export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();

  await loadScriptFont(locale as Locale);

  const fontFamily =
    locale === 'zh-CN'
      ? 'var(--font-sans-cjk)'
      : locale === 'ar'
        ? 'var(--font-sans-arabic)'
        : locale === 'ur'
          ? 'var(--font-sans-nastaliq)'
          : locale === 'hi'
            ? 'var(--font-sans-devanagari)'
            : locale === 'bn'
              ? 'var(--font-sans-bengali)'
              : undefined;

  const messages = await getMessages();
  const settings = await fetchSiteSettings(locale);
  const estBytes = 48_000;
  const grams = bytesToGrams(estBytes, 0.8);

  return (
    <NextIntlClientProvider messages={messages}>
      <div dir={isRtl(locale as Locale) ? 'rtl' : 'ltr'} style={fontFamily ? { fontFamily } : undefined}>
        <SkipToContent />
        <Suspense>
          <TopBar sizeBytes={estBytes} carbonGrams={grams} locale={locale} />
        </Suspense>
        <ScrollProgress />
        <main id="main-content">{children}</main>
        <Footer
          locale={locale}
          studioBlurb={settings.studioBlurb ?? 'A studio building software for universal access. Incorporated in Alberta, Canada.'}
        />
        <ServiceWorkerRegister />
        <HtmlLang locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
