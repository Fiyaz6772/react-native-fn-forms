#!/usr/bin/env bash
# Scaffolds dev-app/, a local-only Expo app for testing this library during
# development. dev-app/ is gitignored, so run this once after cloning (or
# whenever you delete dev-app/ and want it back).
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -d "dev-app" ]; then
  echo "dev-app/ already exists. Delete it first if you want to recreate it."
  exit 1
fi

echo "Building the library..."
npm run build

echo "Scaffolding Expo app in dev-app/..."
npx --yes create-expo-app@latest dev-app --template blank-typescript

cd dev-app

echo "Linking react-native-fn-forms via file: dependency..."
npm pkg set "dependencies.react-native-fn-forms=file:.."
npm install

echo "Writing metro.config.js..."
cat > metro.config.js <<'EOF'
// Metro config so this app sees live edits to the linked library
// (react-native-fn-forms is symlinked in via "file:.." in package.json).
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Watch the library's source tree (outside dev-app) for changes so
// `npm run build:watch` rebuilds are picked up live.
config.watchFolders = [workspaceRoot];

// Don't let Metro crawl the library repo's own node_modules — it has its
// own copies of react/react-native as devDependencies, which would collide
// with this app's copies (duplicate Haste module IDs).
config.resolver.blockList = [
  new RegExp(`^${path.resolve(workspaceRoot, 'node_modules').replace(/[/\\]/g, '\\/')}\\/.*$`),
];

// Force react/react-native to always resolve to this app's single copy,
// even when required from inside the symlinked library — otherwise Metro
// can pull in the library repo's copies and you get "Invalid hook call".
config.resolver.extraNodeModules = {
  react: path.resolve(projectRoot, 'node_modules/react'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
};

module.exports = config;
EOF

echo "Copying example screen as a starting point..."
cp ../example/LoginScreen.js LoginScreen.tsx
cat > App.tsx <<'EOF'
import LoginScreen from './LoginScreen';

export default function App() {
  return <LoginScreen />;
}
EOF

echo ""
echo "Done. In one terminal run 'npm run build:watch' at the repo root,"
echo "in another run 'npm run dev-app' — edits to src/ will hot-reload."
