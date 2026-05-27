import sizes from '@/lib/generated/page-sizes.json';

const SIZES = sizes as Record<string, number>;

export const PAGE_SIZE_BUDGET = 50_000;

/**
 * Returns the measured gzip first-paint bytes for a locale-prefixed route
 * (e.g. "/en/green"), falling back to the same route on /en, then null
 * when no measurement exists.
 *
 * Data source: `src/lib/generated/page-sizes.json`, a tracked snapshot
 * produced by `scripts/ci-checks/measure-route-payloads.mjs` during the
 * full `pnpm build`. Regenerate by running `pnpm build` then copying
 * `.next/page-sizes.json` over `src/lib/generated/page-sizes.json` and
 * committing.
 */
export function getPageBytes(localePrefixedRoute: string): number | null {
  if (localePrefixedRoute in SIZES) return SIZES[localePrefixedRoute];
  const englishFallback = localePrefixedRoute.replace(/^\/[a-z]{2}(?:-[A-Z]{2})?/, '/en');
  if (englishFallback in SIZES) return SIZES[englishFallback];
  return null;
}
