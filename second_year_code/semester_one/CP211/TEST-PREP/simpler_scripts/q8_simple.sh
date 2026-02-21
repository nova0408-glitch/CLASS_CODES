#!/bin/bash

# Q8: Show currently logged-in users and count

who | awk '{print $1}' | sort -u
who | awk '{print $1}' | sort -u | wc -l
