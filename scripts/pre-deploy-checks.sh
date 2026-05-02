#!/usr/bin/env bash
# Local quality gates. Run before every deploy.
# Mirrors the gates the deploy script enforces — fail here, fail fast.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

echo "[1/6] Lint"
pnpm lint

echo "[2/6] Type-check"
pnpm type-check

echo "[3/6] Tests"
pnpm test

echo "[4/6] Authenticity gate"
pnpm verify:authenticity

echo "[5/6] Readability gate"
pnpm readability

echo "[6/6] Outbound-links gate"
pnpm verify:outbound-links

echo "All pre-deploy checks passed."
