# GitHub API Setup

This document explains how to set up GitHub API authentication to avoid rate limiting when fetching repository data.

## Why Authentication is Needed

GitHub's API has different rate limits based on authentication:

- **Unauthenticated requests**: 60 requests per hour
- **Authenticated requests**: 5,000 requests per hour

Since the portfolio website fetches repository data and commit information, it can quickly hit the unauthenticated limit, especially during development.

## Setting Up GitHub Personal Access Token

### 1. Create a Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give your token a descriptive name (e.g., "Portfolio Website")
4. Set an expiration date (recommended: 90 days or 1 year)
5. Select the following scopes:
   - `public_repo` - Access public repositories (this is all that's needed for this project)
6. Click "Generate token"
7. **Important**: Copy the token immediately - you won't be able to see it again!

### 2. Configure Environment Variables

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your GitHub token:

   ```bash
   VITE_GITHUB_TOKEN=your_github_personal_access_token_here
   ```

3. Replace `your_github_personal_access_token_here` with the token you generated

### 3. Restart Development Server

After adding the token, restart your development server:

```bash
npm run dev
```

## Verification

You can verify that authentication is working by:

1. Checking the browser console - you should see fewer or no rate limit warnings
2. The GitHub API service will automatically use authentication if the token is available
3. You can check your current rate limit status in the browser console

## Security Notes

- **Never commit your `.env` file** - it's already included in `.gitignore`
- **Use minimal permissions** - only `public_repo` scope is needed
- **Rotate tokens regularly** - set reasonable expiration dates
- **Use different tokens for different environments** - don't share tokens between development and production

## Troubleshooting

### Token Not Working

- Make sure the token is correctly copied (no extra spaces)
- Verify the token has the `public_repo` scope
- Check that the token hasn't expired

### Still Getting Rate Limited

- Verify the environment variable name is exactly `VITE_GITHUB_TOKEN`
- Restart the development server after adding the token
- Check browser console for authentication errors

### Token Expired

- Generate a new token following the same steps
- Update the `.env` file with the new token
- Restart the development server

## Alternative: No Authentication

The website will still work without authentication, but you may experience:

- Slower loading times due to rate limiting
- Temporary failures during peak usage
- Limited functionality during development

The GitHub service includes proper error handling and fallbacks for rate limit scenarios.
