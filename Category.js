import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  description: String,
  icon: String
}, { timestamps: true });

export const Category = mongoose.model("Category", CategorySchema);
