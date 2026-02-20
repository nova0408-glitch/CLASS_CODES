#!/usr/bin/env bash
set -euo pipefail

echo "Usernames in alphabetical order:"
cut -d: -f1 /etc/passwd | sort

echo
echo "Total number of users: $(cut -d: -f1 /etc/passwd | wc -l)"

echo
echo "Users whose default shell is /bin/bash:"
awk -F: '$7 == "/bin/bash" {print $1}' /etc/passwd
