#!/usr/bin/env bash
set -euo pipefail

pnpm exec prisma db push --force-reset --accept-data-loss >/dev/null 2>&1 || true
pnpm exec prisma db seed >/dev/null 2>&1 || true
pnpm cypress:run "$@"
