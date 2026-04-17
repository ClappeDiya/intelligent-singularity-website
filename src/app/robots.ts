import type { MetadataRoute } from 'next';
import { LOCALES } from '@/i18n/config';
import { getSiteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl().toString().replace(/\/$/, '');
  const offlineDisallow = LOCALES.map((locale) => `/${locale}/offline`);

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', ...offlineDisallow],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
