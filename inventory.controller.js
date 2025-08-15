import { Inventory } from "../models/Inventory.js";
import { StockMovement } from "../models/StockMovement.js";
import { StatusCodes } from "http-status-codes";

export async function getInventory(req, res) {
  const records = await Inventory.find({ product: req.params.productId }).lean();
  res.json(records);
}

export async function adjustStock(req, res) {
  const { quantity, reason, direction } = req.body;
  const inv = await Inventory.findOne({ product: req.params.productId, "location.name": "Default" });
  if (!inv) return res.status(StatusCodes.NOT_FOUND).json({ message: "Inventory not found" });
  if (direction === "in") inv.stock.available += quantity;
  if (direction === "out") inv.stock.available = Math.max(0, inv.stock.available - quantity);
  await inv.save();
  await StockMovement.create({ product: inv.product, quantity, reason, direction, reference: `manual:${req.user.id}` });
  res.json(inv);
}
