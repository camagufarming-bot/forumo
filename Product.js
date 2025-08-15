import mongoose from "mongoose";

const DeliveryOptionSchema = new mongoose.Schema({
  type: { type: String, enum: ["pickup", "local_delivery", "courier"], required: true },
  cost: { type: Number, default: 0 },
  etaDays: Number
}, { _id: false });

const SpecSchema = new mongoose.Schema({ key: String, value: String }, { _id: false });

const ProductSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  condition: { type: String, enum: ["new","like-new","good","fair","poor"], default: "good" },
  images: [{ url: String, primary: { type: Boolean, default: false } }],
  tags: [String],
  specifications: [SpecSchema],
  location: {
    address: String, city: String, province: String, postalCode: String,
    coordinates: { type: { type: String, enum: ["Point"], default: "Point" }, coordinates: [Number] }
  },
  deliveryOptions: [DeliveryOptionSchema],
  status: { type: String, enum: ["active","draft","inactive","out_of_stock"], default: "active" },
  featured: { type: Boolean, default: false },
  promoted: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },

  // Inventory flags
  inventoryTracking: { type: Boolean, default: true },
  allowBackorder: { type: Boolean, default: false },
  allowPreorder: { type: Boolean, default: false },
  lowStockThreshold: { type: Number, default: 1 }
}, { timestamps: true });

ProductSchema.index({ title: "text", description: "text", tags: "text" });

export const Product = mongoose.model("Product", ProductSchema);
