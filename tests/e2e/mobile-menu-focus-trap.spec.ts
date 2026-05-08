import { test, expect } from '@playwright/test';

const MOBILE = { width: 390, height: 844 };

test.describe('Mobile hamburger menu — focus trap & a11y', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto('/en', { waitUntil: 'networkidle' });
  });

  test('hamburger has correct ARIA and 44×44 touch target', async ({ page }) => {
    const btn = page.locator('button[aria-controls="is-mobile-menu"]');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('aria-expanded', 'false');
    const box = await btn.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  });

  test('clicking hamburger opens dialog, focuses first link, locks scroll', async ({ page }) => {
    const btn = page.locator('button[aria-controls="is-mobile-menu"]');
    await btn.click();
    const dialog = page.locator('#is-mobile-menu');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('role', 'dialog');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(btn).toHaveAttribute('aria-expanded', 'true');

    const overflow = await page.evaluate(() => document.documentElement.style.overflow);
    expect(overflow).toBe('hidden');

    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedTag).toBe('A');
  });

  test('Escape closes dialog and returns focus to hamburger', async ({ page }) => {
    const btn = page.locator('button[aria-controls="is-mobile-menu"]');
    await btn.click();
    await expect(page.locator('#is-mobile-menu')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.locator('#is-mobile-menu')).toHaveCount(0);
    await expect(btn).toHaveAttribute('aria-expanded', 'false');

    const focusReturned = await page.evaluate(
      () => document.activeElement === document.querySelector('button[aria-controls="is-mobile-menu"]'),
    );
    expect(focusReturned).toBe(true);

    const overflow = await page.evaluate(() => document.documentElement.style.overflow);
    expect(overflow).toBe('');
  });

  test('Tab from last focusable wraps to first; Shift+Tab from first wraps to last', async ({ page }) => {
    await page.locator('button[aria-controls="is-mobile-menu"]').click();
    await expect(page.locator('#is-mobile-menu')).toBeVisible();

    const wrapResults = await page.evaluate(() => {
      const dialog = document.getElementById('is-mobile-menu')!;
      const focusables = dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      last.focus();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
      const tabFromLastWraps = document.activeElement === first;

      first.focus();
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }),
      );
      const shiftTabFromFirstWraps = document.activeElement === last;

      return { focusableCount: focusables.length, tabFromLastWraps, shiftTabFromFirstWraps };
    });

    expect(wrapResults.focusableCount).toBeGreaterThan(1);
    expect(wrapResults.tabFromLastWraps).toBe(true);
    expect(wrapResults.shiftTabFromFirstWraps).toBe(true);
  });

  test('clicking a menu link closes the dialog (route change)', async ({ page }) => {
    await page.locator('button[aria-controls="is-mobile-menu"]').click();
    await expect(page.locator('#is-mobile-menu')).toBeVisible();

    await page.locator('#is-mobile-menu a:has-text("About")').first().click();
    await expect(page.locator('#is-mobile-menu')).toHaveCount(0);
    await expect(page.locator('button[aria-controls="is-mobile-menu"]')).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
});
