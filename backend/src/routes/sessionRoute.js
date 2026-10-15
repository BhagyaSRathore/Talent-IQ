import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { validateSessionCreation, validateSessionId } from "../middleware/validators.js";
import { strictRateLimiter } from "../middleware/rateLimiter.js";
import {
  createSession,
  endSession,
  getActiveSessions,
  getMyRecentSessions,
  getSessionById,
  joinSession,
} from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", protectRoute, strictRateLimiter, validateSessionCreation, createSession);
router.get("/active", protectRoute, getActiveSessions);
router.get("/my-recent", protectRoute, getMyRecentSessions);

router.get("/:id", protectRoute, validateSessionId, getSessionById);
router.post("/:id/join", protectRoute, strictRateLimiter, validateSessionId, joinSession);
router.post("/:id/end", protectRoute, validateSessionId, endSession);

export default router;