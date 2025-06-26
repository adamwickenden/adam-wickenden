#!/bin/bash

# Deployment script for Firebase with environment variable validation
# Usage: VITE_GITHUB_TOKEN=your_token ./scripts/deploy.sh

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Check if GitHub token is provided
if [ -z "$VITE_GITHUB_TOKEN" ]; then
  echo "❌ Error: VITE_GITHUB_TOKEN environment variable is required"
  echo ""
  echo "Usage examples:"
  echo "  VITE_GITHUB_TOKEN=your_token ./scripts/deploy.sh"
  echo "  export VITE_GITHUB_TOKEN=your_token && ./scripts/deploy.sh"
  echo ""
  echo "To get a token:"
  echo "  1. Go to https://github.com/settings/tokens"
  echo "  2. Generate a new token with 'public_repo' scope"
  echo "  3. Copy the token and use it in the command above"
  exit 1
fi

echo "✅ GitHub token found"

# Validate token format (basic check)
if [[ ! $VITE_GITHUB_TOKEN =~ ^gh[ps]_[a-zA-Z0-9]{36,}$ ]] && [[ ! $VITE_GITHUB_TOKEN =~ ^[a-f0-9]{40}$ ]]; then
  echo "⚠️  Warning: Token format doesn't match expected GitHub token patterns"
  echo "   Please ensure you're using a valid GitHub personal access token"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm ci
fi

# Run linting
echo "🔍 Running linter..."
npm run lint

# Run tests (allow to continue even if tests fail, but warn)
echo "🧪 Running tests..."
if ! npm test -- run; then
  echo "⚠️  Warning: Some tests failed, but continuing with deployment"
  echo "   Consider fixing tests before deploying to production"
fi

# Build the application
echo "🏗️  Building application with GitHub token..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
  echo "❌ Build failed - dist directory not found"
  exit 1
fi

echo "✅ Build successful"

# Deploy to Firebase
echo "🔥 Deploying to Firebase..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
  echo "❌ Firebase CLI not found. Please install it:"
  echo "   npm install -g firebase-tools"
  exit 1
fi

# Deploy
firebase deploy

echo "🎉 Deployment complete!"
echo ""
echo "Your website should be available at:"
echo "  Production: https://adam-wickenden.web.app"
echo "  Staging: https://adam-wickenden-dev.web.app" 