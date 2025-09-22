#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
else
    echo "$1"
    echo "$2"
    echo "$3"
fi