# Intelligent Singularity Website — Agent Handoff Document
**Date:** 2026-04-12
**Project:** /Users/md/Documents/Md/Intelligent-singularity/intelligent-singularity-website

---

## Tech Stack
- **Framework:** Next.js 16.2.3 (Turbopack dev, webpack prod builds)
- **CMS:** Payload CMS 3.82.1 with PostgreSQL adapter
- **i18n:** next-intl 4.9.1 — 14 locales (en + 13 translations)
- **Styling:** Tailwind CSS 4.2 + custom CSS tokens in `src/styles/tokens.css`
- **DB:** PostgreSQL running in Docker on port 5433 (`docker compose` in project root)
- **Node:** Requires >=22 (engines field says 24 but 22 works)

---

## What Has Been Completed

### Phase 1–2 (Prior sessions)
- Full website built: homepage, manifesto, portfolio, about, green, contact, legal pages
- Payload CMS schema with globals + collections for all content
- 14-locale i18n with next-intl routing and Payload CMS localization
- Language wheel component with cookie persistence
- RTL support for Arabic + Urdu (logical CSS properties)
- Security: CSP, HSTS, admin lockdown via proxy.ts, honeypot routes
- English seed data for all 23 products, 9 commitments, globals

### Phase 3 — Translations (Completed)
- All 13 target locales translated via AI pipeline (zh-CN, es, hi, ar, fr, pt, bn, ru, ur, id, sw, yo, ha)
- UI message JSON files: `messages/{locale}.json` (26 keys each)
- CMS content: `src/lib/seed/translations/{locale}.ts` (homepage, siteSettings, manifesto, about, green, contact, commitments[9], products[23], categories[7])
- Seed route: `src/app/api/seed-translations/route.ts`
- Batch seed script: `scripts/seed-all-translations.sh`
- Known data issue: Arabic/French hero_label may show incorrect values (needs verification after DB reseed)

### Phase 4 — Launch Hardening (Partially Completed)

**DONE:**

| # | Task | Files Created/Modified |
|---|------|-----------------------|
| 1 | Lexical Rich-Text Serializer | `src/lib/richtext.ts`, `src/components/richtext/LexicalRenderer.tsx` |
| 2 | Per-request byte measurement | `scripts/measure-page-sizes.mjs`, `src/instrumentation.ts` |
| 3 | PWA manifest + service worker + offline | `public/manifest.webmanifest`, `public/sw.js`, `public/icons/` (3 PNGs), `scripts/gen-icons.mjs`, `src/app/(public)/[locale]/offline/page.tsx`, `src/components/layout/ServiceWorkerRegister.tsx` |
| 5 | CI budget + third-party checks | `scripts/ci-checks/bundle-budget.mjs`, `scripts/ci-checks/no-third-party.mjs` |
| 6 | axe-core a11y audit | `scripts/ci-checks/axe-scan.mjs` — zero violations across 11 paths |
| 11 | Lighthouse CI gate | `.lighthouserc.json` — passing all assertions |
| 12 | Launch checklist runbooks | `docs/runbooks/launch-checklist.md`, `docs/runbooks/rollback.md`, `docs/runbooks/secret-rotation.md` |

**NOT DONE (need VPS):**

| # | Task | What's Needed |
|---|------|---------------|
| 4 | Plausible self-hosted analytics | VPS with Dokploy. Code ready to write: `src/app/api/event/route.ts` (proxy), `src/lib/analytics.ts`, `src/components/layout/PageviewTracker.tsx`. Need to deploy Plausible Docker Compose on VPS. |
| 7 | Uptime Kuma monitoring | VPS with Dokploy. Deploy `louislam/uptime-kuma:latest`, add monitors for all endpoints, configure SMTP alerts. Doc: `infra/monitoring/uptime-kuma.md` |
| 8 | GlitchTip error tracking | VPS with Dokploy. Deploy GlitchTip, install `@sentry/nextjs`, init in `src/instrumentation.ts`, create `src/app/global-error.tsx`. |
| 9 | Daily encrypted Postgres backups | VPS access. Script: `scripts/backup-postgres.sh` (pg_dump + age encrypt + scp to Audiflo secondary). Cron at 3am. |
| 10 | Contabo DC energy verification | Query Green Web Foundation API, verify Contabo sustainability claims, update green page data. |
| 13 | Launch — run checklist + tag v1.0.0 | Walk `docs/runbooks/launch-checklist.md`, final deploy, smoke test, announce. |

---

## Critical Build Notes

### Turbopack Production Build Bug
**Problem:** `cacheComponents: true` + `withPayload()` causes Turbopack panic: "expected chunkable module for async reference"
**Fix applied:** Build uses `--webpack` flag: `"build": "next build --webpack && ..."`
**Root cause:** Known Payload+Turbopack incompatibility (https://github.com/payloadcms/payload/issues/14354)
**Dev mode:** Turbopack works fine for `next dev`

### Cache Components Disabled
**Problem:** `cacheComponents: true` was enabled but caused prerender errors with Payload CMS data access
**Fix applied:** Disabled `cacheComponents` in `next.config.ts`, converted all `'use cache'` directives in `src/lib/payload.ts` to `unstable_cache()` calls
**Impact:** Caching still works via `unstable_cache` with tags and revalidation. Can re-enable `cacheComponents` when Payload releases a compatible version.

### Font Loading
**Problem:** Dynamic `import()` for CSS font files doesn't work with Turbopack
**Fix applied:** All font CSS imported statically in `src/app/fonts.ts`. Font files still load on-demand (browser only fetches glyphs when rendered).

### Build Pipeline
The full build command chains these steps:
```
next build --webpack
  → node scripts/measure-page-sizes.mjs
  → node scripts/ci-checks/bundle-budget.mjs
  → node scripts/ci-checks/no-third-party.mjs
```

### npm Scripts
```
pnpm dev          # Turbopack dev server
pnpm build        # Webpack prod build + CI checks
pnpm start        # Serve production build
pnpm a11y         # axe-core scan (needs running server on :3000)
pnpm lighthouse   # Lighthouse CI (starts its own server)
pnpm test         # Vitest
pnpm seed         # English seed data
```

---

## A11y Fixes Applied This Session
- Added `lang="en"` to root `<html>` + `HtmlLang` client component sets locale dynamically
- Bumped `--color-cream-faint` from 0.28 to 0.50 opacity (contrast fix)
- Bumped `--color-mint-dim` from 0.35 to 0.55 opacity (contrast fix)
- Changed footer `<h4>` tags to `<div>` (heading order fix)
- Added sr-only `<h1>` to homepage hero
- Fixed `ProductSeed` type: `status` → `productStatus`

---

## How to Start Development

```bash
cd /Users/md/Documents/Md/Intelligent-singularity/intelligent-singularity-website

# Start PostgreSQL (if not running)
docker compose up -d

# Start dev server
pnpm dev
# → http://localhost:3000

# If DB is empty, seed English content:
curl -X POST http://localhost:3000/api/seed

# Seed all translations:
bash scripts/seed-all-translations.sh
```

---

## Key File Locations

| Purpose | Path |
|---------|------|
| Next.js config | `next.config.ts` |
| Payload config | `src/payload/payload.config.ts` |
| Proxy/middleware | `src/proxy.ts` |
| i18n config | `src/i18n/config.ts`, `src/i18n/routing.ts`, `src/i18n/request.ts` |
| CMS data fetchers | `src/lib/payload.ts` |
| CSS tokens | `src/styles/tokens.css` |
| Font loading | `src/app/fonts.ts` |
| Locale layout | `src/app/(public)/[locale]/layout.tsx` |
| Translation files | `src/lib/seed/translations/{locale}.ts` |
| UI messages | `messages/{locale}.json` |
| CI check scripts | `scripts/ci-checks/` |
| Runbooks | `docs/runbooks/` |
| Phase 4 plan | `docs/superpowers/plans/2026-04-11-is-website-phase-4-launch-hardening.md` |

---

## Server Credentials (for VPS tasks)

See `~/.claude/CLAUDE.md` for production and staging server SSH credentials, Coolify dashboard URLs, and database server details.

---

## What the Next Agent Should Do

1. **If user provides VPS details:** Implement Tasks 4, 7, 8, 9, 10, 13 from the Phase 4 plan
2. **If user wants to commit:** All Phase 4 work is uncommitted — stage and commit the changes
3. **Before any work:** Run `docker compose up -d` and `pnpm dev` to verify the environment is healthy
