#!/bin/bash

# 🛡️ Cleanup Script: Remove Insecure GitHub Token Setup
# This script helps you clean up the old insecure VITE_GITHUB_TOKEN setup

set -e

echo "🛡️ Cleaning up insecure GitHub token setup..."
echo

# Function to check if file exists and remove it
cleanup_file() {
    local file="$1"
    if [ -f "$file" ]; then
        echo "🗑️  Removing $file"
        rm "$file"
    else
        echo "✅ $file already removed or doesn't exist"
    fi
}

# Function to check if directory exists
check_directory() {
    local dir="$1"
    if [ -d "$dir" ]; then
        echo "✅ $dir exists"
        return 0
    else
        echo "❌ $dir does not exist"
        return 1
    fi
}

echo "Step 1: Removing environment files containing tokens..."
cleanup_file ".env"
cleanup_file ".env.local"
cleanup_file ".env.production"
cleanup_file ".env.staging"

echo
echo "Step 2: Checking if Firebase Functions are set up..."
if check_directory "functions"; then
    echo "✅ Firebase Functions directory exists"
    
    if [ -f "functions/package.json" ]; then
        echo "✅ Functions package.json exists"
    else
        echo "❌ Functions package.json missing - run setup first"
    fi
    
    if [ -f "functions/index.js" ]; then
        echo "✅ Functions index.js exists"
    else
        echo "❌ Functions index.js missing - run setup first"
    fi
else
    echo "❌ Firebase Functions not set up - run setup first"
fi

echo
echo "Step 3: Checking Firebase configuration..."
if grep -q "functions" firebase.json; then
    echo "✅ Firebase.json includes Functions configuration"
else
    echo "❌ Firebase.json missing Functions configuration"
fi

echo
echo "Step 4: Checking if GitHub service uses proxy..."
if grep -q "getProxyBaseURL" src/services/githubService.js; then
    echo "✅ GitHub service updated to use proxy"
else
    echo "❌ GitHub service still uses direct API calls"
fi

echo
echo "Step 5: Security verification..."
if grep -q "VITE_GITHUB_TOKEN" src/services/githubService.js; then
    echo "❌ SECURITY ISSUE: GitHub service still references VITE_GITHUB_TOKEN"
    echo "   This means your token is still exposed in the client!"
else
    echo "✅ GitHub service no longer references VITE_GITHUB_TOKEN"
fi

if grep -q "VITE_GITHUB_TOKEN" .github/workflows/ci-cd.yml; then
    echo "❌ SECURITY ISSUE: CI/CD workflow still uses VITE_GITHUB_TOKEN"
    echo "   This means your token might still be exposed!"
else
    echo "✅ CI/CD workflow no longer uses VITE_GITHUB_TOKEN"
fi

echo
echo "Step 6: Manual cleanup required..."
echo "🔧 You still need to manually:"
echo "   1. Remove VITE_GITHUB_TOKEN from GitHub repository secrets"
echo "   2. Configure Firebase Functions token: firebase functions:config:set github.token=\"your_token\""
echo "   3. Deploy Firebase Functions: firebase deploy --only functions"
echo "   4. Test the secure implementation"

echo
echo "Step 7: Verification commands..."
echo "Run these commands to verify the secure setup:"
echo
echo "# Check Firebase Functions config"
echo "firebase functions:config:get"
echo
echo "# Test Functions locally"
echo "firebase emulators:start --only functions"
echo
echo "# Build and test your app"
echo "npm run build && npm run dev"

echo
echo "🎉 Cleanup script completed!"
echo "📖 See docs/SECURE_GITHUB_API_SETUP.md for full setup instructions" 