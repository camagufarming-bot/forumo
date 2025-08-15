import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { listMessages, sendMessage } from "../controllers/chat.controller.js";
const router = Router();
router.get("/", requireAuth(), listMessages);
router.post("/", requireAuth(), sendMessage);
export default router;
