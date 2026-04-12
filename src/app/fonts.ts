/**
 * Per-script font loading for non-Latin locales.
 *
 * Noto Sans (Latin) is imported unconditionally as the base font.
 * Script-specific fonts are dynamically imported based on the current locale
 * so only the relevant font CSS is loaded per page.
 *
 * If Next.js cannot statically resolve the dynamic CSS imports at build time,
 * all fonts will be bundled but only the matching font-family declaration
 * (set in the layout via CSS custom properties) will trigger glyph rendering.
 * All fontsource CSS uses font-display: swap, so text is never invisible.
 */

import '@fontsource-variable/noto-sans/index.css';

import type { Locale } from '@/i18n/config';

type FontImport = () => Promise<unknown>;

const SCRIPT_FONTS: Record<string, FontImport> = {
  cjk: () => import('@fontsource-variable/noto-sans-sc/index.css'),
  devanagari: () => import('@fontsource-variable/noto-sans-devanagari/index.css'),
  arabic: () => import('@fontsource-variable/noto-sans-arabic/index.css'),
  bengali: () => import('@fontsource-variable/noto-sans-bengali/index.css'),
  nastaliqUrdu: () => import('@fontsource-variable/noto-nastaliq-urdu/index.css'),
};

const LOCALE_TO_SCRIPT: Partial<Record<Locale, keyof typeof SCRIPT_FONTS>> = {
  'zh-CN': 'cjk',
  hi: 'devanagari',
  ar: 'arabic',
  ur: 'nastaliqUrdu',
  bn: 'bengali',
};

export async function loadScriptFont(locale: Locale): Promise<void> {
  const script = LOCALE_TO_SCRIPT[locale];
  if (!script) return;
  await SCRIPT_FONTS[script]();
}
