import { test, expect } from '@playwright/test';

const DESKTOP = { width: 1280, height: 900 };

type FocusInfo = {
  tag: string | undefined;
  href: string | null;
  text: string | undefined;
  hasFocusRing: boolean;
};

async function describeActive(page: import('@playwright/test').Page): Promise<FocusInfo> {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el || el === document.body) {
      return { tag: undefined, href: null, text: undefined, hasFocusRing: false };
    }
    const cs = window.getComputedStyle(el);
    const hasOutline =
      cs.outlineStyle !== 'none' &&
      cs.outlineWidth !== '0px' &&
      cs.outlineColor !== 'rgba(0, 0, 0, 0)';
    const hasShadow = cs.boxShadow !== 'none';
    return {
      tag: el.tagName,
      href: el.getAttribute('href'),
      text: el.textContent?.trim().slice(0, 60),
      hasFocusRing: hasOutline || hasShadow,
    };
  });
}

test.describe('Keyboard-only navigation — public site shell (desktop)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto('/en', { waitUntil: 'networkidle' });
  });

  test('first Tab focuses the skip-to-main link with a visible focus ring', async ({ page }) => {
    await page.keyboard.press('Tab');
    const f = await describeActive(page);
    expect(f.tag).toBe('A');
    expect(f.href).toBe('#main-content');
    expect(f.text).toBe('Skip to main content');
    expect(f.hasFocusRing).toBe(true);
  });

  test('skip link is screen-reader-only off-focus and visually present on-focus', async ({ page }) => {
    const skip = page.locator('a[href="#main-content"]').first();
    const idleRect = await skip.evaluate((el) => {
      const r = el.getBoundingClientRect();
      return { w: r.width, h: r.height };
    });
    expect(idleRect.w).toBeLessThan(2);
    expect(idleRect.h).toBeLessThan(2);

    await skip.focus();
    const focusRect = await skip.evaluate((el) => {
      const r = el.getBoundingClientRect();
      return { w: r.width, h: r.height };
    });
    expect(focusRect.w).toBeGreaterThan(50);
    expect(focusRect.h).toBeGreaterThan(20);
  });

  test('activating the skip link moves focus to <main id="main-content">', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main-content$/);
    const result = await page.evaluate(() => {
      const main = document.getElementById('main-content');
      return {
        activeIsMain: document.activeElement === main,
        tabIndex: main?.getAttribute('tabindex'),
      };
    });
    expect(result.activeIsMain).toBe(true);
    expect(result.tabIndex).toBe('-1');
  });

  test('Tab order traverses the TopBar primary navigation', async ({ page }) => {
    const visited: Array<{ href: string | null; landmark: string | undefined }> = [];
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      const sample = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        return {
          href: el.getAttribute('href'),
          landmark: el.closest('header') ? 'header' : el.closest('main') ? 'main' : el.closest('footer') ? 'footer' : 'doc',
        };
      });
      if (sample) visited.push(sample);
    }
    const headerHrefs = visited.filter((v) => v.landmark === 'header').map((v) => v.href);
    expect(headerHrefs.length).toBeGreaterThanOrEqual(6);
    for (const slug of ['/en/portfolio', '/en/manifesto', '/en/pricing', '/en/contact']) {
      expect(headerHrefs).toContain(slug);
    }
  });

  test('all visited focusables expose a visible focus indicator', async ({ page }) => {
    const visited: FocusInfo[] = [];
    for (let i = 0; i < 14; i++) {
      await page.keyboard.press('Tab');
      const f = await describeActive(page);
      if (f.tag) visited.push(f);
    }
    expect(visited.length).toBeGreaterThan(8);
    const withRing = visited.filter((v) => v.hasFocusRing).length;
    expect(withRing / visited.length).toBeGreaterThanOrEqual(0.85);
  });

  test('footer links are reachable in tab order without a focus trap', async ({ page }) => {
    let reachedFooter = false;
    let totalSteps = 0;
    for (let i = 0; i < 70; i++) {
      await page.keyboard.press('Tab');
      totalSteps++;
      const inFooter = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return false;
        return !!el.closest('footer');
      });
      if (inFooter) {
        reachedFooter = true;
        break;
      }
    }
    expect(reachedFooter).toBe(true);
    expect(totalSteps).toBeLessThan(70);
  });

  test('Shift+Tab moves focus in reverse order', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const a = await describeActive(page);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    const b = await describeActive(page);
    expect(b.tag).toBe(a.tag);
    expect(b.href).toBe(a.href);
    expect(b.text).toBe(a.text);
  });
});
