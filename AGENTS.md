# AGENTS.md

Codex-facing adapter for the **IS website** (Next.js 16 + Payload CMS 3.82 + next-intl 4.9).

> **Source of truth:** [CLAUDE.md](CLAUDE.md). This file restates the same project knowledge in Codex form. If the two ever drift, CLAUDE.md wins — update this file to match.

## Commands

```bash
# Development
docker compose up -d            # PostgreSQL on port 5433
pnpm dev                        # Turbopack dev server → http://localhost:3000

# Build (webpack — Turbopack has a Payload CMS panic bug)
pnpm build                      # next build --webpack + measure + budget + third-party checks

# Tests
pnpm test                       # Vitest (unit tests in tests/)
pnpm test -- richtext           # Run a single test file by name
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

14-locale CMS-backed website with PWA support. Public pages live under `src/app/(public)/[locale]/`. The proxy ([src/proxy.ts](src/proxy.ts)) handles locale detection, CSP-with-nonces, HSTS, X-Frame-Options, and admin IP lockdown.

**Data flow.** [src/lib/payload.ts](src/lib/payload.ts) exports ~14 cached fetchers (`unstable_cache` with tags). Pages call these in async server components wrapped in `<Suspense>`. CMS edits trigger `/api/revalidate` via a Payload hook, invalidating the relevant cache tags. The layout uses `export const dynamic = 'force-dynamic'`.

**Localization.** 14 locales defined in [src/i18n/config.ts](src/i18n/config.ts). RTL: `ar`, `ur`. UI strings live in `messages/{locale}.json` (26 keys). CMS translations in `src/lib/seed/translations/{locale}.ts`. Locale prefix is `always`.

**Design tokens.** All colors, fonts, spacing as CSS custom properties in [src/styles/tokens.css](src/styles/tokens.css). Dark theme: `--color-ink` (#0F1712) bg, `--color-cream` text, `--color-mint` (#A8E6CF) accents. Fonts statically imported in [src/app/fonts.ts](src/app/fonts.ts).

**Build pipeline.** Production uses `--webpack` (not Turbopack). The build chains: `next build --webpack` → `measure-page-sizes.mjs` → `bundle-budget.mjs` (50 KB/route gzip) → `no-third-party.mjs`.

**PWA.** Hand-written service worker at [public/sw.js](public/sw.js): network-first for HTML, stale-while-revalidate for assets, offline fallback to `/en/offline`. Registered only in production via `ServiceWorkerRegister.tsx`.

## Hard constraints

- **No `cacheComponents: true`** — Payload + Turbopack panic. Use `unstable_cache()`, not the `'use cache'` directive.
- **Prod builds must use `--webpack`** — Turbopack prod crashes with "expected chunkable module for async reference" (payloadcms/payload#14354).
- **Font CSS must be static imports** — dynamic `import()` for CSS breaks under Turbopack.
- **Zero third-party runtime calls** — no external analytics, fonts, or trackers. Enforced by `no-third-party.mjs`.
- **50 KB first-paint budget per route** — enforced by `bundle-budget.mjs`.
- **A11y: WCAG 2.2 AA** — axe-core must show zero violations.

## Environment variables

Required: `DATABASE_URL` (default `postgres://is:dev@localhost:5433/is_dev`), `PAYLOAD_SECRET`, `REVALIDATE_SECRET`, `SMTP_HOST/PORT/USER/PASS/FROM`, `NEXT_PUBLIC_SITE_URL`, `ADMIN_ALLOWED_IPS`.

Never put real values into `.codex/config.toml`. Use `.env.local` (already gitignored) for local secrets.

## Skills available here

Real files live in `.agents/skills/`; Claude Code sees them as symlinks under `.claude/skills/`. Codex should read `SKILL.md` inside any skill folder when the trigger conditions in its description match.

| Skill | Use when |
|---|---|
| `dokploy-deploy` | Deploying to staging or production on Dokploy. Full pipeline — build, push, deploy, verify. |
| `dokploy-ghcr-deploy` | Setting up or executing the GHCR + Dokploy + VPS deploy pipeline (cross-compile, immutable SHA tags, rsync, Traefik SSL, rollback). |
| `e2e-production-verification` | Verifying production after a deploy, before tagging a release, or while investigating a production incident. |

The 45 marketing/design skills from the workspace root (`../.agents/skills/`) are also available — see [../AGENTS.md](../AGENTS.md).

## Phase 4 status

Tasks 1–3, 5–6, 11–12 done. Tasks 4 (Plausible), 7 (Uptime Kuma), 8 (GlitchTip), 9 (backups), 10 (energy verification), 13 (launch) need VPS. Full details in `docs/HANDOFF.md` and `docs/superpowers/plans/2026-04-11-is-website-phase-4-launch-hardening.md`.

## How to add a Codex agent

Codex agents go in `.codex/agents/*.toml` — one file per agent. Format:

```toml
[agent]
name = "agent-name"
description = "one-line trigger summary"
model = "gpt-5-codex"
developer_instructions = """
System prompt body.
"""
```

There are no Claude agents in this project today (no `.claude/agents/` directory), so the `.codex/agents/` folder ships with only a README placeholder.
