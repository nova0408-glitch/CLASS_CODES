#!/usr/bin/env bash
set -euo pipefail

backup_dir="backup"
archive_name="backup.tar"

mkdir -p "$backup_dir"

shopt -s nullglob
txt_files=(*.txt)

if ((${#txt_files[@]} > 0)); then
  cp -- "${txt_files[@]}" "$backup_dir"/
fi

tar -cf "$archive_name" "$backup_dir"
echo "Backup complete: copied ${#txt_files[@]} .txt file(s) to '$backup_dir' and created '$archive_name'."
