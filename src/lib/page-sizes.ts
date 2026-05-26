import fs from 'node:fs';
import path from 'node:path';

let cache: Record<string, number> | null = null;

function load(): Record<string, number> {
  if (cache) return cache;
  try {
    const file = path.join(process.cwd(), '.next/page-sizes.json');
    cache = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    cache = {};
  }
  return cache!;
}

export const PAGE_SIZE_BUDGET = 50_000;

/**
 * Returns the measured gzip first-paint bytes for a locale-prefixed route
 * (e.g. "/en/green"), falling back to the same route on /en, then null
 * when nothing has been measured (typically dev mode with no prior build).
 */
export function getPageBytes(localePrefixedRoute: string): number | null {
  const sizes = load();
  if (localePrefixedRoute in sizes) return sizes[localePrefixedRoute];
  const englishFallback = localePrefixedRoute.replace(/^\/[a-z]{2}(?:-[A-Z]{2})?/, '/en');
  if (englishFallback in sizes) return sizes[englishFallback];
  return null;
}
