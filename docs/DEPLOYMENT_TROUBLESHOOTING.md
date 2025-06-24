# Deployment Troubleshooting Guide

## Common GitHub Actions Deployment Issues

### 1. "Resource not accessible by integration" Error

**Problem**: GitHub Actions can't comment on pull requests
**Solution**: ✅ **Fixed** - Added proper permissions to workflow

```yaml
permissions:
  contents: read
  pull-requests: write
  issues: write
```

### 2. Firebase Token Issues

**Problem**: `FIREBASE_TOKEN` not working or expired
**Solutions**:

1. **Regenerate token**:

   ```bash
   firebase login:ci
   ```

2. **Update GitHub Secret**:
   - Go to GitHub → Settings → Secrets → Actions
   - Update `FIREBASE_TOKEN` with new value

3. **Check token permissions**:
   ```bash
   firebase projects:list
   ```

### 3. Firebase Project Not Found

**Problem**: `Project 'adam-wickenden-dev' not found`
**Solutions**:

1. **Verify project exists**:

   ```bash
   firebase projects:list
   ```

2. **Check project access**:
   - Ensure you have Editor/Owner access to both projects
   - Verify project IDs in `.firebaserc` match exactly

3. **Test local deployment**:
   ```bash
   firebase use staging
   firebase deploy --only hosting --dry-run
   ```

### 4. Build Artifacts Missing

**Problem**: `build-files` artifact not found
**Solutions**:

1. **Check test job completed**: Artifacts are only uploaded if tests pass
2. **Verify build step**: Ensure `npm run build` completed successfully
3. **Check artifact retention**: Artifacts expire after 1 day

### 5. Hosting Not Enabled

**Problem**: Firebase Hosting not initialized for project
**Solutions**:

1. **Check hosting sites**:

   ```bash
   firebase use staging
   firebase hosting:sites:list
   ```

2. **Initialize hosting** (if needed):
   ```bash
   firebase hosting:sites:create adam-wickenden-dev
   ```

## 🔧 Debug Commands

### Local Testing

```bash
# Test full CI pipeline locally
npm run ci

# Test staging deployment
npm run deploy:staging

# Test production deployment
npm run deploy:production

# Dry run deployment
firebase deploy --only hosting --dry-run
```

### Firebase Debugging

```bash
# Check current project
firebase use

# List all projects
firebase projects:list

# Check hosting sites
firebase hosting:sites:list

# Test authentication
firebase projects:list
```

### GitHub Actions Debugging

```bash
# Check workflow syntax
npx yaml-lint .github/workflows/ci-cd.yml

# Validate GitHub Actions locally (if using act)
act pull_request
```

## 📱 Expected URLs

- **Production**: https://adam-wickenden.web.app
- **Staging**: https://adam-wickenden-dev.web.app

## 🚨 Emergency Procedures

### If Staging Deployment Fails

1. Check GitHub Actions logs for specific error
2. Test local deployment to staging
3. Verify Firebase project access
4. Check if hosting is enabled

### If Production Deployment Fails

1. **DO NOT PANIC** - staging is still working
2. Check GitHub Actions logs
3. Test local deployment to production
4. Consider manual deployment as backup:
   ```bash
   npm run deploy:production
   ```

### Rollback Production

1. Go to Firebase Console → Hosting
2. Select previous deployment
3. Click "Rollback"

## 📞 Support Resources

- [Firebase Documentation](https://firebase.google.com/docs/hosting)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

## 🔍 Monitoring

### Check Deployment Status

- GitHub Actions tab in repository
- Firebase Console for both projects
- PR comments (if permissions working)
- Job summaries in GitHub Actions

### Performance Monitoring

- Firebase Console → Performance
- Lighthouse CI reports
- Core Web Vitals in Firebase
