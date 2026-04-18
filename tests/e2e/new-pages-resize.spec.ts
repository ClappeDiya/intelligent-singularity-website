import { test, expect } from '@playwright/test';

const ROUTES = ['/changelog', '/status', '/roadmap', '/insights', '/trust', '/help'];
const LOCALES = ['en', 'ar', 'hi'];
const WIDTHS = [375, 768, 1280];

for (const locale of LOCALES) {
  for (const route of ROUTES) {
    for (const width of WIDTHS) {
      test(`${locale}${route} renders at ${width}px with no horizontal scroll`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`/${locale}${route}`, { waitUntil: 'domcontentloaded' });
        const scrollsHorizontally = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth
        );
        expect(scrollsHorizontally, `horizontal overflow at ${width}px`).toBe(false);
        await expect(page.locator('h1')).toBeVisible();
      });
    }
  }
}

test('drag resize from 1536 to 375 without layout explosion', async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 900 });
  await page.goto('/en/roadmap', { waitUntil: 'domcontentloaded' });
  for (const w of [1280, 1024, 900, 768, 640, 480, 375]) {
    await page.setViewportSize({ width: w, height: 900 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflow, `overflow at ${w}px`).toBe(false);
  }
});
