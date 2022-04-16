#! /usr/bin/bash
APP_VERSION=`node -p "require('./package.json').version"`
APP_NAME=poe-south-sudan-v"$APP_VERSION"

echo Building app version v"$APP_VERSION"...
npm run build:app
echo Done!

echo Bundling app...
cd build
rm -rf "$APP_NAME".zip
zip -r "$APP_NAME".zip .
cd ..
mkdir bundles
cp build/"$APP_NAME".zip bundles/

