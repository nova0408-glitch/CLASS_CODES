#!/bin/bash

# Q9: Read 2 numbers and perform arithmetic

read -p "Enter first integer: " a
read -p "Enter second integer: " b

echo "Addition: $((a+b))"
echo "Subtraction: $((a-b))"
echo "Multiplication: $((a*b))"
echo "Division: $((a/b))"
