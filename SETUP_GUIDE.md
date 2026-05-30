# 🛠️ TALENT-IQ Setup Guide

This guide will walk you through setting up TALENT-IQ from scratch.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Common Issues](#common-issues)

## Prerequisites

### Required Software
- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** v9+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Required Accounts
- **MongoDB Atlas** (free tier) - [Sign up](https://www.mongodb.com/cloud/atlas/register)
- **Clerk** (free tier) - [Sign up](https://clerk.com/sign-up)

### Optional Accounts (for full features)
- **Stream** (free trial) - [Sign up](https://getstream.io/try-for-free/)
- **Inngest** (free tier) - [Sign up](https://www.inngest.com/sign-up)

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/BhagyaSRathore/Talent-IQ.git
cd TALENT-IQ
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

Expected output:
```
added 150+ packages in 30s
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

Expected output:
```
added 200+ packages in 45s
```

## Configuration

### Step 1: Set Up MongoDB

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Click "Try Free"
   - Sign up with Google or email

2. **Create a Cluster**
   - Choose "Free Shared" tier
   - Select a cloud provider and region (closest to you)
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `talentiq_user`
   - Password: Generate a secure password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `talentiq`

   Example:
   ```
   mongodb+srv://talentiq_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/talentiq?retryWrites=true&w=majority
   ```

### Step 2: Set Up Clerk Authentication

1. **Create Clerk Account**
   - Go to [clerk.com](https://clerk.com)
   - Click "Start Building for Free"
   - Sign up with Google or email

2. **Create Application**
   - Click "Create Application"
   - Name: "TALENT-IQ"
   - Choose authentication methods:
     - ✅ Email
     - ✅ Google (optional)
     - ✅ GitHub (optional)
   - Click "Create Application"

3. **Get API Keys**
   - You'll see your keys immediately after creation
   - Copy "Publishable Key" (starts with `pk_test_`)
   - Copy "Secret Key" (starts with `sk_test_`)
   - Keep these safe!

4. **Configure Allowed Origins**
   - Go to "API Keys" in left sidebar
   - Scroll to "Allowed origins"
   - Add: `http://localhost:5173`
   - Add: `http://localhost:5000`
   - Click "Save"

### Step 3: Configure Backend Environment

Create `backend/.env` file:

```bash
cd backend
```

Create a file named `.env` with this content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Database
DB_URL=mongodb+srv://talentiq_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/talentiq?retryWrites=true&w=majority

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx

# Stream API (Optional - for video/chat features)
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Inngest (Optional - for background jobs)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Frontend URL
CLIENT_URL=http://localhost:5173
```

**Replace:**
- `YOUR_PASSWORD` with your MongoDB password
- `pk_test_xxx` with your Clerk Publishable Key
- `sk_test_xxx` with your Clerk Secret Key
- Generate a random string for `JWT_SECRET` (e.g., use [randomkeygen.com](https://randomkeygen.com/))

### Step 4: Configure Frontend Environment

Create `frontend/.env` file:

```bash
cd ../frontend
```

Create a file named `.env` with this content:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx

# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Stream API (Optional)
VITE_STREAM_API_KEY=your_stream_api_key
```

**Replace:**
- `pk_test_xxx` with your Clerk Publishable Key (same as backend)

## Running the Application

### Option 1: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
Server is running on port: 5000
✅ Connected to MongoDB: cluster0.xxxxx.mongodb.net
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v6.0.7  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Option 2: Production Build

```bash
# From root directory
npm run build
npm start
```

### Access the Application

Open your browser and go to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/health

## Testing the Setup

### 1. Test Backend Health

Open browser or use curl:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"msg":"api is up and running"}
```

### 2. Test Frontend

1. Open http://localhost:5173
2. You should see the landing page
3. Click "Sign Up"
4. Create an account with your email
5. Check your email for verification code
6. Complete sign up

### 3. Test Full Flow

1. **Sign Up** - Create an account
2. **Dashboard** - You should see the dashboard
3. **Create Session** - Click "Create New Session"
4. **Fill Form** - Enter a problem and select difficulty
5. **Session Created** - You should be redirected to the session room

## Common Issues

### Issue: "Cannot connect to MongoDB"

**Solution:**
1. Check your MongoDB connection string in `backend/.env`
2. Verify your IP is whitelisted in MongoDB Atlas
3. Check your database user password is correct
4. Ensure your internet connection is stable

### Issue: "Clerk authentication failed"

**Solution:**
1. Verify `CLERK_PUBLISHABLE_KEY` matches in both `.env` files
2. Check `CLERK_SECRET_KEY` in backend `.env`
3. Ensure `http://localhost:5173` is in Clerk's allowed origins
4. Clear browser cookies and try again

### Issue: "Port 5000 already in use"

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

Or change the port in `backend/.env`:
```env
PORT=5001
```

### Issue: "Module not found" errors

**Solution:**
```bash
# Delete node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: Frontend shows blank page

**Solution:**
1. Open browser console (F12)
2. Check for errors
3. Verify `.env` file exists in frontend directory
4. Ensure `VITE_CLERK_PUBLISHABLE_KEY` is set
5. Try clearing browser cache

### Issue: "CORS error" in browser console

**Solution:**
1. Check `CLIENT_URL` in `backend/.env` matches frontend URL
2. Ensure backend is running
3. Verify CORS is enabled in `backend/src/server.js`

## Optional: Set Up Stream (Video & Chat)

### Step 1: Create Stream Account

1. Go to [getstream.io](https://getstream.io)
2. Click "Try for Free"
3. Sign up with email or Google

### Step 2: Create App

1. Click "Create App"
2. Name: "TALENT-IQ"
3. Select "Development" mode
4. Click "Create App"

### Step 3: Get API Keys

1. Go to "Dashboard"
2. Copy "API Key"
3. Copy "API Secret"
4. Add to both `.env` files

### Step 4: Enable Features

1. Go to "Chat" → "Overview"
2. Enable "Chat"
3. Go to "Video" → "Overview"
4. Enable "Video Calling"

## Optional: Set Up Inngest (Background Jobs)

### Step 1: Create Inngest Account

1. Go to [inngest.com](https://www.inngest.com)
2. Sign up for free

### Step 2: Create App

1. Create a new app
2. Copy "Event Key"
3. Copy "Signing Key"
4. Add to `backend/.env`

## Next Steps

✅ Application is running!

Now you can:
1. Create your first coding session
2. Invite friends to join
3. Practice coding interviews together
4. Track your progress in history

## Need Help?

- 📧 Email: support@talentiq.com
- 🐛 Issues: [GitHub Issues](https://github.com/BhagyaSRathore/Talent-IQ/issues)
- 💬 Discord: [Join our community](https://discord.gg/talentiq)

---

Happy Coding! 🚀
