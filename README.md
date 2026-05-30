# 🚀 TALENT-IQ

> A modern, full-stack collaborative coding interview platform built with React, Node.js, and MongoDB.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](YOUR_LIVE_DEMO_URL_HERE)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

## 🌐 Live Demo

**[View Live Demo →](YOUR_LIVE_DEMO_URL_HERE)**

Test the application with full functionality including user authentication, session management, and real-time collaboration features.

---

## 📖 Overview

TALENT-IQ is a collaborative platform designed to help developers practice technical interviews with peers. The application provides a seamless experience for creating coding sessions, joining practice rooms, and tracking interview preparation progress.

### Key Features

- 🔐 **Secure Authentication** - User authentication powered by Clerk
- 💼 **Session Management** - Create, join, and manage coding practice sessions
- 🎯 **Difficulty Levels** - Categorize problems by Easy, Medium, and Hard
- 📊 **Progress Tracking** - View session history and statistics
- 🎨 **Modern UI/UX** - Beautiful, responsive design with TailwindCSS
- 🔍 **Search & Filter** - Find sessions by problem name and difficulty
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Clerk** - Authentication and user management
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure token-based authentication
- **Clerk Express** - Server-side authentication middleware

### DevOps & Tools
- **Git** - Version control
- **npm** - Package management
- **ESLint** - Code linting
- **Nodemon** - Development auto-reload

---

## 🏗️ Architecture

```
TALENT-IQ/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context for state management
│   │   └── config/        # API configuration
│   └── public/
│
├── backend/           # Node.js API server
│   └── src/
│       ├── controllers/   # Request handlers
│       ├── models/        # Database models
│       ├── routes/        # API routes
│       ├── middleware/    # Custom middleware
│       └── lib/           # Utility functions
│
└── README.md
```

---

## ✨ Features in Detail

### User Authentication
- Email/password authentication
- Social login support (Google, GitHub)
- Secure session management
- Protected routes and API endpoints

### Session Management
- Create coding practice sessions with problem descriptions
- Set difficulty levels (Easy, Medium, Hard)
- Join available sessions (max 2 participants per session)
- End sessions and mark as completed
- Real-time session status updates

### Dashboard
- Welcome screen with user statistics
- Active sessions overview
- Recent sessions history
- Quick access to create new sessions

### Session Browser
- View all active sessions
- Search sessions by problem name
- Filter by difficulty level
- Real-time availability status
- One-click join functionality

### History & Analytics
- View completed sessions
- Statistics breakdown by difficulty
- Session details and timestamps
- Progress tracking over time

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (free tier)
- Clerk account (free tier)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BhagyaSRathore/Talent-IQ.git
   cd TALENT-IQ
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install --legacy-peer-deps
   ```

3. **Configure environment variables**

   Create `backend/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   DB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLIENT_URL=http://localhost:5173
   ```

   Create `frontend/.env`:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Run the application**

   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```

   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 📸 Screenshots

### Landing Page
Beautiful gradient-based design with clear call-to-action buttons and feature highlights.

### Dashboard
Personalized dashboard showing active sessions, statistics, and quick actions.

### Session Browser
Browse and filter available coding sessions with real-time status updates.

### Session Room
Collaborative space for practicing coding interviews (video/chat features ready for integration).

---

## 🔒 Security Features

- JWT-based authentication
- Secure password hashing
- Protected API routes
- CORS configuration
- Environment variable protection
- Input validation and sanitization

---

## 🎯 API Endpoints

### Authentication
- `GET /api/chat/token` - Get Stream chat token

### Sessions
- `POST /api/sessions` - Create new session
- `GET /api/sessions/active` - Get all active sessions
- `GET /api/sessions/my-recent` - Get user's recent sessions
- `GET /api/sessions/:id` - Get session by ID
- `POST /api/sessions/:id/join` - Join a session
- `POST /api/sessions/:id/end` - End a session

### Health Check
- `GET /health` - Server health status

---

## 🌟 Future Enhancements

- [ ] Live code editor integration (Monaco/CodeMirror)
- [ ] Real-time video calling (Stream SDK)
- [ ] Real-time chat messaging
- [ ] Screen sharing capability
- [ ] Code execution environment
- [ ] Whiteboard for diagrams
- [ ] Session recording and playback
- [ ] Feedback and rating system
- [ ] Email notifications
- [ ] Mobile application

---

## 📊 Performance

- Fast page loads with Vite
- Optimized bundle size
- Efficient database queries with indexing
- Responsive design for all devices
- Smooth animations and transitions

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👤 Author

**Bhagya S Rathore**

- GitHub: [@BhagyaSRathore](https://github.com/BhagyaSRathore)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/your-profile)

---

## 🙏 Acknowledgments

- [Clerk](https://clerk.com) - Authentication
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database
- [TailwindCSS](https://tailwindcss.com) - Styling
- [React](https://react.dev) - Frontend framework
- [Express.js](https://expressjs.com) - Backend framework

---

## 📞 Support

For support, email bhagyasrathore@example.com or open an issue on GitHub.

---

<div align="center">

**[⬆ Back to Top](#-talent-iq)**

Made with ❤️ by Bhagya S Rathore

</div>
