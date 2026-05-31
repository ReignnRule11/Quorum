#!/bin/bash
mkdir -p assets
BASE64="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
for name in icon splash adaptive-icon favicon; do
  echo "$BASE64" | base64 -d > "assets/${name}.png"
done
echo "Assets created in assets/"
