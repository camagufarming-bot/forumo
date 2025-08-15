import mongoose from "mongoose";

const StockLevelSchema = new mongoose.Schema({
  available: { type: Number, default: 0 },
  reserved: { type: Number, default: 0 },
  damaged: { type: Number, default: 0 },
  quarantined: { type: Number, default: 0 },
  onOrder: { type: Number, default: 0 }
}, { _id: false });

const LotSchema = new mongoose.Schema({
  lotNumber: String,
  expiryDate: Date,
  quantity: Number
}, { _id: false });

const LocationSchema = new mongoose.Schema({
  name: String,
  address: String
}, { _id: false });

const InventorySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  location: LocationSchema,
  stock: StockLevelSchema,
  lots: [LotSchema],
  serialNumbers: [String],
  reorderPoint: { type: Number, default: 0 }
}, { timestamps: true });

InventorySchema.index({ product: 1, "location.name": 1 }, { unique: true });

export const Inventory = mongoose.model("Inventory", InventorySchema);
