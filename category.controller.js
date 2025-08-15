import { Category } from "../models/Category.js";
import { StatusCodes } from "http-status-codes";

export async function createCategory(req, res) {
  const { name, slug, parent, description, icon } = req.body;
  const cat = await Category.create({ name, slug, parent, description, icon });
  res.status(StatusCodes.CREATED).json(cat);
}
export async function listCategories(req, res) {
  const items = await Category.find().lean();
  res.json(items);
}
