#!/bin/bash

# Q2: Ask for username and show account info if user exists

read -p "Enter username: " username

if grep -q "^$username:" /etc/passwd; then
  id "$username"
else
  echo "User does not exist"
fi
