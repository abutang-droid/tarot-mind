#!/bin/sh
set -e

# Apply the Prisma schema to the database (idempotent). Retries so the app
# container can start slightly before MySQL finishes accepting connections.
echo "[entrypoint] Applying Prisma schema to database ..."
n=0
until npx prisma db push --skip-generate --accept-data-loss; do
  n=$((n + 1))
  if [ "$n" -ge 15 ]; then
    echo "[entrypoint] ERROR: 'prisma db push' failed after $n attempts."
    exit 1
  fi
  echo "[entrypoint] Database not ready yet, retry $n/15 in 3s ..."
  sleep 3
done
echo "[entrypoint] Schema is in sync."

# Optionally seed a demo user (set SEED_DB=true to enable).
if [ "${SEED_DB}" = "true" ]; then
  echo "[entrypoint] Seeding database ..."
  npx prisma db seed || echo "[entrypoint] Seed step failed (continuing)."
fi

echo "[entrypoint] Starting: $*"
exec "$@"
