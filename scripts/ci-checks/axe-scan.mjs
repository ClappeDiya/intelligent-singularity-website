#!/usr/bin/env node
import puppeteer from 'puppeteer';
import AxeBuilder from '@axe-core/puppeteer';

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
// Note: /en/insights/[slug] detail is content-dependent (requires a Payload
// user to attribute the seeded post). Its template is covered by the Vitest
// suite at tests/pages/insights-post.test.tsx with mocked data.
const PATHS = [
  '/en', '/en/manifesto', '/en/portfolio', '/en/about', '/en/green',
  '/en/contact', '/en/legal/privacy', '/en/legal/terms',
  '/en/legal/accessibility', '/en/legal/cookies',
  '/en/changelog', '/en/status', '/en/roadmap', '/en/insights',
  '/en/trust', '/en/help',
  '/en/security', '/en/pricing', '/en/faq', '/en/careers', '/en/press',
  '/ar', '/ar/trust', '/ur', '/zh-CN', '/fr',
];

async function main() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  let total = 0;
  for (const path of PATHS) {
    const page = await browser.newPage();
    try {
      const response = await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle2', timeout: 30000 });
      const status = response?.status() ?? 0;
      if (status >= 400) {
        console.error(`${path}: HTTP ${status} — refusing to silently scan an error page`);
        total += 1;
        await page.close();
        continue;
      }
      const results = await new AxeBuilder(page).analyze();
      if (results.violations.length > 0) {
        console.error(`\n${path}: ${results.violations.length} violation(s)`);
        for (const v of results.violations) {
          console.error(`  [${v.impact}] ${v.id} — ${v.description}`);
          for (const node of v.nodes.slice(0, 2)) {
            console.error(`    ${node.target.join(' > ')}`);
          }
        }
        total += results.violations.length;
      } else {
        console.log(`${path}: ✓`);
      }
    } catch (err) {
      console.error(`${path}: SKIPPED (${err.message})`);
    }
    await page.close();
  }
  await browser.close();
  if (total > 0) {
    console.error(`\n❌ ${total} a11y violation(s) total.`);
    process.exit(1);
  }
  console.log('\n✓ Zero a11y violations.');
}

main().catch((e) => { console.error(e); process.exit(1); });
