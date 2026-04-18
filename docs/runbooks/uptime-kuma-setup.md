# Uptime Kuma setup for /status

**URL:** https://status.intelligentsingularityinc.com
**Admin credentials:** see `docs/HANDOFF.md` (section: VPS access)
**Goal:** populate seven monitors and one public status page so the website's
`/status` route has real data to render.

## Monitors to create

| Name | Type | Target | Interval | Retention |
|---|---|---|---|---|
| Website · homepage HTTPS | HTTP(s) | `https://intelligentsingularityinc.com/en` · keyword `Intelligent Singularity` | 60s | 90d |
| Website · 14 locales reachable | HTTP(s) keyword | `https://intelligentsingularityinc.com/ar` · keyword arabic string | 300s | 90d |
| CMS · Payload admin | HTTP(s) | `https://intelligentsingularityinc.com/admin` · expect 200 or 302 | 60s | 90d |
| Data · Postgres port | TCP | `184.70.179.66:5433` | 60s | 90d |
| Mail · SMTP relay | TCP | `mail.intelligentsingularityinc.com:587` | 300s | 90d |
| Errors · GlitchTip | HTTP(s) | `https://errors.intelligentsingularityinc.com/-/health/` · expect 200 | 300s | 90d |
| Uptime · Kuma self | HTTP(s) | `https://status.intelligentsingularityinc.com/` · expect 200 | 300s | 90d |

## Public status page

- Slug: `is`
- Title: "Intelligent Singularity systems"
- Groups (add in this order):
  1. Website — homepage, 14 locales
  2. CMS — Payload admin
  3. Data — Postgres
  4. Mail — SMTP
  5. Errors — GlitchTip
  6. Uptime — Kuma self
- Show overall status pill: yes
- Show 90-day history: yes
- Show response-time chart: no (keeps bundle ≤ 18 KB)

## Verification

Once monitors have at least 24 hours of data, the JSON endpoints below must return 200:

- `https://status.intelligentsingularityinc.com/api/status-page/is`
- `https://status.intelligentsingularityinc.com/api/status-page/heartbeat/is`

`curl` both from the VPS and from a local laptop — the page reads the first URL for overall status and the second for the heartbeat strip. If either 404s, fix the slug.

## When this document is out of date

If monitors are added, removed, or renamed, update this file in the same commit that changes the monitors. This runbook is the source of truth.
