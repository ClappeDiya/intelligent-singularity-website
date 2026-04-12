# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
docker compose up -d            # PostgreSQL on port 5433
pnpm dev                        # Turbopack dev server → http://localhost:3000

# Build (webpack — Turbopack has a Payload CMS panic bug)
pnpm build                      # next build --webpack + measure + budget + third-party checks

# Tests
pnpm test                       # Vitest (unit tests in tests/)
pnpm test -- richtext           # Run single test file by name
pnpm a11y                       # axe-core scan (needs running server on :3000)
pnpm lighthouse                 # Lighthouse CI (auto-starts its own server)

# Linting & types
pnpm lint                       # ESLint on src/
pnpm type-check                 # tsc --noEmit

# Seeding
curl -X POST http://localhost:3000/api/seed          # English content
bash scripts/seed-all-translations.sh                 # All 13 locales
```

## Architecture

**Next.js 16 + Payload CMS 3.82 + next-intl 4.9** — 14-locale CMS-backed website with PWA support.

### Routing

All public pages live under `src/app/(public)/[locale]/`. The proxy (`src/proxy.ts`) handles locale detection via next-intl middleware, security headers (CSP with nonces, HSTS, X-Frame-Options), and admin IP lockdown. Static files (`manifest.webmanifest`, `sw.js`, `icons/`) are excluded from the proxy matcher.

### Data Flow

`src/lib/payload.ts` exports ~14 cached fetcher functions (all `unstable_cache` with tags). Pages call these in async server components wrapped in `<Suspense>`. CMS edits trigger `/api/revalidate` via a Payload hook, which invalidates the relevant cache tags. The layout uses `export const dynamic = 'force-dynamic'` because all pages need the database.

### Localization

14 locales defined in `src/i18n/config.ts`. RTL locales: `ar`, `ur`. UI strings in `messages/{locale}.json` (26 keys). CMS content translations in `src/lib/seed/translations/{locale}.ts`. Locale prefix is `always` — every route starts with `/en/`, `/ar/`, etc.

### Design Tokens

All colors, fonts, and spacing are CSS custom properties in `src/styles/tokens.css`. The palette is dark-theme: `--color-ink` (#0F1712) background, `--color-cream` text, `--color-mint` (#A8E6CF) accents. Font stack: Noto Sans (Latin) + per-script variants for CJK, Arabic, Devanagari, Bengali, Nastaliq Urdu — all imported statically in `src/app/fonts.ts`.

### Build Pipeline

Production builds use `--webpack` (not Turbopack) due to a Payload CMS incompatibility. The build chains: `next build --webpack` → `measure-page-sizes.mjs` (writes `.next/page-sizes.json`) → `bundle-budget.mjs` (50 KB/route gzip limit) → `no-third-party.mjs` (blocks analytics/tracker hosts in bundles).

### PWA

Hand-written service worker at `public/sw.js` — network-first for HTML, stale-while-revalidate for assets, offline fallback to `/en/offline`. Registered only in production via `ServiceWorkerRegister.tsx`.

## Key Constraints

- **No `cacheComponents: true`** — disabled because Payload + Turbopack panics. All caching uses `unstable_cache()` instead of `'use cache'` directive. Re-enable when Payload releases a fix.
- **Prod builds must use `--webpack`** — Turbopack production builds crash with "expected chunkable module for async reference" (github.com/payloadcms/payload/issues/14354).
- **Font CSS must be static imports** — dynamic `import()` for CSS doesn't work with Turbopack. All font CSS is imported in `src/app/fonts.ts`.
- **Zero third-party runtime calls** — no external analytics, fonts, or trackers. Enforced by `no-third-party.mjs` CI gate.
- **50 KB first-paint budget** — enforced per-route by `bundle-budget.mjs`.
- **A11y: WCAG 2.2 AA** — axe-core must show zero violations. Contrast tokens are tuned for this.

## Environment Variables

Required: `DATABASE_URL` (default `postgres://is:dev@localhost:5433/is_dev`), `PAYLOAD_SECRET`, `REVALIDATE_SECRET`, `SMTP_HOST/PORT/USER/PASS/FROM`, `NEXT_PUBLIC_SITE_URL`, `ADMIN_ALLOWED_IPS`.

## Phase 4 Status

Tasks 1-3, 5-6, 11-12 done. Tasks 4 (Plausible), 7 (Uptime Kuma), 8 (GlitchTip), 9 (backups), 10 (energy verification), 13 (launch) need VPS. Full details in `docs/HANDOFF.md` and `docs/superpowers/plans/2026-04-11-is-website-phase-4-launch-hardening.md`.
