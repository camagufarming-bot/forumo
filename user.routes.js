import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { me, updateProfile, listUsers } from "../controllers/user.controller.js";
const router = Router();
router.get("/me", requireAuth(), me);
router.put("/me", requireAuth(), updateProfile);
router.get("/", requireAuth(["admin"]), listUsers);
export default router;
