# Deployment Environment Setup

This guide explains how to configure environment variables for production deployment.

## Environment Variables in Production

Since `.env` files are not committed to version control, you need to configure environment variables in your deployment environment.

### Firebase Hosting Deployment

#### Option 1: Using GitHub Actions (Recommended)

If you're using GitHub Actions for deployment, add the environment variable to your repository secrets:

1. **Add GitHub Secret**:
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `VITE_GITHUB_TOKEN`
   - Value: Your GitHub personal access token

2. **Update GitHub Actions Workflow** (if you have one):

   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to Firebase

   on:
     push:
       branches: [main]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3

         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'

         - name: Install dependencies
           run: npm ci

         - name: Build
           run: npm run build
           env:
             VITE_GITHUB_TOKEN: ${{ secrets.VITE_GITHUB_TOKEN }}

         - name: Deploy to Firebase
           uses: FirebaseExtended/action-hosting-deploy@v0
           with:
             repoToken: '${{ secrets.GITHUB_TOKEN }}'
             firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
             projectId: adam-wickenden
   ```

#### Option 2: Local Build with Environment Variable

If you're building locally before deployment:

```bash
# Set environment variable for build
export VITE_GITHUB_TOKEN=your_token_here
npm run build
firebase deploy
```

#### Option 3: Build Script with Environment Variable

Create a deployment script:

```bash
# scripts/deploy.sh
#!/bin/bash

# Check if token is provided
if [ -z "$VITE_GITHUB_TOKEN" ]; then
  echo "Error: VITE_GITHUB_TOKEN environment variable is required"
  echo "Usage: VITE_GITHUB_TOKEN=your_token ./scripts/deploy.sh"
  exit 1
fi

echo "Building with GitHub token..."
npm run build

echo "Deploying to Firebase..."
firebase deploy

echo "Deployment complete!"
```

Make it executable and use:

```bash
chmod +x scripts/deploy.sh
VITE_GITHUB_TOKEN=your_token ./scripts/deploy.sh
```

### Other Deployment Platforms

#### Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add `VITE_GITHUB_TOKEN` with your token value
4. Redeploy your application

#### Netlify

1. Go to your Netlify site dashboard
2. Navigate to Site settings > Environment variables
3. Add `VITE_GITHUB_TOKEN` with your token value
4. Redeploy your application

#### Heroku

```bash
heroku config:set VITE_GITHUB_TOKEN=your_token_here -a your-app-name
```

## Security Considerations

### Token Permissions

- Use a token with minimal permissions (`public_repo` only)
- Consider creating a dedicated token for deployment
- Set reasonable expiration dates (90 days to 1 year)

### Token Rotation

- Set calendar reminders to rotate tokens before expiration
- Update the token in all deployment environments
- Test the deployment after token updates

### Monitoring

- Monitor your GitHub API usage in the developer settings
- Set up alerts if you approach rate limits
- Consider implementing caching for production

## Fallback Strategy

The application is designed to work without the GitHub token (with reduced functionality):

- **With Token**: 5,000 requests/hour, full functionality
- **Without Token**: 60 requests/hour, basic functionality
- **Fallback**: Graceful error handling and user messaging

## Testing Deployment

1. **Test without token**:

   ```bash
   # Build without token to test fallback
   unset VITE_GITHUB_TOKEN
   npm run build
   npm run preview
   ```

2. **Test with token**:
   ```bash
   # Build with token to test full functionality
   export VITE_GITHUB_TOKEN=your_token
   npm run build
   npm run preview
   ```

## Troubleshooting

### Build Issues

- Ensure the token is set during build time (not runtime)
- Vite environment variables must be prefixed with `VITE_`
- Check build logs for environment variable warnings

### Deployment Issues

- Verify the token is correctly set in your deployment platform
- Check that the token hasn't expired
- Ensure the token has the correct permissions

### Rate Limiting in Production

- Monitor your API usage in GitHub developer settings
- Consider implementing client-side caching
- Set up monitoring alerts for rate limit approaches

## Environment Variable Verification

Add this to your build process to verify the token is available:

```javascript
// In your build script or component
if (import.meta.env.VITE_GITHUB_TOKEN) {
  console.log('✅ GitHub token is configured')
} else {
  console.warn('⚠️ GitHub token not found - using fallback mode')
}
```
