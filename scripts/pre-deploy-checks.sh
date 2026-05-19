#!/usr/bin/env bash
# Local quality gates. Run before every deploy.
# Mirrors the gates the deploy script enforces — fail here, fail fast.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

echo "[1/7] Lint"
pnpm lint

echo "[2/7] Type-check"
pnpm type-check

echo "[3/7] Tests"
pnpm test

echo "[4/7] Authenticity gate"
pnpm verify:authenticity

echo "[5/7] Readability gate"
pnpm readability

echo "[6/7] Outbound-links gate"
pnpm verify:outbound-links

echo "[7/7] CMS content leakage gate (requires running postgres on 5433)"
pnpm lint:cms-leakage

echo "All pre-deploy checks passed."
