import mongoose from "mongoose";

const StockMovementSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  direction: { type: String, enum: ["in","out"], required: true },
  reason: { type: String, enum: ["sale","initial","return","adjustment","transfer"], required: true },
  reference: String,
  metadata: Object,
  at: { type: Date, default: Date.now }
});

export const StockMovement = mongoose.model("StockMovement", StockMovementSchema);
