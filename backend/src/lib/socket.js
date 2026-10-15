import { Server } from "socket.io";
import { ENV } from "./env.js";

let io = null;

// Store active sessions and their participants
const activeSessions = new Map();

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ENV.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join a session room
    socket.on("join-session", ({ sessionId, userId, userName }) => {
      console.log(`User ${userName} joining session ${sessionId}`);
      
      socket.join(sessionId);
      
      // Track session participants
      if (!activeSessions.has(sessionId)) {
        activeSessions.set(sessionId, new Set());
      }
      activeSessions.get(sessionId).add({ socketId: socket.id, userId, userName });

      // Notify others in the room
      socket.to(sessionId).emit("user-joined", { 
        userId, 
        userName,
        timestamp: new Date().toISOString()
      });

      // Send current participants to the new user
      const participants = Array.from(activeSessions.get(sessionId) || []);
      socket.emit("current-participants", participants);

      console.log(`Session ${sessionId} participants:`, participants.length);
    });

    // Code change events
    socket.on("code-change", ({ sessionId, code, language }) => {
      socket.to(sessionId).emit("code-update", { code, language });
    });

    // Cursor position events
    socket.on("cursor-change", ({ sessionId, position, userId, userName }) => {
      socket.to(sessionId).emit("cursor-update", { position, userId, userName });
    });

    // Language change events
    socket.on("language-change", ({ sessionId, language }) => {
      socket.to(sessionId).emit("language-update", { language });
    });

    // Code execution events
    socket.on("code-execution", ({ sessionId, userId, userName }) => {
      socket.to(sessionId).emit("execution-started", { userId, userName });
    });

    // Leave session
    socket.on("leave-session", ({ sessionId, userId }) => {
      console.log(`User ${userId} leaving session ${sessionId}`);
      socket.leave(sessionId);
      
      // Remove from participants
      const session = activeSessions.get(sessionId);
      if (session) {
        const updated = new Set(
          Array.from(session).filter(p => p.socketId !== socket.id)
        );
        if (updated.size === 0) {
          activeSessions.delete(sessionId);
        } else {
          activeSessions.set(sessionId, updated);
        }
      }

      socket.to(sessionId).emit("user-left", { userId });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      
      // Remove from all sessions
      activeSessions.forEach((participants, sessionId) => {
        const user = Array.from(participants).find(p => p.socketId === socket.id);
        if (user) {
          participants.delete(user);
          socket.to(sessionId).emit("user-left", { userId: user.userId });
          
          if (participants.size === 0) {
            activeSessions.delete(sessionId);
          }
        }
      });
    });
  });

  console.log("Socket.io initialized successfully");
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
