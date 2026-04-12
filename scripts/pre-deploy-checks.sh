#!/usr/bin/env sh
set -e

echo "--- Type check"
pnpm type-check

echo "--- Lint"
pnpm lint

echo "--- Tests"
pnpm test

echo "--- Audit (moderate+)"
pnpm audit --prod --audit-level moderate || echo "::WARN:: non-fatal audit issues"

echo "--- All pre-deploy checks passed"
