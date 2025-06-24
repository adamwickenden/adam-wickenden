# Firebase Multi-Environment Setup Guide

This guide will help you complete the setup for deploying to two Firebase environments:

- **Staging**: `adam-wickenden-dev` (for PR previews)
- **Production**: `adam-wickenden` (for main branch deployments)

## 🔧 Setup Steps

### 1. Firebase Project Setup

Make sure both Firebase projects exist and are configured:

```bash
# List your Firebase projects to verify both exist
firebase projects:list

# You should see both:
# - adam-wickenden (production)
# - adam-wickenden-dev (staging)
```

### 2. Firebase Authentication

You'll need to authenticate and get a CI token for GitHub Actions:

```bash
# Login to Firebase (if not already logged in)
firebase login

# Generate a CI token for GitHub Actions
firebase login:ci
```

**Important**: Copy the token that's generated - you'll need it for GitHub Secrets.

### 3. GitHub Secrets Configuration

Add the Firebase token to your GitHub repository secrets:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FIREBASE_TOKEN`
5. Value: The token from step 2
6. Click **Add secret**

### 4. Test Local Configuration

Test that both environments are configured correctly:

```bash
# Test staging environment
firebase use staging
firebase projects:list  # Should show adam-wickenden-dev as active

# Test production environment
firebase use production
firebase projects:list  # Should show adam-wickenden as active

# Reset to default
firebase use default
```

### 5. Build and Test Deployment

```bash
# Build the project
npm run build

# Test staging deployment (optional)
firebase use staging
firebase deploy --only hosting

# Test production deployment (optional)
firebase use production
firebase deploy --only hosting
```

## 🚀 How It Works

### Pull Request Workflow

1. When a PR is opened against `main`, GitHub Actions will:
   - Run tests and linting
   - Build the application
   - Deploy to **staging** (`adam-wickenden-dev`)
   - Comment on the PR with the staging URL

### Production Deployment

1. When code is pushed to `main`, GitHub Actions will:
   - Run tests and linting
   - Build the application
   - Deploy to **production** (`adam-wickenden`)

## 📱 URLs

- **Production**: https://adam-wickenden.web.app
- **Staging**: https://adam-wickenden-dev.web.app

## 🔍 Monitoring

You can monitor deployments in:

- GitHub Actions tab in your repository
- Firebase Console for both projects
- PR comments will show staging deployment status

## 🛠 Troubleshooting

### Common Issues

1. **Firebase token expired**: Re-run `firebase login:ci` and update GitHub secret
2. **Project not found**: Verify project names in `.firebaserc` match your Firebase projects
3. **Permission denied**: Make sure you have Owner/Editor access to both Firebase projects

### Debug Commands

```bash
# Check current Firebase project
firebase use

# List all configured projects
firebase projects:list

# Test deployment without actually deploying
firebase deploy --only hosting --dry-run
```

## 📝 Configuration Files

The following files have been updated for multi-environment support:

- `.firebaserc` - Maps project aliases to Firebase project IDs
- `firebase.json` - Firebase hosting configuration
- `.github/workflows/ci-cd.yml` - GitHub Actions workflow

## 🎯 Next Steps

1. Complete the Firebase authentication setup (steps 2-3)
2. Test the configuration locally (step 4)
3. Create a test PR to verify staging deployment works
4. Merge to main to verify production deployment works

## 🔐 Security Notes

- Never commit Firebase tokens to your repository
- Use GitHub Secrets for all sensitive configuration
- Regularly rotate your Firebase CI tokens
- Monitor Firebase project access and remove unused accounts
