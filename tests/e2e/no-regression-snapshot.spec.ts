import { test, expect } from '@playwright/test';

// Pages that existed before the six-transparency-pages feature branch.
// A pixel-level diff should be ≈ 0 after the branch merges.
const BASELINE_ROUTES = [
  '/en',
  '/en/about',
  '/en/manifesto',
  '/en/portfolio',
  '/en/pricing',
  '/en/security',
  '/en/green',
  '/en/faq',
  '/en/contact',
  '/en/press',
  '/en/careers',
];

for (const route of BASELINE_ROUTES) {
  test(`baseline route ${route} is visually stable`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1600 });
    await page.goto(route, { waitUntil: 'networkidle' });
    await page.addStyleTag({
      content: `* { animation: none !important; transition: none !important; }`,
    });
    await expect(page).toHaveScreenshot(`${route.replaceAll('/', '_') || 'home'}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
}
