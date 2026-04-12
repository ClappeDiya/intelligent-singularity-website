/**
 * Sustainable Web Design Model formula (simplified).
 * https://sustainablewebdesign.org/calculating-digital-emissions/
 *
 * gCO2 = pageBytes * (0.81 / 1e9) * (1 - hostingGreenRatio) * 1.02
 */
export function bytesToGrams(bytes: number, hostingGreenRatio: number): number {
  if (bytes <= 0) return 0;
  const PER_GB = 0.81;
  const OVERHEAD = 1.02;
  const dirtyShare = Math.max(0, Math.min(1, 1 - hostingGreenRatio));
  return (bytes / 1_000_000_000) * PER_GB * dirtyShare * OVERHEAD;
}

export function formatCarbon(grams: number): string {
  return `${grams.toFixed(2)} g CO₂`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
