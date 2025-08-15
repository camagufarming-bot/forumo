import { Router } from "express";
import { search, suggest } from "../controllers/search.controller.js";
const router = Router();
router.get("/", search);
router.get("/suggest", suggest);
export default router;
