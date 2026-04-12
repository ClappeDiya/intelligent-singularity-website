import type { Locale } from '@/i18n/config';

export type CulturalRule = {
  locale: Locale;
  register: string;
  script: string;
  rtl: boolean;
  notes: string;
};

export const CULTURAL_RULES: Record<Locale, CulturalRule> = {
  en: {
    locale: 'en',
    register: 'Formal, reverent, declarative',
    script: 'Latin',
    rtl: false,
    notes: 'Source of truth.',
  },
  'zh-CN': {
    locale: 'zh-CN',
    register: 'Formal professional \u4E66\u9762\u8BED',
    script: 'Simplified Chinese',
    rtl: false,
    notes: 'Use \u60A8 (formal you). Brand names stay in Latin.',
  },
  es: {
    locale: 'es',
    register: 'Formal, usted',
    script: 'Latin',
    rtl: false,
    notes: 'RAE-aligned Castilian. Inclusive gender forms where natural.',
  },
  hi: {
    locale: 'hi',
    register: 'Formal \u0906\u092A',
    script: 'Devanagari',
    rtl: false,
    notes: 'Sanskrit-leaning vocabulary for gravitas; avoid English loanwords where natural Hindi exists.',
  },
  ar: {
    locale: 'ar',
    register: 'Modern Standard Arabic (MSA)',
    script: 'Arabic',
    rtl: true,
    notes: 'Formal MSA only, never colloquial. Brand names transliterated alongside Latin form.',
  },
  fr: {
    locale: 'fr',
    register: 'Formal vous',
    script: 'Latin',
    rtl: false,
    notes: 'Include French-Canadian spellings where they differ from France French.',
  },
  pt: {
    locale: 'pt',
    register: 'Formal',
    script: 'Latin',
    rtl: false,
    notes: 'Brazilian spelling default (majority of Portuguese speakers).',
  },
  bn: {
    locale: 'bn',
    register: 'Formal \u0986\u09AA\u09A8\u09BF',
    script: 'Bengali',
    rtl: false,
    notes: 'Use Bangla script. Numerals: use Western digits for the counter (decision).',
  },
  ru: {
    locale: 'ru',
    register: 'Formal \u0412\u044B',
    script: 'Cyrillic',
    rtl: false,
    notes: 'Standard literary Russian.',
  },
  ur: {
    locale: 'ur',
    register: 'Formal \u0622\u067E',
    script: 'Nastaliq',
    rtl: true,
    notes: 'Noto Nastaliq Urdu font required. Prefer Persian-Arabic roots over Sanskrit loans.',
  },
  id: {
    locale: 'id',
    register: 'Formal Anda',
    script: 'Latin',
    rtl: false,
    notes: 'Standard Bahasa Indonesia.',
  },
  sw: {
    locale: 'sw',
    register: 'Formal (Kiswahili Sanifu)',
    script: 'Latin',
    rtl: false,
    notes: 'East-African standard. Handle noun-class system correctly.',
  },
  yo: {
    locale: 'yo',
    register: 'Formal',
    script: 'Latin with tone marks',
    rtl: false,
    notes: 'DIACRITICS ARE SEMANTIC \u2014 never drop tone marks. Use proper \u1EB8 \u1ECC \u1E62 characters.',
  },
  ha: {
    locale: 'ha',
    register: 'Formal',
    script: 'Boko (Latin)',
    rtl: false,
    notes: 'Hooked letters \u0253 \u0257 \u0199 required.',
  },
};
