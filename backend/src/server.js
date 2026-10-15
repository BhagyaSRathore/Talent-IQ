import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import { initializeSocket } from "./lib/socket.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import { sanitizeInput } from "./middleware/validators.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import executionRoutes from "./routes/executionRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";

console.log("Starting server initialization...");

const app = express();
const httpServer = createServer(app);

const __dirname = path.resolve();

// Initialize Socket.io
initializeSocket(httpServer);

// Security middleware
app.use(express.json({ limit: '10mb' })); // Limit request body size

// Basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// CORS with credentials
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

// Rate limiting middleware
app.use(rateLimiter);

// Input sanitization
app.use(sanitizeInput);

// Only use Clerk middleware if keys are properly configured
if (process.env.CLERK_PUBLISHABLE_KEY && process.env.CLERK_PUBLISHABLE_KEY !== 'your_clerk_publishable_key') {
  app.use(clerkMiddleware()); // this adds auth field to request object: req.auth()
} else {
  console.warn("⚠️  Clerk authentication disabled - using placeholder keys");
}

// Routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/execute", executionRoutes);
app.use("/api/problems", problemRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: ENV.NODE_ENV
  });
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  // Don't leak error details in production
  if (ENV.NODE_ENV === 'production') {
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error'
    });
  } else {
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      stack: err.stack
    });
  }
});

const startServer = async () => {
  console.log("Attempting to connect to database...");
  try {
    await connectDB();
    console.log("Database connection attempt completed");

    console.log("Starting Express server on port:", ENV.PORT);
    httpServer.listen(ENV.PORT, () => {
      console.log("✅ Server is running on port:", ENV.PORT);
      console.log("✅ Socket.io is ready for real-time connections");
    });
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();
