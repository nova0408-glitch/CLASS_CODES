#!/usr/bin/env bash
set -euo pipefail

output_file="system_info.txt"

{
  echo "Current logged-in user: $(whoami)"
  echo "Current working directory: $(pwd)"
  echo "Current date and time: $(date '+%Y-%m-%d %H:%M:%S')"
} > "$output_file"

echo "Information saved to $output_file"
echo "Number of lines in $output_file: $(wc -l < "$output_file")"
