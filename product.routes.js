import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createProduct, listProducts, getProduct, updateProduct } from "../controllers/product.controller.js";
import { getInventory, adjustStock } from "../controllers/inventory.controller.js";

const router = Router();
router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", requireAuth(["seller","admin"]), createProduct);
router.put("/:id", requireAuth(["seller","admin"]), updateProduct);

// Inventory endpoints
router.get("/:productId/inventory", requireAuth(), getInventory);
router.post("/:productId/inventory/adjust", requireAuth(["seller","admin"]), adjustStock);

export default router;
