# ✅ TALENT-IQ Setup Checklist

Print this out or keep it open while you work!

---

## 📋 PHASE 1: COMMIT CHANGES ✅ DONE!

- [x] All changes committed to Git
- [x] Changes pushed to GitHub

---

## 📦 PHASE 2: INSTALL DEPENDENCIES

### Backend Dependencies
- [ ] Open Terminal 1
- [ ] Navigate to backend folder: `cd C:\Users\hp\OneDrive\Desktop\TALENT-IQ\backend`
- [ ] Run: `npm install`
- [ ] Wait for completion (1-2 minutes)
- [ ] Check: `node_modules` folder exists in backend
- [ ] Check: No red error messages

### Frontend Dependencies
- [ ] Open Terminal 2
- [ ] Navigate to frontend folder: `cd C:\Users\hp\OneDrive\Desktop\TALENT-IQ\frontend`
- [ ] Run: `npm install`
- [ ] Wait for completion (2-3 minutes)
- [ ] Check: `node_modules` folder exists in frontend
- [ ] Check: No red error messages

---

## 🔑 PHASE 3: GET API KEYS

### MongoDB Atlas
- [ ] Go to: https://www.mongodb.com/cloud/atlas
- [ ] Create account (or sign in)
- [ ] Create free cluster (M0 Sandbox)
- [ ] Wait 3-5 minutes for cluster creation
- [ ] Create database user
- [ ] Save username: ________________
- [ ] Save password: ________________
- [ ] Whitelist IP: 0.0.0.0/0
- [ ] Get connection string
- [ ] Replace `<password>` with actual password
- [ ] Add `/talentiq` before the `?`
- [ ] Save connection string: ________________

### Clerk Authentication
- [ ] Go to: https://clerk.com
- [ ] Create account (or sign in)
- [ ] Create application named "TALENT-IQ"
- [ ] Enable Email authentication
- [ ] Copy Publishable Key (starts with `pk_test_`)
- [ ] Save Publishable Key: ________________
- [ ] Copy Secret Key (starts with `sk_test_`)
- [ ] Save Secret Key: ________________
- [ ] Add allowed origin: http://localhost:5173
- [ ] Add allowed origin: http://localhost:5000

---

## ⚙️ PHASE 4: CONFIGURE ENVIRONMENT

### Backend Configuration
- [ ] Open: `C:\Users\hp\OneDrive\Desktop\TALENT-IQ\backend\.env`
- [ ] Replace `DB_URL` with MongoDB connection string
- [ ] Replace `CLERK_PUBLISHABLE_KEY` with your Clerk publishable key
- [ ] Replace `CLERK_SECRET_KEY` with your Clerk secret key
- [ ] Save file (Ctrl + S)
- [ ] Close file

### Frontend Configuration
- [ ] Open: `C:\Users\hp\OneDrive\Desktop\TALENT-IQ\frontend\.env`
- [ ] Replace `VITE_CLERK_PUBLISHABLE_KEY` with your Clerk publishable key
- [ ] Save file (Ctrl + S)
- [ ] Close file

---

## 🚀 PHASE 5: RUN APPLICATION

### Start Backend
- [ ] Go to Terminal 1 (backend folder)
- [ ] Run: `npm run dev`
- [ ] Check: "Server is running on port: 5000"
- [ ] Check: "Connected to MongoDB"
- [ ] Check: No red errors
- [ ] Test: Open http://localhost:5000/health in browser
- [ ] Check: See `{"msg":"api is up and running"}`
- [ ] Keep terminal running!

### Start Frontend
- [ ] Go to Terminal 2 (frontend folder)
- [ ] Run: `npm run dev`
- [ ] Check: "VITE ready"
- [ ] Check: "Local: http://localhost:5173/"
- [ ] Check: No red errors
- [ ] Keep terminal running!

---

## 🧪 PHASE 6: TEST APPLICATION

### Open Application
- [ ] Open browser
- [ ] Go to: http://localhost:5173
- [ ] Check: Landing page loads
- [ ] Check: See "TALENT-IQ" logo
- [ ] Check: See "Master Coding Interviews Together"
- [ ] Check: No errors in browser console (F12)

### Test Sign Up
- [ ] Click "Get Started Free" or "Sign Up"
- [ ] Enter email and password
- [ ] OR click "Continue with Google"
- [ ] Verify email if needed
- [ ] Check: Redirected to Dashboard
- [ ] Check: See "Welcome back, [Your Name]!"
- [ ] Check: Profile picture in top right

### Test Create Session
- [ ] Click "Create New Session"
- [ ] Enter problem: "Two Sum Problem"
- [ ] Select difficulty: "Medium"
- [ ] Click "Create Session"
- [ ] Check: Redirected to Session Room
- [ ] Check: See problem name
- [ ] Check: See "1/2 participants"

### Test View Sessions
- [ ] Click "Sessions" in navbar
- [ ] Check: See your session
- [ ] Check: Search box works
- [ ] Check: Difficulty filter works

### Test History
- [ ] Go back to session room
- [ ] Click "End Session"
- [ ] Confirm ending
- [ ] Click "History" in navbar
- [ ] Check: See completed session
- [ ] Check: See statistics

---

## ✅ FINAL VERIFICATION

### Backend Status
- [ ] Terminal shows "Server is running"
- [ ] Terminal shows "Connected to MongoDB"
- [ ] Health endpoint works
- [ ] No errors in terminal

### Frontend Status
- [ ] Terminal shows "VITE ready"
- [ ] Landing page loads
- [ ] No errors in terminal
- [ ] No errors in browser console

### Features Working
- [ ] Can sign up
- [ ] Can sign in
- [ ] Dashboard loads
- [ ] Can create session
- [ ] Can view sessions
- [ ] Can search/filter
- [ ] Can end session
- [ ] Can view history

---

## 🎉 SUCCESS!

If all items are checked:
- ✅ Your application is fully functional!
- ✅ You're ready to use TALENT-IQ!
- ✅ You can deploy to production!

---

## 📝 NOTES SECTION

Write down any issues or questions here:

**MongoDB Connection String:**
```
_____________________________________________
```

**Clerk Publishable Key:**
```
_____________________________________________
```

**Clerk Secret Key:**
```
_____________________________________________
```

**Issues Encountered:**
```
_____________________________________________
_____________________________________________
_____________________________________________
```

**Solutions:**
```
_____________________________________________
_____________________________________________
_____________________________________________
```

---

## 🆘 QUICK HELP

**Backend won't start?**
→ Check MongoDB connection string in backend/.env

**Frontend won't start?**
→ Check Clerk key in frontend/.env

**Can't sign up?**
→ Check both terminals are running
→ Check Clerk allowed origins

**Blank page?**
→ Press F12, check Console for errors
→ Check frontend/.env has Clerk key

---

## 📞 NEED HELP?

Read these files in order:
1. `STEP_BY_STEP_GUIDE.md` (this is the detailed guide!)
2. `QUICKSTART.md`
3. `SETUP_GUIDE.md`
4. `README.md`

---

**Good luck! You've got this! 🚀**
