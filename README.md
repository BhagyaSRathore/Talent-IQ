# 🚀 TALENT-IQ

> A modern, full-stack collaborative coding interview platform built with React, Node.js, and MongoDB.

[![Live Demo](https://img.shields.io/badge/demo-live-success.svg?style=for-the-badge)](https://talentiq-frontend.onrender.com)
[![GitHub](https://img.shields.io/badge/github-repository-blue.svg?style=for-the-badge&logo=github)](https://github.com/BhagyaSRathore/Talent-IQ)

## 🌐 Live Demo

### **[🚀 View Live Application](https://talentiq-frontend.onrender.com)**

> Click the link above to access the live application. Test all features including user authentication, session creation, and collaboration tools.

**Note:** First load may take 30-60 seconds as the free tier server wakes up.

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
- LinkedIn: [Connect with me](https://linkedin.com/in/bhagya-rathore)

---

## 🙏 Acknowledgments

- [Clerk](https://clerk.com) - Authentication
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database
- [TailwindCSS](https://tailwindcss.com) - Styling
- [React](https://react.dev) - Frontend framework
- [Express.js](https://expressjs.com) - Backend framework

---

## 📞 Support

For support, open an issue on GitHub or contact via LinkedIn.

---

<div align="center">

**[⬆ Back to Top](#-talent-iq)**

Made with ❤️ by Bhagya S Rathore

</div>
