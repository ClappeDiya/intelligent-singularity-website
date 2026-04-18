# Launch runbook — six transparency pages

All 44 plan tasks that can land as code have landed on `feature/six-transparency-pages`. The remaining steps need a live environment and human judgement. This runbook is the complete checklist.

## What is already green (no operator action)

- Type-check, lint, unit tests (120 tests), readability gate, authenticity gate, outbound-links gate all pass on the branch.
- The three new Payload collections and three new globals are wired; Payload `push: true` will create the tables automatically on first boot.
- Seed modules for all six pages are idempotent and sit behind `/api/seed-new-pages`.
- Rollback SQL + shell wrapper sit in `scripts/rollback/` and are test-covered.

## T38 — full green (done; rerun before deploy)

```
docker compose up -d
pnpm dev                         # leave running
curl -X POST http://localhost:3000/api/seed
curl -X POST http://localhost:3000/api/seed-new-pages

# In another terminal:
pnpm type-check && pnpm lint && pnpm test && pnpm verify:authenticity
```

Smoke test the six new routes:

```
for r in changelog status roadmap insights trust help; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/en/$r")
  echo "$r: $code"   # expect 200
done
```

## T39 — accessibility (`pnpm a11y`)

Requires the prod server running. The `a11y` script is `scripts/ci-checks/axe-scan.mjs` — inspect and extend its URL list to include `/en/changelog`, `/en/status`, `/en/roadmap`, `/en/insights`, `/en/insights/the-2-2-billion-gap`, `/en/trust`, `/en/help`. Then:

```
pnpm build
pnpm start &                     # :3000
pnpm a11y
```

Target: zero violations. Re-run under RTL (`ar`, `ur`) via whichever env knob `axe-scan.mjs` accepts.

## T40 — Lighthouse

Extend `lighthouserc.js` (current list in `ci.collect.url`) with the same six new routes plus `/en/insights/the-2-2-billion-gap`. Then:

```
pnpm build
pnpm start &
pnpm lighthouse
```

Targets per route:

| Metric | Threshold |
|---|---|
| Performance | ≥ 95 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| LCP | ≤ 1.8s |

## T41 — Playwright (specs landed, execution pending)

Specs are written at:
- `tests/e2e/new-pages-resize.spec.ts` — 54 cases (3 locales × 6 routes × 3 widths) plus a drag-resize case
- `tests/e2e/no-regression-snapshot.spec.ts` — one visual-diff per baseline route

To run, install Playwright first (it is not yet a dev dependency):

```
pnpm add -D @playwright/test
pnpm exec playwright install chromium
pnpm exec playwright install-deps chromium   # Linux CI only
```

Then, from a clean `main` checkout, generate baselines once:

```
git stash push -u
git checkout main
pnpm build && pnpm start &
PID=$!
sleep 8
pnpm exec playwright test tests/e2e/no-regression-snapshot.spec.ts --update-snapshots
kill "$PID"
git checkout -
git stash pop
```

Commit the generated `tests/e2e/no-regression-snapshot.spec.ts-snapshots/` as the visual baseline. Then run both specs on the feature branch:

```
pnpm exec playwright test tests/e2e/
```

## T42 — Dokploy deploy

Prerequisites:

1. Uptime Kuma monitors configured per `docs/runbooks/uptime-kuma-setup.md`. Confirm the public JSON endpoints return 200:
   ```
   curl -s https://status.intelligentsingularityinc.com/api/status-page/is | head -c 200
   curl -s https://status.intelligentsingularityinc.com/api/status-page/heartbeat/is | head -c 200
   ```
2. All T38/T39/T40/T41 gates are green locally.

Merge the PR to `master`. Dokploy (project `guGb9sYajZHVMiSKUiv9D`, app `XaU9maEwsJ-j55pAi8QUF`) auto-builds from the GitHub webhook. Watch the build log in the dashboard.

Once the new container is live, seed the new content one time:

```
curl -X POST "https://intelligentsingularityinc.com/api/seed-new-pages?secret=$REVALIDATE_SECRET"
```

Smoke test production:

```
for r in changelog status roadmap insights trust help; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://intelligentsingularityinc.com/en/$r")
  echo "$r: $code"   # expect 200
done
```

## T43 — 24-hour watch

Record the deploy timestamp. Watch:

- https://status.intelligentsingularityinc.com — every monitor stays green.
- https://errors.intelligentsingularityinc.com — zero new issue groups after deploy.

At 24 hours, add a `ReleaseNotes` entry through the Payload admin:

- `slug`: `v1.0.0` (or the real tag you cut)
- `version`: `1.0.0`
- `releaseDate`: deploy date (ISO)
- `gitTag`: `v1.0.0`
- `gitSha`: the build commit sha
- `title`: `Six new transparency pages`
- `summary`: `Launched /changelog, /status, /roadmap, /insights, /trust, /help.`
- `changes[]`: one `added` entry per route
- `status`: `published`

## T44 — rollback (staged, run only on regression)

If the 24h window surfaces a real regression:

1. Dokploy dashboard → app → Deployments → previous tag → "Redeploy" (30-second rollback).
2. SSH the db server, then:
   ```
   DATABASE_URL="postgres://is:<prod-pass>@<db-host>:5432/is_prod" \
     ./scripts/rollback/new-collections.sh --confirm
   ```
3. Verify `/en` still loads: `curl -I https://intelligentsingularityinc.com/en`.
4. Log the incident in Payload as a `fixed` ReleaseNotes entry once root cause is known.

The rollback shell script takes a timestamped pg_dump backup before applying the SQL, written to `backups/rollback/`.
