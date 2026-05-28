---
name: dokploy-ghcr-deploy
description: "GHCR + Dokploy + Docker Swarm deploy pipeline for the Intelligent Singularity (IS) website. Use when setting up or executing a deploy, when asked to 'deploy IS', 'ship to prod', 'run dokploy-ghcr-deploy', 'release IS website', or when configuring/running the Next.js + Payload CMS production pipeline at intelligentsingularityinc.com. Tech stack: Next.js 16 + Payload CMS 3.82 + PostgreSQL + Docker Swarm + GHCR + Dokploy (Traefik only)."
user_invocable: true
---

# GHCR + Dokploy + Swarm Deploy Pipeline -- Intelligent Singularity Website Edition

> **Audience:** AI agents or operators executing a production deploy of
> the Intelligent Singularity website where the constraints are:
>
> - Next.js 16 + Payload CMS 3.82 monolith (one container, no separate API)
> - 14 locales (incl. RTL: ar, ur), 24+ public routes
> - Self-hosted on a single Dokploy host (184.70.179.66)
> - Service runs as **Docker Swarm** (`is-website-gbydeh`) — not docker-compose
> - GHCR (GitHub Container Registry) as the image registry
> - Dokploy is used for **Traefik / SSL only** — not git auto-deploy
> - **No GitHub Actions** (project rule — see memory `feedback_no_github_actions.md`)
> - One local command (`scripts/deploy-prod.sh`) ships end-to-end
> - Local quality gates instead of remote CI
>
> **Status:** Live, battle-tested on production at intelligentsingularityinc.com.
> Last verified deploy: image `prod-20260502-012045-26cea1e` on 2026-05-02.
>
> **Why this shape:** Build on the Dokploy host (faster than M-series Mac
> + better network to GHCR). Source ships as a `git archive` tarball over
> SSH — no `node_modules`, no `.next`, no `.git` shipped. Swarm rolling
> update with `--update-failure-action rollback` keeps a bad release from
> taking the site down. HTTP verify catches RSC errors that pass the
> container healthcheck but break the rendered page.

---

## Table of Contents

1. [When This Skill Applies](#1-when-this-skill-applies)
2. [Architecture](#2-architecture)
3. [IS Project Values](#3-is-project-values)
4. [Prerequisites](#4-prerequisites)
5. [Files In The Repo](#5-files-in-the-repo)
6. [First-Time Setup](#6-first-time-setup)
7. [Routine Deploy](#7-routine-deploy)
8. [Rollback Procedures](#8-rollback-procedures)
9. [Verification Checklist](#9-verification-checklist)
10. [Gotchas & Lessons Learned](#10-gotchas--lessons-learned)
11. [Troubleshooting Matrix](#11-troubleshooting-matrix)
12. [Security Notes](#12-security-notes)
13. [AI Agent Implementation Checklist](#13-ai-agent-implementation-checklist)
14. [Extending The Skill](#14-extending-the-skill)

---

## 1. When This Skill Applies

Use this skill when **all** of the following are true:

- The target is the Intelligent Singularity website (this repo)
- A deploy is wanted to production (`intelligentsingularityinc.com`)
- The operator has SSH credentials for the Dokploy host
- The operator has `gh` CLI authed with `write:packages`
- The deploy must be operator-driven (no remote CI)

If the target is a different project (Nestbitt, Audiflo, ClapDiet, Clappe), use that project's own deploy skill — they have different stacks and different hosts.

If the change has not yet been committed, **commit first** unless the operator explicitly accepts the dirty-tree warning (the script ships HEAD only — uncommitted edits do not ship).

---

## 2. Architecture

```
+--------------------------------------------------------------------------+
|                            OPERATOR LOCAL HOST                           |
|                                                                          |
|  git commit && git push                                                  |
|       |                                                                  |
|       v                                                                  |
|  ./scripts/deploy-prod.sh                                                |
|       |                                                                  |
|       +- 1. scripts/pre-deploy-checks.sh    <- local "CI"                |
|       |     +- pnpm lint                                                 |
|       |     +- pnpm type-check                                           |
|       |     +- pnpm test                                                 |
|       |     +- pnpm verify:authenticity   (seed honesty gate)            |
|       |     +- pnpm readability           (FK grade ≤ 10)                |
|       |     +- pnpm verify:outbound-links (no broken links)              |
|       |                                                                  |
|       +- 2. git archive HEAD | ssh tar -x   (ship source, no junk)       |
|       |                                                                  |
|       +- 3. ssh: docker buildx build --platform linux/amd64 --push       |
|       |        -t ghcr.io/clappediya/is-website:prod-<utc>-<sha>         |
|       |        -t ghcr.io/clappediya/is-website:latest                   |
|       |                                                                  |
|       +- 4. ssh: docker service update --image <full-tag>                |
|       |        --update-failure-action rollback                          |
|       |        is-website-gbydeh                                         |
|       |                                                                  |
|       +- 5. curl https://intelligentsingularityinc.com/en (200 + 0 RSC   |
|       |     error chunks, retried 6 × 15s)                               |
|       |                                                                  |
|       +- 6. cleanup: rm -rf /tmp/is-build-<utc> on host                  |
+--------------------------------------------------------------------------+

       |                                              ^
       | push                                         | pull (auth'd)
       v                                              |
+--------------------+                       +---------------------------+
|    ghcr.io         |                       |  Dokploy host             |
|  clappediya/       |<--------------------->|  184.70.179.66            |
|  intelligent-      |                       |                           |
|   singularity-     |                       |  + Docker Swarm           |
|   website          |                       |  + is-website-gbydeh      |
|                    |                       |    (1 replica)            |
|  prod-<ts>-<sha>   |                       |  + is-db-* (Postgres)     |
|  + :latest         |                       |  + Dokploy Traefik (SSL)  |
|                    |                       +---------------------------+
+--------------------+                                  |
                                                        v
                                              +---------------------+
                                              | intelligent         |
                                              | singularityinc.com  |
                                              | (Traefik + LE TLS)  |
                                              +---------------------+
```

### Why this shape

| Decision | Rationale |
|---|---|
| **Build on the Dokploy host** | Pushes to GHCR finish in ~90s vs ~10+ min from a M-series Mac. The host has the registry creds in `~/.docker/config.json` already and a fat uplink. |
| **`git archive HEAD` over SSH** | Ships only HEAD; no `node_modules`, no `.next`, no `.git`. Faster than rsync, no exclude lists to maintain. |
| **Immutable `prod-<utc>-<sha>` tags** | Rollback is `docker service update --image prod-<old>` or `docker service rollback`. Both pull from GHCR, no rebuild. |
| **`--update-failure-action rollback`** | Swarm auto-reverts if the new task doesn't pass its healthcheck within `--update-monitor 30s`. Cheap insurance. |
| **HTTP verify checks RSC error chunks** | A Server Component throwing at render time can return 200 with an inline `E{"digest":...}` JSON chunk that RSC streams as an error fallback. The container healthcheck does not catch this. We grep for `E{"digest` in the body. |
| **Dokploy for Traefik only** | Dokploy's git-auto-deploy is unreliable. We use it as a managed Traefik + LE provisioner, nothing more. |
| **No GitHub Actions** | Project rule: secrets stay local, no rate limits, simpler mental model. (See `feedback_no_github_actions.md` memory.) |

---

## 3. IS Project Values

These are the **resolved** values. Do not use placeholders — use these literally.

| Parameter | IS Value |
|---|---|
| `PROJECT_NAME` | `intelligent-singularity-website` |
| `GH_NAMESPACE` | `clappediya` (lowercase used in image refs; user is `ClappeDiya`) |
| `DOMAIN` | `intelligentsingularityinc.com` |
| `LOCALE_PREFIX_PATH` | `/en` (homepage = `/en/`, never `/`) |
| `VPS_HOST` | `184.70.179.66` |
| `VPS_USER` | `md` |
| `VPS_PASS` | *(see operator's private CLAUDE.md; pass via `IS_VPS_PASS` env var)* |
| `SERVICE_NAME` | `is-website-gbydeh` |
| `DB_SERVICE_NAME` | `is-db-nksaet` (Payload's Postgres — do NOT touch) |
| `IMAGE_REPO` | `ghcr.io/clappediya/intelligent-singularity-website` |
| `BUILD_PLATFORM` | `linux/amd64` |
| `DOCKERFILE` | `Dockerfile` (repo root, multi-stage: deps → builder → runner) |
| `BUILD_COMMAND` | `pnpm exec next build --webpack` (Turbopack panics with Payload — github.com/payloadcms/payload/issues/14354) |
| `HEALTH_ENDPOINT` | `/api/health` |
| `RSC_ERROR_MARKER` | `E{"digest` (literal byte sequence in body — count must be 0) |
| `IMAGE_TAG_PATTERN` | `prod-YYYYMMDD-HHMMSS-<short-sha>` |
| `LOCALE_COUNT` | 14 (`en`, `fr`, `es`, `de`, `pt`, `it`, `ar`, `ur`, `hi`, `bn`, `zh`, `ja`, `ko`, `ru`) |
| `RTL_LOCALES` | `ar`, `ur` |
| `BUNDLE_BUDGET` | 50 KB gzipped per route (enforced in `pnpm build`) |
| `A11Y_TARGET` | WCAG 2.2 AA, zero axe violations on every route |
| `DOKPLOY_DASHBOARD` | http://184.70.179.66:3000 *(credentials in operator's private CLAUDE.md)* |
| `DOKPLOY_APP_ID` | `XaU9maEwsJ-j55pAi8QUF` |
| `DOKPLOY_PG_COMPOSE_ID` | `jfzt6kF1CEdyFt6A1VCSh` |

---

## 4. Prerequisites

### 4.1 Local machine

```bash
brew install gh sshpass            # macOS
gh auth login --scopes write:packages
gh auth status                     # must show write:packages
```

`pnpm` 9.12.0 + Node 24 (managed via `corepack` — same as the Dockerfile builder).

### 4.2 Dokploy host (one-time)

The host is already set up. Verify with:

```bash
sshpass -p "${IS_VPS_PASS}" ssh -o StrictHostKeyChecking=no md@184.70.179.66 \
  'docker info --format "{{.Swarm.LocalNodeState}}" \
   && docker service ls --filter name=is-website-gbydeh \
   && docker config ls /dev/null 2>&1 \
   && grep -c ghcr.io ~/.docker/config.json'
```

Expected:

- Swarm state: `active`
- One service: `is-website-gbydeh` (replicas 1/1)
- `~/.docker/config.json` contains a `ghcr.io` auth entry (count ≥ 1)

If GHCR auth is missing, re-create it:

```bash
ssh md@184.70.179.66 \
  'gh auth token | docker login ghcr.io -u clappediya --password-stdin'
```

### 4.3 Git repo

Required files (all already committed to this repo):

```
.
├── Dockerfile                      # multi-stage, runner stage has OCI source label
├── scripts/
│   ├── pre-deploy-checks.sh        # 6 local quality gates
│   └── deploy-prod.sh              # one-shot deploy
└── docs/
    └── DEPLOY.md                   # operator runbook
```

### 4.4 DNS

`intelligentsingularityinc.com` (and `www`) point to `184.70.179.66`. Traefik provisions LE certs automatically. No action needed during routine deploys.

---

## 5. Files In The Repo

These are the canonical implementations. Read them in the repo, do not duplicate them in this skill.

| File | Purpose |
|---|---|
| [`Dockerfile`](../../../Dockerfile) | Multi-stage build (deps → builder → runner). Runner has `LABEL org.opencontainers.image.source` so GHCR can link the package. Build cmd is `next build --webpack` (NOT Turbopack). |
| [`scripts/pre-deploy-checks.sh`](../../../scripts/pre-deploy-checks.sh) | Six local gates: lint, type-check, tests, authenticity, readability, outbound-links. Mirrors what the old GitHub Actions workflow used to enforce. |
| [`scripts/deploy-prod.sh`](../../../scripts/deploy-prod.sh) | The one-shot deploy. Reads it before changing it — it is idempotent and the cleanup path runs even on verify failure. |
| [`docs/DEPLOY.md`](../../../docs/DEPLOY.md) | Operator quick-start, env overrides, troubleshooting. Update when the script changes. |

If something seems out of date in this skill versus the live files, **trust the live files** and update the skill.

---

## 6. First-Time Setup

The pipeline is already set up. This section is for re-bootstrapping if everything is lost.

### 6.1 New operator machine

```bash
brew install gh sshpass
gh auth login --scopes write:packages

git clone https://github.com/ClappeDiya/intelligent-singularity-website.git
cd intelligent-singularity-website
pnpm install --frozen-lockfile
pnpm build         # confirms local toolchain is healthy
```

Verify SSH to the host:

```bash
sshpass -p "${IS_VPS_PASS}" ssh -o StrictHostKeyChecking=no md@184.70.179.66 'whoami && uname -a'
```

### 6.2 New Dokploy host (disaster recovery)

Out of scope for routine deploys. The high-level steps:

1. Provision a Linux/amd64 VPS, install Docker, init swarm.
2. Install Dokploy: `curl -sSL https://dokploy.com/install.sh | sh`
3. Deploy a Postgres compose service named `is-db-*` and capture the password into a Dokploy secret.
4. Create a Docker service `is-website-gbydeh` pointing at `ghcr.io/clappediya/intelligent-singularity-website:latest` with env vars (`DATABASE_URL`, `PAYLOAD_SECRET`, `REVALIDATE_SECRET`, `NEXT_PUBLIC_SITE_URL`, `ADMIN_ALLOWED_IPS`, `SMTP_*`).
5. Add Traefik labels in Dokploy for `intelligentsingularityinc.com`.
6. `gh auth token | docker login ghcr.io -u clappediya --password-stdin` on the host.
7. From the operator machine: `IS_VPS_PASS='<pw>' ./scripts/deploy-prod.sh`.

For full DR detail see the existing `dokploy-deploy` skill in this repo.

---

## 7. Routine Deploy

The whole pipeline:

```bash
IS_VPS_PASS='<host-password>' ./scripts/deploy-prod.sh
```

Typical wall time: 4–8 minutes (1–2 min on a warm Docker layer cache). The five phases shown by the script are:

1. Pre-deploy checks
2. Ship source (`git archive` over SSH)
3. Build + push on host
4. `docker service update` with auto-rollback
5. HTTP verify (6 × 15s, expects 200 + zero RSC error chunks)

After step 5 the script prints the new image tag and the rollback command. The remote `/tmp/is-build-<utc>` directory is cleaned regardless of outcome.

If verify fails, the script exits non-zero. The most likely cause is an RSC error in a Server Component — see §10.1.

---

## 8. Rollback Procedures

### 8.1 Last deploy → previous (fastest)

```bash
sshpass -p "${IS_VPS_PASS}" ssh md@184.70.179.66 \
  'docker service rollback is-website-gbydeh'
```

Swarm tracks the previous spec; this re-applies it. Downtime per task: ~15–30s.

### 8.2 Pin to a specific older tag

List recent GHCR tags:

```bash
gh api '/users/ClappeDiya/packages/container/intelligent-singularity-website/versions' \
  --jq '.[] | {name, created_at}' | head -40
```

Then update with the chosen tag:

```bash
sshpass -p "${IS_VPS_PASS}" ssh md@184.70.179.66 \
  "docker service update \
    --image ghcr.io/clappediya/intelligent-singularity-website:prod-YYYYMMDD-HHMMSS-<sha> \
    --update-failure-action rollback \
    --update-monitor 30s \
    is-website-gbydeh"
```

### 8.3 Database / migration rollback

Payload CMS auto-migrates on container start. If a release shipped a destructive Payload schema change (collection or field removal), an image rollback **does not undo the schema change** because Payload won't re-add what was removed. Treat this as an incident — restore from a Postgres dump:

```bash
ssh md@184.70.179.66 \
  'docker exec is-db-* pg_dump -U is is_prod | gzip > /tmp/is-db-$(date -u +%Y%m%d-%H%M%S).sql.gz'
```

If you must restore an older dump, that's a manual operation outside this skill — bring an operator into the loop.

### 8.4 Detecting which image is currently live

```bash
ssh md@184.70.179.66 \
  'docker service inspect is-website-gbydeh \
    --format "{{.Spec.TaskTemplate.ContainerSpec.Image}}"'
```

---

## 9. Verification Checklist

Run after every deploy (the script does the first three automatically; the rest are on demand).

### 9.1 HTTP reachability (homepage + a sampling)

```bash
DOMAIN=https://intelligentsingularityinc.com
for p in /en /en/about /en/portfolio /en/pricing /en/contact /en/manifesto \
         /en/insights /en/roadmap /en/changelog /en/press /en/careers \
         /en/security /en/trust /en/help /en/status /en/green \
         /en/legal/privacy /en/legal/terms /en/legal/accessibility \
         /en/offline /ar /ur; do
  printf "%-35s %s\n" "$p" "$(curl -sS -o /dev/null -w '%{http_code}' --max-time 15 "$DOMAIN$p")"
done
```

Expected: every route `200`. (Some 308 redirects are acceptable on `/` → `/en/`, but the locale-prefixed paths above must be 200.)

### 9.2 Zero RSC error chunks

```bash
curl -sS "$DOMAIN/en" | grep -c 'E{"digest'
```

Expected: `0`. Any number > 0 means a Server Component is throwing — roll back.

### 9.3 Container state

```bash
ssh md@184.70.179.66 \
  'docker service ps is-website-gbydeh \
    --no-trunc --filter desired-state=running \
    --format "table {{.Name}}\t{{.CurrentState}}\t{{.Image}}"'
```

Expected: one task `Running` for ≥30s, image tag matches the one just deployed.

### 9.4 Image tag matches the just-deployed tag

```bash
ssh md@184.70.179.66 \
  'docker service inspect is-website-gbydeh \
    --format "{{.Spec.TaskTemplate.ContainerSpec.Image}}"'
```

Expected: `ghcr.io/clappediya/intelligent-singularity-website:prod-<utc>-<sha>` for the SHA you deployed.

### 9.5 Health endpoint

```bash
curl -sS "$DOMAIN/api/health"
```

Expected: 200 with JSON `{"status":"ok",...}`.

### 9.6 RTL locales render

```bash
curl -sS "$DOMAIN/ar" | grep -c '<html[^>]*dir="rtl"'
curl -sS "$DOMAIN/ur" | grep -c '<html[^>]*dir="rtl"'
```

Expected: `1` for each. Confirms the next-intl middleware is alive.

### 9.7 Container restart count is 0

```bash
ssh md@184.70.179.66 \
  'for c in $(docker ps --filter name=is-website -q); do
     printf "%s restarts=%s\n" "$(docker inspect -f "{{.Name}}" $c)" \
       "$(docker inspect -f "{{.RestartCount}}" $c)"
   done'
```

Expected: all `0`. Anything else means the container is crash-looping post-deploy — investigate logs.

### 9.8 (On-demand) axe + lighthouse

```bash
pnpm a11y         # zero violations on every route
pnpm lighthouse   # perf ≥ 0.90, a11y ≥ 0.95, BP = 1.0, SEO = 1.0
```

Lighthouse takes ~5 min and is not part of every-deploy verification (the gate would slow ship velocity). Run it after substantive UI changes.

---

## 10. Gotchas & Lessons Learned

Every item here is a real incident. If you hit any of these, look here first.

### 10.1 RSC error chunks: 200 OK with broken page

**Symptom:** `curl /en` returns 200, but the page renders an error fallback ("This application encountered an error..."). The body contains `E{"digest":"<id>",...}` JSON chunks streamed by the React Server Components runtime.

**Root cause:** a Server Component threw at render time. Common triggers in this codebase:

- A Server Component component passing `onMouseEnter` / `onMouseLeave` to a child element (RSC may not pass event handlers — they need to be on a Client Component child or replaced with CSS hover).
- A Server Component reading from `unstable_cache` with a tag that no longer exists.
- A Payload fetcher returning a shape the page doesn't expect (e.g., a missing global → empty array consumed as object).

**Fix:** roll back immediately (`docker service rollback is-website-gbydeh`), then reproduce locally. The container healthcheck **does not** catch this — only the script's HTTP verify does.

**Prevention:** when reviewing Server Components, search for event handlers in JSX:
```bash
grep -RnE 'on(Click|MouseEnter|MouseLeave|Change|Submit|Focus|Blur|Key)' \
  src/components --include '*.tsx' \
  | grep -v 'use client'
```
Any hit in a file that does NOT have `'use client'` is a candidate RSC violation.

### 10.2 Cumulative Layout Shift on home page

**Symptom:** Lighthouse home perf < 0.80, CLS ≈ 1.0.

**Root cause:** `<Suspense fallback={<div>Loading...</div>}>` on the home page reserved ~30px while the real hero pushed it to ~100dvh.

**Fix:** the fallback is now `<HomeSkeleton />` which reserves the same `min-h-[100dvh]` shape as the real hero. Don't replace it with a smaller placeholder.

**File:** [`src/components/home/HomeSkeleton.tsx`](../../../src/components/home/HomeSkeleton.tsx) and [`src/app/(public)/[locale]/page.tsx`](../../../src/app/(public)/[locale]/page.tsx).

### 10.3 Turbopack production build crashes

**Symptom:** `pnpm exec next build` panics with `expected chunkable module for async reference`.

**Root cause:** Payload CMS 3.82 + Turbopack production builds are incompatible (github.com/payloadcms/payload/issues/14354).

**Fix:** the build command in `Dockerfile` and `package.json` is locked to `next build --webpack`. Do NOT switch to Turbopack for prod builds. Dev (`pnpm dev`) can use Turbopack — that path is fine.

### 10.4 Font CSS must be static imports

**Symptom:** Build fails or fonts don't load when a script (CJK / Arabic / Devanagari / Bengali / Nastaliq) is conditionally imported.

**Root cause:** Turbopack does not support dynamic `import()` for CSS. Even on the webpack build, conditional CSS imports are fragile.

**Fix:** all font CSS is statically imported in [`src/app/fonts.ts`](../../../src/app/fonts.ts). To trim a script for Latin-only locales, do it via PostCSS purging or a route-level `<link>` injection — not dynamic import.

### 10.5 Payload schema changes auto-migrate on startup

**Symptom:** A new release ships, the container starts, and the page returns 500s because the DB schema doesn't match what the code expects.

**Root cause:** Payload migrates on container start. If migration takes longer than the swarm `--update-monitor 30s` window, the new task fails healthchecks and swarm rolls back — leaving you on the OLD code with a partially-migrated schema.

**Fix:** for risky schema changes (collection rename, field removal), bump `--update-monitor` to `120s` for that one deploy:

```bash
docker service update \
  --image '<new-tag>' \
  --update-monitor 120s \
  is-website-gbydeh
```

Or stage the change: ship a release that adds the new field (schema-additive), backfill data, then ship a second release that removes the old field.

### 10.6 GHCR push 403 with `GITHUB_TOKEN`

**Symptom:** (Historical — only relevant if reintroducing CI.) `docker push ghcr.io/clappediya/...` returns 403 from inside a workflow even with `permissions: packages: write`.

**Root cause:** the package is owned by user `ClappeDiya` and is unlinked. GitHub does not auto-link user-owned packages from `GITHUB_TOKEN` pushes.

**Fix (current):** N/A — there are no GitHub Actions in this repo by design (see `feedback_no_github_actions.md` memory). The OCI source label in the Dockerfile (`org.opencontainers.image.source`) is kept anyway as good metadata.

### 10.7 `~/.docker/config.json` GHCR auth expired on host

**Symptom:** `docker buildx build --push` fails with `denied: denied` or `unauthorized: unauthenticated`.

**Fix:**

```bash
ssh md@184.70.179.66
# on host:
gh auth token | docker login ghcr.io -u clappediya --password-stdin
exit
```

Or pipe the local operator's token over SSH:

```bash
gh auth token | sshpass -p "${IS_VPS_PASS}" ssh md@184.70.179.66 \
  'docker login ghcr.io -u clappediya --password-stdin'
```

### 10.8 SSH fail2ban / rate-limit

**Symptom:** SSH connections start refusing after many short sessions.

**Fix:** the script uses `-o PreferredAuthentications=password -o PubkeyAuthentication=no` to avoid the SSH client trying every local key first. If you still get rate-limited, wait 90 seconds and try again. Do not retry in a tight loop.

### 10.9 `git archive` skips uncommitted files

**Symptom:** A file you just edited isn't in the deployed image.

**Root cause:** `git archive HEAD` ships HEAD only — your uncommitted change isn't in the archive.

**Fix:** the script prints a dirty-tree warning and asks for confirmation. **If you confirm**, only HEAD ships. Commit first if your change must ship.

### 10.10 First HTTP verify fails after a fast deploy

**Symptom:** Verify attempt 1 returns 502 / 503 / 504.

**Root cause:** Traefik may take a few seconds to re-route after the new task replaces the old one. The script sleeps 20s after `service update` and then retries 6 × 15s. This is generally enough; if you see persistent failures past attempt 3, it's a real failure, not flakiness.

### 10.11 Bundle budget enforced post-build

**Symptom:** `pnpm build` fails with `[budget] route X exceeded 50 KB gzipped`.

**Root cause:** A new dependency or large component bumped the route over 50 KB. The deploy aborts at the local `pnpm build` step (which is what the Dockerfile builder also does), so prod stays on the previous image — but the operator sees the failure.

**Fix:** identify the offending route via `.next/page-sizes.json`, then either: lazy-load the heavy module, drop the dep, or split the page. The 50 KB ceiling is enforced for first-paint reasons — do not raise it without product approval.

### 10.12 Anti-bot trap routes return 404

**Symptom:** Deploy verify fails when checking `/wp-admin` or `/phpmyadmin`.

**Root cause:** The proxy middleware (`src/proxy.ts`) intentionally returns 404 for known bot-trap paths. Don't add these to the verification list; they are *supposed* to 404.

---

## 11. Troubleshooting Matrix

| Symptom | Likely cause | First thing to check / fix |
|---|---|---|
| `/en` returns 200 with `E{"digest"...` chunks | RSC violation in a Server Component | §10.1 — roll back, then `grep -RnE 'on(Click\|Mouse\|...)' src/components` to find handlers in non-client components |
| `docker buildx --push` fails 403 | Host GHCR auth expired | §10.7 — re-login on host with `gh auth token` |
| `service update` rolls back automatically | New task failed healthcheck within 30s | Check `docker service logs --tail 200 is-website-gbydeh`; common: Payload migration > 30s (§10.5) |
| Lighthouse perf < 0.90 | CLS regression on home | §10.2 — confirm `<HomeSkeleton />` still wraps Suspense |
| `pnpm build` panics with chunkable module | Turbopack used for prod | §10.3 — must be `next build --webpack` |
| Containers restarting | Env var missing or DB unreachable | `docker service inspect is-website-gbydeh --format '{{json .Spec.TaskTemplate.ContainerSpec.Env}}'` ; verify `DATABASE_URL`, `PAYLOAD_SECRET`, `REVALIDATE_SECRET` |
| Site shows old image after deploy | Service update was no-op (same digest) | Verify the tag in the deploy log matches the tag from `docker service inspect` |
| Verify always fails attempt 1 but succeeds attempt 2 | Traefik route cache | Normal; the script retries up to 6 times — only fail if attempt 6 still red |
| `pnpm verify:authenticity` fails | Seed snapshots stale or copy violates anti-fake rules | `pnpm seed:snapshot` and re-read the violation; copy must be measurably true |
| `pnpm readability` fails | Page copy graded > FK 10 | Simplify the offending page in `src/lib/seed/new-pages/` |
| Cannot SSH to host | `sshpass` missing locally or fail2ban | `brew install sshpass`; if rate-limited, wait 90s |
| `gh api ... /packages/...` returns 404 | wrong owner case (`ClappeDiya` vs `clappediya`) | API uses the user's exact case (`ClappeDiya`); image refs use lowercase (`clappediya`) |

---

## 12. Security Notes

### 12.1 Secrets that MUST NOT be committed

- The host SSH password (operator-private)
- Dokploy admin password (operator-private)
- `DATABASE_URL`, `PAYLOAD_SECRET`, `REVALIDATE_SECRET`, `SMTP_PASS`, etc.

These belong in (a) the user's CLAUDE.md (already private), (b) Dokploy env vars on the host, (c) the operator's shell env when running the deploy script.

### 12.2 Don't hardcode `IS_VPS_PASS`

The deploy script forces it to be set:

```bash
VPS_PASS="${IS_VPS_PASS:?Set IS_VPS_PASS env var}"
```

Pass it via env each invocation:

```bash
IS_VPS_PASS='<host-password>' ./scripts/deploy-prod.sh
```

Or use a shell snippet that reads from a passwordmanager / 1Password CLI.

### 12.3 GHCR auth on the host

The host's `~/.docker/config.json` carries a long-lived GHCR token. If the host is compromised, that token can push images. Mitigations:

- The token is the operator's own `gh auth token`, not a service PAT — revocable in one click via `gh auth logout`.
- `ufw` blocks Dokploy's admin UI (port 3000) from the public internet.
- The image registry is `clappediya/intelligent-singularity-website` (private) — the token can push but cannot push to other clappediya packages.

### 12.4 Admin route IP-locked

`/admin` is gated by `ADMIN_ALLOWED_IPS` in the proxy middleware. Confirm before each deploy that the env var is still set on the host:

```bash
ssh md@184.70.179.66 \
  'docker service inspect is-website-gbydeh \
    --format "{{json .Spec.TaskTemplate.ContainerSpec.Env}}"' \
  | tr ',' '\n' | grep ADMIN_ALLOWED_IPS
```

### 12.5 Anti-bot traps

`/wp-admin`, `/phpmyadmin`, `/admin-login`, etc. are explicitly handled by the proxy middleware to return 404. Don't remove these — they reduce log noise from automated scanners.

---

## 13. AI Agent Implementation Checklist

Walk through this list when an operator says "deploy IS" or invokes this skill.

### Phase 0 — Discovery (read-only, pre-deploy)

- [ ] Confirm we are in the IS website repo: `git remote -v` → `ClappeDiya/intelligent-singularity-website`
- [ ] Confirm working tree is clean: `git status --porcelain` (or get explicit operator confirmation to ship dirty-tree)
- [ ] Confirm operator has `gh` CLI authed: `gh auth status` → `write:packages` listed
- [ ] Confirm `IS_VPS_PASS` is available (env or operator will pass inline)
- [ ] Confirm host reachable: `sshpass -p $IS_VPS_PASS ssh -o ConnectTimeout=5 md@184.70.179.66 'whoami'`
- [ ] Confirm host swarm + service running: `docker service ls --filter name=is-website-gbydeh`
- [ ] Note current live image tag (will become rollback target): `docker service inspect ... --format '{{.Spec.TaskTemplate.ContainerSpec.Image}}'`

### Phase 1 — Pre-deploy quality gates

- [ ] Run `scripts/pre-deploy-checks.sh` (or let `deploy-prod.sh` run it) — six gates must pass
- [ ] If `pnpm verify:authenticity` fails, **stop** and fix the offending seed copy (do not bypass the gate; it exists to keep the site honest)
- [ ] If `pnpm readability` fails, simplify the page in `src/lib/seed/new-pages/`

### Phase 2 — Risk classification

- [ ] Were there Payload schema changes since last deploy? (`git diff <prev-sha> HEAD -- src/payload/collections src/payload/globals --name-only`)
- [ ] Classify: NONE / SAFE (additive) / CAUTION (field type change) / HIGH-RISK (removal)
- [ ] If HIGH-RISK: bump `--update-monitor` to `120s` and capture a DB dump first (§10.5)
- [ ] If CAUTION: same dump precaution; standard 30s monitor is fine

### Phase 3 — Deploy

- [ ] Run `IS_VPS_PASS='...' ./scripts/deploy-prod.sh`
- [ ] Watch the build phase (~60–120s on the host); cancel only if it hangs > 5 min
- [ ] Watch the service-update phase (~15–30s); swarm will auto-rollback if it fails
- [ ] Watch HTTP verify (6 × 15s); the script exits 0 on success, 1 on failure

### Phase 4 — Post-deploy verification

- [ ] §9.1 (HTTP reachability of 24 routes) — all 200
- [ ] §9.2 (zero RSC error chunks) — must be 0
- [ ] §9.3 (one task running, image tag matches)
- [ ] §9.6 (RTL locales render) — both `ar` and `ur` 200
- [ ] If anything red: §8.1 rollback, then triage

### Phase 5 — Document the deploy

- [ ] Note the new image tag and SHA in conversation / a deploy log
- [ ] If schema changed: note that too, and whether dump was taken

---

## 14. Extending The Skill

### Adding a new pre-deploy gate

Edit [`scripts/pre-deploy-checks.sh`](../../../scripts/pre-deploy-checks.sh) to add a new step. Update the `[N/M]` counters. Update the gates list in §2 of this skill and in [`docs/DEPLOY.md`](../../../docs/DEPLOY.md).

### Adding a new HTTP verify probe

Add the route to the loop in `scripts/deploy-prod.sh` step 5, OR — if the new check is more complex — write a small `scripts/verify-prod.mjs` and call it from the script.

### Adding a staging environment

Currently there is no staging env — only prod. If a staging host is added:

1. Set `IS_VPS_HOST`, `IS_SERVICE_NAME`, `IS_DOMAIN` env vars to staging values when invoking the script.
2. The image tag (`prod-...`) is shared between envs — a staging deploy will push the same tag GHCR image, which is fine; staging just runs whatever tag the staging service was last updated to.
3. To avoid staging/prod confusion, add a new `IMAGE_TAG_PREFIX=staging-` override in the script.

### Switching to SSH key auth

Long-term recommendation. Once an SSH key is provisioned on the host:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/is-deploy -N ""
ssh-copy-id -i ~/.ssh/is-deploy md@184.70.179.66
```

Then update [`scripts/deploy-prod.sh`](../../../scripts/deploy-prod.sh) — replace `sshpass -p ${VPS_PASS} ssh ${SSH_OPTS[@]}` with `ssh -i ~/.ssh/is-deploy ${SSH_OPTS[@]}`. Drop the `IS_VPS_PASS` env var.

### Promoting tagged images between envs (when staging exists)

```bash
# Promote the currently-running staging image to prod:
STAGING_TAG=$(ssh md@<staging-host> \
  'docker service inspect is-website-gbydeh \
    --format "{{.Spec.TaskTemplate.ContainerSpec.Image}}"' | sed 's|.*:||')

ssh md@184.70.179.66 \
  "docker service update \
    --image ghcr.io/clappediya/intelligent-singularity-website:${STAGING_TAG} \
    is-website-gbydeh"
```
