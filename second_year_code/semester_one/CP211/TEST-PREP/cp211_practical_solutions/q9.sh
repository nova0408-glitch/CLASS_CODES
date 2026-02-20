#!/usr/bin/env bash
set -euo pipefail

read -r -p "Enter first integer: " a
read -r -p "Enter second integer: " b

if [[ ! $a =~ ^-?[0-9]+$ || ! $b =~ ^-?[0-9]+$ ]]; then
  echo "Please enter valid integers only." >&2
  exit 1
fi

echo "Addition: $((a + b))"
echo "Subtraction: $((a - b))"
echo "Multiplication: $((a * b))"

if ((b == 0)); then
  echo "Division: undefined (division by zero)"
else
  echo "Division: $((a / b))"
fi
