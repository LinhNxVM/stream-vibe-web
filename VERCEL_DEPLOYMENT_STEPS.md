# 🚀 Deploy to Vercel - Step by Step Guide

## 📋 Pre-deployment Checklist
✅ Backend deployed to Railway: `https://stream-vibe-production-7fab.up.railway.app/api`
✅ Frontend built successfully with production config
✅ Production environment variables configured
✅ Changes committed and pushed to GitHub

## 🌐 Deploy to Vercel

### Step 1: Go to Vercel
1. Open [vercel.com](https://vercel.com) in your browser
2. Click "Sign up" or "Login"
3. **Choose "Continue with GitHub"** (recommended for automatic deployments)

### Step 2: Import Your Project
1. After logging in, click "New Project" or "Add New..."
2. Select "Project"
3. Look for your repository: **`LinhNxVM/stream-vibe-web`**
4. Click "Import" next to it

### Step 3: Configure Project Settings
**Framework Preset**: `Vite` (should auto-detect)
**Root Directory**: `./` (leave as default)
**Build Command**: `npm run build` (should auto-detect)
**Output Directory**: `dist` (should auto-detect)
**Install Command**: `npm ci` (should auto-detect)

### Step 4: Environment Variables (IMPORTANT!)
Click "Environment Variables" and add:

```
Name: VITE_API_URL
Value: https://stream-vibe-production-7fab.up.railway.app/api
```

### Step 5: Deploy
1. Click "Deploy"
2. Wait for build to complete (usually 2-3 minutes)
3. Vercel will provide a URL like: `https://your-app.vercel.app`

## 🔄 After Deployment

### Update Backend CORS
Once you get your Vercel URL, update Railway backend:

```bash
# In your NestJS directory
cd ../NestJS
railway variables --set "FRONTEND_URL=https://your-vercel-url.vercel.app"
```

### Test Full Stack
1. Visit your Vercel URL
2. Try registering a new user
3. Try logging in
4. Test protected routes

## 🎯 Expected URLs After Deployment:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://stream-vibe-production-7fab.up.railway.app/api`
- **API Docs**: `https://stream-vibe-production-7fab.up.railway.app/api/docs`

## 🚨 Troubleshooting

### If Build Fails:
- Check that all dependencies are in package.json
- Verify build command is correct
- Check for TypeScript errors

### If API Calls Fail:
- Verify VITE_API_URL is set correctly in Vercel
- Check Network tab in browser dev tools
- Verify backend is responding

### If CORS Errors:
- Make sure FRONTEND_URL in Railway matches your Vercel URL exactly
- Check that your domain is in the CORS origins array

## 📞 Need Help?
If you encounter issues, share:
1. Your Vercel URL
2. Any error messages
3. Browser console errors