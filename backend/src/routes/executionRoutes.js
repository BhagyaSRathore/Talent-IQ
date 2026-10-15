import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { strictRateLimiter } from "../middleware/rateLimiter.js";
import {
  runCode,
  submitCode,
  getSubmissions,
  getUserSubmissions,
} from "../controllers/executionController.js";

const router = express.Router();

// Run code without saving (for testing)
router.post("/run", protectRoute, strictRateLimiter, runCode);

// Submit code and save to database
router.post("/submit", protectRoute, strictRateLimiter, submitCode);

// Get submissions for a specific session
router.get("/submissions/:sessionId", protectRoute, getSubmissions);

// Get user's submission history
router.get("/my-submissions", protectRoute, getUserSubmissions);

export default router;
