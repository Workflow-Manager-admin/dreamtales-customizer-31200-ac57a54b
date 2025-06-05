#!/bin/bash
cd /home/kavia/workspace/code-generation/dreamtales-customizer-31200-ac57a54b/dreamtales_customizer
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

