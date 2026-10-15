# TALENT-IQ

A collaborative coding interview practice platform enabling developers to conduct technical interviews in real-time with live video, chat, and code execution.

## Overview

TALENT-IQ provides an integrated environment for practicing coding interviews with peers. The platform combines secure authentication, real-time collaboration tools, and a curated problem set across multiple difficulty levels.

**Live Demo:** [https://talentiq-frontend-jjsx.onrender.com](https://talentiq-frontend-jjsx.onrender.com)  
*Note: Initial load may take 30-60 seconds on free hosting tier.*

## Features

**Session Management**
- Create and join practice sessions with problem descriptions
- Sessions organized by difficulty (Easy, Medium, Hard)
- Automatic capacity management (maximum 2 participants)
- Real-time session status and availability tracking

**Real-Time Collaboration**
- Live code editor with Monaco Editor and syntax highlighting
- Multi-language support (JavaScript, Python, Java, C++, Go)
- Real-time collaborative editing with Yjs and WebSocket sync
- Video calling via Stream Video SDK
- Integrated chat using Stream Chat SDK
- Socket.io for presence and cursor tracking

**Code Execution**
- Remote code execution through Judge0 API
- Support for multiple programming languages
- Real-time output console with error handling
- Submission history and tracking

**User Interface**
- Dashboard with session statistics and quick actions
- Session browser with search and filtering
- Comprehensive history view with completion tracking
- Light and dark theme support with persistent preferences
- Fully responsive design for mobile and desktop

## Technology Stack

**Frontend**
- React 18 with Vite for fast development and builds
- React Router v6 for client-side routing
- TailwindCSS for utility-first styling
- Monaco Editor for code editing
- Stream Video and Chat React SDKs
- Socket.io Client for real-time events
- Yjs for collaborative editing synchronization
- Clerk React for authentication

**Backend**
- Node.js with Express 5
- MongoDB Atlas with Mongoose ODM
- Socket.io for WebSocket communication
- Stream Node SDK for video/chat token generation
- Clerk Express SDK for authentication middleware
- Judge0 integration for code execution
- Helmet and express-mongo-sanitize for security
- Express Rate Limit and Validator for request validation

## Project Structure

```
TALENT-IQ/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ChatPanel.jsx       # Stream Chat integration
│   │   │   ├── CodeEditor.jsx      # Monaco + Yjs collaborative editor
│   │   │   ├── VideoCall.jsx       # Stream Video integration
│   │   │   ├── OutputConsole.jsx   # Code execution output
│   │   │   └── ...
│   │   ├── pages/             # Route pages
│   │   │   ├── Dashboard.jsx       # User dashboard
│   │   │   ├── SessionRoom.jsx     # Collaborative workspace
│   │   │   ├── Sessions.jsx        # Browse sessions
│   │   │   └── History.jsx         # Session history
│   │   ├── context/           # React Context providers
│   │   │   ├── SessionContext.jsx  # Session state management
│   │   │   └── ThemeContext.jsx    # Theme state
│   │   └── config/            # API configuration
│   └── index.html             # Entry point
│
├── backend/
│   └── src/
│       ├── controllers/       # Request handlers
│       │   ├── sessionController.js
│       │   ├── problemController.js
│       │   ├── executionController.js
│       │   └── chatController.js
│       ├── models/            # Mongoose schemas
│       │   ├── Session.js
│       │   ├── Problem.js
│       │   ├── Submission.js
│       │   └── User.js
│       ├── routes/            # Express routes
│       ├── middleware/        # Auth and validation
│       ├── lib/               # Database, Socket.io, Stream
│       └── server.js          # Application entry point
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account
- Clerk account (authentication)
- Stream account (video/chat)
- Judge0 API key (code execution)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BhagyaSRathore/Talent-IQ.git
   cd Talent-IQ
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**

   Backend (`backend/.env`):
   ```env
   PORT=5000
   NODE_ENV=development
   
   # MongoDB
   DB_URL=mongodb+srv://username:password@cluster.mongodb.net/talentiq
   
   # Clerk Authentication
   CLERK_PUBLISHABLE_KEY=pk_test_your_key
   CLERK_SECRET_KEY=sk_test_your_key
   
   # Stream SDK
   STREAM_API_KEY=your_stream_key
   STREAM_API_SECRET=your_stream_secret
   
   # Judge0 (Optional)
   JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
   RAPIDAPI_KEY=your_rapidapi_key
   
   # CORS
   CLIENT_URL=http://localhost:5173
   
   # JWT
   JWT_SECRET=your_secure_random_secret_minimum_32_chars
   ```

   Frontend (`frontend/.env`):
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key
   VITE_API_URL=http://localhost:5000/api
   VITE_STREAM_API_KEY=your_stream_key
   ```

   See `.env.example` files in both directories for detailed setup instructions.

4. **Seed the database** (optional)
   ```bash
   cd backend
   npm run seed:problems
   ```

5. **Start the development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## API Endpoints

### Sessions
- `POST /api/sessions` - Create session
- `GET /api/sessions/active` - Get active sessions
- `GET /api/sessions/my-recent` - Get user's recent sessions
- `GET /api/sessions/:id` - Get session by ID
- `POST /api/sessions/:id/join` - Join session
- `POST /api/sessions/:id/end` - End session

### Problems
- `GET /api/problems` - List all problems
- `GET /api/problems/random` - Get random problem
- `GET /api/problems/:id` - Get problem by ID
- `GET /api/problems/categories` - Get problem categories

### Code Execution
- `POST /api/execute/run` - Run code without saving
- `POST /api/execute/submit` - Submit and save code
- `GET /api/execute/submissions/:sessionId` - Get session submissions

### Chat & Video
- `GET /api/chat/token` - Get Stream authentication token

## Security Features

- Clerk-based authentication with JWT validation
- Rate limiting on API endpoints (stricter limits on code execution)
- MongoDB query sanitization to prevent injection
- Helmet.js security headers
- CORS configuration with credential support
- Input validation and sanitization middleware
- Secure environment variable management

## Current Limitations

- **Code execution requires Judge0 API key**: Without it, code can be written collaboratively but not executed
- **Video/chat requires Stream API keys**: Platform works without them, but video and chat features will be disabled
- **Session cleanup**: No automatic cleanup of abandoned sessions (manual deletion required)
- **Whiteboard**: Not yet implemented
- **Session recordings**: Not currently supported

## Deployment

The application is configured for deployment on Render:

- **Frontend**: Static site with Vite build
- **Backend**: Node.js service with MongoDB Atlas connection
- **Build command**: `npm run build`
- **Start command**: `npm start`

See `render.yaml` for complete deployment configuration.

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request with a clear description of changes.

## License

ISC License

## Author

**Bhagya S Rathore**  
GitHub: [@BhagyaSRathore](https://github.com/BhagyaSRathore)

## Acknowledgments

- [Clerk](https://clerk.com) - Authentication
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database hosting
- [Stream](https://getstream.io) - Video and chat infrastructure
- [Judge0](https://judge0.com) - Code execution API
- [Yjs](https://docs.yjs.dev) - Real-time collaboration framework
