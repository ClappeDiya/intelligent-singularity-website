---
name: e2e-production-verification
description: Use when verifying the IS website production deployment on Dokploy, after deploying changes, before tagging releases, or when investigating production issues. Triggers on deploy verification, launch readiness, post-deployment checks, production health audit, E2E testing.
---

# IS Production E2E Verification Runbook

Post-deployment live validation for intelligentsingularityinc.com on Dokploy.

## 0. BINDING EXECUTION DIRECTIVE

You are an autonomous **production post-deployment E2E verification agent**.

Upon receiving this runbook, begin execution immediately:

- Do **not** ask whether to proceed
- Do **not** reduce scope or silently skip checks
- Do **not** treat logs alone as proof of health
- Do **not** make production changes unless explicitly allowed
- Begin at **Section 1** and work through in order
- If one verification path is blocked, continue all remaining safe and independent work

---

## 1. PARAMETER RESOLUTION — PRE-POPULATED FOR IS

### 1.1 Known parameters

| Parameter | Value |
|---|---|
| **Production URL** | `https://intelligentsingularityinc.com` |
| **Project name** | intelligent-singularity-website |
| **SSH Command** | Resolve from CLAUDE.md or conversation — server IP `184.70.179.66` |
| **Dokploy Dashboard** | `http://184.70.179.66:3000` (md@clappe.com / Seun@@2002) |
| **Dokploy App ID** | `XaU9maEwsJ-j55pAi8QUF` |
| **Dokploy Compose ID (PG)** | `jfzt6kF1CEdyFt6A1VCSh` |
| **GitHub repo** | ClappeDiya/intelligent-singularity-website |
| **Domain aliases** | intelligentsingularityinc.com + www (Let's Encrypt TLS) |
| **Login credentials** | Payload admin — resolve from env or conversation |

### 1.2 Known stack

| Component | Technology | Container hint |
|---|---|---|
| Frontend + Backend | Next.js 16 + Payload CMS 3.x (monolith) | `is-website-*` port 3000 |
| Database | PostgreSQL 18 | `is-stack-*` port 5432 |
| Cache | None | — |
| Worker | None | — |
| I18N | next-intl, 14 locales (2 RTL: ar, ur) | — |
| Auth | Payload built-in (IP-locked admin) | — |

### 1.3 Known routes

| Role | Path |
|---|---|
| Homepage | `/en/` (locale-prefixed always) |
| About | `/en/about` |
| Contact | `/en/contact` |
| Manifesto | `/en/manifesto` |
| Green | `/en/green` |
| Portfolio | `/en/portfolio` |
| Legal (dynamic) | `/en/legal/[slug]` |
| Health API | `/api/health` |
| Payload Admin | `/admin` (IP-locked) |
| Contact API | `POST /api/contact` |
| Seed API | `POST /api/seed` |
| Anti-bot traps | `/phpmyadmin`, `/wp-admin`, `/admin-login` → 404 |

### 1.4 State tracking

Create `verification-state.md` in the workspace immediately:

```markdown
# Verification State — IS Website

## Parameters
- PRODUCTION_URL: https://intelligentsingularityinc.com
- PROJECT_NAME: intelligent-singularity-website
- SSH_COMMAND: <resolve from CLAUDE.md>
- SSH_AVAILABLE: <test and set>
- DOKPLOY_URL: http://184.70.179.66:3000
- RUN_ID: <YYYYMMDD-HHMMSS>
- OPERATING_MODE: <A / B / C — set in Section 2>

## Containers
- APP_CONTAINER: <discover — matches is-website-*>
- DB_CONTAINER: <discover — matches is-stack-*>

## Blocker Count
- Total: 0
- Tier 1: 0
- Tier 2: 0
- Tier 3: 0
```

### 1.5 PLACEHOLDER SUBSTITUTION RULE

Before executing any command, substitute all UPPERCASE tokens with real values from `verification-state.md`. Never execute a command containing a raw placeholder.

---

## 2. OPERATING MODE SELECTION

```
IF SSH works AND browser tool available → Mode A (full)
ELSE IF browser tool available (no SSH)  → Mode B (HTTP + browser)
ELSE IF curl reaches production          → Mode C (HTTP only)
ELSE → BLOCKED
```

**Test SSH:** `ssh SSH_COMMAND "echo ok" 2>&1`
**Test HTTP:** `curl -sS -o /dev/null -w "%{http_code}" https://intelligentsingularityinc.com/`

Record mode in state file.

---

## 3. PRODUCTION SAFETY RULES

### Allowed
- Read-only SSH: docker ps, logs, inspect, stats, images
- HTTP GET/HEAD to any endpoint
- Browser navigation + screenshots
- File creation in agent workspace

### Forbidden
- Redeploy, restart, rebuild, scale containers
- Modify env vars, config, secrets
- Run migrations, seeds, or schema changes
- Direct database queries
- Clear caches or trigger background jobs
- Create/modify/delete production data
- Install packages on production server

---

## 4. PRE-VERIFICATION DISCOVERY

### 4.1 Domain + TLS (All modes)

```bash
curl -sS -o /dev/null -w "Status: %{http_code}\nTime: %{time_total}s\nRedirect: %{redirect_url}\n" "https://intelligentsingularityinc.com/"
```

```bash
echo | openssl s_client -connect intelligentsingularityinc.com:443 -servername intelligentsingularityinc.com 2>/dev/null | openssl x509 -noout -dates -subject 2>/dev/null
```

If unreachable → entire run is BLOCKED. Write report immediately.

### 4.2 Service topology (Mode A only)

```bash
ssh SSH_COMMAND "docker ps --format '{{.Names}}|||{{.Image}}|||{{.Status}}|||{{.Ports}}|||{{.RunningFor}}'"
```

Identify containers matching `is-website-*` (app) and `is-stack-*` (postgres). Record in state file.

### 4.3 Release identity + restart count (Mode A only)

```bash
ssh SSH_COMMAND "docker inspect --format '{{.Name}}: {{.Config.Image}} | Started: {{.State.StartedAt}} | Restarts: {{.RestartCount}}' \$(docker ps -q)"
```

Flag any container with >3 restarts.

### 4.4 Rollback position (Mode A only)

```bash
ssh SSH_COMMAND "docker images --format 'table {{.Repository}}\t{{.Tag}}\t{{.CreatedAt}}' | head -20"
```

---

## 5. FAST-FAIL CRITICAL PATH

Execute in this exact order. If checks 1-3 all fail, the release is fundamentally broken.

### Check 1: Domain + TLS (All modes)

```bash
curl -sS -o /dev/null -w "HTTPS: %{http_code} | Time: %{time_total}s\n" "https://intelligentsingularityinc.com/"
```

| Result | Verdict |
|---|---|
| 200, 301, 302 | PASSED |
| 502, 503 | FAILED Tier 1 — app not serving |
| 000 / timeout | FAILED Tier 1 — unreachable |
| TLS error | FAILED Tier 1 — certificate problem |

### Check 2: Container health (Mode A only)

```bash
ssh SSH_COMMAND "docker ps --format '{{.Names}}: {{.Status}}' | grep -iE 'is-website\|is-stack\|postgres'"
```

Flag: `Restarting`, `Exited`, `Dead`, or missing.

### Check 3: Homepage renders (Modes A, B)

Using browser automation:

1. Navigate to `https://intelligentsingularityinc.com/en/`
2. Wait for network idle
3. Screenshot → `screenshots/01-homepage.png`
4. Capture console errors → `console/01-homepage.log`
5. **IS-specific checks:**
   - Counter shows ~2,210,000,000 (the offline population figure)
   - Hero section has real content, not placeholder text
   - Navigation bar renders with locale selector (language wheel)
   - Footer renders with links

### Check 4: Health API (All modes)

```bash
curl -sS -w "\nStatus: %{http_code} | Time: %{time_total}s\n" "https://intelligentsingularityinc.com/api/health"
```

Expected: 200 with JSON `{"status": "ok", "timestamp": "...", "version": "..."}`.

### Check 5: Payload Admin access (All modes)

```bash
curl -sS -o /dev/null -w "%{http_code}" "https://intelligentsingularityinc.com/admin"
```

Expected: 200 or 302 (redirect to login). A 403 is acceptable (IP lock working). A 500/502 is Tier 1.

### Check 6: Database path validation (Mode A only)

```bash
ssh SSH_COMMAND "docker logs --tail 30 DB_CONTAINER 2>&1 | grep -iE 'error|fatal|refused|timeout' | tail -5"
```

Also verify indirectly: if homepage renders with the counter data and content, the DB is connected.

---

## 6. EXTENDED PAGE VERIFICATION (Modes A, B)

Navigate to each, capture screenshot + console errors.

| # | Page | URL | Screenshot | IS-specific check |
|---|---|---|---|---|
| 1 | Homepage | `/en/` | `02-homepage-full.png` | Counter, hero, nav, footer |
| 2 | About | `/en/about` | `03-about.png` | Team/mission content renders |
| 3 | Manifesto | `/en/manifesto` | `04-manifesto.png` | Lexical rich text renders (not `<pre>` placeholders) |
| 4 | Green | `/en/green` | `05-green.png` | Sustainability content, no false renewable claims |
| 5 | Contact | `/en/contact` | `06-contact.png` | Contact form with name/email/message fields |
| 6 | Portfolio | `/en/portfolio` | `07-portfolio.png` | Product cards render |
| 7 | Legal (privacy) | `/en/legal/privacy-policy` | `08-legal.png` | Legal text renders |

### Per-page evidence record

| Field | Capture |
|---|---|
| URL | Actual URL visited |
| HTTP status | From navigation |
| Visual state | Content / blank / error / broken layout |
| Console errors | Count by severity |
| Translation keys visible? | Yes / No |
| Screenshot path | File path |
| Result | PASSED / FAILED Tier X / BLOCKED |

---

## 7. CONSOLE ERROR THRESHOLDS

Apply to every page visited via browser:

| Condition | Verdict |
|---|---|
| 0 errors | PASS |
| 1-3 non-critical warnings | PASS with notes |
| `ChunkLoadError` or missing JS module | FAIL Tier 1 — broken build |
| `TypeError`/`ReferenceError` preventing render | FAIL Tier 1 — JS crash |
| `NetworkError` to API domain | FAIL Tier 1 — backend unreachable |
| Translation key strings in rendered text | FAIL Tier 2 — i18n broken |
| React/Next.js hydration mismatch | PASS with notes |
| 10+ errors on single page | FAIL Tier 2 |

---

## 8. INTERNATIONALIZATION VERIFICATION (MANDATORY — IS has 14 locales)

IS uses next-intl with locale-prefixed routes (`/en/`, `/ar/`, `/es/`, etc.).

### 8.1 Key leakage check (Modes A, B)

On homepage, about, and contact pages — scan visible text for:
- Dot-separated strings: `nav.home`, `hero.title`
- Literal `undefined` as visible text
- `missing_key`, `key_not_found`, `ns:`

Any raw key visible → **FAIL Tier 2**.

### 8.2 Locale routing (All modes)

```bash
for locale in en es ar zh-CN fr pt hi; do
  code=$(curl -sS -o /dev/null -w "%{http_code}" "https://intelligentsingularityinc.com/${locale}/" 2>/dev/null)
  echo "${locale}: ${code}"
done
```

All should return 200 or 307/308 redirect to locale-prefixed path. 404 = FAIL Tier 2.

### 8.3 Language switch (Modes A, B)

1. Navigate to `/en/`
2. Use the language wheel to switch to Spanish (`/es/`)
3. Verify visible text changes to Spanish
4. Screenshot → `screenshots/09-i18n-es.png`

### 8.4 RTL check (Modes A, B)

1. Navigate to `/ar/` (Arabic)
2. Verify layout direction reverses (CSS `dir="rtl"`)
3. Check logical CSS properties applied correctly
4. Screenshot → `screenshots/10-i18n-rtl-ar.png`

### 8.5 Verdict

| Condition | Verdict |
|---|---|
| All pages show real translated text | PASS |
| 1-2 isolated key leaks | PARTIAL Tier 2 |
| Multiple pages show raw keys | FAIL Tier 2 |
| Language switch doesn't change text | FAIL Tier 2 |
| RTL layout broken | FAIL Tier 2 |

---

## 9. ANTI-BOT TRAP VERIFICATION (All modes)

IS has redirect traps for common attack paths:

```bash
for path in "/phpmyadmin" "/wp-admin" "/admin-login"; do
  code=$(curl -sS -o /dev/null -w "%{http_code}" "https://intelligentsingularityinc.com${path}" 2>/dev/null)
  echo "${path}: ${code}"
done
```

Expected: 404 for all. Any 200/301/302 = FAIL Tier 2 (trap not working).

---

## 10. CONTACT FORM VERIFICATION (Mode B — browser only)

1. Navigate to `/en/contact`
2. Verify form fields exist: name, email, message
3. Do NOT submit the form (production safety)
4. Screenshot → `screenshots/11-contact-form.png`
5. Check that the form action points to `/api/contact`

---

## 11. PWA / OFFLINE VERIFICATION (Modes A, B)

### 11.1 Service worker registration

```bash
curl -sS -o /dev/null -w "%{http_code}" "https://intelligentsingularityinc.com/sw.js"
```

Expected: 200. If 404 → FAIL Tier 2 (PWA not working).

### 11.2 Web manifest

```bash
curl -sS "https://intelligentsingularityinc.com/manifest.webmanifest" 2>/dev/null | head -20
```

Expected: valid JSON with name, icons, start_url.

---

## 12. PERFORMANCE SMOKE (All modes)

```bash
echo "=== Load Timing ==="
for route in "/en/" "/en/about" "/en/contact" "/en/manifesto" "/api/health"; do
  time=$(curl -sS -o /dev/null -w "%{time_total}" "https://intelligentsingularityinc.com${route}" 2>/dev/null)
  echo "${route}: ${time}s"
done
```

| Time | Grade |
|---|---|
| < 3.0s | Good |
| 3.0-5.0s | Slow — note |
| 5.0-15.0s | Critical — Tier 2 |
| > 15.0s | Severe — Tier 1 |
| Timeout | FAIL Tier 1 |

---

## 13. SECURITY HEADERS CHECK (All modes)

```bash
curl -sS -D- -o /dev/null "https://intelligentsingularityinc.com/en/" 2>/dev/null | grep -iE 'strict-transport|content-security|x-frame|x-content-type|referrer-policy|permissions-policy'
```

IS should have:
- `Strict-Transport-Security` (HSTS)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` or `SAMEORIGIN`
- Content-Security-Policy (check no `unsafe-eval` in production)

Missing headers = Tier 3 (security concern, needs human review).

---

## 14. ACCESSIBILITY QUICK CHECK (Modes A, B)

IS requires WCAG 2.2 AA. Via browser:

1. On homepage, check for `<html lang="en">` attribute
2. Verify images have alt text
3. Check color contrast is not obviously broken
4. Verify keyboard navigation works (Tab through nav links)
5. Screenshot any issues → `screenshots/12-a11y.png`

This is a smoke test, not a full audit.

---

## 15. OBSERVABILITY REVIEW (Mode A only)

```bash
ssh SSH_COMMAND "docker logs --since '1h' APP_CONTAINER 2>&1 | grep -c 'ERROR'" 
ssh SSH_COMMAND "docker logs --since '1h' APP_CONTAINER 2>&1 | grep -c ' 500 '"
ssh SSH_COMMAND "docker logs --since '1h' APP_CONTAINER 2>&1 | grep -iE 'error|fatal' | tail -10"
ssh SSH_COMMAND "docker logs --since '1h' DB_CONTAINER 2>&1 | grep -iE 'error|fatal' | tail -5"
```

---

## 16. SHARED INFRASTRUCTURE (Mode A only)

```bash
ssh SSH_COMMAND "df -h / | tail -1"
ssh SSH_COMMAND "free -h 2>/dev/null || cat /proc/meminfo 2>/dev/null | head -3"
ssh SSH_COMMAND "docker ps --format '{{.Names}}: {{.Status}}' | head -20"
```

Disk >90% full or memory exhausted = Tier 1.

---

## 17. BLOCKER REGISTRY

Maintain throughout. Every issue gets an entry:

| Field | Description |
|---|---|
| ID | BLK-001, BLK-002, etc. |
| Scope | Journey / Service / Application / I18N / Shared-infra |
| Component | Specific page or service |
| User impact | What a real user sees |
| Evidence | Screenshot, log excerpt, HTTP status |
| Tier | 1 (blocker) / 2 (defect) / 3 (needs review) |
| Rollback fixes? | Yes / No / Unknown |

### Systemic failure escalation

If 3+ checks fail with the same pattern → stop treating as isolated, identify shared root cause, recommend rollback or immediate human review.

---

## 18. STATUS MODEL

| Status | Meaning |
|---|---|
| PASSED | Working correctly with evidence |
| FAILED Tier 1 | Serious live issue, likely release blocker |
| FAILED Tier 2 | User-visible defect, needs fixing |
| FAILED Tier 3 | Ambiguous, needs human judgment |
| PARTIAL | Partially working |
| BLOCKED | Cannot test (reason documented) |
| N/A | Not applicable |

**"Skipped" is never valid.** Use BLOCKED with reason, or N/A.

When a check fails: capture evidence, classify severity, add to blocker registry, **continue all safe independent checks**.

---

## 19. FINAL REPORT

Write as `production-verification-report.md` in workspace.

```markdown
# IS Production E2E Verification Report

## Run Metadata
- **Run ID:** <YYYYMMDD-HHMMSS>
- **Timestamp:** <ISO 8601>
- **Environment:** production
- **Platform:** Dokploy @ 184.70.179.66
- **Operating Mode:** <A / B / C>
- **Production URL:** https://intelligentsingularityinc.com
- **Release:** <image tag or "unknown">
- **Duration:** <total minutes>

## Stack
| Component | Technology | Container |
|---|---|---|
| App (Next.js 16 + Payload CMS) | Node.js 24 | <name> |
| Database | PostgreSQL 18 | <name> |
| I18N | next-intl (14 locales, 2 RTL) | — |

## Critical Path Results
| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Domain + TLS | <result> | <detail> |
| 2 | Container health | <result> | <detail> |
| 3 | Homepage renders | <result> | <screenshot> |
| 4 | Health API | <result> | <detail> |
| 5 | Admin access | <result> | <detail> |
| 6 | DB path | <result> | <detail> |

## Page Verification
| Page | URL | Result | Screenshot | Console Errors |
|---|---|---|---|---|
| Homepage | /en/ | <result> | <file> | <count> |
| About | /en/about | <result> | <file> | <count> |
| Manifesto | /en/manifesto | <result> | <file> | <count> |
| Green | /en/green | <result> | <file> | <count> |
| Contact | /en/contact | <result> | <file> | <count> |
| Portfolio | /en/portfolio | <result> | <file> | <count> |
| Legal | /en/legal/privacy-policy | <result> | <file> | <count> |

## I18N Summary
| Check | Result |
|---|---|
| Key leakage | <result> |
| Locale routing (7 locales) | <result> |
| Language switch (en→es) | <result> |
| RTL (Arabic) | <result> |

## Anti-Bot Traps
| Path | Expected | Actual | Result |
|---|---|---|---|
| /phpmyadmin | 404 | <code> | <result> |
| /wp-admin | 404 | <code> | <result> |
| /admin-login | 404 | <code> | <result> |

## PWA
| Check | Result |
|---|---|
| Service worker | <result> |
| Web manifest | <result> |

## Performance
| Route | Time | Grade |
|---|---|---|
| /en/ | <s> | <grade> |
| /en/about | <s> | <grade> |
| /en/contact | <s> | <grade> |
| /api/health | <s> | <grade> |

## Security Headers
| Header | Present | Value |
|---|---|---|
| HSTS | <Y/N> | <value> |
| CSP | <Y/N> | <value> |
| X-Frame-Options | <Y/N> | <value> |
| X-Content-Type | <Y/N> | <value> |

## Observability (Mode A)
- App errors (1h): <count or N/A>
- 500s (1h): <count or N/A>

## Infrastructure (Mode A)
- Disk: <percent or N/A>
- Memory: <status or N/A>

## Blocker Registry
| ID | Scope | Component | Impact | Tier | Rollback? |
|---|---|---|---|---|---|
| (none or entries) |

## VERDICT

**<One of:>**
- PRODUCTION VERIFIED — SAFE TO REMAIN LIVE
- PRODUCTION LIVE WITH NON-BLOCKING DEFECTS
- PRODUCTION PARTIALLY VERIFIED / HEIGHTENED MONITORING
- PRODUCTION NOT SAFE — ROLLBACK OR HUMAN REVIEW

### Justification
<2-4 sentences based on evidence>

### Next Action
<Exact next step>
```

---

## 20. DECISION GATE

Before declaring verdict, confirm:

- [ ] Domain reachable with valid TLS
- [ ] All 7 public pages checked with evidence
- [ ] Health API returns 200 with valid JSON
- [ ] Admin endpoint responds (200/302/403, not 500)
- [ ] Console error thresholds applied to every page
- [ ] I18N verified — no raw keys, locale routing works, RTL tested
- [ ] Anti-bot traps return 404
- [ ] PWA artifacts accessible
- [ ] Performance within thresholds
- [ ] Security headers present
- [ ] No unresolved Tier 1 issues
- [ ] Blocker registry complete
- [ ] Report written and saved

If any mandatory item fails → do not declare VERIFIED. Use a lower verdict.

---

## 21. EXECUTION PRINCIPLES

| Principle | Overrides |
|---|---|
| Production-safe | Any desire to "fix it quick" |
| Browser proof | Log-only optimism |
| IS-only scope | Curiosity about unrelated containers |
| Evidence-first | Assumptions about what "should" work |
| Continue under failure | Temptation to stop early |
| Time-boxed (48 min) | Perfectionism |
| Mode-aware | Attempting impossible checks |

**Execute fully. Report completely. Decide clearly.**
