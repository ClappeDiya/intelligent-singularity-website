# Autonomous Deployment Runbook — Next.js 16 + Payload CMS 3 on Dokploy/Docker Swarm

**Audience:** an AI agent (Claude / GPT / …) handed a green-field or mid-flight
Next.js + Payload project and asked to *ship it to a Dokploy-managed VPS* without
human intervention.

**How to reuse for another project:** this runbook uses placeholders in the form
`{{NAME}}`. Before executing, resolve every placeholder in the *Variable
Inventory* (§1) once, then follow the phases in order. Every command is
idempotent or explicitly marked `⚠ one-shot`.

---

## 1. Variable inventory

Fill these first. Do not execute anything else until every value is resolved
or explicitly marked N/A.

| Variable | Example | Where to find |
|---|---|---|
| `{{PROJECT_NAME}}` | `is-website` | Directory name / GitHub repo |
| `{{PROJECT_ROOT}}` | `/Users/md/Documents/Md/Intelligent-singularity/intelligent-singularity-website` | Local absolute path |
| `{{DOMAIN}}` | `intelligentsingularityinc.com` | Traefik host on Dokploy |
| `{{STATUS_SUBDOMAIN}}` | `status.intelligentsingularityinc.com` | Uptime Kuma host |
| `{{VPS_IP}}` | `184.70.179.66` | VPS public IP |
| `{{VPS_USER}}` | `md` | SSH user with Docker group membership |
| `{{VPS_PASSWORD}}` | `••••••••` | From CLAUDE.md or password manager |
| `{{GITHUB_ORG}}` | `ClappeDiya` | Owner of the repo |
| `{{GITHUB_REPO}}` | `intelligent-singularity-website` | Repo name |
| `{{GHCR_ORG}}` | `clappediya` | lowercase of `{{GITHUB_ORG}}` |
| `{{IMAGE_NAME}}` | `ghcr.io/{{GHCR_ORG}}/{{GITHUB_REPO}}` | Full image tag prefix |
| `{{DOKPLOY_APP_ID}}` | `XaU9maEwsJ-j55pAi8QUF` | From Dokploy URL `/project/.../application/<ID>` |
| `{{DOKPLOY_SERVICE_ID}}` | `x1z71tfgn6lq` | `docker service ls --filter name=<project>` on VPS |
| `{{DOKPLOY_DB_CONTAINER}}` | `dokploy-postgres` | `docker ps --filter name=dokploy-postgres` |
| `{{APP_DB_CONTAINER}}` | `is-db-nksaet.1.<hash>` | `docker ps --filter name=<project>-db` |
| `{{APP_DB_NAME}}` | `is_prod` | Inside the app container: `printenv DATABASE_URL` |
| `{{APP_DB_USER}}` | `is` | Same |
| `{{APP_DB_HOST}}` | `is-db-nksaet` | Swarm DNS name |
| `{{REVALIDATE_SECRET}}` | 64-char hex | `docker exec <app> printenv REVALIDATE_SECRET` |
| `{{PAYLOAD_SECRET}}` | 64-char hex | Same, `PAYLOAD_SECRET` |
| `{{ADMIN_EMAIL}}` | `admin@example.com` | Will be created in §8.1 |
| `{{ADMIN_PASSWORD}}` | `••••••••` | Choose during §8.1 |

---

## 2. Workstation prep

```bash
# macOS / linux
brew install sshpass          # or: apt-get install sshpass
brew install gh                # GitHub CLI
brew install jq
brew install corepack && corepack enable
brew install postgresql@16    # psql client only
```

Set up SSH ControlMaster so fail2ban on the VPS does not rate-limit you:

```bash
mkdir -p ~/.ssh/control
cat > ~/.ssh/config-{{PROJECT_NAME}} <<EOF
Host {{PROJECT_NAME}}-vps
  HostName {{VPS_IP}}
  User {{VPS_USER}}
  StrictHostKeyChecking no
  ControlMaster auto
  ControlPath ~/.ssh/control/%C
  ControlPersist 10m
EOF

# First connection (provides password once, reuses socket for 10 min)
sshpass -p '{{VPS_PASSWORD}}' ssh -F ~/.ssh/config-{{PROJECT_NAME}} {{PROJECT_NAME}}-vps "echo ready"
```

Shorthand used below:

```bash
alias svps="ssh -F ~/.ssh/config-{{PROJECT_NAME}} {{PROJECT_NAME}}-vps"
alias sscp="scp -F ~/.ssh/config-{{PROJECT_NAME}}"
```

---

## 3. Repository readiness

### 3.1 Mandatory `package.json` settings

```jsonc
{
  "type": "module",                    // ⚠ critical for Payload CLI
  "engines": { "node": ">=24.0.0" },
  "scripts": {
    "dev": "next dev",
    "build": "next build --webpack",   // Turbopack panics with Payload 3
    "start": "next start",
    "type-check": "tsc --noEmit",
    "test": "vitest run",
    "a11y": "node scripts/ci-checks/axe-scan.mjs",
    "lighthouse": "lhci autorun"
  }
}
```

> **Why `type: module`?** Payload 3.82+ `@payloadcms/db-postgres` is pure ESM
> with top-level await. Without `"type": "module"` tsx transforms your
> `payload.config.ts` as CommonJS and the adapter fails to load with
> `ERR_REQUIRE_ASYNC_MODULE` on every CLI invocation.

### 3.2 `tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,   // ⚠ tsx needs explicit .ts imports
    "strict": true,
    "noEmit": true,
    "paths": { "@/*": ["./src/*"], "@payload-config": ["./src/payload/payload.config.ts"] }
  },
  "exclude": ["node_modules", "tests/e2e"]
}
```

### 3.3 Local imports in `src/payload/**`

Every relative import inside `src/payload/` **must use `.ts`**:

```ts
// ❌ payload.config.ts
import { Users } from './collections/Users';

// ✅ payload.config.ts
import { Users } from './collections/Users.ts';
```

tsx 4.x's ESM loader does not strip extensions when Node runs under `--import tsx`.
A one-time migration:

```bash
for f in $(grep -rln "from '\./\|from '\.\./" src/payload/); do
  sed -i '' -E "s|from '(\.\./[^']+)'|from '\1.ts'|g; s|from '(\./[^']+)'|from '\1.ts'|g" "$f"
done
```

### 3.4 Payload field-name rule

**Never name an array-field `id` inside a Payload collection or global.**
Payload auto-generates an integer PK column `id`; a user field named `id`
silently overwrites it, then runtime inserts (e.g. a select enum `"security"`)
explode with `invalid input syntax for type integer`.

Use `key`, `slug`, or domain-appropriate names instead.

### 3.5 `src/instrumentation.ts`

Warm Payload on boot so the first real request is fast:

```ts
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  console.log('[instrumentation] server started');
  try {
    const [{ getPayload }, config] = await Promise.all([
      import('payload'),
      import('@payload-config'),
    ]);
    await getPayload({ config: (config as any).default });
    console.log('[instrumentation] Payload init complete');
  } catch (err) {
    console.error('[instrumentation] Payload init failed:', (err as Error).message);
  }
}
```

### 3.6 `/api/revalidate` route

Next.js 16 `revalidateTag` requires a second profile arg:

```ts
// src/app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

const LOCALES = ['en', /* ... */];

export async function POST(request: Request) {
  const secret = request.headers.get('x-revalidate-secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const body = await request.json().catch(() => null);
  if (typeof body?.tag !== 'string') return new NextResponse('Bad Request', { status: 400 });
  revalidateTag(body.tag, 'default');
  for (const l of LOCALES) revalidateTag(`${body.tag}:${l}`, 'default');
  return NextResponse.json({ revalidated: true, tag: body.tag });
}
```

### 3.7 `Dockerfile` (Next.js standalone + Payload CLI)

```dockerfile
# syntax=docker/dockerfile:1.7
FROM node:24-alpine AS base
RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
COPY package.json pnpm-lock.yaml ./
# ⚠ lower concurrency — default pnpm resolver can OOM on a 16 GB VPS
RUN pnpm config set network-concurrency 4 && \
    pnpm config set child-concurrency 2 && \
    pnpm install --frozen-lockfile --network-concurrency=4

FROM base AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL=postgres://placeholder:placeholder@localhost:5432/placeholder
ENV PAYLOAD_SECRET=build-time-placeholder-secret-min-32-chars-00000000000
ENV NEXT_PUBLIC_SITE_URL=https://{{DOMAIN}}
RUN pnpm exec next build --webpack

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# ⚠ Keep the full dep tree + source so `payload migrate` can be run via
#   `docker exec`. Standalone alone strips node_modules.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./full-node_modules
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json /app/package.json /app/pnpm-lock.yaml ./
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

### 3.8 Sitemap guard (prevents build failure)

If `/app/sitemap.ts` fetches from Payload, wrap the fetch in `try/catch` so
the build-time placeholder DB does not crash `next build`:

```ts
let postSlugs: string[] = [];
try {
  const res = (await fetchJournalPosts('en', { limit: 200 })) as any;
  postSlugs = (res?.docs ?? []).map((p: any) => p.slug);
} catch { postSlugs = []; }
```

### 3.9 Local green checks

Before pushing anything:

```bash
cd {{PROJECT_ROOT}}
pnpm type-check
pnpm test
# optional but strongly recommended gates:
pnpm lint
pnpm verify:authenticity    # if the project has these
pnpm verify:outbound-links
pnpm readability
```

All must pass. Do **not** proceed to build/deploy until they do.

---

## 4. Branch → PR → master

```bash
# On a working feature branch
git push origin feature/{{FEATURE_NAME}}

# Open a PR
gh pr create --base master --head feature/{{FEATURE_NAME}} \
  --title "feat: {{HEADLINE}}" \
  --body "$(cat <<'EOF'
## Summary
- bullet
- bullet
- bullet

## Test plan
- [x] pnpm type-check
- [x] pnpm test
- [ ] Dokploy build green
- [ ] Production smoke test

🤖 Generated with Claude Code
EOF
)"

# Squash-merge to master (auto-triggers our Dokploy flow in §6)
gh pr merge <PR_NUMBER> --squash --delete-branch=false
```

---

## 5. Docker image build on the VPS

Building on the VPS avoids GHCR round-trip and local Docker Desktop flakiness.

```bash
# 5.1 Clone (first time only)
svps 'git clone https://github.com/{{GITHUB_ORG}}/{{GITHUB_REPO}}.git /home/{{VPS_USER}}/{{GITHUB_REPO}}'

# 5.2 Pull + build
TAG="prod-$(date +%Y%m%d-%H%M%S)-$(git rev-parse --short HEAD)"
echo "Building tag: $TAG"

svps "cd /home/{{VPS_USER}}/{{GITHUB_REPO}} && \
  git fetch origin && git reset --hard origin/master && \
  docker build -t {{IMAGE_NAME}}:$TAG . 2>&1 | tail -6"
```

**If OOM (exit code 137) during `pnpm install`:** confirm the network-concurrency
tweak from §3.7 is in `Dockerfile`; also `svps "docker builder prune -af"` and retry.

---

## 6. Deploy — update Dokploy + roll the swarm service

Dokploy stores its app state in its own Postgres. When `sourceType=docker`,
Dokploy doesn't poll Git — it reads the `dockerImage` field and deploys from there.
To roll a new image:

```bash
NEW_IMAGE="{{IMAGE_NAME}}:$TAG"

svps "docker exec \$(docker ps -q --filter 'name={{DOKPLOY_DB_CONTAINER}}') \
  psql -U dokploy -d dokploy -c \
  \"UPDATE application SET \\\"dockerImage\\\"='$NEW_IMAGE' \
    WHERE \\\"applicationId\\\"='{{DOKPLOY_APP_ID}}';\""

svps "docker service update --image $NEW_IMAGE \
  --update-order start-first {{DOKPLOY_SERVICE_ID}} 2>&1 | tail -2"
```

Expected:

```
UPDATE 1
verify: Service {{DOKPLOY_SERVICE_ID}} converged
```

Verify the new container is Up:

```bash
svps "docker ps --filter 'name={{PROJECT_NAME}}' --format '{{.Image}}  status={{.Status}}'"
```

---

## 7. Schema migration

### 7.1 Generate the first migration ⚠ one-shot

Inside the *new* running container (the one from §6), swap the standalone
`node_modules` for the full tree and invoke `payload migrate:create`:

```bash
CID=$(svps "docker ps -q --filter 'name={{PROJECT_NAME}}' --filter 'status=running' | head -1")

# Swap in the full dependency tree (preserved by the Dockerfile §3.7)
svps "docker exec -u 0 $CID sh -c 'cd /app && \
  [ -d full-node_modules ] && mv node_modules standalone_nm && mv full-node_modules node_modules; \
  ls /app'"

# Generate migration file
svps "docker exec -u 0 $CID sh -c 'cd /app && \
  NODE_ENV=production /app/node_modules/.bin/payload migrate:create \
    --force-accept-warning --skip-empty 2>&1 | tail -20'"
```

The file lands at `/app/src/migrations/<timestamp>.ts`.

### 7.2 Split: NEW-pages-only vs full schema

If the DB already has *existing* collections (common when the project grew
incrementally), the generated migration dumps the whole schema and will
**fail with `type "_locales" already exists`** on re-apply.

**Workaround:** extract only the net-new `CREATE TYPE` / `CREATE TABLE` /
`ALTER TABLE` / `CREATE INDEX` blocks:

```bash
# Copy the migration to the laptop
svps "docker cp $CID:/app/src/migrations/*.ts /tmp/migration.ts"
sscp {{PROJECT_NAME}}-vps:/tmp/migration.ts /tmp/migration.ts

# Write a filter script that emits only the new-collection statements
cat > /tmp/extract.mjs <<'EOF'
import { readFileSync, writeFileSync } from 'node:fs';
const src = readFileSync('/tmp/migration.ts', 'utf8');
const sqlMatch = src.match(/await db\.execute\(sql`([\s\S]*?)`\)/);
const allSql = sqlMatch[1];

// 1. List the new collection / global slugs (as snake_case prefixes):
const wantedPrefixes = ['release_notes', 'roadmap_items', 'journal_posts',
                        'status_page', 'trust_page', 'help_page'];

const stmts = allSql.split(/;\s*\n/).map(s => s.trim()).filter(Boolean);
const keep = stmts.filter(s => wantedPrefixes.some(p => s.includes(`"${p}`)));
writeFileSync('/tmp/new-only.sql', 'BEGIN;\n\n' + keep.join(';\n\n') + ';\n\nCOMMIT;\n');
console.log(`wrote ${keep.length} statements`);
EOF
node /tmp/extract.mjs
```

### 7.3 Apply the extracted SQL

```bash
sscp /tmp/new-only.sql {{PROJECT_NAME}}-vps:/tmp/new.sql
svps "docker cp /tmp/new.sql {{APP_DB_CONTAINER}}:/tmp/new.sql && \
  docker exec {{APP_DB_CONTAINER}} psql -U {{APP_DB_USER}} -d {{APP_DB_NAME}} -f /tmp/new.sql"
```

Record the migration in Payload's tracking table:

```bash
svps "docker exec {{APP_DB_CONTAINER}} psql -U {{APP_DB_USER}} -d {{APP_DB_NAME}} -c \
  \"INSERT INTO payload_migrations (name, batch, created_at, updated_at) \
    VALUES ('$(basename /app/src/migrations/*.ts .ts)', 1, now(), now()) \
    ON CONFLICT DO NOTHING;\""
```

### 7.4 Patch `payload_locked_documents_rels` for every new collection

Payload's locked-docs relations table needs a `<collection>_id` column per
new collection. Missing these causes runtime errors like
`column "..._id" does not exist`.

```sql
-- apply inside {{APP_DB_CONTAINER}}
BEGIN;
ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS "release_notes_id" integer;
ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS "roadmap_items_id" integer;
ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS "journal_posts_id" integer;
DO $$ BEGIN
  ALTER TABLE payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_release_notes_fk
    FOREIGN KEY ("release_notes_id") REFERENCES release_notes(id) ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
-- repeat for each new collection
COMMIT;
```

### 7.5 Commit the migration file

```bash
svps "docker cp $CID:/app/src/migrations/*.ts /tmp/migration-final.ts"
sscp {{PROJECT_NAME}}-vps:/tmp/migration-final.ts {{PROJECT_ROOT}}/src/migrations/$(basename).ts

cd {{PROJECT_ROOT}}
mkdir -p src/migrations
cat > src/migrations/index.ts <<'EOF'
import * as m1 from './<timestamp>.ts';
export const migrations = [{ up: m1.up, down: m1.down, name: '<timestamp>' }];
EOF

git add src/migrations && git commit -m "chore(migrations): check in initial migration"
git push origin master
```

---

## 8. Seed production content

### 8.1 Create the first admin user ⚠ one-shot

Payload's first-user endpoint is public **only** when the `users` table is
empty:

```bash
curl -s -X POST "https://{{DOMAIN}}/api/users/first-register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"{{ADMIN_EMAIL}}\",\"password\":\"{{ADMIN_PASSWORD}}\",\"name\":\"Admin\"}" | jq .
```

### 8.2 Run seed endpoint

If the project exposes `/api/seed` or `/api/seed-new-pages` (protected by
`REVALIDATE_SECRET`):

```bash
SECRET=$(svps "docker exec \$(docker ps -q --filter 'name={{PROJECT_NAME}}' --filter 'status=running') printenv REVALIDATE_SECRET" | tail -1)

curl -s -X POST "https://{{DOMAIN}}/api/seed-new-pages?secret=$SECRET" \
  -o /tmp/seed.json -w "HTTP=%{http_code}\n"
jq -r '.log[]' /tmp/seed.json
```

### 8.3 Per-locale seed pattern for Payload globals

When the globals have localized fields and you want to translate them, use
the admin session cookie (not JWT — Payload's REST API prefers cookie auth
for write operations):

```bash
curl -s -c /tmp/cookies -X POST "https://{{DOMAIN}}/api/users/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"{{ADMIN_EMAIL}}\",\"password\":\"{{ADMIN_PASSWORD}}\"}"

# Now authenticated. Use -b /tmp/cookies for subsequent calls.
curl -s -b /tmp/cookies -X POST "https://{{DOMAIN}}/api/globals/trust-page?locale=es" \
  -H "Content-Type: application/json" \
  -d '{"title":"Dónde encontrar la prueba.","lede":"..."}'
```

### 8.4 Fetch-then-merge for arrays in globals

`updateGlobal({ data: { pillars: [...] } })` **replaces** the whole array,
discarding row IDs. To translate only the `heading`/`blurb` of each pillar:

```ts
// inside a seed helper
const baseline = await payload.findGlobal({ slug: 'trust-page', locale: 'en' });
const pillars = baseline.pillars.map((p) => ({
  ...p, // preserves id, href, proof rows
  heading: TRANSLATIONS[locale].pillarHeadings[p.key].heading,
  blurb:   TRANSLATIONS[locale].pillarHeadings[p.key].blurb,
}));
await payload.updateGlobal({ slug: 'trust-page', locale, data: { pillars } });
```

### 8.5 Invalidate caches

If the site uses `unstable_cache`:

```bash
curl -s -X POST "https://{{DOMAIN}}/api/revalidate" \
  -H "x-revalidate-secret: $SECRET" \
  -H "Content-Type: application/json" \
  -d '{"tag":"<cache-tag>"}'
# expect {"revalidated":true,"tag":"..."}
```

Otherwise wait for the configured `revalidate` TTL.

---

## 9. Uptime Kuma setup

Kuma usually ships pre-installed on Dokploy under `{{STATUS_SUBDOMAIN}}`.

### 9.1 First-run admin account ⚠ one-shot

Browser-navigate to `https://{{STATUS_SUBDOMAIN}}/setup` and fill the form
with the same credentials as `{{VPS_USER}}` / `{{VPS_PASSWORD}}`. Save.

### 9.2 Add monitors

Via browser at `https://{{STATUS_SUBDOMAIN}}/add` — create one HTTP(s)
monitor per public route:

| Friendly name | URL |
|---|---|
| Homepage | `https://{{DOMAIN}}/en` |
| Health API | `https://{{DOMAIN}}/api/health` |
| Trust | `https://{{DOMAIN}}/en/trust` |
| …per route | … |

Kuma accepts only one URL at a time via the UI. Accept defaults (60-second
interval, status-code accept 200-299).

### 9.3 Public status page with slug `is`

`https://{{STATUS_SUBDOMAIN}}/add-status-page` → name `{{PROJECT_NAME}}`,
slug `is` → Next → add a group "Website" → drop in all the monitors → Save.

Verify the public API:

```bash
curl -s "https://{{STATUS_SUBDOMAIN}}/api/status-page/is" | jq '.publicGroupList[].name'
curl -s "https://{{STATUS_SUBDOMAIN}}/api/status-page/heartbeat/is" | jq '.heartbeatList | length'
```

### 9.4 Wire Payload's status-page global

```bash
# If you already seeded the status-page global, its kuma_base_url + kuma_slug
# are set. Confirm:
svps "docker exec {{APP_DB_CONTAINER}} psql -U {{APP_DB_USER}} -d {{APP_DB_NAME}} \
  -c 'SELECT kuma_base_url, kuma_slug FROM status_page;'"
```

---

## 10. Verification battery

### 10.1 Smoke test

```bash
for r in "/en" "/en/changelog" "/en/status" "/en/roadmap" "/en/insights" "/en/trust" "/en/help" "/api/health"; do
  curl -s -o /dev/null -w "%{http_code} %{time_total}s  $r\n" "https://{{DOMAIN}}$r"
done
```

All should be 200 under 1 s.

### 10.2 Browser verification (Chrome DevTools MCP or Playwright)

Navigate each route, capture screenshot + console errors. Zero `TypeError`,
`ReferenceError`, `ChunkLoadError` allowed. Acceptable: prefetch 404s to CMS
routes that genuinely don't exist yet.

### 10.3 axe-core

Install + extend URL list (`scripts/ci-checks/axe-scan.mjs`):

```js
const PATHS = [
  '/en', '/en/manifesto', '/en/portfolio', '/en/about', '/en/green',
  '/en/contact', '/en/legal/privacy',
  '/en/changelog', '/en/status', '/en/roadmap', '/en/insights',
  '/en/insights/<some-post>', '/en/trust', '/en/help',
  '/ar', '/ar/trust', '/ur', '/zh-CN', '/fr',
];
```

```bash
BASE_URL=https://{{DOMAIN}} pnpm a11y
```

Target: 0 serious color-contrast on new pages. Legacy pages may still have
pre-existing violations — document, don't block.

### 10.4 Lighthouse

```js
// lighthouserc.cjs
module.exports = {
  ci: {
    collect: {
      url: [ 'https://{{DOMAIN}}/en', /* ... */ ],
      numberOfRuns: 1,
      settings: { preset: 'desktop' },
    },
    assert: { preset: 'lighthouse:no-pwa' },
    upload: { target: 'filesystem', outputDir: '.lighthouse-results' },
  },
};
```

```bash
pnpm lighthouse
```

Targets: perf ≥ 95, a11y ≥ 90, best-practices = 100, SEO ≥ 95.

### 10.5 Playwright

```bash
pnpm add -D @playwright/test
pnpm exec playwright install chromium

cat > playwright.config.ts <<'EOF'
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL: process.env.BASE_URL ?? 'https://{{DOMAIN}}' },
});
EOF

pnpm exec playwright test tests/e2e/
```

Sample resize spec at `tests/e2e/new-pages-resize.spec.ts` — for each
`locale × route × viewport` tuple, assert no horizontal overflow:

```ts
expect(await page.evaluate(() =>
  document.documentElement.scrollWidth > window.innerWidth
)).toBe(false);
```

---

## 11. Release tagging

When the verification battery is green:

```bash
cd {{PROJECT_ROOT}}
git tag -a v1.0.0 <sha> -m "v1.0.0 — {{RELEASE_HEADLINE}}"
git push origin v1.0.0
```

### 11.1 Record the release in Payload

Create a `ReleaseNotes` entry through the admin API. Requires the cookie auth
from §8.3:

```bash
curl -s -b /tmp/cookies -X POST "https://{{DOMAIN}}/api/release-notes" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "v1-0-0",
    "version": "1.0.0",
    "title": "{{RELEASE_HEADLINE}}",
    "summary": "One-paragraph what/why.",
    "releaseDate": "2026-04-18T06:00:00.000Z",
    "gitTag": "v1.0.0",
    "gitSha": "<full-sha>",
    "ordering": 100,
    "status": "published",
    "changes": [
      {"type":"added","entry":"..."},
      {"type":"changed","entry":"..."},
      {"type":"fixed","entry":"..."}
    ]
  }'

# Invalidate cache
curl -s -X POST "https://{{DOMAIN}}/api/revalidate" \
  -H "x-revalidate-secret: $SECRET" \
  -H "Content-Type: application/json" \
  -d '{"tag":"release-notes"}'
```

---

## 12. Autonomous 24h launch watch

### 12.1 The watch script (commit to repo)

```js
// scripts/watch-launch.mjs
#!/usr/bin/env node
const ROUTES = [
  '/en', '/en/changelog', '/en/status', '/en/roadmap',
  '/en/insights', '/en/trust', '/en/help',
];
const BASE = 'https://{{DOMAIN}}';
const KUMA = 'https://{{STATUS_SUBDOMAIN}}';

async function probe(url) {
  const start = Date.now();
  try {
    const res = await fetch(url, { redirect: 'follow' });
    return { ok: res.ok, status: res.status, ms: Date.now() - start };
  } catch (err) {
    return { ok: false, status: 0, ms: Date.now() - start, err: String(err) };
  }
}

async function main() {
  let failures = 0;
  const out = [`=== ${new Date().toISOString()} — launch watch ===`];

  for (const p of ROUTES) {
    const r = await probe(`${BASE}${p}`);
    out.push(`  ${r.ok?'ok  ':'FAIL'} ${r.status} ${String(r.ms).padStart(4)}ms  ${p}`);
    if (!r.ok) failures++;
  }

  const health = await fetch(`${BASE}/api/health`).then(r=>r.json()).catch(()=>null);
  if (health?.status === 'ok') out.push(`  ok   health.timestamp=${health.timestamp}`);
  else { out.push('  FAIL health'); failures++; }

  try {
    const kuma = await fetch(`${KUMA}/api/status-page/heartbeat/is`).then(r=>r.json());
    const latest = Object.values(kuma.heartbeatList ?? {}).map(a=>a.at(-1)?.status ?? 3);
    const up = latest.filter(s=>s===1).length;
    out.push(`  kuma ${up}/${latest.length} monitors up`);
    if (up < latest.length) failures++;
  } catch (err) { out.push(`  FAIL kuma: ${err.message}`); failures++; }

  out.push(failures === 0 ? '  >>> ALL GREEN' : `  >>> ${failures} FAILURE(S)`);
  console.log(out.join('\n'));
  process.exit(failures === 0 ? 0 : 1);
}
main();
```

### 12.2 Upload to the VPS

```bash
sscp {{PROJECT_ROOT}}/scripts/watch-launch.mjs {{PROJECT_NAME}}-vps:/home/{{VPS_USER}}/watch-launch.mjs
```

### 12.3 Self-removing cron wrapper

```bash
cat > /tmp/watch-is.sh <<'EOF'
#!/usr/bin/env bash
set -u
LOG=/home/{{VPS_USER}}/is-watch.log
SCRIPT=/home/{{VPS_USER}}/watch-launch.mjs
END_EPOCH=$(date -u -d '{{WATCH_END_ISO}}' +%s)
NOW=$(date -u +%s)
if [ "$NOW" -ge "$END_EPOCH" ]; then
  echo "[$(date -u -Iseconds)] watch window ended" >> "$LOG"
  crontab -l 2>/dev/null | grep -v watch-is.sh | crontab -
  exit 0
fi
OUT=$(/usr/bin/node "$SCRIPT" 2>&1)
RC=$?
echo "$OUT" >> "$LOG"
echo "--- rc=$RC @ $(date -u -Iseconds) ---" >> "$LOG"
exit $RC
EOF
sscp /tmp/watch-is.sh {{PROJECT_NAME}}-vps:/home/{{VPS_USER}}/watch-is.sh
svps 'chmod +x /home/{{VPS_USER}}/watch-is.sh /home/{{VPS_USER}}/watch-launch.mjs && /home/{{VPS_USER}}/watch-is.sh && tail -15 /home/{{VPS_USER}}/is-watch.log'
```

### 12.4 Install the cron entry

```bash
svps '(crontab -l 2>/dev/null | grep -v watch-is.sh; \
  echo "*/5 * * * * /home/{{VPS_USER}}/watch-is.sh >> /home/{{VPS_USER}}/is-watch-cron.log 2>&1") | crontab -'
svps "crontab -l | grep watch-is"
```

### 12.5 Tail the log from your laptop

```bash
svps "tail -F /home/{{VPS_USER}}/is-watch.log"
```

The wrapper self-removes the cron entry once `date > {{WATCH_END_ISO}}`. No
human action needed to stop the watch.

---

## 13. Rollback

### 13.1 Container-level

```bash
svps "docker service update --image {{IMAGE_NAME}}:<PREVIOUS_TAG> \
  --update-order start-first {{DOKPLOY_SERVICE_ID}}"
svps "docker exec \$(docker ps -q --filter 'name={{DOKPLOY_DB_CONTAINER}}') \
  psql -U dokploy -d dokploy -c \
  \"UPDATE application SET \\\"dockerImage\\\"='{{IMAGE_NAME}}:<PREVIOUS_TAG>' \
    WHERE \\\"applicationId\\\"='{{DOKPLOY_APP_ID}}';\""
```

### 13.2 Schema-level (destructive — empty tables only)

Keep `scripts/rollback/new-collections.sql` in the repo:

```sql
BEGIN;
DROP TABLE IF EXISTS <new_table_1> CASCADE;
DROP TABLE IF EXISTS <new_table_2> CASCADE;
DROP TYPE IF EXISTS <new_enum_1> CASCADE;
COMMIT;
```

Apply only after the main rollback redeployed the previous container.

---

## 14. Troubleshooting index (from hardest to simplest)

| Symptom | Root cause | Fix |
|---|---|---|
| `ERR_MODULE_NOT_FOUND` on `./collections/Users` | Missing `.ts` ext | §3.3 |
| `ERR_REQUIRE_ASYNC_MODULE` importing payload.config | No `type: module` | §3.1 |
| `loadEnvConfig of undefined` in loadEnv.js | `@next/env` CJS/ESM mismatch | set `NODE_ENV=production` before `payload migrate` |
| Payload CLI hangs at `Would you like to proceed? (y/N)` | TTY prompt | `printf 'y\ny\ny\n' \| docker exec -i ... payload migrate ...` |
| `invalid input syntax for type integer: "security"` | User field named `id` inside array | §3.4 — rename to `key` |
| `column "evidence_u_r_l" does not exist` / DB has `evidenceURL` | Migration file vs push() naming mismatch | Drop the pushed tables, re-apply the migration file |
| `type "_locales" already exists` during migrate | Migration dumps full schema | §7.2 — extract only new stmts |
| `column "..._id" does not exist` at runtime | `payload_locked_documents_rels` missing column | §7.4 |
| `/api/revalidate` returns 500 | `updateTag` vs `revalidateTag` | §3.6 |
| Lighthouse A11y < 90, many `color-contrast` | Mint on paper, cream on paper | Add `--color-mint-ink` + swap paper-surface components |
| Playwright "horizontal overflow at 375 px" | Kuma heartbeat grid min-width too big | Add `overflow: hidden; min-width: 1px` on cells |
| SSH `Permission denied (publickey,password)` after many commands | fail2ban rate-limit | ControlMaster §2 — one connection, kept alive |
| OOM during `pnpm install` inside Docker | Default network-concurrency | §3.7 concurrency=4 |
| `next build` crashes on sitemap | DB unreachable at build time | §3.8 try/catch guard |

---

## 15. File-by-file deliverables checklist

When handing a project off, ensure the following are committed:

- [ ] `package.json` with `"type": "module"`
- [ ] `tsconfig.json` with `allowImportingTsExtensions`
- [ ] `Dockerfile` with full-node_modules preserved
- [ ] `src/payload/**` imports with `.ts` extensions
- [ ] `src/instrumentation.ts` warms Payload
- [ ] `src/app/api/revalidate/route.ts` uses `revalidateTag(tag, 'default')`
- [ ] `src/app/sitemap.ts` wraps DB fetches in try/catch
- [ ] `src/migrations/<timestamp>.ts` + `src/migrations/index.ts`
- [ ] `scripts/watch-launch.mjs`
- [ ] `scripts/rollback/*.sql`
- [ ] `lighthouserc.cjs`
- [ ] `playwright.config.ts`
- [ ] `tests/e2e/*.spec.ts`
- [ ] `docs/runbooks/launch-*.md`

---

## 16. Minimal "ship it" one-shot

For a returning agent who knows the project and just needs to push an update:

```bash
# 0. on laptop
cd {{PROJECT_ROOT}}
pnpm type-check && pnpm test
git push origin master

# 1. build on VPS
TAG="prod-$(date +%Y%m%d-%H%M%S)-$(git rev-parse --short HEAD)"
svps "cd /home/{{VPS_USER}}/{{GITHUB_REPO}} && git pull origin master && \
  docker build -t {{IMAGE_NAME}}:$TAG . 2>&1 | tail -4"

# 2. swap image
svps "docker exec \$(docker ps -q --filter 'name={{DOKPLOY_DB_CONTAINER}}') \
  psql -U dokploy -d dokploy -c \
  \"UPDATE application SET \\\"dockerImage\\\"='{{IMAGE_NAME}}:$TAG' \
    WHERE \\\"applicationId\\\"='{{DOKPLOY_APP_ID}}';\""

# 3. roll
svps "docker service update --image {{IMAGE_NAME}}:$TAG \
  --update-order start-first {{DOKPLOY_SERVICE_ID}}"

# 4. smoke
for r in /en /en/status /api/health; do
  curl -s -o /dev/null -w "%{http_code} $r\n" "https://{{DOMAIN}}$r"
done
```

---

**End of runbook.**
Version: v1.0 · Last verified: 2026-04-18 against Next.js 16.2.3 + Payload 3.82.1
+ Dokploy 0.28.8 + Node 24-alpine + pnpm 9.12.
