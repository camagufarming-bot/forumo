import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "../utils/logger.js";
dotenv.config();

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI missing");
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { autoIndex: true });
  logger.info("Connected to MongoDB");
}
