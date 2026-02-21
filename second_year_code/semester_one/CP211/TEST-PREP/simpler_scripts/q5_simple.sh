#!/bin/bash

# Q5: Display line count, word count, and lines containing Linux

read -p "Enter filename: " file

wc -l "$file"
wc -w "$file"
grep -in "Linux" "$file"
