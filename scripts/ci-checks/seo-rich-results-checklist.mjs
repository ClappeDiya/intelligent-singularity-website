#!/usr/bin/env node

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const locales = ['en'];
const routes = ['/', '/manifesto', '/portfolio', '/about', '/green', '/contact', '/legal/privacy'];

function buildUrl(locale, route) {
  const base = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  return `${base}/${locale}${route === '/' ? '' : route}`;
}

console.log('SEO Rich Results Validation Checklist');
console.log('====================================');
console.log(`Base URL: ${siteUrl}`);
console.log('');
console.log('Run each URL through Google Rich Results Test:');
console.log('https://search.google.com/test/rich-results');
console.log('');

for (const locale of locales) {
  console.log(`Locale: ${locale}`);
  for (const route of routes) {
    console.log(`- ${buildUrl(locale, route)}`);
  }
  console.log('');
}

console.log('Validation checklist:');
console.log('- Organization, WebSite, and Person entities are detected');
console.log('- WebPage or specialized page schema is detected per route');
console.log('- BreadcrumbList is detected on inner pages');
console.log('- Portfolio ItemList and SoftwareApplication entries are detected');
console.log('- No critical Rich Results parsing errors');
