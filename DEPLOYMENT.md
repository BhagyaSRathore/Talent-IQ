# 🚀 TALENT-IQ Deployment Guide

This guide covers deploying TALENT-IQ to various hosting platforms.

## 📋 Deployment Options

1. [Render (Recommended)](#deploy-to-render)
2. [Vercel + Railway](#deploy-to-vercel--railway)
3. [Heroku](#deploy-to-heroku)
4. [DigitalOcean](#deploy-to-digitalocean)

---

## Deploy to Render

Render offers free hosting for both frontend and backend with automatic deployments.

### Prerequisites
- GitHub account
- Render account ([Sign up](https://render.com))
- MongoDB Atlas database
- Clerk account

### Step 1: Prepare Your Repository

1. **Push to GitHub:**
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. **Verify `.gitignore`:**
Ensure these are in `.gitignore`:
```
node_modules/
.env
.env.local
dist/
build/
```

### Step 2: Deploy Backend to Render

1. **Go to Render Dashboard**
   - Visit [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Connect your GitHub account
   - Select your TALENT-IQ repository
   - Click "Connect"

3. **Configure Service**
   - **Name:** `talentiq-backend`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable":
   
   ```
   NODE_ENV=production
   PORT=5000
   DB_URL=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   INNGEST_EVENT_KEY=your_inngest_event_key
   INNGEST_SIGNING_KEY=your_inngest_signing_key
   CLIENT_URL=https://your-frontend-url.onrender.com
   ```

5. **Create Service**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL (e.g., `https://talentiq-backend.onrender.com`)

### Step 3: Deploy Frontend to Render

1. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Select same repository

2. **Configure Static Site**
   - **Name:** `talentiq-frontend`
   - **Branch:** `main`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

3. **Add Environment Variables**
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_URL=https://talentiq-backend.onrender.com/api
   VITE_STREAM_API_KEY=your_stream_api_key
   ```

4. **Create Static Site**
   - Click "Create Static Site"
   - Wait for deployment
   - Your site will be live at `https://talentiq-frontend.onrender.com`

### Step 4: Update Clerk Settings

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to "API Keys"
4. Add to "Allowed origins":
   - `https://talentiq-frontend.onrender.com`
   - `https://talentiq-backend.onrender.com`

### Step 5: Update Backend CLIENT_URL

1. Go to Render backend service
2. Update `CLIENT_URL` environment variable:
   ```
   CLIENT_URL=https://talentiq-frontend.onrender.com
   ```
3. Save and redeploy

---

## Deploy to Vercel + Railway

### Deploy Backend to Railway

1. **Go to Railway**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - Select `backend` directory
   - Railway auto-detects Node.js

4. **Add Environment Variables**
   - Go to "Variables" tab
   - Add all backend environment variables
   - Set `PORT` to `$PORT` (Railway provides this)

5. **Deploy**
   - Railway automatically deploys
   - Copy your backend URL

### Deploy Frontend to Vercel

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Project**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Add Environment Variables**
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_URL=https://your-backend.railway.app/api
   VITE_STREAM_API_KEY=your_stream_api_key
   ```

5. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

---

## Deploy to Heroku

### Prerequisites
- Heroku CLI installed
- Heroku account

### Step 1: Prepare for Heroku

1. **Create `Procfile` in root:**
```
web: npm start
```

2. **Update `package.json` in root:**
```json
{
  "scripts": {
    "start": "cd backend && npm start",
    "build": "cd frontend && npm install && npm run build",
    "heroku-postbuild": "npm run build"
  }
}
```

### Step 2: Deploy

```bash
# Login to Heroku
heroku login

# Create app
heroku create talentiq-app

# Add MongoDB addon (optional)
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set CLERK_PUBLISHABLE_KEY=your_clerk_key
heroku config:set CLERK_SECRET_KEY=your_clerk_secret
# ... add all other variables

# Deploy
git push heroku main

# Open app
heroku open
```

---

## Deploy to DigitalOcean

### Using App Platform

1. **Create Account**
   - Go to [digitalocean.com](https://www.digitalocean.com)
   - Sign up and add payment method

2. **Create App**
   - Go to "Apps" → "Create App"
   - Connect GitHub repository

3. **Configure Components**
   
   **Backend Service:**
   - Type: Web Service
   - Source Directory: `backend`
   - Build Command: `npm install`
   - Run Command: `npm start`
   - HTTP Port: 5000

   **Frontend Static Site:**
   - Type: Static Site
   - Source Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables**
   - Add all required variables for both components

5. **Deploy**
   - Review and create
   - Wait for deployment

---

## Post-Deployment Checklist

### ✅ Backend Verification

1. **Health Check:**
```bash
curl https://your-backend-url.com/health
```

Expected response:
```json
{"msg":"api is up and running"}
```

2. **Database Connection:**
   - Check logs for "Connected to MongoDB"
   - Verify no connection errors

3. **API Endpoints:**
```bash
# Test sessions endpoint (requires auth)
curl https://your-backend-url.com/api/sessions/active
```

### ✅ Frontend Verification

1. **Load Website:**
   - Visit your frontend URL
   - Check for any console errors (F12)

2. **Test Authentication:**
   - Try signing up
   - Try signing in
   - Verify redirects work

3. **Test Features:**
   - Create a session
   - View sessions list
   - Check session history

### ✅ Integration Verification

1. **Clerk Integration:**
   - Sign up works
   - Sign in works
   - User profile loads

2. **Database Integration:**
   - Sessions are created
   - Sessions are saved
   - Data persists

3. **API Communication:**
   - Frontend can reach backend
   - No CORS errors
   - API responses are correct

---

## Environment Variables Reference

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
DB_URL=mongodb+srv://...
JWT_SECRET=...
CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
STREAM_API_KEY=...
STREAM_API_SECRET=...
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...
CLIENT_URL=https://your-frontend-url.com
```

### Frontend (.env)
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
VITE_API_URL=https://your-backend-url.com/api
VITE_STREAM_API_KEY=...
```

---

## Monitoring & Maintenance

### Set Up Monitoring

1. **Render:**
   - Built-in metrics in dashboard
   - Set up email alerts

2. **Railway:**
   - View logs in dashboard
   - Set up webhooks for alerts

3. **Vercel:**
   - Analytics in dashboard
   - Set up Vercel Analytics

### Regular Maintenance

1. **Update Dependencies:**
```bash
npm update
npm audit fix
```

2. **Monitor Logs:**
   - Check for errors regularly
   - Set up log aggregation (e.g., Logtail)

3. **Database Backups:**
   - MongoDB Atlas auto-backups
   - Test restore process

4. **Security Updates:**
   - Keep Node.js updated
   - Update npm packages regularly
   - Rotate secrets periodically

---

## Troubleshooting Deployment

### Issue: Build Fails

**Check:**
- Node.js version compatibility
- All dependencies in `package.json`
- Build command is correct
- Environment variables are set

### Issue: App Crashes on Start

**Check:**
- Logs for error messages
- Database connection string
- All required environment variables
- Port configuration

### Issue: 502 Bad Gateway

**Check:**
- Backend is running
- Correct backend URL in frontend
- CORS configuration
- Firewall rules

### Issue: Authentication Fails

**Check:**
- Clerk keys are production keys (pk_live_, sk_live_)
- Frontend URL in Clerk allowed origins
- Backend URL in Clerk allowed origins
- CLIENT_URL in backend matches frontend

---

## Custom Domain Setup

### Render

1. Go to your service settings
2. Click "Custom Domain"
3. Add your domain
4. Update DNS records as shown
5. Wait for SSL certificate

### Vercel

1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Update DNS records
5. SSL is automatic

---

## Cost Optimization

### Free Tier Limits

**Render:**
- 750 hours/month free
- Sleeps after 15 min inactivity
- 100 GB bandwidth

**Vercel:**
- 100 GB bandwidth
- Unlimited deployments
- 100 GB-hours serverless execution

**Railway:**
- $5 free credit/month
- Pay as you go after

### Tips to Stay Free

1. Use MongoDB Atlas free tier (512 MB)
2. Optimize images and assets
3. Enable caching
4. Use CDN for static assets
5. Monitor usage regularly

---

## Support

Need help with deployment?

- 📧 Email: support@talentiq.com
- 💬 Discord: [Join community](https://discord.gg/talentiq)
- 🐛 Issues: [GitHub](https://github.com/BhagyaSRathore/Talent-IQ/issues)

---

Happy Deploying! 🚀
