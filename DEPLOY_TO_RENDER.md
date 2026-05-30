# 🚀 Deploy TALENT-IQ to Render (Free)

Follow these steps to deploy your app and get a live demo link.

---

## 📋 Prerequisites

- GitHub repository (✅ You have this)
- Render account (free) - [Sign up here](https://render.com)
- MongoDB Atlas (✅ You have this)
- Clerk account (✅ You have this)

---

## 🎯 Step 1: Deploy Backend

### 1.1 Go to Render
- Visit: https://render.com
- Click "Get Started for Free"
- Sign up with GitHub

### 1.2 Create Web Service
- Click "New +" → "Web Service"
- Connect your GitHub account
- Select your `Talent-IQ` repository
- Click "Connect"

### 1.3 Configure Backend Service
Fill in these settings:

- **Name:** `talentiq-backend`
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** `Free`

### 1.4 Add Environment Variables
Click "Advanced" → "Add Environment Variable" and add these:

```
NODE_ENV=production
PORT=5000
DB_URL=mongodb+srv://talentiq_user:Paf0mY5mME6UvgaI@cluster0.lroe4jo.mongodb.net/talentiq?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=supersecretkey123
CLERK_PUBLISHABLE_KEY=pk_test_aGFybWxlc3Mtc2hlZXBkb2ctOS5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_5orOqMZbfPpbPWVRd7ONnGaXtDF6zZgVZVejqp3t0p
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
CLIENT_URL=https://YOUR-FRONTEND-URL.onrender.com
```

**Note:** We'll update `CLIENT_URL` after deploying frontend.

### 1.5 Deploy
- Click "Create Web Service"
- Wait 5-10 minutes for deployment
- Copy your backend URL: `https://talentiq-backend-xxxx.onrender.com`

---

## 🎯 Step 2: Deploy Frontend

### 2.1 Create Static Site
- Click "New +" → "Static Site"
- Select same `Talent-IQ` repository

### 2.2 Configure Frontend Service
Fill in these settings:

- **Name:** `talentiq-frontend`
- **Branch:** `main`
- **Root Directory:** `frontend`
- **Build Command:** `npm install --legacy-peer-deps && npm run build`
- **Publish Directory:** `dist`

### 2.3 Add Environment Variables
Click "Advanced" → "Add Environment Variable":

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_aGFybWxlc3Mtc2hlZXBkb2ctOS5jbGVyay5hY2NvdW50cy5kZXYk
VITE_API_URL=https://talentiq-backend-xxxx.onrender.com/api
```

**Replace** `talentiq-backend-xxxx` with your actual backend URL from Step 1.5.

### 2.4 Deploy
- Click "Create Static Site"
- Wait 5-10 minutes
- Your live demo URL: `https://talentiq-frontend-xxxx.onrender.com`

---

## 🎯 Step 3: Update Configuration

### 3.1 Update Backend CLIENT_URL
- Go to your backend service on Render
- Click "Environment"
- Update `CLIENT_URL` to your frontend URL:
  ```
  CLIENT_URL=https://talentiq-frontend-xxxx.onrender.com
  ```
- Click "Save Changes"
- Backend will auto-redeploy

### 3.2 Update Clerk Allowed Origins
- Go to [Clerk Dashboard](https://dashboard.clerk.com)
- Select your TALENT-IQ application
- Go to "API Keys"
- Scroll to "Allowed origins"
- Add your URLs:
  - `https://talentiq-frontend-xxxx.onrender.com`
  - `https://talentiq-backend-xxxx.onrender.com`
- Click "Save"

---

## ✅ Step 4: Test Your Live Demo

### 4.1 Open Your Live Demo
Visit: `https://talentiq-frontend-xxxx.onrender.com`

### 4.2 Test Features
- ✅ Sign up with email
- ✅ Create a session
- ✅ View sessions
- ✅ End session
- ✅ Check history

---

## 🎯 Step 5: Update README with Live Demo Link

### 5.1 Edit README.md
Replace `YOUR_LIVE_DEMO_URL_HERE` with your actual frontend URL:

```markdown
**[View Live Demo →](https://talentiq-frontend-xxxx.onrender.com)**
```

### 5.2 Commit and Push
```bash
git add README.md
git commit -m "Add live demo link"
git push origin main
```

---

## 🎉 Done!

Your TALENT-IQ is now live! Share this link:

```
https://talentiq-frontend-xxxx.onrender.com
```

---

## 📝 Important Notes

### Free Tier Limitations
- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- 750 hours/month free (enough for demo)

### Keep It Awake (Optional)
Use a service like [UptimeRobot](https://uptimerobot.com) to ping your backend every 5 minutes.

### Custom Domain (Optional)
You can add a custom domain in Render settings for a more professional look.

---

## 🆘 Troubleshooting

### Backend Returns 502
- Check backend logs in Render dashboard
- Verify all environment variables are set
- Wait for backend to fully start (2-3 minutes)

### Frontend Shows Blank Page
- Check browser console (F12)
- Verify `VITE_CLERK_PUBLISHABLE_KEY` is set
- Verify `VITE_API_URL` points to correct backend

### Authentication Fails
- Check Clerk allowed origins include your URLs
- Verify Clerk keys are correct
- Check `CLIENT_URL` in backend matches frontend URL

---

## 📞 Need Help?

If you encounter issues:
1. Check Render logs (click on your service → "Logs")
2. Check browser console (F12 → Console)
3. Verify all environment variables are correct

---

**Good luck with your deployment! 🚀**
