#!/usr/bin/env bash
set -euo pipefail

mapfile -t users < <(who | awk '{print $1}' | sort -u)

echo "Currently logged-in users (unique):"
if ((${#users[@]} == 0)); then
  echo "None"
else
  printf '%s\n' "${users[@]}"
fi

echo "Total number of active users: ${#users[@]}"
