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
import { LOCALES, isRtl, type Locale } from '@/i18n/config';
import { loadScriptFont } from '@/app/fonts';
import { HtmlLang } from '@/components/layout/HtmlLang';
import { JsonLd } from '@/components/seo/JsonLd';
import { getFounderSchema, getOrganizationSchema, getWebSiteSchema } from '@/lib/schema';

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
  const organizationSchema = getOrganizationSchema();
  const webSiteSchema = getWebSiteSchema(locale);
  const founderSchema = getFounderSchema();

  return (
    <NextIntlClientProvider messages={messages}>
      <div dir={isRtl(locale as Locale) ? 'rtl' : 'ltr'} style={fontFamily ? { fontFamily } : undefined}>
        <JsonLd id="org-schema" data={organizationSchema} />
        <JsonLd id={`website-schema-${locale}`} data={webSiteSchema} />
        <JsonLd id="founder-schema" data={founderSchema} />
        <SkipToContent />
        <Suspense>
          <TopBar locale={locale} />
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
