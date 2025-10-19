#!/usr/bin/env bash
set -euo pipefail

# Kill common ports if used
for p in 3000 3001 3002 4000; do
  if lsof -ti tcp:$p >/dev/null 2>&1; then
    lsof -ti tcp:$p | xargs -r kill -9 || true
  fi
done

# Clean .next cache
rm -rf .next

# Start dev on 3000
npm run dev:3000




