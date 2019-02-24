#!/usr/bin/env bash
set -e

if [[ "$1" == "" ]];
then
  echo "Missing version argument:"
  echo "./publish.sh --patch"
  echo "./publish.sh --minor"
  echo "./publish.sh --major"
  exit 1
fi

echo "Verifying the current branch is 'master'"
BRANCH=$(git symbolic-ref --short HEAD)
if [[ "$BRANCH" != "master" ]];
then
  echo "Not on 'master' branch."
  exit 1
fi

echo "Verifying the current branch is clean"
CHANGES=$(git status --porcelain)
if [[ "$CHANGES" != "" ]];
then
  echo "Unclean working tree. Commit or stash changes first."
  exit 1
fi

echo "Running tests"
yarn test

echo "Updating README"
yarn generate-docs

echo "Building package"
yarn build

echo "Bumping the package version"
yarn version "$1"

echo "Publishing package"
yarn publish build/

echo "Pushing to Github"
git push
