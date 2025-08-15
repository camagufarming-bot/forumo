import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createCategory, listCategories } from "../controllers/category.controller.js";
const router = Router();
router.post("/", requireAuth(["admin"]), createCategory);
router.get("/", listCategories);
export default router;
