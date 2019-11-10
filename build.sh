#!/usr/bin/env bash
set -e

echo "Cleaning up previous build"
rm -rf build/
mkdir build/

echo "Compiling TypeScript into JavaScript"
tsc

echo "Copying JavaScript and definition files"
FILES=$(ls -d ./src/*/ | cut -d '/' -f 3)
cp src/index.js build/
cp src/index.d.ts build/
while read -r FILE; do
  cp "src/$FILE/index.js" "build/$FILE.js"
  cp "src/$FILE/index.d.ts" "build/$FILE.d.ts"
done <<< "$FILES"

echo "Removing temporary build artifacts"
rm -f build/*.spec.js
rm -f build/*.spec.d.ts
rm -f src/*.js
rm -f src/*.d.ts
rm -f src/*/*.js
rm -f src/*/*.d.ts

echo "Copying meta files"
cp package.json build/
cp README.md build/
