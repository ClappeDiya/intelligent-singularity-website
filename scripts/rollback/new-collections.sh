#!/usr/bin/env bash
# scripts/rollback/new-collections.sh
#
# Wrapper around new-collections.sql with an explicit --confirm gate so
# the rollback can never run by accident. Prints the target DB, takes a
# pg_dump of the current state for safety, and then applies the SQL.
#
# Usage:
#   ./scripts/rollback/new-collections.sh --confirm            # dev (docker)
#   DATABASE_URL=postgres://... ./scripts/rollback/new-collections.sh --confirm   # prod
set -euo pipefail

if [[ "${1:-}" != "--confirm" ]]; then
  echo "Refusing to run without --confirm flag." >&2
  echo "Usage: $0 --confirm" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SQL_FILE="$SCRIPT_DIR/new-collections.sql"
BACKUP_DIR="$(cd "$SCRIPT_DIR/../../" && pwd)/backups/rollback"
mkdir -p "$BACKUP_DIR"
STAMP="$(date +%Y%m%d-%H%M%S)"

if [[ -n "${DATABASE_URL:-}" ]]; then
  echo "[rollback] target: \$DATABASE_URL"
  echo "[rollback] dumping backup to $BACKUP_DIR/before-rollback-$STAMP.sql"
  pg_dump "$DATABASE_URL" > "$BACKUP_DIR/before-rollback-$STAMP.sql"
  echo "[rollback] applying $SQL_FILE"
  psql "$DATABASE_URL" < "$SQL_FILE"
else
  echo "[rollback] target: docker compose postgres (dev)"
  echo "[rollback] dumping backup to $BACKUP_DIR/before-rollback-$STAMP.sql"
  docker compose exec -T postgres pg_dump -U is is_dev > "$BACKUP_DIR/before-rollback-$STAMP.sql"
  echo "[rollback] applying $SQL_FILE"
  docker compose exec -T postgres psql -U is -d is_dev < "$SQL_FILE"
fi

echo "[rollback] complete. Backup saved to $BACKUP_DIR/before-rollback-$STAMP.sql"
