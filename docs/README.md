# Portfolio Website Documentation

This document covers all the implemented features and setup for Adam Wickenden's portfolio website.

## 🏗️ Architecture Overview

The portfolio website is built with:

- **Frontend**: React + Vite
- **Hosting**: Firebase Hosting (multi-environment)
- **API Proxy**: Firebase Functions (2nd Gen, Node.js 20)
- **CI/CD**: GitHub Actions
- **Security**: Server-side GitHub token management

## 🛡️ Secure GitHub API Implementation

### Problem Solved

The website previously exposed GitHub Personal Access Tokens in client-side code. This has been replaced with a secure server-side proxy.

**Before**: Token visible in browser dev tools ❌  
**After**: Token secured on Firebase Functions ✅

### How It Works

1. React app makes requests to Firebase Functions proxy
2. Proxy adds GitHub token to request headers (server-side only)
3. Proxy calls GitHub API with authentication
4. Clean response returned to client (no token exposed)

### Implementation Details

- **Local Development**: `http://localhost:5001/adam-wickenden/us-central1/githubProxy`
- **Production**: `https://us-central1-adam-wickenden.cloudfunctions.net/githubProxy`
- **Staging**: `https://us-central1-adam-wickenden-dev.cloudfunctions.net/githubProxy`

### API Endpoints

- **GitHub Proxy**: `/githubProxy?path=users/adamwickenden/repos&per_page=20`
- **Health Check**: `/healthCheck`

### Rate Limits

- **With Authentication**: 5,000 requests/hour
- **Without Authentication**: 60 requests/hour (fallback)

## 🚀 Multi-Environment Deployment

### Environments

- **Production**: `adam-wickenden` → https://adam-wickenden.web.app
- **Staging**: `adam-wickenden-dev` → https://adam-wickenden-dev.web.app

### Deployment Workflow

- **Pull Requests**: Auto-deploy to staging with PR comment containing preview URL
- **Main Branch**: Auto-deploy to production
- **Manual**: Use `firebase use [environment] && firebase deploy`

### CI/CD Pipeline

1. **Test & Lint**: ESLint, Prettier, Vitest (48 tests)
2. **Build**: Vite production build
3. **Deploy**: Firebase Hosting + Functions

## 🔧 Development Setup

### Prerequisites

- Node.js 20+
- Firebase CLI: `npm install -g firebase-tools`
- GitHub Personal Access Token with `public_repo` scope

### Local Development

```bash
# Start Firebase Functions emulator
firebase emulators:start --only functions

# Start React dev server (in another terminal)
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run test` - Run tests
- `npm run lint` - Check code quality
- `npm run format` - Format code with Prettier

## 🔐 Security Configuration

### GitHub Token Setup

```bash
# Set GitHub token as Firebase secret (2nd Gen Functions)
firebase functions:secrets:set GITHUB_TOKEN

# Deploy functions with secret
firebase deploy --only functions
```

### Security Features

- GitHub token stored as Firebase Secret (not environment variable)
- CORS configured for specific domains only
- Client-side code has no access to sensitive tokens
- Automatic token validation and error handling

### CORS Configuration

Allowed origins:

- `http://localhost:5173` (development)
- `https://adam-wickenden-dev.web.app` (staging)
- `https://adam-wickenden.web.app` (production)

## 📱 Mobile Responsiveness

### Implemented Features

- **Unity Project Navigation**: Horizontal scrollable with touch/swipe support
- **GitHub Repository Cards**: Mobile-optimized layouts and contrast
- **Experience Timeline**: Responsive design with mobile-specific spacing
- **Touch-Friendly UI**: Proper touch targets and gesture support
- **Responsive Typography**: Fluid scaling using `clamp()` functions

### Breakpoints

- **Mobile**: < 768px
- **Small Mobile**: < 480px
- **Desktop**: ≥ 768px

## 🧪 Testing

### Test Coverage

- **Total Tests**: 48 tests across 6 test files
- **Components**: Navigation, Projects, Experience, Home
- **Services**: GitHub API service
- **Integration**: App routing and navigation

### Test Types

- Unit tests for components
- Service integration tests
- Mock implementations for external APIs
- Error handling and loading states

## 🔍 Code Quality

### Linting & Formatting

- **ESLint**: React, hooks, and code quality rules
- **Prettier**: Consistent code formatting
- **Git Hooks**: Pre-commit quality checks

### Standards

- ES modules for main project
- CommonJS for Firebase Functions
- Proper error handling and logging
- TypeScript-ready (JSDoc comments)

## 🌐 Firebase Functions (2nd Gen)

### Features

- **Runtime**: Node.js 20
- **Secrets Management**: Firebase Secret Manager
- **CORS**: Configured for specific domains
- **Error Handling**: Comprehensive error responses
- **Logging**: Structured logging for debugging

### Function Configuration

```javascript
// Global options
setGlobalOptions({ maxInstances: 10 })

// Secret configuration
const githubTokenSecret = defineSecret('GITHUB_TOKEN')
```

### Local Testing

```bash
# Test function locally
curl "http://localhost:5001/adam-wickenden/us-central1/githubProxy?path=users/adamwickenden"

# Check function logs
firebase functions:log
```

## 📦 Project Structure

```
adam-website/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Route components
│   ├── services/      # API services
│   ├── hooks/         # Custom React hooks
│   └── utils/         # Utility functions
├── functions/         # Firebase Functions
├── public/           # Static assets
├── docs/            # Documentation
└── scripts/         # Build and deployment scripts
```

## 🚨 Troubleshooting

### Common Issues

**GitHub Token Not Configured**

```bash
firebase functions:secrets:set GITHUB_TOKEN
firebase deploy --only functions
```

**Local Development Connection Refused**

```bash
firebase emulators:start --only functions
```

**Build Failures**

```bash
npm run lint
npm run format
npm run test:run
```

**CORS Errors**

- Check that your domain is in the CORS configuration
- Verify Firebase Functions are deployed
- Check browser network tab for actual error details

### Debug Commands

```bash
# Check Firebase project
firebase use

# View function logs
firebase functions:log

# Test local build
npm run build && npm run preview
```

## ✅ Verification Checklist

After setup, verify:

- [ ] GitHub repositories load on website
- [ ] No tokens visible in browser dev tools
- [ ] Network requests go to Firebase Functions
- [ ] Both staging and production environments work
- [ ] Mobile responsiveness functions correctly
- [ ] All tests pass: `npm run test:run`
- [ ] Code quality checks pass: `npm run lint`

## 📞 Support

For issues:

1. Check Firebase Functions logs: `firebase functions:log`
2. Verify token configuration: `firebase functions:config:get`
3. Test Functions locally: `firebase emulators:start --only functions`
4. Run full test suite: `npm run test:run`

---

_This documentation covers the current implementation. All features described are actively deployed and working._
