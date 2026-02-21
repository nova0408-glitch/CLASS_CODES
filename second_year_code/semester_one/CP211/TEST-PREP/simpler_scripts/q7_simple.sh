#!/bin/bash

# Q7: Backup all .txt files into backup folder and create archive

mkdir -p backup
cp *.txt backup/ 2>/dev/null
tar -cvf backup.tar backup
