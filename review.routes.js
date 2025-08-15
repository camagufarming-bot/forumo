import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createReview } from "../controllers/review.controller.js";
const router = Router();
router.post("/", requireAuth(), createReview);
export default router;
