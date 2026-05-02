# Deploy Runbook

Production: `https://intelligentsingularityinc.com`
Service: Docker Swarm `is-website-gbydeh` on Dokploy host `184.70.179.66`
Registry: `ghcr.io/clappediya/intelligent-singularity-website`

## Quick start

One command:

```bash
IS_VPS_PASS='<host-password>' ./scripts/deploy-prod.sh
```

That runs local quality gates → ships HEAD source to the host → builds + pushes a SHA-tagged image to GHCR → rolls the swarm service with auto-rollback → verifies HTTP. Typical wall time: 4–8 minutes (1–2 min if Docker layer cache is warm).

## What the script does

1. **Local pre-deploy checks** — `scripts/pre-deploy-checks.sh`: lint, type-check, tests, authenticity gate, readability gate, outbound-links gate. Fail here, fail fast.
2. **Ship source** — `git archive HEAD | tar -x` on the host into `/tmp/is-build-<utc>`. Only HEAD ships; no `node_modules`, no `.next`, no `.git`.
3. **Build + push** — `docker buildx build --platform linux/amd64 --push -t prod-<utc>-<sha>` on the host. Host already has GHCR auth in `~/.docker/config.json`.
4. **Swarm update** — `docker service update --image <new-tag> --update-failure-action rollback --update-monitor 30s is-website-gbydeh`.
5. **HTTP verify** — `curl https://intelligentsingularityinc.com/en` six times with 15s gaps. Pass requires HTTP 200 *and* zero `E{"digest` chunks (RSC error fallback).

If verify fails the script exits non-zero and prints the rollback command. The remote build dir is cleaned up regardless of outcome.

## Rollback

Swarm tracks the previous image. To roll back the most recent deploy:

```bash
sshpass -p '<host-password>' ssh md@184.70.179.66 \
  'docker service rollback is-website-gbydeh'
```

To roll to a specific older tag (any prior `prod-*` tag is in GHCR):

```bash
sshpass -p '<host-password>' ssh md@184.70.179.66 \
  "docker service update --image ghcr.io/clappediya/intelligent-singularity-website:prod-YYYYMMDD-HHMMSS-<sha> is-website-gbydeh"
```

List recent tags:

```bash
gh api '/users/ClappeDiya/packages/container/intelligent-singularity-website/versions' \
  --jq '.[] | {name, created_at}' | head -40
```

## Prereqs (one-time)

- `brew install sshpass` (or equivalent on Linux)
- Dokploy host must already have GHCR creds in `~/.docker/config.json` for user `md` (set up in prior session — re-run `docker login ghcr.io` on the host if it expires)
- `IS_VPS_PASS` env var available when running the script. Don't commit it.

## Env overrides

The script honors these env vars (defaults shown):

| Var | Default |
| --- | --- |
| `IS_VPS_HOST` | `184.70.179.66` |
| `IS_VPS_USER` | `md` |
| `IS_VPS_PASS` | *(required)* |
| `IS_SERVICE_NAME` | `is-website-gbydeh` |
| `IS_IMAGE_REPO` | `ghcr.io/clappediya/intelligent-singularity-website` |
| `IS_DOMAIN` | `https://intelligentsingularityinc.com/en` |

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `docker buildx build` fails on host with "denied" pushing to GHCR | Host's GHCR auth token expired | SSH in, run `gh auth token \| docker login ghcr.io -u clappediya --password-stdin` |
| HTTP verify keeps failing 200 + RSC chunks | New image has a Server Component throwing at RSC time | `docker service rollback is-website-gbydeh`; check container logs: `docker service logs --tail 200 is-website-gbydeh` |
| `pnpm verify:authenticity` fails | Seed snapshots stale or seed copy violates anti-fake rules | `pnpm seed:snapshot` then re-read the violation; copy must be measurably true |
| Swarm update hangs | `--update-monitor 30s` hasn't elapsed yet | Wait the full 30s before retrying; check `docker service ps is-website-gbydeh` |
| First-time deploy from a fresh clone fails source ship | Symlinks or LFS-tracked files | None; project has neither. If added later, switch from `git archive` to `rsync --exclude` |

## What is NOT in this pipeline (intentional)

- **No GitHub Actions.** Build and deploy are operator-driven from a local machine. Reasoning: rate limits, secret management cost, and we want the secrets to stay on the operator's machine. (See memory: feedback_no_github_actions.md)
- **No Dokploy git auto-deploy.** Dokploy's role here is only Traefik + SSL. Source-of-truth is `docker service update` from this script.
- **No Lighthouse / a11y in pre-deploy.** They take too long for every-deploy gating. Run them on demand: `pnpm a11y` and `pnpm lighthouse`.
