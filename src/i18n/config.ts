export const LOCALES = [
  'en',
  'zh-CN',
  'es',
  'hi',
  'ar',
  'fr',
  'pt',
  'bn',
  'ru',
  'ur',
  'id',
  'sw',
  'yo',
  'ha',
] as const;

export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const RTL_LOCALES = new Set<Locale>(['ar', 'ur']);
export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.has(locale);
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  'zh-CN': '中',
  es: 'ES',
  hi: 'हि',
  ar: 'ع',
  fr: 'FR',
  pt: 'PT',
  bn: 'বা',
  ru: 'RU',
  ur: 'ار',
  id: 'ID',
  sw: 'SW',
  yo: 'YO',
  ha: 'HA',
};

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  'zh-CN': '简体中文',
  es: 'Español',
  hi: 'हिन्दी',
  ar: 'العربية',
  fr: 'Français',
  pt: 'Português',
  bn: 'বাংলা',
  ru: 'Русский',
  ur: 'اردو',
  id: 'Bahasa Indonesia',
  sw: 'Kiswahili',
  yo: 'Yorùbá',
  ha: 'Hausa',
};
