#!/usr/bin/env bash
# =============================================================================
# IS Website -- One-shot Production Deploy (compose-based on Dokploy host)
# Pattern: build on Dokploy host, push to GHCR, redeploy via `docker compose
# pull && up -d` using the stack at $REMOTE_PROJECT_DIR. The app's swarm
# membership (overlay attach via dokploy-network labels) is preserved across
# redeploys because compose recreates only the app container.
#
# Usage:
#   ./scripts/deploy-prod.sh
#
# Prereqs:
#   - SSH key at ${IS_VPS_KEY} (default ~/.ssh/id_ed25519) authorized for mddiya@vps
#   - Dokploy host (184.70.179.66) already has GHCR creds in ~/.docker/config.json
#   - Stack already bootstrapped at ${REMOTE_PROJECT_DIR} with .env populated
#   - Working tree clean (or you confirm the dirty-tree prompt)
# =============================================================================
set -euo pipefail

VPS_HOST="${IS_VPS_HOST:-184.70.179.66}"
VPS_PORT="${IS_VPS_PORT:-22022}"
VPS_USER="${IS_VPS_USER:-mddiya}"
VPS_KEY="${IS_VPS_KEY:-${HOME}/.ssh/id_ed25519}"
REMOTE_PROJECT_DIR="${IS_REMOTE_DIR:-/home/mddiya/is-website-prod}"
IMAGE_REPO="${IS_IMAGE_REPO:-ghcr.io/clappediya/intelligent-singularity-website}"
DOMAIN="${IS_DOMAIN:-https://intelligentsingularityai.com/en}"

cd "$(git rev-parse --show-toplevel)"

SHA="$(git rev-parse --short HEAD)"
UTC_TS="$(date -u +%Y%m%d-%H%M%S)"
TAG="prod-${UTC_TS}-${SHA}"
IMAGE_FULL="${IMAGE_REPO}:${TAG}"
REMOTE_BUILD_DIR="/tmp/is-build-${UTC_TS}"

SSH_OPTS=(-i "${VPS_KEY}" -p "${VPS_PORT}" -o BatchMode=yes -o StrictHostKeyChecking=accept-new)
ssh_run() { ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}" "$@"; }

echo "============================================================"
echo " IS Website Production Deploy"
echo " Tag:    ${TAG}"
echo " Image:  ${IMAGE_FULL}"
echo " Target: ${VPS_USER}@${VPS_HOST}:${VPS_PORT} (${REMOTE_PROJECT_DIR})"
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
echo "[2/5] Ship source to host (git archive HEAD -> ${REMOTE_BUILD_DIR})"
ssh_run "mkdir -p '${REMOTE_BUILD_DIR}'"
git archive --format=tar HEAD | \
  ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}" \
    "tar -xf - -C '${REMOTE_BUILD_DIR}'"

# 3. Build + push on the host
echo ""
echo "[3/5] Build + push to GHCR (linux/amd64) -> ${IMAGE_FULL}"
ssh_run "cd '${REMOTE_BUILD_DIR}' && \
  docker buildx build --platform linux/amd64 --push \
    -t '${IMAGE_FULL}' \
    -t '${IMAGE_REPO}:latest' \
    --provenance=false \
    ."

# 4. Update .env APP_IMAGE on host and recreate the app container
echo ""
echo "[4/5] Update APP_IMAGE pin in ${REMOTE_PROJECT_DIR}/.env and recreate app"
ssh_run "set -e
  cd '${REMOTE_PROJECT_DIR}'
  cp .env .env.bak.\$(date -u +%Y%m%d-%H%M%S)
  if grep -q '^APP_IMAGE=' .env; then
    sed -i 's|^APP_IMAGE=.*|APP_IMAGE=${IMAGE_FULL}|' .env
  else
    echo 'APP_IMAGE=${IMAGE_FULL}' >> .env
  fi
  docker compose pull app
  docker compose up -d --no-deps app"

# 5. HTTP verify (200 + zero RSC error chunks)
echo ""
echo "[5/5] HTTP verify ${DOMAIN}"
echo "Waiting 20s for app to settle..."
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
ssh_run "rm -rf '${REMOTE_BUILD_DIR}'" || true

if [ "${verified}" -ne 1 ]; then
  echo ""
  echo "FAIL: production verification failed"
  echo "Rollback: ssh -i ${VPS_KEY} -p ${VPS_PORT} ${VPS_USER}@${VPS_HOST} \\"
  echo "  \"cd ${REMOTE_PROJECT_DIR} && cp .env.bak.\$(ls -1t .env.bak.* | head -1 | sed 's|.*\\.env\\.bak\\.||') .env && docker compose up -d --no-deps app\""
  exit 1
fi

echo ""
echo "============================================================"
echo " DEPLOY COMPLETE"
echo " Tag:    ${TAG}"
echo " Commit: $(git rev-parse HEAD)"
echo ""
echo " Rollback to previous image (last .env.bak.* in ${REMOTE_PROJECT_DIR}):"
echo "   ssh -i ${VPS_KEY} -p ${VPS_PORT} ${VPS_USER}@${VPS_HOST}"
echo "   cd ${REMOTE_PROJECT_DIR}"
echo "   cp \"\$(ls -1t .env.bak.* | head -1)\" .env"
echo "   docker compose up -d --no-deps app"
echo "============================================================"
