# 🚀 TALENT-IQ

> A modern, full-stack collaborative coding interview platform built with React, Node.js, and MongoDB.

[![Live Demo](https://img.shields.io/badge/demo-live-success.svg?style=for-the-badge)](https://talentiq-frontend-jjsx.onrender.com)
[![GitHub](https://img.shields.io/badge/github-repository-blue.svg?style=for-the-badge&logo=github)](https://github.com/BhagyaSRathore/Talent-IQ)

## 🌐 Live Demo

### **[🚀 View Live Application](https://talentiq-frontend-jjsx.onrender.com)**

> Experience the full-featured platform with user authentication, session management, and real-time collaboration tools.

**Note:** Initial load may take 30-60 seconds as the server initializes on the free tier.

---

## 📖 Overview

TALENT-IQ is a full-stack collaborative coding interview platform that enables developers to practice technical interviews with peers in real-time. Built with modern web technologies, it provides an intuitive interface for creating practice sessions, managing collaborative coding rooms, and tracking interview preparation progress.

### Key Features

- 🔐 **Secure Authentication** - Enterprise-grade user authentication powered by Clerk
- 💼 **Session Management** - Create, join, and manage coding practice sessions with real-time updates
- 🎯 **Difficulty Levels** - Organize problems by Easy, Medium, and Hard difficulty ratings
- 📊 **Progress Tracking** - Comprehensive session history and performance statistics dashboard
- 🎨 **Modern UI/UX** - Responsive design with smooth animations and gradient aesthetics using TailwindCSS
- 🔍 **Advanced Search & Filter** - Quickly find sessions by problem name and difficulty level
- 📱 **Cross-Platform Responsive** - Optimized experience across desktop, tablet, and mobile devices
- ⚡ **Real-time Updates** - Live session status and availability tracking

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern component-based UI library with hooks and concurrent features
- **React Router v6** - Declarative client-side routing with protected routes
- **TailwindCSS** - Utility-first CSS framework for rapid UI development
- **Axios** - Promise-based HTTP client for API communication
- **Clerk React** - Complete authentication solution with social login support
- **Vite** - Next-generation frontend build tool with lightning-fast HMR

### Backend
- **Node.js** - JavaScript runtime built on Chrome's V8 engine
- **Express.js** - Minimal and flexible web application framework
- **MongoDB Atlas** - Cloud-hosted NoSQL database with high availability
- **Mongoose** - Elegant MongoDB object modeling with schema validation
- **Clerk Express SDK** - Server-side authentication middleware and user management
- **CORS** - Cross-origin resource sharing configuration

### DevOps & Deployment
- **Render** - Cloud platform for hosting frontend and backend services
- **Git & GitHub** - Version control and collaborative development
- **npm** - Package management and dependency resolution
- **ESLint** - Static code analysis for identifying problematic patterns
- **Nodemon** - Development utility for auto-restarting server

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

### User Authentication & Authorization
- Secure email/password authentication with encrypted credentials
- Social login integration (Google, GitHub, and more)
- Persistent session management with automatic token refresh
- Protected routes and API endpoints with middleware validation
- User profile management and customization

### Session Management System
- Create coding practice sessions with detailed problem descriptions
- Categorize sessions by difficulty level (Easy, Medium, Hard)
- Join available sessions with automatic capacity management (max 2 participants)
- End sessions and mark as completed with timestamp tracking
- Real-time session status updates and availability indicators
- Session ownership and participant tracking

### Interactive Dashboard
- Personalized welcome screen with user-specific statistics
- Overview of active sessions with quick access
- Recent sessions history with filtering capabilities
- Performance metrics and progress visualization
- Quick action buttons for creating and joining sessions

### Session Browser & Discovery
- Browse all active sessions with pagination support
- Real-time search functionality by problem name
- Multi-level filtering by difficulty (Easy, Medium, Hard, All)
- Live availability status indicators
- One-click join functionality with validation
- Responsive card-based layout for optimal viewing

### History & Analytics
- Comprehensive view of completed sessions
- Statistics breakdown by difficulty level
- Detailed session information including timestamps and participants
- Progress tracking over time with visual indicators
- Export capabilities for personal records

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

## 🔒 Security & Best Practices

- **Authentication**: Enterprise-grade authentication with Clerk SDK
- **Authorization**: Role-based access control for API endpoints
- **Data Protection**: Secure password hashing and encryption
- **API Security**: Protected routes with JWT validation middleware
- **CORS Configuration**: Controlled cross-origin resource sharing
- **Environment Variables**: Sensitive data protection with .env files
- **Input Validation**: Server-side validation and sanitization
- **Error Handling**: Comprehensive error handling without exposing sensitive information
- **Database Security**: MongoDB connection with authentication and encryption

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

## 🌟 Roadmap & Future Enhancements

### Phase 1 (Planned)
- [ ] Live code editor integration with syntax highlighting (Monaco Editor)
- [ ] Real-time collaborative editing with operational transformation
- [ ] Code execution environment with multiple language support

### Phase 2 (Planned)
- [ ] Video calling integration using WebRTC or Stream SDK
- [ ] Real-time chat messaging with typing indicators
- [ ] Screen sharing capability for better collaboration

### Phase 3 (Planned)
- [ ] Interactive whiteboard for system design discussions
- [ ] Session recording and playback functionality
- [ ] AI-powered code review and feedback system

### Phase 4 (Planned)
- [ ] Peer rating and feedback system
- [ ] Email notifications for session invites and updates
- [ ] Mobile application (React Native)
- [ ] Advanced analytics and insights dashboard

---

## 📊 Performance & Optimization

- **Fast Build Times**: Vite's lightning-fast HMR for instant feedback during development
- **Optimized Bundles**: Code splitting and tree shaking for minimal bundle sizes
- **Database Optimization**: Indexed queries and efficient data modeling with Mongoose
- **Responsive Design**: Mobile-first approach with TailwindCSS utilities
- **Smooth Animations**: Hardware-accelerated CSS transitions and transforms
- **Lazy Loading**: Component-level code splitting for faster initial loads
- **Caching Strategy**: Efficient API response caching for improved performance

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
