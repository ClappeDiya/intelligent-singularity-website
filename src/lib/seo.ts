import type { Metadata } from 'next';
import { LOCALES } from '@/i18n/config';

const DEV_FALLBACK_SITE_URL = 'http://localhost:3000';

export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;

  if (!raw) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'NEXT_PUBLIC_SITE_URL is required in production for canonical URLs and structured data.'
      );
    }
    return new URL(DEV_FALLBACK_SITE_URL);
  }

  try {
    const parsed = new URL(raw);
    if (process.env.NODE_ENV === 'production' && parsed.hostname === 'localhost') {
      throw new Error('NEXT_PUBLIC_SITE_URL cannot use localhost in production.');
    }
    return parsed;
  } catch {
    throw new Error(
      'NEXT_PUBLIC_SITE_URL must be a valid absolute URL (e.g. https://intelligentsingularity.com).'
    );
  }
}

function normalizePath(pathname: string): string {
  if (!pathname) return '';
  if (pathname === '/') return '';
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

function localePath(locale: string, pathname: string): string {
  const normalized = normalizePath(pathname);
  return `/${locale}${normalized}`;
}

export function buildLocaleAlternates(pathname: string): Record<string, string> {
  const siteUrl = getSiteUrl();
  return LOCALES.reduce<Record<string, string>>((acc, locale) => {
    const url = new URL(localePath(locale, pathname), siteUrl);
    acc[locale] = url.toString();
    return acc;
  }, {});
}

export function buildPageMetadata(params: {
  locale: string;
  pathname: string;
  title: string;
  description: string;
  noindex?: boolean;
}): Metadata {
  const { locale, pathname, title, description, noindex = false } = params;
  const siteUrl = getSiteUrl();
  const canonical = new URL(localePath(locale, pathname), siteUrl).toString();
  const alternates = buildLocaleAlternates(pathname);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: 'Intelligent Singularity',
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : undefined,
  };
}
