#!/usr/bin/env bash
set -euo pipefail

read -r -p "Enter filename: " file_name

if [[ ! -f "$file_name" ]]; then
  echo "File does not exist: $file_name" >&2
  exit 1
fi

echo "Total number of lines: $(wc -l < "$file_name")"
echo "Total number of words: $(wc -w < "$file_name")"
echo "Lines containing 'Linux' (case insensitive):"
if ! grep -in "Linux" "$file_name"; then
  echo "No matching lines found."
fi
