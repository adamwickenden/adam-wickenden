#!/bin/bash

# Portfolio Website Setup Script
# This script sets up the development environment

echo "🎯 Setting up Adam Wickenden's Portfolio Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "🔥 Firebase CLI not found. Installing Firebase CLI..."
    npm install -g firebase-tools
else
    echo "✅ Firebase CLI is already installed: $(firebase --version)"
fi

# Create directories if they don't exist
echo "📁 Creating project directories..."
mkdir -p public/images
mkdir -p public/unity

echo "🎨 Setting up development environment..."

# Check if everything is ready
echo "🔍 Verifying setup..."
if [ -d "node_modules" ] && [ -f "package.json" ]; then
    echo "✅ Setup complete!"
    echo ""
    echo "🚀 To start development:"
    echo "   npm run dev"
    echo ""
    echo "🏗️  To build for production:"
    echo "   npm run build"
    echo ""
    echo "🚀 To deploy to Firebase:"
    echo "   ./deploy.sh"
    echo ""
    echo "🌐 Your website will be available at:"
    echo "   Development: http://localhost:5173"
    echo "   Production: https://adam-wickenden.web.app"
else
    echo "❌ Setup failed. Please check the errors above."
    exit 1
fi 