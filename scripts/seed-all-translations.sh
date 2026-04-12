#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"
LOCALES=(zh-CN es hi ar fr pt bn ru ur id sw yo ha)

echo "Seeding translations into Payload CMS..."
echo "Base URL: $BASE_URL"
echo ""

for locale in "${LOCALES[@]}"; do
  echo -n "  $locale ... "
  response=$(curl -s -X POST "$BASE_URL/api/seed-translations" \
    -H "Content-Type: application/json" \
    -d "{\"locale\": \"$locale\"}")
  ok=$(echo "$response" | grep -o '"ok":true' || true)
  if [ -n "$ok" ]; then
    echo "done"
  else
    echo "FAILED: $response"
    exit 1
  fi
done

echo ""
echo "All 13 locales seeded."
