#!/usr/bin/env bash
set -euo pipefail

if [[ $EUID -ne 0 ]]; then
  echo "Run this script as root (or with sudo)." >&2
  exit 1
fi

read -r -p "Enter group name: " group_name
read -r -p "Enter username: " username

if ! getent passwd "$username" > /dev/null; then
  echo "User '$username' does not exist." >&2
  exit 1
fi

if ! getent group "$group_name" > /dev/null; then
  groupadd "$group_name"
  echo "Group '$group_name' created."
else
  echo "Group '$group_name' already exists."
fi

usermod -aG "$group_name" "$username"
echo "Updated groups for $username:"
id -nG "$username"
