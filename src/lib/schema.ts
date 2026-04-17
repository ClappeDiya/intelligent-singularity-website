import { getSiteUrl } from '@/lib/seo';
import type { Product } from '@/types/cms';

type PageSchemaInput = {
  locale: string;
  pathname: string;
  name: string;
  description: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
};

function pageUrl(locale: string, pathname: string): string {
  const siteUrl = getSiteUrl();
  const normalized = pathname === '/' ? '' : pathname;
  return new URL(`/${locale}${normalized}`, siteUrl).toString();
}

export function getOrganizationSchema() {
  const siteUrl = getSiteUrl().toString().replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: 'Intelligent Singularity',
    url: siteUrl,
    logo: `${siteUrl}/icons/icon-512.png`,
    description: 'A studio building software for universal access.',
    sameAs: [
      'https://github.com/intelligent-singularity',
      'https://clappe.com',
      'https://clapbill.com',
      'https://clapdiet.com',
      'https://clapwork.com',
    ],
    founder: {
      '@id': `${siteUrl}#founder`,
    },
  };
}

export function getWebSiteSchema(locale: string) {
  const siteUrl = getSiteUrl().toString().replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    name: 'Intelligent Singularity',
    url: siteUrl,
    inLanguage: locale,
    publisher: {
      '@id': `${siteUrl}#organization`,
    },
  };
}

export function getFounderSchema() {
  const siteUrl = getSiteUrl().toString().replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}#founder`,
    name: 'Dr. Md Diya',
    jobTitle: 'Founder',
    worksFor: {
      '@id': `${siteUrl}#organization`,
    },
    description:
      'Founder of Intelligent Singularity, building software for universal access with AI-augmented lean operations.',
  };
}

export function getWebPageSchema(input: PageSchemaInput) {
  const { locale, pathname, name, description, type = 'WebPage' } = input;
  const siteUrl = getSiteUrl().toString().replace(/\/$/, '');
  const url = pageUrl(locale, pathname);

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: {
      '@id': `${siteUrl}#website`,
    },
    about: {
      '@id': `${siteUrl}#organization`,
    },
  };
}

export function getPortfolioItemListSchema(params: {
  locale: string;
  products: Product[];
}) {
  const { locale, products } = params;
  const siteUrl = getSiteUrl().toString().replace(/\/$/, '');
  const portfolioUrl = pageUrl(locale, '/portfolio');
  const sorted = [...products].sort((a, b) => a.ordering - b.ordering);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${portfolioUrl}#itemlist`,
    name: 'Intelligent Singularity Product Portfolio',
    numberOfItems: sorted.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    isPartOf: {
      '@id': `${portfolioUrl}#webpage`,
    },
    itemListElement: sorted.map((product, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: product.publicName || product.name,
        applicationCategory:
          typeof product.category === 'object' ? product.category.name : 'BusinessApplication',
        description: product.shortDescription || product.tagline || `${product.name} by Intelligent Singularity.`,
        url: product.outboundURL,
        operatingSystem: 'Web',
        creator: {
          '@id': `${siteUrl}#organization`,
        },
      },
    })),
  };
}

type BreadcrumbCrumb = {
  name: string;
  pathname: string;
};

export function getBreadcrumbSchema(params: {
  locale: string;
  crumbs: BreadcrumbCrumb[];
}) {
  const { locale, crumbs } = params;
  const siteUrl = getSiteUrl();

  const itemListElement = crumbs.map((crumb, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: crumb.name,
    item: pageUrl(locale, crumb.pathname),
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
    isPartOf: {
      '@id': new URL(`/${locale}`, siteUrl).toString(),
    },
  };
}
