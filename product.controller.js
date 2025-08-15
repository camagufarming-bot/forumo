import { Product } from "../models/Product.js";
import { Inventory } from "../models/Inventory.js";
import { StatusCodes } from "http-status-codes";

export async function createProduct(req, res) {
  const body = req.body;
  body.seller = req.user.id;
  const product = await Product.create(body);
  // seed inventory record
  await Inventory.create({ product: product._id, location: { name: "Default" }, stock: { available: 0 } });
  res.status(StatusCodes.CREATED).json(product);
}

export async function listProducts(req, res) {
  const { q, category, minPrice, maxPrice, condition } = req.query;
  const filter = { status: "active" };
  if (category) filter.category = category;
  if (condition) filter.condition = condition;
  if (minPrice || maxPrice) filter.price = { ...(minPrice && { $gte: +minPrice }), ...(maxPrice && { $lte: +maxPrice }) };
  let query = Product.find(filter).populate("category", "name slug").limit(50).sort("-createdAt");
  if (q) query = query.find({ $text: { $search: q } });
  const items = await query.lean();
  res.json(items);
}

export async function getProduct(req, res) {
  const item = await Product.findById(req.params.id).populate("category", "name slug").lean();
  if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
  res.json(item);
}

export async function updateProduct(req, res) {
  const updated = await Product.findOneAndUpdate({ _id: req.params.id, seller: req.user.id }, req.body, { new: true });
  if (!updated) return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found or no permission" });
  res.json(updated);
}
