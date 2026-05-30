# 🚀 TALENT-IQ - Collaborative Coding Interview Platform

A modern, full-stack web application for practicing technical interviews with peers through real-time video calls, live coding, and instant messaging.

![TALENT-IQ](https://img.shields.io/badge/TALENT--IQ-v1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)

## ✨ Features

### 🎯 Core Features
- **User Authentication** - Secure authentication powered by Clerk
- **Session Management** - Create, join, and manage coding practice sessions
- **Real-time Collaboration** - Video calls and chat (Stream SDK integration)
- **Difficulty Levels** - Easy, Medium, and Hard problem categorization
- **Session History** - Track your practice sessions and progress
- **Responsive Design** - Beautiful UI that works on all devices

### 🎨 UI/UX Enhancements
- Modern gradient-based design system
- Smooth animations and transitions
- Intuitive navigation with React Router
- Loading states and error handling
- Mobile-responsive layout
- Dark mode session room interface

### 🔧 Technical Features
- RESTful API architecture
- MongoDB database with Mongoose ODM
- JWT-based authentication
- CORS-enabled backend
- Environment-based configuration
- Production-ready build setup

## 🏗️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **React Router DOM** - Client-side routing
- **Clerk** - Authentication and user management
- **Axios** - HTTP client
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Clerk Express** - Server-side authentication
- **Stream SDK** - Video and chat infrastructure
- **Inngest** - Background job processing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/BhagyaSRathore/Talent-IQ.git
cd TALENT-IQ
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development

# MongoDB Connection
DB_URL=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stream API (for video/chat)
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Inngest (for background jobs)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000/api
VITE_STREAM_API_KEY=your_stream_api_key
```

### 4. Run the Application

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

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

## 🔑 Getting API Keys

### Clerk (Authentication)
1. Go to [clerk.com](https://clerk.com)
2. Create a free account
3. Create a new application
4. Copy the Publishable Key and Secret Key
5. Add them to your `.env` files

### MongoDB Atlas (Database)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Add it to `backend/.env` as `DB_URL`

### Stream (Video & Chat) - Optional
1. Go to [getstream.io](https://getstream.io)
2. Create a free account
3. Create a new app
4. Copy API Key and Secret
5. Add them to your `.env` files

### Inngest (Background Jobs) - Optional
1. Go to [inngest.com](https://www.inngest.com)
2. Create a free account
3. Get your Event Key and Signing Key
4. Add them to `backend/.env`

## 📁 Project Structure

```
TALENT-IQ/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   ├── lib/              # Utilities (DB, Stream, etc.)
│   │   └── server.js         # Entry point
│   ├── .env                  # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React context
│   │   ├── config/           # API configuration
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── .env                  # Environment variables
│   ├── tailwind.config.js    # Tailwind configuration
│   └── package.json
│
└── README.md
```

## 🎯 Usage Guide

### Creating a Session
1. Sign up or log in to your account
2. Click "Create New Session" from the dashboard
3. Enter a problem description
4. Select difficulty level (Easy/Medium/Hard)
5. Click "Create Session"
6. Wait for another user to join

### Joining a Session
1. Navigate to "Sessions" from the navbar
2. Browse available active sessions
3. Use filters to find sessions by difficulty
4. Click "Join Session" on any available session
5. Start collaborating!

### Ending a Session
1. Click "End Session" button in the session room
2. Confirm the action
3. Session will be marked as completed
4. View it later in your history

## 🔧 Available Scripts

### Backend
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Root
```bash
npm run build    # Install dependencies and build frontend
npm start        # Start production server
```

## 🌐 Deployment

### Deploy to Render/Railway/Heroku

1. **Prepare for deployment:**
   ```bash
   npm run build
   ```

2. **Set environment variables** on your hosting platform

3. **Deploy:**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set start command: `npm start`
   - Add all environment variables

### Deploy Frontend to Vercel/Netlify

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy the `dist` folder**

3. **Set environment variables:**
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_API_URL` (your backend URL)
   - `VITE_STREAM_API_KEY`

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify all environment variables are set
- Check if port 5000 is available

### Frontend won't start
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if port 5173 is available
- Verify Clerk publishable key is set

### Authentication not working
- Verify Clerk keys are correct
- Check if CLIENT_URL in backend matches frontend URL
- Clear browser cookies and try again

### Database connection failed
- Check MongoDB connection string
- Verify database user has correct permissions
- Check if IP address is whitelisted (for Atlas)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **Bhagya S Rathore** - [GitHub](https://github.com/BhagyaSRathore)

## 🙏 Acknowledgments

- [Clerk](https://clerk.com) - Authentication
- [Stream](https://getstream.io) - Video & Chat
- [MongoDB](https://www.mongodb.com) - Database
- [TailwindCSS](https://tailwindcss.com) - Styling
- [Lucide](https://lucide.dev) - Icons

## 📧 Support

For support, email bhagyasrathore@example.com or open an issue on GitHub.

---

Made with ❤️ by the TALENT-IQ Team
