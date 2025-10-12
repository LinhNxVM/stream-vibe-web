# Vercel Deployment Guide for Stream Vibe Web

## Automatic Deployment Steps:

### 1. Prepare Your Repository
- Ensure your latest changes are committed and pushed to GitHub
- Your main branch should contain the latest code

### 2. Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Import your `stream-vibe-web` repository
5. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `stream-vibe-web` (if deploying from monorepo)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm ci`

### 3. Environment Variables
Add these environment variables in Vercel dashboard:

```
VITE_API_URL=https://your-backend.railway.app/api
```

**Important**: Replace `your-backend.railway.app` with your actual Railway backend URL.

### 4. Domain Configuration
- Vercel will provide a URL like: `https://your-app.vercel.app`
- You can add a custom domain later if needed

### 5. Update Backend CORS
After deployment, update your backend's CORS configuration:
1. Go to Railway dashboard
2. Update the `FRONTEND_URL` environment variable with your Vercel URL
3. Redeploy your backend

## Build Settings (Auto-detected by Vercel):
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm ci`
- **Development Command**: `npm run dev`

## Automatic Deployments:
- Every push to your main branch will trigger a new deployment
- Pull requests will get preview deployments

## Troubleshooting:
1. **Build fails**: Check that all dependencies are in package.json
2. **API calls fail**: Verify VITE_API_URL is correct and backend is running
3. **CORS errors**: Ensure backend FRONTEND_URL matches your Vercel domain