#!/bin/bash
echo "Installing dependencies..."
npm install serialport
npm install

echo "Linting code base..."
npm run lint

echo "Pruning non-production dependencies..."
NODE_ENV=production npm prune

echo "Publishing to npm..."
npm publish
