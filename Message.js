import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  conversationId: { type: String, index: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  text: { type: String, required: true },
  readAt: Date
}, { timestamps: true });

export const Message = mongoose.model("Message", MessageSchema);
