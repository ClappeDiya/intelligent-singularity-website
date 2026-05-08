import { test, expect, type Page, type Locator } from '@playwright/test';

const DESKTOP = { width: 1280, height: 900 };

type Motion = { transform: string; translate: string };

const isIdentity = (m: Motion) =>
  (m.transform === 'none' || m.transform === 'matrix(1, 0, 0, 1, 0, 0)') &&
  (m.translate === 'none' || m.translate === '0px' || m.translate === '');

async function readMotion(locator: Locator): Promise<Motion> {
  return locator.evaluate((el) => {
    const cs = window.getComputedStyle(el);
    return { transform: cs.transform, translate: cs.translate };
  });
}

async function hoverAndRead(page: Page, locator: Locator): Promise<Motion> {
  await locator.hover();
  await page.waitForTimeout(120);
  return readMotion(locator);
}

async function unhover(page: Page) {
  await page.mouse.move(0, 0);
  await page.waitForTimeout(80);
}

test.describe('prefers-reduced-motion — interaction-state transforms', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(DESKTOP);
  });

  test('with reducedMotion=reduce, hovering hero CTA does not move it', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en', { waitUntil: 'networkidle' });

    const cta = page.locator('main a[href="/en/manifesto"]').first();
    await expect(cta).toBeVisible();

    await unhover(page);
    const idle = await readMotion(cta);
    const hovered = await hoverAndRead(page, cta);

    expect(isIdentity(idle)).toBe(true);
    expect(isIdentity(hovered)).toBe(true);
  });

  test('with reducedMotion=no-preference, hovering hero CTA produces a translate', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/en', { waitUntil: 'networkidle' });

    const cta = page.locator('main a[href="/en/manifesto"]').first();
    await expect(cta).toBeVisible();

    await unhover(page);
    const idle = await readMotion(cta);
    const hovered = await hoverAndRead(page, cta);

    expect(isIdentity(idle)).toBe(true);
    expect(isIdentity(hovered)).toBe(false);
    expect(hovered.translate).toMatch(/-?\d/);
  });

  test('with reducedMotion=reduce, .is-card hover does not lift', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en', { waitUntil: 'networkidle' });

    const card = page.locator('.is-card').first();
    if ((await card.count()) === 0) test.skip();
    await expect(card).toBeVisible();
    await card.scrollIntoViewIfNeeded();

    await unhover(page);
    const idle = await readMotion(card);
    const hovered = await hoverAndRead(page, card);

    expect(isIdentity(idle)).toBe(true);
    expect(isIdentity(hovered)).toBe(true);
  });
});
