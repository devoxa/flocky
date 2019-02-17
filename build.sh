#!/usr/bin/env bash
set -e

echo "Cleaning up previous build"
rm -rf build/
mkdir build/

echo "Compiling TypeScript into JavaScript"
tsc

echo "Copying JavaScript and definition files"
cp src/index.js build/
cp src/index.d.ts build/
cp src/*/*.js build/
cp src/*/*.d.ts build/
rm -f build/*.spec.js
rm -f build/*.spec.d.ts

echo "Removing temporary build artifacts"
rm -f src/*.js
rm -f src/*.d.ts
rm -f src/*/*.js
rm -f src/*/*.d.ts

echo "Build finished"
exit 0
