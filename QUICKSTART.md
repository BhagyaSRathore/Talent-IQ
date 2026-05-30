# ⚡ TALENT-IQ Quick Start

Get TALENT-IQ running in 5 minutes!

## 🎯 Prerequisites

- Node.js v18+ installed
- MongoDB Atlas account (free)
- Clerk account (free)

## 🚀 Quick Setup

### 1. Clone & Install (2 minutes)

```bash
# Clone repository
git clone https://github.com/BhagyaSRathore/Talent-IQ.git
cd TALENT-IQ

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Get API Keys (2 minutes)

#### MongoDB Atlas
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (for development)
5. Get connection string

#### Clerk
1. Go to [clerk.com](https://clerk.com)
2. Create application
3. Copy Publishable Key and Secret Key

### 3. Configure Environment (1 minute)

**Backend** - Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
DB_URL=your_mongodb_connection_string
JWT_SECRET=any_random_string_here
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
CLIENT_URL=http://localhost:5173
```

**Frontend** - Update `frontend/.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
VITE_API_URL=http://localhost:5000/api
```

### 4. Run Application (30 seconds)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Open Browser

Visit: http://localhost:5173

## ✅ Verify Setup

1. ✅ Landing page loads
2. ✅ Click "Sign Up"
3. ✅ Create account
4. ✅ See dashboard
5. ✅ Create a session

## 🎉 You're Ready!

Now you can:
- Create coding sessions
- Join other sessions
- Track your practice history

## 🆘 Issues?

### Backend won't start
```bash
# Check MongoDB connection
# Verify .env file exists
# Check port 5000 is free
```

### Frontend won't start
```bash
# Check Clerk key is set
# Verify .env file exists
# Check port 5173 is free
```

### Can't sign up
```bash
# Verify Clerk keys are correct
# Check backend is running
# Clear browser cookies
```

## 📚 Next Steps

- Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup
- Read [FEATURES.md](./FEATURES.md) for all features
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment

## 💡 Pro Tips

1. **Use MongoDB Compass** to view your database
2. **Use Clerk Dashboard** to manage users
3. **Check browser console** for errors (F12)
4. **Check terminal logs** for backend errors

## 🔗 Useful Links

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Clerk Dashboard](https://dashboard.clerk.com)
- [GitHub Repository](https://github.com/BhagyaSRathore/Talent-IQ)

---

Need help? Open an issue on GitHub!
