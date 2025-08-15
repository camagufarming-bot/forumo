import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createIntent, confirmDelivery, refund } from "../controllers/escrow.controller.js";
const router = Router();
router.post("/intent", requireAuth(), createIntent);
router.post("/confirm-delivery", requireAuth(), confirmDelivery);
router.post("/refund", requireAuth(["admin"]), refund);
export default router;
