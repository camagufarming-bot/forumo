import { Router } from "express";
const router = Router();
// Placeholder for Stripe webhooks etc.
router.post("/stripe", (req, res) => res.json({ received: true }));
export default router;
