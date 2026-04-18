const VOWELS = /[aeiouy]+/g;

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length <= 3) return 1;
  const cleaned = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const matches = cleaned.match(VOWELS);
  return Math.max(1, matches ? matches.length : 1);
}

export function fleschKincaidGrade(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = trimmed.split(/\s+/).filter((w) => /[a-zA-Z]/.test(w));
  if (sentences.length === 0 || words.length === 0) return 0;
  const totalSyllables = words.reduce((n, w) => n + countSyllables(w), 0);
  const wordsPerSentence = words.length / sentences.length;
  const syllablesPerWord = totalSyllables / words.length;
  return 0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59;
}

export function exceedsGrade(text: string, maxGrade: number): boolean {
  return fleschKincaidGrade(text) > maxGrade;
}
