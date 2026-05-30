# 🌐 TALENT-IQ Live Demo Guide

## 🚀 Deploying Your Live Demo

Follow this guide to deploy TALENT-IQ and get a live demo link.

---

## Option 1: Deploy to Render (Recommended - Free)

### Step 1: Prepare Repository

```bash
# Make sure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy Backend

1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - **Name:** `talentiq-backend`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add environment variables (see below)
7. Click "Create Web Service"
8. Wait 5-10 minutes
9. Copy your backend URL: `https://talentiq-backend.onrender.com`

### Step 3: Deploy Frontend

1. Click "New +" → "Static Site"
2. Select same repository
3. Configure:
   - **Name:** `talentiq-frontend`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Add environment variables:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   VITE_API_URL=https://talentiq-backend.onrender.com/api
   ```
5. Click "Create Static Site"
6. Wait 5-10 minutes
7. Your live demo: `https://talentiq-frontend.onrender.com`

### Step 4: Update Configurations

1. **Update Clerk:**
   - Go to Clerk Dashboard
   - Add to allowed origins:
     - `https://talentiq-frontend.onrender.com`
     - `https://talentiq-backend.onrender.com`

2. **Update Backend CLIENT_URL:**
   - Go to Render backend service
   - Update environment variable:
     ```
     CLIENT_URL=https://talentiq-frontend.onrender.com
     ```
   - Save and redeploy

---

## Option 2: Deploy to Vercel + Railway

### Deploy Backend to Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables
6. Deploy
7. Copy backend URL

### Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. "Add New" → "Project"
4. Import your repository
5. Configure:
   - **Framework:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Add environment variables:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   VITE_API_URL=https://your-backend.railway.app/api
   ```
7. Deploy
8. Your live demo: `https://your-project.vercel.app`

---

## 🔑 Required Environment Variables

### Backend Environment Variables

```env
NODE_ENV=production
PORT=5000

# MongoDB Atlas
DB_URL=mongodb+srv://user:password@cluster.mongodb.net/talentiq

# JWT
JWT_SECRET=your_random_secret_key

# Clerk
CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx

# Stream (Optional)
STREAM_API_KEY=your_stream_key
STREAM_API_SECRET=your_stream_secret

# Inngest (Optional)
INNGEST_EVENT_KEY=your_inngest_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Frontend URL
CLIENT_URL=https://your-frontend-url.com
```

### Frontend Environment Variables

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
VITE_API_URL=https://your-backend-url.com/api
VITE_STREAM_API_KEY=your_stream_key
```

---

## ✅ Verify Deployment

### 1. Check Backend Health

Visit: `https://your-backend-url.com/health`

Expected response:
```json
{"msg":"api is up and running"}
```

### 2. Check Frontend

Visit: `https://your-frontend-url.com`

You should see:
- ✅ Landing page loads
- ✅ No console errors
- ✅ Sign up button works

### 3. Test Full Flow

1. Click "Sign Up"
2. Create an account
3. Verify email
4. See dashboard
5. Create a session
6. View sessions list

---

## 🎯 Demo Credentials

### For Testing

Create a demo account:
- Email: `demo@talentiq.com`
- Password: `Demo123!`

Or let users sign up with their own email.

---

## 📱 Share Your Demo

### Demo Link Format

```
🚀 TALENT-IQ Live Demo

Try it now: https://your-frontend-url.com

Features:
✅ User Authentication
✅ Create Coding Sessions
✅ Join Practice Sessions
✅ Track Session History
✅ Beautiful Modern UI

Tech Stack: React, Node.js, MongoDB, Clerk, TailwindCSS
```

### Social Media Post

```
🎉 Just deployed TALENT-IQ! 

A collaborative coding interview platform where developers can practice technical interviews together.

🔗 Live Demo: https://your-url.com

Built with:
⚛️ React
🟢 Node.js
🍃 MongoDB
🎨 TailwindCSS

#WebDev #React #NodeJS #MongoDB #CodingInterview
```

---

## 🐛 Troubleshooting

### Issue: Backend Returns 502

**Solution:**
- Check backend logs in Render/Railway
- Verify MongoDB connection string
- Check all environment variables are set
- Wait for backend to fully start (can take 2-3 minutes)

### Issue: Frontend Shows Blank Page

**Solution:**
- Check browser console for errors
- Verify `VITE_CLERK_PUBLISHABLE_KEY` is set
- Check `VITE_API_URL` points to correct backend
- Clear browser cache

### Issue: Authentication Fails

**Solution:**
- Verify Clerk keys are production keys (pk_live_, sk_live_)
- Check Clerk allowed origins include your URLs
- Verify `CLIENT_URL` in backend matches frontend URL

### Issue: CORS Errors

**Solution:**
- Check `CLIENT_URL` in backend environment variables
- Verify CORS is enabled in `backend/src/server.js`
- Check backend is running

---

## 📊 Monitor Your Demo

### Render Dashboard
- View logs
- Check metrics
- Monitor uptime
- View deployments

### Clerk Dashboard
- View user signups
- Monitor authentication
- Check user activity

### MongoDB Atlas
- View database size
- Monitor connections
- Check queries

---

## 🔄 Update Your Demo

### Automatic Deployments

Both Render and Vercel support automatic deployments:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```
3. Deployment happens automatically
4. Check deployment status in dashboard

### Manual Deployment

If automatic deployment is disabled:

1. Go to your service dashboard
2. Click "Manual Deploy"
3. Select branch
4. Click "Deploy"

---

## 💰 Cost Breakdown

### Free Tier Limits

**Render:**
- ✅ 750 hours/month free
- ✅ Sleeps after 15 min inactivity
- ✅ 100 GB bandwidth
- ⚠️ Cold starts (15-30 seconds)

**Vercel:**
- ✅ 100 GB bandwidth
- ✅ Unlimited deployments
- ✅ No cold starts
- ✅ Global CDN

**Railway:**
- ✅ $5 free credit/month
- ⚠️ Pay after credit used

**MongoDB Atlas:**
- ✅ 512 MB storage free
- ✅ Shared cluster
- ✅ Enough for demo

**Clerk:**
- ✅ 10,000 MAU free
- ✅ All features included

**Total Cost: $0/month** for demo usage! 🎉

---

## 🎓 Demo Best Practices

### 1. Keep It Running
- Use UptimeRobot to ping your backend every 5 minutes
- Prevents cold starts on Render free tier

### 2. Monitor Usage
- Check Render/Vercel dashboards weekly
- Monitor MongoDB storage
- Track Clerk MAU

### 3. Secure Your Demo
- Use strong JWT secret
- Rotate secrets regularly
- Monitor for abuse

### 4. Optimize Performance
- Enable caching
- Optimize images
- Minify assets
- Use CDN

---

## 📧 Get Your Live Demo Link

After deployment, your live demo will be at:

**Frontend:** `https://talentiq-frontend.onrender.com`
**Backend:** `https://talentiq-backend.onrender.com`

Or with custom domain:
**Frontend:** `https://talentiq.yourdomain.com`
**Backend:** `https://api.talentiq.yourdomain.com`

---

## 🎉 Success!

Your TALENT-IQ demo is now live! 🚀

Share it with:
- Friends and colleagues
- On LinkedIn
- On Twitter
- In your portfolio
- With potential employers

---

## 📞 Need Help?

- 📧 Email: support@talentiq.com
- 🐛 GitHub: [Open Issue](https://github.com/BhagyaSRathore/Talent-IQ/issues)
- 💬 Discord: [Join Community](https://discord.gg/talentiq)

---

**Happy Deploying! 🚀**
