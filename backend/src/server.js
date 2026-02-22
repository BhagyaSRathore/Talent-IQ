import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("STREAM_API_KEY:", process.env.STREAM_API_KEY);

console.log("Starting server initialization...");

const app = express();

const __dirname = path.resolve();

// middleware
app.use(express.json());
// credentials:true meaning?? => server allows a browser to include cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

// Only use Clerk middleware if keys are properly configured
if (process.env.CLERK_PUBLISHABLE_KEY && process.env.CLERK_PUBLISHABLE_KEY !== 'your_clerk_publishable_key') {
  app.use(clerkMiddleware()); // this adds auth field to request object: req.auth()
} else {
  console.warn("⚠️  Clerk authentication disabled - using placeholder keys");
}

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  console.log("Attempting to connect to database...");
  try {
    await connectDB();
    console.log("Database connection attempt completed");

    console.log("Starting Express server on port:", ENV.PORT);
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();