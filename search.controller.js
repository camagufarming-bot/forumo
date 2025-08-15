import { Product } from "../models/Product.js";

export async function search(req, res) {
  const { q } = req.query;
  const results = await Product.find({ $text: { $search: q } }).limit(20);
  res.json(results);
}

export async function suggest(req, res) {
  const { q } = req.query;
  const suggestions = await Product.find({ title: new RegExp(q, "i") }).select("title").limit(8);
  res.json(suggestions.map(s => s.title));
}
