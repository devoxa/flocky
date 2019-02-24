#!/usr/bin/env bash
set -e

echo "Running tests"
yarn test

echo "Updating readme"
yarn generate-docs

echo "Building package"
yarn build

echo "Publishing package"
./node_modules/.bin/np --yolo --contents build/
