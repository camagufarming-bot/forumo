import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createOrder, getMyOrders, updateItemStatus } from "../controllers/order.controller.js";

const router = Router();
router.post("/", requireAuth(), createOrder);
router.get("/me", requireAuth(), getMyOrders);
router.patch("/:orderId/items/:itemId", requireAuth(), updateItemStatus);
export default router;
