#!/bin/bash

# Q10: Print star triangle of size n

read -p "Enter a positive integer: " n

for ((i=1; i<=n; i++)); do
  for ((j=1; j<=i; j++)); do
    printf "*"
  done
  echo
 done
