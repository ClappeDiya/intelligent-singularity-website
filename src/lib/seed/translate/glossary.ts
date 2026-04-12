import type { Locale } from '@/i18n/config';

export type GlossaryEntry = {
  source: string;
  rule: 'never-translate' | 'transliterate-if-script-differs' | 'hand-tuned' | 'localize';
  notes: string;
  perLocale?: Partial<Record<Locale, string>>;
};

export const GLOSSARY: GlossaryEntry[] = [
  {
    source: 'Intelligent Singularity Inc.',
    rule: 'never-translate',
    notes: 'Legal entity name. Transliterate only where script differs.',
  },
  {
    source: 'Intelligent Singularity',
    rule: 'never-translate',
    notes: 'Brand name. Transliterate only where script differs.',
  },
  {
    source: 'studio',
    rule: 'hand-tuned',
    notes:
      'Translate to the locale\u2019s equivalent of a creative/engineering studio with "small team building many things" connotation. Must NOT evoke "photo studio" or "recording studio". Verify via native-reader pass.',
    perLocale: {
      fr: 'studio',
      es: 'estudio',
      pt: 'est\u00fadio',
      'zh-CN': '\u5DE5\u4F5C\u5BA4',
      ru: '\u0441\u0442\u0443\u0434\u0438\u044F',
    },
  },
  {
    source: 'Clappe',
    rule: 'never-translate',
    notes: 'Product brand.',
  },
  {
    source: 'ClapBill',
    rule: 'never-translate',
    notes: 'Product brand.',
  },
  {
    source: 'Clapwork',
    rule: 'never-translate',
    notes: 'Product brand.',
  },
  {
    source: 'ClapDiet',
    rule: 'never-translate',
    notes: 'Product brand.',
  },
  {
    source: 'ClapMove',
    rule: 'never-translate',
    notes: 'Product brand. Keep even when "Joint Exercise" is localized.',
  },
  {
    source: 'Joint Exercise',
    rule: 'localize',
    notes: 'Public product name. Localize as the clinical phrase for joint-mobility exercise in each language.',
  },
  {
    source: 'We exist until this number is zero.',
    rule: 'hand-tuned',
    notes: 'Vow tone preservation is mandatory; back-translation must preserve the "until X happens, we remain" grammar.',
  },
  {
    source: '2.2 billion people still offline',
    rule: 'hand-tuned',
    notes:
      'Use the locale\u2019s long/short scale convention. German-family: Milliarde, not billion. Verify numerals per locale (Bengali may use Bengali numerals).',
  },
  {
    source: 'Every business deserves great software.',
    rule: 'hand-tuned',
    notes: 'Declarative tone preservation; not a suggestion, a statement.',
  },
  {
    source: 'Democratization Pledge',
    rule: 'hand-tuned',
    notes:
      'Use the locale\u2019s most natural rendering of "democratization" that does NOT imply electoral democracy \u2014 verify via critic pass.',
  },
  {
    source: 'ITU Facts and Figures 2025',
    rule: 'never-translate',
    notes: 'UN body and report name. Keep as is; do not translate the year.',
  },
  {
    source: 'Alberta',
    rule: 'never-translate',
    notes: 'Place name.',
  },
  {
    source: 'Canada',
    rule: 'never-translate',
    notes: 'Place name.',
  },
];
