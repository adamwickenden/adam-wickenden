# CI/CD Setup Guide

This document explains how to set up the continuous integration and deployment pipeline for the Adam Wickenden portfolio website.

## Overview

The CI/CD pipeline consists of two main workflows:

1. **Main CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
   - Runs on pushes to `main` and `develop` branches
   - Runs on pull requests to `main`
   - Performs linting, formatting checks, and tests
   - Deploys to Firebase on successful merge to `main`

2. **Pull Request Checks** (`.github/workflows/pr-checks.yml`)
   - Runs detailed quality checks on pull requests
   - Provides coverage reports and bundle analysis
   - Gives detailed feedback for code review

## Prerequisites

### 1. Firebase Project Setup

1. Ensure you have a Firebase project created
2. Firebase hosting should be initialized in your project
3. You should have Firebase CLI installed locally

### 2. GitHub Repository Setup

1. Push your code to a GitHub repository
2. Ensure the repository has access to GitHub Actions

## Setting Up Firebase Token for CI/CD

To enable automatic deployment to Firebase, you need to set up a Firebase CI token:

### Step 1: Generate Firebase Token

1. Install Firebase CLI globally (if not already installed):

   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:

   ```bash
   firebase login
   ```

3. Generate a CI token:

   ```bash
   firebase login:ci
   ```

4. Copy the generated token (it will look like `1//0GACEdTYJ...`)

### Step 2: Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Name: `FIREBASE_TOKEN`
6. Value: Paste the token you copied from Step 1
7. Click **Add secret**

### Step 3: Verify Firebase Configuration

Ensure your `firebase.json` is properly configured:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## Workflow Details

### Main CI/CD Pipeline Features

- **Linting**: Runs ESLint to check code quality
- **Formatting**: Verifies Prettier formatting
- **Testing**: Runs all unit tests
- **Building**: Creates production build
- **Deployment**: Deploys to Firebase (main branch only)
- **Notifications**: Provides deployment status

### Pull Request Workflow Features

- **Quality Checks**: Comprehensive code quality analysis
- **Coverage Reports**: Test coverage analysis
- **Bundle Analysis**: Bundle size checking
- **Detailed Feedback**: Summary of all checks

## Local Development Commands

```bash
# Run all CI checks locally
npm run ci

# Individual commands
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint issues
npm run format        # Format code with Prettier
npm run format:check  # Check formatting
npm run test          # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:coverage # Run tests with coverage
npm run build         # Build for production
npm run deploy        # Build and deploy to Firebase
```

## Branch Protection Rules (Recommended)

To ensure code quality, set up branch protection rules:

1. Go to **Settings** → **Branches** in your GitHub repository
2. Click **Add rule** for the `main` branch
3. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require linear history (optional)
4. Add required status checks:
   - `Test & Lint`
   - `PR Quality Checks`

## Monitoring and Troubleshooting

### Common Issues

1. **Firebase Token Expired**
   - Regenerate token: `firebase login:ci`
   - Update GitHub secret with new token

2. **Build Failures**
   - Check the Actions tab for detailed error logs
   - Ensure all dependencies are properly installed
   - Verify build works locally: `npm run build`

3. **Test Failures**
   - Run tests locally: `npm run test:run`
   - Check test coverage: `npm run test:coverage`
   - Fix failing tests before pushing

### Viewing Deployment Status

- **GitHub Actions**: Check the Actions tab in your repository
- **Firebase Console**: Monitor deployments in Firebase hosting
- **Live Site**: https://adam-wickenden.web.app

## Security Considerations

- Never commit Firebase tokens or sensitive data
- Use GitHub secrets for all sensitive information
- Regularly rotate Firebase tokens
- Monitor GitHub Actions usage for any unusual activity

## Customization

### Adding New Checks

To add new quality checks to the pipeline:

1. Edit `.github/workflows/ci-cd.yml` or `.github/workflows/pr-checks.yml`
2. Add new steps in the appropriate job
3. Update documentation

### Modifying Coverage Thresholds

Edit `vite.config.js` to adjust coverage requirements:

```javascript
coverage: {
  thresholds: {
    global: {
      branches: 80,  // Adjust as needed
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

## Support

If you encounter issues with the CI/CD pipeline:

1. Check the GitHub Actions logs
2. Verify all secrets are properly set
3. Ensure Firebase project configuration is correct
4. Test all commands locally before pushing
