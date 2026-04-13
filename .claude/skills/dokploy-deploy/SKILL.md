---
name: dokploy-deploy
description: Use when deploying the IS website to staging or production via Dokploy, after code changes, when asked to "deploy", "push to staging", "deploy to production", "release", "ship it", or any deployment-related request. Handles full autonomous pipeline — build, push, deploy, verify. Stack Next.js 16 + Payload CMS + PostgreSQL on Dokploy.
---

# DOKPLOY STAGING DEPLOYMENT + VERIFICATION AGENT
## IS Website Instruction Runbook — v3.0
### Stack: Next.js 16 + Payload CMS 3.x + PostgreSQL 18 + Docker + Dokploy

---

## SECTION 0 — MISSION VARIABLES

**Fill these before executing. Every `<required>` MUST be resolved before any write action.**
If a value is unknown, the agent derives it from the environment — never guesses.

Resolve from CLAUDE.md, conversation history, and project memory FIRST. Only ask the user if truly unknowable.

```bash
# ── ENVIRONMENT ────────────────────────────────────────────────────────────
TARGET_ENVIRONMENT=staging
RUN_ID="$(date +%Y%m%d-%H%M%S)"

# ── DOKPLOY SERVER ──────────────────────────────────────────────────────────
DOKPLOY_HOST="<required>"           # e.g. 184.70.179.66
DOKPLOY_PORT="3000"                 # Dokploy panel default
SSH_COMMAND="<required>"            # e.g. sshpass -p 'seun2002' ssh -o StrictHostKeyChecking=no md@184.70.179.66

# ── TARGET APPLICATION ──────────────────────────────────────────────────────
DOKPLOY_PROJECT_NAME="<required>"   # Exact project name inside Dokploy
TARGET_APP_NAME="<required>"        # Exact application name (e.g. is-website-gbydeh)
TARGET_DOMAINS="<required>"         # e.g. intelligentsingularityinc.com,www.intelligentsingularityinc.com

# ── SERVICES IN THIS APPLICATION (set each to yes/no) ──────────────────────
HAS_NEXTJS_PAYLOAD=yes              # yes | no — Next.js 16 + Payload CMS monolith
HAS_POSTGRESQL=yes                  # yes | no
HAS_REDIS=no                       # yes | no
HAS_CELERY_WORKER=no               # yes | no
HAS_CELERY_BEAT=no                 # yes | no
HAS_NGINX_PROXY=no                 # yes | no

# ── IS-SPECIFIC SERVICES (co-located on same Dokploy host) ─────────────────
HAS_GLITCHTIP=yes                   # yes | no — error tracking at errors.<domain>
HAS_UPTIME_KUMA=yes                 # yes | no — monitoring at status.<domain>
HAS_PLAUSIBLE=no                    # yes | no — analytics

# ── RELEASE IDENTITY ────────────────────────────────────────────────────────
TARGET_IMAGE_TAG="<required>"       # MUST be a pinned tag — NEVER "latest"
TARGET_GIT_COMMIT="<required>"      # full git SHA for audit trail

# ── REGISTRY ────────────────────────────────────────────────────────────────
IMAGE_REGISTRY="ghcr.io"           # ghcr.io | docker.io | other
GHCR_ORG="<required>"              # GitHub org or username (e.g. ClappeDiya)
APP_IMAGE="${IMAGE_REGISTRY}/${GHCR_ORG}/intelligent-singularity-website:${TARGET_IMAGE_TAG}"

# ── DATABASE ─────────────────────────────────────────────────────────────────
DB_SERVICE_NAME="<required>"        # Dokploy service name for PostgreSQL (e.g. is-db-nksaet)
DB_NAME="<required>"                # e.g. is_prod
DB_USER="<required>"                # e.g. is
# Never store DB_PASSWORD here — verify its presence in Dokploy env, not value

# ── MIGRATION SAFETY ─────────────────────────────────────────────────────────
RUN_MIGRATIONS=yes                  # yes | no | review-first
MIGRATION_RISK="<required>"         # none | safe | caution | high-risk (set after review)

# ── ROLLBACK ─────────────────────────────────────────────────────────────────
ROLLBACK_IMAGE_TAG="<required>"     # Last known-good tag — discover from Dokploy history
ROLLBACK_TRIGGER=manual             # manual | auto
ROLLBACK_AUTO_FAIL_THRESHOLD=3      # Health check failures before auto-rollback triggers

# ── IS-SPECIFIC KNOWN VALUES ─────────────────────────────────────────────────
# These are pre-populated from project knowledge. Verify at runtime.
# Dokploy Dashboard: http://184.70.179.66:3000 (md@clappe.com / Seun@@2002)
# SSH: sshpass -p 'seun2002' ssh -o StrictHostKeyChecking=no md@184.70.179.66
# App container pattern: is-website-*
# DB container pattern: is-db-*
# Dokploy App ID: XaU9maEwsJ-j55pAi8QUF
# Dokploy Compose ID (PG): jfzt6kF1CEdyFt6A1VCSh
# Health endpoint: /api/health
# 14 locales, 2 RTL (ar, ur), locale prefix always
# PWA: sw.js + manifest.webmanifest
# Security headers set in proxy.ts middleware
# Anti-bot traps: /phpmyadmin, /wp-admin, /admin-login → 404
# Admin: /admin (IP-locked via ADMIN_ALLOWED_IPS)
# SMTP: notify@intelligentsingularityinc.com
```

---

## SECTION 1 — BINDING EXECUTION DIRECTIVES

You are an autonomous **Dokploy staging deployment and verification agent**.

**Start executing immediately.** Do not ask for permission, do not offer options, do not reduce scope.

These rules are non-negotiable:

### Platform rule
Use **Dokploy and only Dokploy** as the deployment platform for all write actions.
- Never issue Coolify commands
- Never use docker CLI for deploy actions (read-only inspection is permitted)
- Never bypass Dokploy state with direct container recreation unless recovery requires it and you document why Dokploy-native action was impossible
- All application state is managed through Dokploy — treat it as the source of truth

### Stack rule
The target stack is **Next.js 16 + Payload CMS 3.x + PostgreSQL 18**.
- This is a **monolith** — one container serves both the Next.js frontend and the Payload CMS API
- There is no separate Django backend, no Celery workers, no Redis
- Payload CMS handles auth, content management, and API routes
- All diagnostics, health checks, and log checks must target this specific stack
- Do not run Django, Rails, Spring, or other framework commands

### Non-stop rule
A blocker on one service or component **never stops** execution of independent checks.
Classify every blocker, document it, isolate its blast radius, and continue all safe remaining work.

### No-assumption rule
Never assume:
- image tags or digests
- service names or container IDs
- health endpoint paths
- env var values
- migration state
- rollback target
- which services are actually running

Discover every value from the environment before acting on it.

### Verification rule
Deployment logs showing "success" are not sufficient.
Every service requires runtime evidence before it may be marked verified.

### No-production-contamination rule
Staging must never contain:
- production database credentials (if deploying to staging)
- production domain names in env where staging domain is expected
- production payment keys, email provider keys, OAuth secrets
- production S3/storage bucket names

If any are found: stop write actions, register as Tier-3 blocker, escalate.

### Shared-host awareness rule
The Dokploy host runs multiple applications (OpenClaw, ClapWorld, Uptime Kuma, GlitchTip, etc.).
- Never touch containers belonging to other applications
- Monitor for collateral damage after deployment
- Check disk and memory usage before and after deploy

---

## SECTION 2 — PRE-DEPLOY DISCOVERY

> Do NOT execute any write action before completing this section.

### 2.1 Dokploy topology discovery

Connect to the server via SSH and confirm the following. Record every value found.

**Server access checks:**
```
- SSH connection to DOKPLOY_HOST works? → yes / no
- Dokploy panel accessible at DOKPLOY_HOST:DOKPLOY_PORT? → yes / no
- Docker daemon responding? → yes / no
- Dokploy version (from docker inspect): ___________
```

**Project and application:**
```
- Application TARGET_APP_NAME containers running? → yes / no
- Application type in Dokploy: docker-compose | dockerfile | image
- Last deploy timestamp (from container StartedAt): ___________
```

**Service inventory (for this application only):**

| Service | Container Name Pattern | Container ID | Status | Current Image Tag | Restart Count |
|---------|------------------------|--------------|--------|-------------------|---------------|
| Next.js + Payload CMS | is-website-* | | | | |
| PostgreSQL | is-db-* | | | | |
| GlitchTip (if present) | glitchtip-* | | | | |
| Uptime Kuma (if present) | uptime-kuma-* | | | | |

**Dokploy reverse proxy:**
```
- Traefik proxy running on host? → yes / no
- Domain TARGET_DOMAINS configured in Traefik routing? → yes / no
- TLS certificate status for TARGET_DOMAINS: valid / expired / missing / expiry date: ___
- Proxy routing TARGET_DOMAINS → correct application? → yes / no
```

### 2.2 Stack-specific file discovery

Scan the project codebase to confirm the following:

**Next.js + Payload CMS:**
```
- package.json present? → yes / no
- Next.js version: ___________
- Payload CMS version: ___________
- next.config.ts present? → yes / no
- output: 'standalone' configured? → yes / no
- Build command: next build --webpack (NOT Turbopack)? → yes / no
- Health check endpoint: /api/health → found at: ___
- Payload admin route: /admin → found at: ___
- NEXT_PUBLIC_SITE_URL set? → yes / no
- Proxy middleware (src/proxy.ts) present? → yes / no
- Security headers configured in proxy? → yes / no
```

**Internationalization (14 locales):**
```
- next-intl version: ___________
- Locales configured: ___________
- RTL locales: ar, ur
- Locale prefix strategy: always
- Messages directory: messages/{locale}.json
- Seed translations: src/lib/seed/translations/{locale}.ts
```

**PostgreSQL:**
```
- DATABASE_URL expected in env? → yes / no
- Payload DB adapter: @payloadcms/db-postgres
- Number of Payload collections: ___________
- Number of Payload globals: ___________
```

**Build pipeline:**
```
- Dockerfile present? → yes / no (multi-stage?)
- docker-compose.yml present? → yes / no
- Bundle budget enforced (50KB/route)? → yes / no
- Third-party check (no-third-party.mjs)? → yes / no
- Page size measurement (measure-page-sizes.mjs)? → yes / no
```

### 2.3 Current deployment state snapshot

Before any write action, capture and record:

```
SNAPSHOT TIME: ___________

Next.js + Payload CMS:
  - Container status: running | stopped | restarting | absent
  - Image tag currently running: ___________
  - Uptime: ___________
  - Restart count: ___________
  - /api/health response: ___________
  - Homepage (/en/) HTTP status: ___________

PostgreSQL:
  - Container status: ___________
  - Version: ___________
  - Accepting connections: yes / no
  - Active connection count: ___________
  - Database name: ___________

GlitchTip (if HAS_GLITCHTIP=yes):
  - glitchtip-web status: ___________
  - glitchtip-worker status: ___________
  - glitchtip-postgres status: ___________
  - glitchtip-redis status: ___________

Uptime Kuma (if HAS_UPTIME_KUMA=yes):
  - Container status: ___________

Host resources:
  - Disk usage: ___________
  - Memory usage: ___________
  - Total containers running: ___________

Pre-existing issues (found BEFORE this deployment — do NOT attribute to new release):
  - ___________
```

This snapshot is the rollback baseline. Record `ROLLBACK_IMAGE_TAG` here if not already set.

### 2.4 Environment variable audit

**RULE: Never log or display secret values. Verify key presence only.**

Scan the project source for all `process.env` references.
Cross-reference against Dokploy env vars configured for this application.

**Required env keys — mark each PRESENT or MISSING:**
```
DATABASE_URL                  → ___
PAYLOAD_SECRET                → ___
REVALIDATE_SECRET             → ___
NEXT_PUBLIC_SITE_URL          → ___ (must match staging/production domain)
ADMIN_ALLOWED_IPS             → ___
SMTP_HOST                     → ___
SMTP_PORT                     → ___
SMTP_USER                     → ___
SMTP_PASS                     → ___
SMTP_FROM                     → ___
ANTHROPIC_API_KEY             → ___ (optional — seed-time only)
```

**Contamination check — verify NONE of these patterns exist in staging env (if deploying to staging):**
```
- NEXT_PUBLIC_SITE_URL pointing to production domain when deploying to staging → none / FOUND (blocker)
- DATABASE_URL pointing to production database → none / FOUND (blocker)
- SMTP credentials for production mail server when not intended → none / FOUND (blocker)
```

### 2.5 Migration risk classification

Payload CMS manages schema through its collection/global definitions, not Django-style migration files.
However, schema changes can still be risky.

Compare Payload collections and globals between `ROLLBACK_IMAGE_TAG` and `TARGET_IMAGE_TAG`:

```bash
# Identify changes to Payload collections and globals:
git diff ${ROLLBACK_IMAGE_TAG}..${TARGET_GIT_COMMIT} -- 'src/payload/collections/' 'src/payload/globals/' --name-only

# Also check for any direct SQL or schema changes:
git diff ${ROLLBACK_IMAGE_TAG}..${TARGET_GIT_COMMIT} -- '*.sql' --name-only
```

For each changed file, classify:

| Changed file | Type | Risk level | Reversible? |
|-------------|------|------------|-------------|
| | New collection/field | SAFE | yes |
| | Modified field type | CAUTION | maybe |
| | Removed collection/field | HIGH-RISK | no |
| | Changed relationships | CAUTION | depends |

**Final migration risk classification:**
- `NONE` → no schema-related changes
- `SAFE` → additive only (new collections, new fields with defaults)
- `CAUTION` → field type changes, relationship changes
- `HIGH-RISK` → collection/field removal, data structure changes → **STOP — human confirmation required**

Set `MIGRATION_RISK` in the mission variables based on this analysis.

### 2.6 Image verification

Confirm the target image exists and is pullable before deploying:

```bash
# Verify app image exists (check on server or via registry API)
docker manifest inspect ${APP_IMAGE}
# Expected: image manifest JSON — not an error

# Verify Dokploy has registry credentials configured if using private GHCR
```

Record:
```
App image ${TARGET_IMAGE_TAG} exists: yes / no
Image digest: ___________
Image size: ___________
```

---

## SECTION 3 — PRE-DEPLOY SAFETY GATES

All six gates must be evaluated in order. A FAIL on any gate is registered in the Blocker Registry — it does NOT silently prevent the remaining gates from being checked.

**Gate results format:**  `PASS | FAIL | BLOCKED` — one line per item.

### Gate 1 — Release identity
```
[ ] TARGET_IMAGE_TAG is a pinned semantic tag or SHA — not "latest", not "main"
[ ] TARGET_GIT_COMMIT is a full 40-character SHA
[ ] APP_IMAGE exists in registry at TARGET_IMAGE_TAG
[ ] Target environment is confirmed (staging or production as intended)
[ ] No environment contamination found (from Section 2.4 check)
```

### Gate 2 — Dokploy access and application state
```
[ ] SSH access to DOKPLOY_HOST works
[ ] Dokploy panel is accessible
[ ] Docker daemon is responding
[ ] TARGET_APP_NAME containers are discoverable
[ ] Dokploy Traefik reverse proxy is running and TARGET_DOMAINS are routed
```

### Gate 3 — Environment completeness
```
[ ] All required env keys PRESENT in Dokploy env (Section 2.4)
[ ] NEXT_PUBLIC_SITE_URL matches the correct domain for target environment
[ ] DATABASE_URL points to the correct database
[ ] ADMIN_ALLOWED_IPS is configured
[ ] SMTP credentials are present
[ ] No MISSING keys found in Section 2.4 audit
```

### Gate 4 — Dependency health
```
[ ] PostgreSQL container running and accepting connections
[ ] Database is accessible from app container
[ ] SMTP server reachable (if SMTP vars configured)
[ ] Disk usage below 85% on host
[ ] Memory available on host (not exhausted)
```

### Gate 5 — Migration safety
```
[ ] MIGRATION_RISK classified as none | safe | caution | high-risk
[ ] If HIGH-RISK: human confirmation obtained before proceeding — deployment PAUSED
[ ] If CAUTION: risk documented, mitigation plan stated, proceeding with caution
[ ] If NONE or SAFE: proceed
[ ] Payload CMS will auto-migrate on startup — acknowledged and acceptable
```

### Gate 6 — Rollback readiness
```
[ ] ROLLBACK_IMAGE_TAG confirmed and exists in registry
[ ] Current running image tags recorded (snapshot from Section 2.3)
[ ] Rollback steps documented
[ ] If schema changed: data loss risk on rollback is documented
[ ] All co-dependent services identified (app + db)
```

---

## SECTION 4 — DEPLOYMENT EXECUTION

> Only proceed after all 6 gates are evaluated and no unresolved Tier-3 blockers exist.

### 4.1 Deployment order

Services must be deployed in this order to respect dependencies:

```
1. PostgreSQL       — no action needed (do not redeploy unless image changed intentionally)
2. Next.js + Payload CMS — deploy new image (Payload auto-migrates on startup)
3. Verify health before declaring success
```

**Do not redeploy PostgreSQL unless its image tag has changed AND it is intentional.**
**Do not redeploy any other application on the Dokploy host.**

### 4.2 Pre-deploy resource check

```bash
# Check host resources before deploying
SSH_COMMAND "df -h / | tail -1"
SSH_COMMAND "free -h"
SSH_COMMAND "docker images | wc -l"

# If disk > 85%: prune unused images first
SSH_COMMAND "docker image prune -f"
```

### 4.3 Next.js + Payload CMS deployment

```
Action: Update the app service image tag to TARGET_IMAGE_TAG via Dokploy
Method: Dokploy dashboard → Project → Application → Deploy with new image tag
        OR via Dokploy API if token available
        OR via docker service update if running as swarm service

Monitor:
- Observe deploy log in real time
- Wait for container to reach "running" state — not just "starting"
- Payload CMS auto-migrates schema on startup — watch for migration output
- Expected startup log: "Ready" or "started server on" with port 3000
- Timeout: 180 seconds (Payload migration + Next.js build can be slow)
```

**Startup verification sequence:**
```bash
# 1. Container is running
SSH_COMMAND "docker ps --filter 'name=is-website' --format '{{.Names}}: {{.Status}}'"

# 2. No crash loops
SSH_COMMAND "docker inspect $(docker ps -q --filter 'name=is-website') --format '{{.RestartCount}}'"

# 3. App logs show successful start
SSH_COMMAND "docker logs --tail 30 $(docker ps -q --filter 'name=is-website') 2>&1"

# 4. Health endpoint responds
curl -sS -w "\nStatus: %{http_code} | Time: %{time_total}s\n" "https://TARGET_DOMAINS/api/health"
```

### 4.4 Deploy failure protocol

If the app fails to reach running state:

```
1. Capture exact error from deploy log
2. Capture last 50 lines from container logs
3. Classify: is this app-specific or a shared dependency failure?
4. Check: did Payload CMS migration fail? (look for "migration" + "error" in logs)
5. Check: is PostgreSQL still healthy?
6. Attempt: one controlled redeploy if error suggests transient issue (pull timeout, OOM-killed)
7. If still failing after one retry: register in Blocker Registry with full evidence
8. Do not enter retry loops beyond one controlled retry
```

---

## SECTION 5 — POST-DEPLOY VERIFICATION

All verification results must follow this format — one line per check:

```
[PASS|FAIL|SKIP] | service:check-name | evidence | timestamp
```

No check may be marked PASS without actual evidence. No narrative claims of success.

### 5.1 Container health verification

```bash
# App container
SSH_COMMAND "docker inspect $(docker ps -q --filter 'name=is-website') --format '{{.State.Status}} {{.State.StartedAt}} {{.RestartCount}}'"
# Expected: running <recent-timestamp> 0

# DB container
SSH_COMMAND "docker inspect $(docker ps -q --filter 'name=is-db') --format '{{.State.Status}} {{.State.StartedAt}} {{.RestartCount}}'"
# Expected: running <timestamp> 0
```

Emit one check line per service:
```
PASS | container:app:running     | status=running, restarts=0, uptime=47s    | <timestamp>
PASS | container:postgres:running| status=running, restarts=0, uptime=3h12m  | <timestamp>
```

### 5.2 Health API verification

```bash
# Health endpoint
curl -sS -w "\nStatus: %{http_code} | Time: %{time_total}s\n" "https://TARGET_DOMAINS/api/health"
# Expected: 200 with JSON {"status":"ok","timestamp":"...","version":"..."}
```

Emit:
```
PASS | app:health-endpoint       | GET /api/health → 200 in 145ms, version=1.0.0 | <timestamp>
```

### 5.3 Page rendering verification

```bash
# Homepage (locale-prefixed)
curl -sS -o /dev/null -w "%{http_code}" "https://TARGET_DOMAINS/en/"
# Expected: 200

# All public pages
for route in "/en/" "/en/about" "/en/contact" "/en/manifesto" "/en/green" "/en/portfolio"; do
  code=$(curl -sS -o /dev/null -w "%{http_code}" "https://TARGET_DOMAINS${route}")
  echo "${route}: ${code}"
done
# Expected: all 200

# Payload admin (should redirect or return 200/403 based on IP lock)
curl -sS -o /dev/null -w "%{http_code}" "https://TARGET_DOMAINS/admin"
# Expected: 200 or 302 or 307 (IP lock redirect) — NOT 500
```

Emit checks:
```
PASS | app:homepage              | GET /en/ → 200 in 120ms                   | <timestamp>
PASS | app:about                 | GET /en/about → 200 in 147ms              | <timestamp>
PASS | app:contact               | GET /en/contact → 200 in 264ms            | <timestamp>
PASS | app:manifesto             | GET /en/manifesto → 200 in 658ms          | <timestamp>
PASS | app:green                 | GET /en/green → 200 in 304ms              | <timestamp>
PASS | app:portfolio             | GET /en/portfolio → 200 in 162ms          | <timestamp>
PASS | app:admin                 | GET /admin → 307 (IP lock active)         | <timestamp>
```

### 5.4 Internationalization verification

```bash
# Locale routing — all 14 locales must respond
for locale in en es ar zh-CN fr pt hi ur bn ru id sw yo ha; do
  code=$(curl -sS -o /dev/null -w "%{http_code}" "https://TARGET_DOMAINS/${locale}/")
  echo "${locale}: ${code}"
done
# Expected: all 200 or 308

# RTL check — Arabic page should have dir="rtl"
curl -sS "https://TARGET_DOMAINS/ar/" | grep -o 'dir="rtl"' | head -1
# Expected: dir="rtl"
```

Use WebFetch for deeper content checks if browser automation unavailable:
- Verify Spanish page shows translated content (not English)
- Verify no raw translation keys visible (no `nav.home`, `hero.title` patterns)
- Verify Arabic page has RTL layout

Emit checks:
```
PASS | i18n:locale-routing       | 14/14 locales return 200/308              | <timestamp>
PASS | i18n:rtl-arabic           | dir="rtl" found on /ar/ page              | <timestamp>
PASS | i18n:no-key-leakage       | No raw translation keys visible           | <timestamp>
PASS | i18n:translation-works    | /es/ shows Spanish content                | <timestamp>
```

### 5.5 PostgreSQL verification

```bash
# Connection test from app container
SSH_COMMAND "docker exec $(docker ps -q --filter 'name=is-db') psql -U ${DB_USER} -d ${DB_NAME} -c 'SELECT version();'"
# Expected: PostgreSQL version string

# Check connection count
SSH_COMMAND "docker exec $(docker ps -q --filter 'name=is-db') psql -U ${DB_USER} -d ${DB_NAME} -c \"SELECT count(*) FROM pg_stat_activity WHERE state = 'active';\""
# Expected: reasonable number

# Verify data exists (tables created by Payload)
SSH_COMMAND "docker exec $(docker ps -q --filter 'name=is-db') psql -U ${DB_USER} -d ${DB_NAME} -c '\\dt' | head -20"
# Expected: Payload collection tables present
```

Emit checks:
```
PASS | postgres:connection       | SELECT version() → PostgreSQL 18.x       | <timestamp>
PASS | postgres:connection-count | 5 active — healthy                       | <timestamp>
PASS | postgres:tables-exist     | Payload tables present (users, media...) | <timestamp>
```

### 5.6 Security verification

```bash
# Security headers (must follow redirects to get middleware-applied headers)
curl -sS -L -D- -o /dev/null "https://TARGET_DOMAINS/en/" | grep -iE 'strict-transport|content-security|x-frame|x-content-type|referrer-policy|permissions-policy'
# Expected: all 6 headers present

# Anti-bot traps
for path in "/phpmyadmin" "/wp-admin" "/admin-login"; do
  code=$(curl -sS -L -o /dev/null -w "%{http_code}" "https://TARGET_DOMAINS${path}")
  echo "${path}: ${code}"
done
# Expected: all 404
```

Emit checks:
```
PASS | security:hsts             | Strict-Transport-Security present         | <timestamp>
PASS | security:csp              | Content-Security-Policy with nonce        | <timestamp>
PASS | security:x-frame          | X-Frame-Options: DENY                    | <timestamp>
PASS | security:x-content-type   | X-Content-Type-Options: nosniff          | <timestamp>
PASS | security:referrer          | Referrer-Policy present                  | <timestamp>
PASS | security:permissions       | Permissions-Policy present               | <timestamp>
PASS | security:anti-bot-traps   | /phpmyadmin,/wp-admin,/admin-login → 404 | <timestamp>
```

### 5.7 PWA verification

```bash
# Service worker
curl -sS -o /dev/null -w "%{http_code}" "https://TARGET_DOMAINS/sw.js"
# Expected: 200

# Web manifest
curl -sS "https://TARGET_DOMAINS/manifest.webmanifest" | head -5
# Expected: valid JSON with name, icons, start_url
```

Emit checks:
```
PASS | pwa:service-worker        | sw.js → 200                              | <timestamp>
PASS | pwa:manifest              | manifest.webmanifest → valid JSON         | <timestamp>
```

### 5.8 TLS and proxy verification

```bash
# TLS certificate check
echo | openssl s_client -connect TARGET_DOMAINS:443 -servername TARGET_DOMAINS 2>/dev/null | openssl x509 -noout -dates -subject
# Expected: valid cert, not expired, correct CN

# Proxy routing
curl -sS -o /dev/null -w "%{http_code} %{time_total}s" "https://TARGET_DOMAINS/"
# Expected: 200 or 307

# Check subdomains if applicable
curl -sS -o /dev/null -w "%{http_code}" "https://errors.TARGET_DOMAINS/" 2>/dev/null
curl -sS -o /dev/null -w "%{http_code}" "https://status.TARGET_DOMAINS/" 2>/dev/null
```

Emit checks:
```
PASS | tls:valid-cert            | notAfter: 2026-07-11, 90 days remaining  | <timestamp>
PASS | proxy:routing-correct     | https://domain → 200                     | <timestamp>
PASS | tls:errors-subdomain      | errors.domain → 200 with valid TLS       | <timestamp>
PASS | tls:status-subdomain      | status.domain → 200/302 with valid TLS   | <timestamp>
```

### 5.9 Performance smoke test

```bash
for route in "/en/" "/en/about" "/en/contact" "/en/manifesto" "/api/health"; do
  time=$(curl -sS -o /dev/null -w "%{time_total}" "https://TARGET_DOMAINS${route}")
  echo "${route}: ${time}s"
done
```

| Time | Grade |
|---|---|
| < 3.0s | Good |
| 3.0-5.0s | Slow — note |
| 5.0-15.0s | Critical — Tier 2 |
| > 15.0s | Severe — Tier 1 |

### 5.10 Observability and logs review

```bash
# App errors in last hour
SSH_COMMAND "docker logs --since '1h' $(docker ps -q --filter 'name=is-website') 2>&1 | grep -ciE 'error|exception'"
# Expected: 0 or very low

# App 500s in last hour
SSH_COMMAND "docker logs --since '1h' $(docker ps -q --filter 'name=is-website') 2>&1 | grep -c ' 500 '"
# Expected: 0

# DB errors in last hour
SSH_COMMAND "docker logs --since '1h' $(docker ps -q --filter 'name=is-db') 2>&1 | grep -iE 'error|fatal' | tail -5"
# Expected: none (or only external brute-force attempts)
```

### 5.11 Shared environment regression surveillance

Because this Dokploy host runs multiple applications:

```bash
# Check all containers on host are still healthy
SSH_COMMAND "docker ps --format 'table {{.Names}}\t{{.Status}}' | head -20"

# For each known co-hosted app, check reachability:
# OpenClaw, ClapWorld, GlitchTip, Uptime Kuma
```

```
Other apps checked for collateral damage:
  - App: _________ | Status before: ___ | Status after: ___ | Impacted: yes/no
```

### 5.12 Backup verification

```bash
# Check backup cron exists
SSH_COMMAND "crontab -l | grep is-db-backup"
# Expected: cron entry present

# Check most recent backup
SSH_COMMAND "ls -la ~/backups/is-db/ | tail -3"
# Expected: recent .gpg file present
```

---

## SECTION 6 — BLOCKER REGISTRY

Maintain throughout the run. Every blocker must be logged — including resolved ones.

```
BLOCKER-{N}
Timestamp:              
Tier:                   1 (self-actionable) | 2 (non-blocking) | 3 (escalate to human)
Scope:                  service | application | shared-infra | control-plane
Affected service(s):    
Affected checks:        (list Section 5 check IDs that are blocked)
Symptoms:               
Evidence (exact):       
Probable root cause:    
Mitigation attempted:   
Mitigation result:      resolved | partial | unresolved
Can other checks continue? yes — list them | no — explain why not
Rollback needed:        yes | no | unknown
Human review required:  yes | no
```

### Tier definitions

| Tier | Meaning | Agent action |
|------|---------|--------------|
| 1 | Blocking but agent can fix | Fix it, retry, continue |
| 2 | Non-blocking — app runs with degradation | Document, continue, note in final report |
| 3 | Risk too high for autonomous action | Stop write actions on affected scope, escalate, continue unaffected checks |

### Continuation mandate

A Tier-1 or Tier-2 blocker on one service MUST NOT stop these checks from continuing:

| Blocked service | These checks must still run |
|-----------------|-----------------------------|
| App fails to start | PostgreSQL check, TLS check, shared-app regression, backup check |
| Database unreachable | Container health, TLS/proxy checks, PWA check, security headers |
| TLS expired | All container and health checks, log review |
| Deploy fails | Pre-existing state verification, rollback readiness |

Only a Tier-3 blocker affecting shared infrastructure halts write actions for affected scope.
All read-only checks continue regardless.

---

## SECTION 7 — ROLLBACK LOGIC

### 7.1 When to recommend rollback

Recommend rollback when ANY of these conditions are true:
- App container is not running after deploy + one retry
- Payload CMS migration caused schema corruption
- More than `ROLLBACK_AUTO_FAIL_THRESHOLD` consecutive health checks fail
- A Tier-3 blocker is detected that originated from this release (not pre-existing)
- All public pages returning 500

### 7.2 Manual rollback steps (Dokploy-specific)

```
If ROLLBACK_TRIGGER=manual and rollback is recommended:

1. Document: "ROLLBACK RECOMMENDED — [specific reason] — human action required"

2. Exact rollback procedure:
   a. Dokploy → Project → Application → is-website
      → Change image tag to ROLLBACK_IMAGE_TAG → Deploy
      OR via SSH: docker service update --image ROLLBACK_IMAGE is-website-gbydeh
   b. Wait for app to reach running state
   c. If Payload schema changed: assess whether rollback causes data issues
      → If schema is backward-compatible: safe to rollback
      → If new columns were added: rollback is safe (Payload ignores extra columns)
      → If columns were removed: data loss risk — escalate as Tier-3
   d. Verify health using Section 5 checks against ROLLBACK_IMAGE_TAG

3. After rollback: re-run full Section 5 verification
4. Emit rollback outcome in final report
```

### 7.3 Auto-rollback procedure

```
If ROLLBACK_TRIGGER=auto AND health check failures >= ROLLBACK_AUTO_FAIL_THRESHOLD:

1. Emit: "AUTO-ROLLBACK TRIGGERED | failures: N | threshold: ROLLBACK_AUTO_FAIL_THRESHOLD | <timestamp>"
2. Record pre-rollback state
3. Execute rollback steps from Section 7.2
4. Verify rollback health
5. Report: ROLLBACK COMPLETED | new status: <result>
```

### 7.4 Schema rollback caveat

```
If Payload CMS made schema changes on startup and rollback is required:
- Additive changes (new tables/columns): safe to rollback, old code ignores them
- Removed columns: DATA LOSS RISK — previous version may expect those columns
  → Do NOT auto-rollback
  → Escalate to human as Tier-3 blocker
- Type changes: CAUTION — may cause runtime errors on rollback
  → Document exact changes and escalate
```

---

## SECTION 8 — CONTEXT CHECKPOINT SYSTEM

After completing each major section, emit a checkpoint in this exact format.
This enables a new Claude Code context to resume from exactly where execution stopped.

```json
{
  "run_id": "<RUN_ID>",
  "timestamp": "<ISO8601>",
  "agent_version": "v3.0",
  "target_app": "<TARGET_APP_NAME>",
  "target_tag": "<TARGET_IMAGE_TAG>",
  "sections_completed": ["S0", "S1", "S2"],
  "current_section": "S3",
  "current_task": "Gate 3 — Environment completeness",
  "blockers_active": [],
  "service_status": {
    "nextjs-payload": "deployed-verified",
    "postgres": "verified-pre-existing",
    "glitchtip": "verified-pre-existing",
    "uptime-kuma": "verified-pre-existing"
  },
  "health_checks_passed": 12,
  "health_checks_failed": 0,
  "health_checks_skipped": 0,
  "rollback_candidate": "<ROLLBACK_IMAGE_TAG>",
  "next_action": "Run Gate 4 — dependency health checks"
}
```

**Context exhaustion protocol:**
If the context window is approaching its limit:
1. Emit the full checkpoint immediately
2. State: `"CONTEXT LIMIT APPROACHING — checkpoint emitted — resume from section [X] task [Y]"`
3. New agent context MUST start by reading the checkpoint and resuming from `next_action`

---

## SECTION 9 — FINAL REPORT

Emit this report at the end of every run, even if incomplete.

### A. Executive outcome
```
DEPLOYMENT REPORT
Run ID:              
Status:              READY | DEPLOYED-WITH-DEFECTS | PARTIAL | NOT-SAFE
Application:         
Release deployed:    
Git commit:          
Deploy platform:     Dokploy
Deploy timestamp:    
Environment:         staging | production
Ready:               yes | no | partial
```

### B. Service deployment summary

| Service | Image Tag Deployed | Container Status | Health Checks | Issues |
|---------|--------------------|------------------|---------------|--------|
| Next.js + Payload CMS | | | pass/fail | |
| PostgreSQL | (unchanged) | | pass/fail | |
| GlitchTip | (unchanged) | | pass/fail | |
| Uptime Kuma | (unchanged) | | pass/fail | |

### C. Complete health check log

Full structured log of every check run in Section 5:

```
[PASS|FAIL|SKIP] | check-name | evidence | timestamp
...
```

**Summary:**
```
Total checks:    ___
PASS:            ___
FAIL:            ___
SKIP:            ___
Pass rate:       ___%
```

### D. Blocker summary

```
Tier 1 (self-actionable):   ___ blockers — ___ resolved | ___ unresolved
Tier 2 (non-blocking):      ___ blockers — documented
Tier 3 (escalate):          ___ blockers — human action required
```

### E. I18N report
```
Locales tested:        14 / 14
RTL verified:          yes | no
Key leakage found:     none | list
Language switch works:  yes | no
```

### F. Security report
```
Security headers:      6/6 present | list missing
Anti-bot traps:        3/3 working | list failing
TLS valid:             yes | no (expiry: ___)
Admin IP lock:         working | not working
```

### G. Shared environment safety
```
Other apps checked:        N apps
Collateral damage found:   none | list affected apps
Traefik proxy status:      healthy | degraded
Host disk usage:           ___%
Host memory:               ___
```

### H. Rollback position
```
Rollback candidate:       <ROLLBACK_IMAGE_TAG>
Rollback feasibility:     safe | schema-risk | blocked
Rollback recommendation:  not needed | recommended | required
```

### I. Final status (one of four — no other options)

```
READY
  → All critical checks pass. No blocking issues. Deployment is healthy.

DEPLOYED WITH NON-BLOCKING DEFECTS
  → Application is running. Minor Tier-2 issues found. Document before production.

PARTIALLY DEPLOYED / PARTIALLY VERIFIED
  → Some checks passed. Others blocked. Continue from checkpoint.

NOT SAFE
  → Critical failures found. Rollback recommended or required.
```

### J. Exact next action

> One sentence — the single most important next operational step.

---

## SECTION 10 — ANTI-FAILURE ENFORCEMENT

Before declaring the run complete, verify every item below is true.
If any are unchecked, the run is incomplete.

**Discovery:**
- [ ] Server access confirmed (SSH + Docker)
- [ ] Stack confirmed as Next.js 16 + Payload CMS 3.x + PostgreSQL 18
- [ ] Current state snapshot captured before any write action
- [ ] All env var keys audited — no MISSING keys proceed without documentation
- [ ] No environment contamination found (or Tier-3 blocker registered)
- [ ] Migration risk classified and `MIGRATION_RISK` set

**Safety gates:**
- [ ] All 6 gates evaluated (not skipped)
- [ ] Target image exists in registry at pinned tag
- [ ] Rollback candidate confirmed

**Deployment:**
- [ ] PostgreSQL left untouched (unless intentionally changed)
- [ ] App deployed with correct image tag
- [ ] Only TARGET_APP_NAME services were touched
- [ ] No other Dokploy applications were modified

**Verification:**
- [ ] All 12 verification subsections executed (or SKIP emitted with reason)
- [ ] Every PASS has real evidence — not a narrative claim
- [ ] Full structured health check log emitted
- [ ] I18N verified (14 locales, RTL, no key leakage)
- [ ] Security headers verified (6/6)
- [ ] Anti-bot traps verified (3/3)
- [ ] PWA verified (sw.js + manifest)

**Continuity:**
- [ ] At least one context checkpoint emitted
- [ ] All active blockers in Blocker Registry with tier and scope
- [ ] No blocker stopped independent checks from running

**Report:**
- [ ] Final report sections A through J all present
- [ ] Final status explicitly declared (one of the 4 valid outcomes)
- [ ] Exact next action stated in one sentence

---

## SECTION 11 — QUICK-START EXAMPLES

### Full deploy (app + verify everything)

```bash
TARGET_ENVIRONMENT=production
DOKPLOY_HOST=184.70.179.66
SSH_COMMAND="sshpass -p 'seun2002' ssh -o StrictHostKeyChecking=no md@184.70.179.66"
DOKPLOY_PROJECT_NAME=is-website
TARGET_APP_NAME=is-website-gbydeh
TARGET_DOMAINS=intelligentsingularityinc.com
HAS_NEXTJS_PAYLOAD=yes
HAS_POSTGRESQL=yes
HAS_GLITCHTIP=yes
HAS_UPTIME_KUMA=yes
TARGET_IMAGE_TAG=v1.0.0
TARGET_GIT_COMMIT=c46c3e0...
APP_IMAGE=ghcr.io/ClappeDiya/intelligent-singularity-website:v1.0.0
DB_SERVICE_NAME=is-db-nksaet
DB_NAME=is_prod
DB_USER=is
RUN_MIGRATIONS=yes
MIGRATION_RISK=safe
ROLLBACK_IMAGE_TAG=v0.9.0
```

### Verify-only (no deploy, just check current state)

Set all `HAS_*` to their actual values but skip Section 4 entirely.
Run Section 2 (discovery) + Section 5 (verification) + Section 9 (report).

### Frontend-only deploy (content change, no schema change)

```bash
RUN_MIGRATIONS=no
MIGRATION_RISK=none
# Everything else same — deploy new image, verify pages render
```

---

*End of IS Website Dokploy Deployment + Verification Agent Runbook v3.0*
*Stack: Next.js 16 + Payload CMS 3.x + PostgreSQL 18 + Docker*
*Platform: Dokploy (exclusive)*
