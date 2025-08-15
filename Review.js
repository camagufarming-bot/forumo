import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  title: { type: String, maxlength: 200 },
  content: { type: String, minlength: 10, maxlength: 2000 },
  images: [String],
  verified: { type: Boolean, default: true },
  status: { type: String, enum: ["pending","approved","rejected"], default: "approved" }
}, { timestamps: true });

export const Review = mongoose.model("Review", ReviewSchema);
