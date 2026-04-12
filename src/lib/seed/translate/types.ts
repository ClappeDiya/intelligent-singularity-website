import type { Locale } from '@/i18n/config';

export type TranslationInput = {
  sourceKey: string;
  sourceText: string;
  pageRole: 'manifesto' | 'legal-notice' | 'product' | 'hero' | 'label' | 'ui' | 'commitment' | 'itu-fact';
  locale: Locale;
};

export type PassResult = {
  text: string;
  notes?: string;
  pass: 'translate' | 'back-translate' | 'critique' | 'consistency' | 'polish';
};

export type CritiqueRating = {
  naturalness: 1 | 2 | 3 | 4 | 5;
  formality: 1 | 2 | 3 | 4 | 5;
  grammar: 1 | 2 | 3 | 4 | 5;
  culturalFit: 1 | 2 | 3 | 4 | 5;
  reverencePreservation: 1 | 2 | 3 | 4 | 5;
  notes: string;
};

export type FinalTranslation = {
  text: string;
  backTranslation: string;
  critique: CritiqueRating;
  confidence: number; // 0..1
  modelVersion: string;
  translatedAt: string;
  fellBackToEnglish: boolean;
};
