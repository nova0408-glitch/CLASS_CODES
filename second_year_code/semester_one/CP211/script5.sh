#!/bin/bash
# Non-interactive shell
echo 'msg1="Scripting files"' > hello
echo 'echo $msg1' >> hello
chmod 700 hello
./hello
