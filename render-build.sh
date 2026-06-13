#!/bin/bash
set -e  # Exit on error

# Clean npm cache and node_modules
rm -rf node_modules package-lock.json
npm cache clean --force

# Install dependencies
npm install

# Build web export
npx expo export:web
