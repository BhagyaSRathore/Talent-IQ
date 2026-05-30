# 📖 TALENT-IQ - Complete Step-by-Step Guide

## ✅ PHASE 1: COMMIT CHANGES (COMPLETED!)

Great! You've already committed all changes to Git. Let's move forward!

---

## 🚀 PHASE 2: INSTALL DEPENDENCIES

### **What are dependencies?**
Dependencies are external code libraries that your project needs to work. Think of them as tools and building blocks.

### **Step 1: Install Backend Dependencies**

**What:** Install all the Node.js packages needed for the backend server.

**Where:** In the `backend` folder.

**How:**

1. **Open a NEW terminal/command prompt** (keep it separate from any other terminals)
   - Press `Windows Key + R`
   - Type `cmd` and press Enter
   - OR use the terminal in VS Code

2. **Navigate to the backend folder:**
   ```bash
   cd C:\Users\hp\OneDrive\Desktop\TALENT-IQ\backend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **What you'll see:**
   - Text scrolling showing packages being downloaded
   - Progress bars
   - Takes about 1-2 minutes
   - Should end with something like: "added 150 packages in 45s"

5. **Success indicators:**
   - ✅ No red error messages
   - ✅ A `node_modules` folder appears in `backend` directory
   - ✅ Message says "added X packages"

**If you see errors:**
- Make sure you have Node.js installed (check with `node --version`)
- Make sure you're in the correct folder
- Try running `npm cache clean --force` then `npm install` again

---

### **Step 2: Install Frontend Dependencies**

**What:** Install all the React and UI libraries needed for the frontend.

**Where:** In the `frontend` folder.

**How:**

1. **Open ANOTHER NEW terminal** (so you have 2 terminals now)
   - Press `Windows Key + R`
   - Type `cmd` and press Enter
   - OR click the `+` button in VS Code terminal

2. **Navigate to the frontend folder:**
   ```bash
   cd C:\Users\hp\OneDrive\Desktop\TALENT-IQ\frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **What you'll see:**
   - Similar to backend installation
   - Takes about 2-3 minutes (frontend has more packages)
   - Should end with: "added 200+ packages in 60s"

5. **Success indicators:**
   - ✅ No red error messages
   - ✅ A `node_modules` folder appears in `frontend` directory
   - ✅ Message says "added X packages"

**Summary after this step:**
- ✅ Terminal 1: In `backend` folder, dependencies installed
- ✅ Terminal 2: In `frontend` folder, dependencies installed

---

## 🔑 PHASE 3: GET API KEYS

### **What are API keys?**
API keys are like passwords that let your app connect to external services (database, authentication, etc.)

### **Step 3: Get MongoDB Atlas Connection String**

**What:** MongoDB is your database. Atlas is the cloud hosting for it.

**Why:** To store users and sessions data.

**How:**

1. **Go to MongoDB Atlas:**
   - Open browser
   - Visit: https://www.mongodb.com/cloud/atlas
   - Click "Try Free" or "Sign In"

2. **Create Account (if new):**
   - Sign up with Google (easiest) OR email
   - Verify your email if needed

3. **Create a Cluster (Database):**
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Choose a cloud provider (AWS recommended)
   - Choose a region (closest to you)
   - Cluster Name: Leave default or name it "TalentIQ"
   - Click "Create Cluster"
   - **Wait 3-5 minutes** for cluster to be created

4. **Create Database User:**
   - You'll see a "Security Quickstart" screen
   - OR go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - **Authentication Method:** Password
   - **Username:** `talentiq_user` (or any name you want)
   - **Password:** Click "Autogenerate Secure Password" 
   - **IMPORTANT:** Copy this password and save it somewhere safe!
   - **Database User Privileges:** "Read and write to any database"
   - Click "Add User"

5. **Whitelist Your IP Address:**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - This adds `0.0.0.0/0`
   - Click "Confirm"

6. **Get Connection String:**
   - Go to "Database" in left sidebar
   - Click "Connect" button on your cluster
   - Choose "Connect your application"
   - **Driver:** Node.js
   - **Version:** 4.1 or later
   - Copy the connection string (looks like this):
     ```
     mongodb+srv://talentiq_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - **IMPORTANT:** Replace `<password>` with the actual password you saved earlier
   - **IMPORTANT:** Add `/talentiq` before the `?` to specify database name:
     ```
     mongodb+srv://talentiq_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/talentiq?retryWrites=true&w=majority
     ```

7. **Save this connection string** - you'll need it in Step 5!

---

### **Step 4: Get Clerk API Keys**

**What:** Clerk handles user authentication (sign up, sign in, user management).

**Why:** So users can create accounts and log in securely.

**How:**

1. **Go to Clerk:**
   - Open browser
   - Visit: https://clerk.com
   - Click "Start Building for Free"

2. **Create Account:**
   - Sign up with Google (easiest) OR email
   - Verify your email if needed

3. **Create Application:**
   - Click "Create Application" or "+ Add Application"
   - **Application Name:** "TALENT-IQ"
   - **Choose how users will sign in:**
     - ✅ Email (check this)
     - ✅ Google (optional, but recommended)
     - ✅ GitHub (optional)
   - Click "Create Application"

4. **Get API Keys:**
   - After creation, you'll see your API keys immediately
   - You'll see two keys:
     - **Publishable Key** (starts with `pk_test_`)
     - **Secret Key** (starts with `sk_test_`)
   - **IMPORTANT:** Copy both keys and save them somewhere safe!

5. **Configure Allowed Origins (Important!):**
   - In Clerk Dashboard, go to "API Keys" in left sidebar
   - Scroll down to "Allowed origins"
   - Click "Add origin"
   - Add: `http://localhost:5173` (frontend)
   - Click "Add origin" again
   - Add: `http://localhost:5000` (backend)
   - Click "Save"

6. **Save these keys** - you'll need them in Step 5!

---

## ⚙️ PHASE 4: CONFIGURE ENVIRONMENT VARIABLES

### **What are environment variables?**
Environment variables are settings that your app needs to run. They're stored in `.env` files and kept secret (not committed to Git).

### **Step 5: Configure Backend Environment**

**What:** Tell the backend how to connect to database and authentication.

**Where:** In the `backend` folder.

**How:**

1. **Open the backend folder in File Explorer:**
   ```
   C:\Users\hp\OneDrive\Desktop\TALENT-IQ\backend
   ```

2. **Find the `.env` file:**
   - You should see a file named `.env` (no extension)
   - If you don't see it, make sure "File name extensions" is checked in File Explorer View menu

3. **Open `.env` file:**
   - Right-click on `.env`
   - Choose "Open with" → "Notepad" or "VS Code"

4. **Update the file with your actual values:**

   **Current content:**
   ```env
   PORT=5000
   NODE_ENV=development
   
   DB_URL=mongodb://bhagyasrathore_db_user:Gc6LGtOxlHUMR9pP@cluster0.lroe4jo.mongodb.net/talentiq?retryWrites=true&w=majority&appName=Cluster0
   
   JWT_SECRET=supersecretkey123
   
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   CLIENT_URL=http://localhost:5173
   ```

   **Update to:**
   ```env
   PORT=5000
   NODE_ENV=development
   
   DB_URL=YOUR_MONGODB_CONNECTION_STRING_FROM_STEP_3
   
   JWT_SECRET=supersecretkey123
   
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   
   CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY_FROM_STEP_4
   CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY_FROM_STEP_4
   
   CLIENT_URL=http://localhost:5173
   ```

5. **Replace these values:**
   - `DB_URL`: Paste your MongoDB connection string from Step 3
   - `CLERK_PUBLISHABLE_KEY`: Paste your Clerk publishable key (starts with `pk_test_`)
   - `CLERK_SECRET_KEY`: Paste your Clerk secret key (starts with `sk_test_`)
   - Leave everything else as is for now

6. **Save the file:**
   - Press `Ctrl + S`
   - Close the file

**Example of what it should look like:**
```env
PORT=5000
NODE_ENV=development

DB_URL=mongodb+srv://talentiq_user:MyPassword123@cluster0.abc123.mongodb.net/talentiq?retryWrites=true&w=majority

JWT_SECRET=supersecretkey123

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

CLERK_PUBLISHABLE_KEY=pk_test_Y2xlcmsuZXhhbXBsZS5jb20k
CLERK_SECRET_KEY=sk_test_abcdefghijklmnopqrstuvwxyz123456

CLIENT_URL=http://localhost:5173
```

---

### **Step 6: Configure Frontend Environment**

**What:** Tell the frontend where the backend is and how to authenticate.

**Where:** In the `frontend` folder.

**How:**

1. **Open the frontend folder in File Explorer:**
   ```
   C:\Users\hp\OneDrive\Desktop\TALENT-IQ\frontend
   ```

2. **Find the `.env` file:**
   - You should see a file named `.env`

3. **Open `.env` file:**
   - Right-click on `.env`
   - Choose "Open with" → "Notepad" or "VS Code"

4. **Update the file:**

   **Current content:**
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
   VITE_API_URL=http://localhost:5000/api
   VITE_STREAM_API_KEY=your_stream_api_key_here
   ```

   **Update to:**
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY_FROM_STEP_4
   VITE_API_URL=http://localhost:5000/api
   VITE_STREAM_API_KEY=your_stream_api_key_here
   ```

5. **Replace this value:**
   - `VITE_CLERK_PUBLISHABLE_KEY`: Paste your Clerk publishable key (same one as backend, starts with `pk_test_`)
   - Leave `VITE_API_URL` as is
   - Leave `VITE_STREAM_API_KEY` as is (optional feature)

6. **Save the file:**
   - Press `Ctrl + S`
   - Close the file

**Example:**
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_Y2xlcmsuZXhhbXBsZS5jb20k
VITE_API_URL=http://localhost:5000/api
VITE_STREAM_API_KEY=your_stream_api_key_here
```

---

## 🎮 PHASE 5: RUN THE APPLICATION

### **Step 7: Start the Backend Server**

**What:** Start the Node.js server that handles API requests and database.

**Where:** Terminal 1 (the one in `backend` folder).

**How:**

1. **Go back to Terminal 1** (should still be in `backend` folder)
   - If you closed it, open a new terminal and run:
     ```bash
     cd C:\Users\hp\OneDrive\Desktop\TALENT-IQ\backend
     ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **What you'll see:**
   ```
   [nodemon] starting `node src/server.js`
   Starting server initialization...
   Attempting to connect to database...
   ✅ Connected to MongoDB: cluster0.xxxxx.mongodb.net
   Database connection attempt completed
   Starting Express server on port: 5000
   Server is running on port: 5000
   ```

4. **Success indicators:**
   - ✅ "Server is running on port: 5000"
   - ✅ "Connected to MongoDB"
   - ✅ No red error messages
   - ✅ Terminal stays running (doesn't exit)

5. **Test the backend:**
   - Open browser
   - Go to: http://localhost:5000/health
   - You should see: `{"msg":"api is up and running"}`

**If you see errors:**
- **"MongoDB connection failed"**: Check your DB_URL in backend/.env
- **"Port 5000 already in use"**: Close any other apps using port 5000, or change PORT in .env to 5001
- **"Clerk keys invalid"**: Check your Clerk keys in backend/.env

**IMPORTANT:** Keep this terminal running! Don't close it!

---

### **Step 8: Start the Frontend Development Server**

**What:** Start the React development server that serves your website.

**Where:** Terminal 2 (the one in `frontend` folder).

**How:**

1. **Go back to Terminal 2** (should still be in `frontend` folder)
   - If you closed it, open a new terminal and run:
     ```bash
     cd C:\Users\hp\OneDrive\Desktop\TALENT-IQ\frontend
     ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **What you'll see:**
   ```
   VITE v6.0.7  ready in 500 ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ➜  press h + enter to show help
   ```

4. **Success indicators:**
   - ✅ "VITE ready in X ms"
   - ✅ "Local: http://localhost:5173/"
   - ✅ No red error messages
   - ✅ Terminal stays running

**IMPORTANT:** Keep this terminal running too! Don't close it!

---

## 🌐 PHASE 6: TEST THE APPLICATION

### **Step 9: Open the Application in Browser**

**What:** See your application running!

**How:**

1. **Open your web browser** (Chrome, Edge, Firefox, etc.)

2. **Go to:**
   ```
   http://localhost:5173
   ```

3. **What you should see:**
   - Beautiful landing page with gradient design
   - "TALENT-IQ" logo in top left
   - "Master Coding Interviews Together" heading
   - "Get Started Free" and "Sign In" buttons
   - Features section
   - "How It Works" section

4. **If you see a blank page:**
   - Press `F12` to open Developer Tools
   - Click "Console" tab
   - Look for red error messages
   - Most common: "VITE_CLERK_PUBLISHABLE_KEY is not defined"
   - Solution: Check your frontend/.env file

---

### **Step 10: Test Sign Up**

**What:** Create your first user account.

**How:**

1. **Click "Get Started Free" or "Sign Up" button**

2. **You'll see Clerk's sign-up form:**
   - Email address field
   - Password field
   - OR "Continue with Google" button

3. **Sign up with email:**
   - Enter your email address
   - Enter a password (at least 8 characters)
   - Click "Continue"
   - Check your email for verification code
   - Enter the code
   - Click "Verify"

4. **OR sign up with Google:**
   - Click "Continue with Google"
   - Choose your Google account
   - Allow permissions

5. **Success indicators:**
   - ✅ You're redirected to the Dashboard
   - ✅ You see "Welcome back, [Your Name]!"
   - ✅ You see stats cards (Active Sessions, Recent Sessions, etc.)
   - ✅ Your profile picture appears in top right

---

### **Step 11: Test Creating a Session**

**What:** Create your first coding practice session.

**How:**

1. **From the Dashboard, click "Create New Session"**
   - OR click "+ New Session" in the navbar

2. **Fill out the form:**
   - **Problem Description:** Type something like "Two Sum Problem"
   - **Difficulty:** Click "Medium"
   - Click "Create Session"

3. **What happens:**
   - You're redirected to the Session Room
   - You see the problem name at the top
   - You see "1/2 participants"
   - You see "End Session" button

4. **Success indicators:**
   - ✅ Session room loads
   - ✅ Problem name is displayed
   - ✅ No error messages

---

### **Step 12: Test Viewing Sessions**

**What:** See all active sessions.

**How:**

1. **Click "Sessions" in the navbar**

2. **What you should see:**
   - Your session you just created
   - Session card showing:
     - Problem name
     - Difficulty badge (Medium)
     - Host name (you)
     - Participant count (1/2)
     - "Join Session" button (but you can't join your own)

3. **Test search:**
   - Type in the search box
   - Sessions filter in real-time

4. **Test difficulty filter:**
   - Select "Medium" from dropdown
   - Only medium difficulty sessions show

---

### **Step 13: Test Session History**

**What:** View completed sessions.

**How:**

1. **First, end your session:**
   - Go back to the session room (click on your session)
   - Click "End Session"
   - Click "End Session" in the confirmation dialog

2. **Click "History" in the navbar**

3. **What you should see:**
   - Your completed session
   - Statistics at the top:
     - Total Sessions: 1
     - Easy: 0
     - Medium: 1
     - Hard: 0

---

## ✅ PHASE 7: VERIFICATION CHECKLIST

### **Everything Working?**

Check off each item:

**Backend:**
- [ ] Terminal shows "Server is running on port: 5000"
- [ ] Terminal shows "Connected to MongoDB"
- [ ] http://localhost:5000/health shows success message
- [ ] No red errors in terminal

**Frontend:**
- [ ] Terminal shows "VITE ready"
- [ ] http://localhost:5173 loads the landing page
- [ ] No red errors in terminal
- [ ] No red errors in browser console (F12)

**Authentication:**
- [ ] Can sign up with email
- [ ] Can sign in
- [ ] Dashboard loads after sign in
- [ ] Profile picture shows in navbar

**Features:**
- [ ] Can create a session
- [ ] Can view sessions list
- [ ] Can search sessions
- [ ] Can filter by difficulty
- [ ] Can end a session
- [ ] Can view history

**If all checked:** 🎉 **Congratulations! Your app is working perfectly!**

---

## 🎯 WHAT'S NEXT?

### **Option 1: Keep Developing Locally**
- Make changes to the code
- Test new features
- Learn React and Node.js

### **Option 2: Deploy to Production**
- Read `DEPLOYMENT.md`
- Deploy to Render (free)
- Get a live demo link
- Share with friends!

### **Option 3: Add More Features**
- Add live code editor
- Add video calling (Stream SDK)
- Add more problem categories
- Add user profiles

---

## 🆘 TROUBLESHOOTING

### **Problem: Backend won't start**

**Error: "Cannot find module"**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Error: "Port 5000 already in use"**
- Close any other apps using port 5000
- OR change PORT in backend/.env to 5001

**Error: "MongoDB connection failed"**
- Check DB_URL in backend/.env
- Make sure you replaced `<password>` with actual password
- Check if IP is whitelisted in MongoDB Atlas

---

### **Problem: Frontend won't start**

**Error: "Cannot find module"**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Error: "Port 5173 already in use"**
- Close any other apps using port 5173
- OR the port will auto-increment to 5174

---

### **Problem: Can't sign up**

**Error: "Clerk authentication failed"**
- Check VITE_CLERK_PUBLISHABLE_KEY in frontend/.env
- Check CLERK_PUBLISHABLE_KEY in backend/.env
- Make sure keys start with `pk_test_`
- Clear browser cookies and try again

**Error: "Network error"**
- Make sure backend is running
- Check http://localhost:5000/health works
- Check CLIENT_URL in backend/.env is http://localhost:5173

---

### **Problem: Blank page**

1. Press `F12` to open Developer Tools
2. Click "Console" tab
3. Look for red errors
4. Common issues:
   - Missing VITE_CLERK_PUBLISHABLE_KEY
   - Backend not running
   - Wrong API URL

---

## 📞 NEED MORE HELP?

### **Documentation:**
- `README.md` - Overview
- `QUICKSTART.md` - Fast setup
- `SETUP_GUIDE.md` - Detailed setup
- `FEATURES.md` - All features
- `DEPLOYMENT.md` - Deploy guide

### **Check:**
- Browser console (F12 → Console)
- Backend terminal for errors
- Frontend terminal for errors
- MongoDB Atlas dashboard
- Clerk dashboard

---

## 🎉 SUCCESS!

If you've completed all steps and everything is working:

**You now have:**
- ✅ A fully functional coding interview platform
- ✅ User authentication working
- ✅ Database connected
- ✅ Beautiful UI
- ✅ All features working

**You can:**
- ✅ Create coding sessions
- ✅ Join sessions
- ✅ Track history
- ✅ Deploy to production
- ✅ Add to your portfolio

---

**Congratulations! You're ready to use TALENT-IQ! 🚀**

---

## 📝 QUICK REFERENCE

### **Start the app:**
```bash
# Terminal 1 - Backend
cd C:\Users\hp\OneDrive\Desktop\TALENT-IQ\backend
npm run dev

# Terminal 2 - Frontend
cd C:\Users\hp\OneDrive\Desktop\TALENT-IQ\frontend
npm run dev
```

### **Stop the app:**
- Press `Ctrl + C` in both terminals

### **URLs:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/health

### **Important Files:**
- Backend config: `backend/.env`
- Frontend config: `frontend/.env`
- Backend code: `backend/src/`
- Frontend code: `frontend/src/`

---

*Made with ❤️ for developers learning to build full-stack applications*
