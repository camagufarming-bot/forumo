import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../config/db.js";
import { Category } from "../models/Category.js";

await connectDB();

const cats = [
  { name: "Electronics", slug: "electronics" },
  { name: "Clothing", slug: "clothing" },
  { name: "Home", slug: "home" },
  { name: "Sports", slug: "sports" },
  { name: "Books", slug: "books" },
  { name: "Automotive", slug: "automotive" },
  { name: "Beauty", slug: "beauty" },
  { name: "Other", slug: "other" }
];

await Category.deleteMany({});
await Category.insertMany(cats);
console.log("Seeded categories");
process.exit(0);
