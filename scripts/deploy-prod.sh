#!/usr/bin/env bash
# =============================================================================
# IS Website -- One-shot Production Deploy
# Pattern: build on Dokploy host (faster than M-series + better network),
# push to GHCR, then `docker service update` swarm rollout with rollback.
#
# Usage:
#   IS_VPS_PASS='<password>' ./scripts/deploy-prod.sh
#
# Prereqs:
#   - sshpass installed locally (brew install sshpass)
#   - Dokploy host (184.70.179.66) already has GHCR creds in ~/.docker/config.json
#   - Working tree clean (or you confirm the dirty-tree prompt)
# =============================================================================
set -euo pipefail

VPS_HOST="${IS_VPS_HOST:-184.70.179.66}"
VPS_USER="${IS_VPS_USER:-md}"
VPS_PASS="${IS_VPS_PASS:?Set IS_VPS_PASS env var}"
SERVICE_NAME="${IS_SERVICE_NAME:-is-website-gbydeh}"
IMAGE_REPO="${IS_IMAGE_REPO:-ghcr.io/clappediya/intelligent-singularity-website}"
DOMAIN="${IS_DOMAIN:-https://intelligentsingularityinc.com/en}"

cd "$(git rev-parse --show-toplevel)"

SHA="$(git rev-parse --short HEAD)"
UTC_TS="$(date -u +%Y%m%d-%H%M%S)"
TAG="prod-${UTC_TS}-${SHA}"
IMAGE_FULL="${IMAGE_REPO}:${TAG}"
REMOTE_DIR="/tmp/is-build-${UTC_TS}"

SSH_OPTS=(-o StrictHostKeyChecking=no -o PreferredAuthentications=password -o PubkeyAuthentication=no)
ssh_run() { sshpass -p "${VPS_PASS}" ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}" "$@"; }

echo "============================================================"
echo " IS Website Production Deploy"
echo " Tag:    ${TAG}"
echo " Image:  ${IMAGE_FULL}"
echo " Target: ${VPS_USER}@${VPS_HOST} (service: ${SERVICE_NAME})"
echo " Time:   $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "============================================================"

# 0. Refuse silent dirty-tree deploys
if ! git diff-index --quiet HEAD --; then
  echo ""
  echo "WARNING: working tree has uncommitted changes:"
  git status --short
  read -r -p "Continue with HEAD (uncommitted changes will NOT ship)? [y/N] " ans
  [[ "${ans:-N}" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }
fi

# 1. Local quality gates
echo ""
echo "[1/5] Pre-deploy checks (local)"
scripts/pre-deploy-checks.sh

# 2. Ship HEAD source to host (git archive — clean, no node_modules/.next/.git)
echo ""
echo "[2/5] Ship source to host (git archive HEAD -> ${REMOTE_DIR})"
ssh_run "mkdir -p '${REMOTE_DIR}'"
git archive --format=tar HEAD | \
  sshpass -p "${VPS_PASS}" ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}" \
    "tar -xf - -C '${REMOTE_DIR}'"

# 3. Build + push on the host
echo ""
echo "[3/5] Build + push to GHCR (linux/amd64) -> ${IMAGE_FULL}"
ssh_run "cd '${REMOTE_DIR}' && \
  docker buildx build --platform linux/amd64 --push \
    -t '${IMAGE_FULL}' \
    -t '${IMAGE_REPO}:latest' \
    --provenance=false \
    ."

# 4. Swarm rolling update with auto-rollback
echo ""
echo "[4/5] docker service update (rollback on failure)"
ssh_run "docker service update \
  --image '${IMAGE_FULL}' \
  --update-parallelism 1 \
  --update-delay 10s \
  --update-failure-action rollback \
  --update-monitor 30s \
  '${SERVICE_NAME}'"

# 5. HTTP verify (200 + zero RSC error chunks)
echo ""
echo "[5/5] HTTP verify ${DOMAIN}"
echo "Waiting 20s for service to settle..."
sleep 20
verified=0
for i in 1 2 3 4 5 6; do
  STATUS=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 15 "${DOMAIN}" || echo '000')
  BODY=$(curl -sS --max-time 15 "${DOMAIN}" | head -c 4096 || echo '')
  ERR_CHUNKS=$(printf '%s' "$BODY" | grep -c 'E{"digest' || true)
  if [ "${STATUS}" = "200" ] && [ "${ERR_CHUNKS}" -eq 0 ]; then
    echo "Attempt ${i}: 200 OK, 0 RSC error chunks"
    verified=1
    break
  fi
  echo "Attempt ${i}: status=${STATUS} rsc_errors=${ERR_CHUNKS} - retry in 15s"
  sleep 15
done

# Cleanup remote build dir regardless of verify outcome
ssh_run "rm -rf '${REMOTE_DIR}'" || true

if [ "${verified}" -ne 1 ]; then
  echo ""
  echo "FAIL: production verification failed"
  echo "Rollback: ssh ${VPS_USER}@${VPS_HOST} 'docker service rollback ${SERVICE_NAME}'"
  exit 1
fi

echo ""
echo "============================================================"
echo " DEPLOY COMPLETE"
echo " Tag:    ${TAG}"
echo " Commit: $(git rev-parse HEAD)"
echo ""
echo " Rollback to previous image:"
echo "   ssh ${VPS_USER}@${VPS_HOST} 'docker service rollback ${SERVICE_NAME}'"
echo "============================================================"
