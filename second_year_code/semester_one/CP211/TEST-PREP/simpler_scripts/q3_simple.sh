#!/bin/bash

# Q3: Create a group and add a user to it (run with sudo)

read -p "Enter group name: " group_name
read -p "Enter username: " username

groupadd "$group_name" 2>/dev/null
usermod -aG "$group_name" "$username"
id "$username"
