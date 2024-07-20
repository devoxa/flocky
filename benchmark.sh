#!/usr/bin/env bash
set -e

find src/ -name "*.benchmark.ts" -type f | while read -r file; do
  echo ">> Running benchmark: $file"
  ./node_modules/.bin/ts-node --transpile-only -O '{"module":"commonjs"}' $file
done

echo ">> All benchmarks completed"
