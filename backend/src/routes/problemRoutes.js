import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getProblems,
  getProblemBySlug,
  getProblemById,
  getCategories,
  getRandomProblem,
  createProblem,
  updateProblem,
  deleteProblem,
} from "../controllers/problemController.js";

const router = express.Router();

// Public routes (protected by auth but available to all authenticated users)
router.get("/", protectRoute, getProblems);
router.get("/categories", protectRoute, getCategories);
router.get("/random", protectRoute, getRandomProblem);
router.get("/slug/:slug", protectRoute, getProblemBySlug);
router.get("/:id", protectRoute, getProblemById);

// Admin routes (TODO: add admin check middleware)
router.post("/", protectRoute, createProblem);
router.put("/:id", protectRoute, updateProblem);
router.delete("/:id", protectRoute, deleteProblem);

export default router;
