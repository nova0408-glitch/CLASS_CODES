#!/bin/bash

# Q1: Save user/system info to system_info.txt

echo "Current logged-in user: $(whoami)" > system_info.txt
echo "Current working directory: $(pwd)" >> system_info.txt
echo "Current date and time: $(date)" >> system_info.txt

echo "Saved to system_info.txt"
wc -l system_info.txt
