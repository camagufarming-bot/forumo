import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  status: { type: String, enum: ["pending","confirmed","shipped","delivered","cancelled","refunded"], default: "pending" }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [OrderItemSchema],
  shippingAddress: {
    address: String, city: String, province: String, postalCode: String, country: String
  },
  total: Number,
  paymentStatus: { type: String, enum: ["pending","paid","failed","refunded"], default: "pending" },
  tracking: {
    carrier: String, trackingNumber: String, shippedAt: Date, deliveredAt: Date
  },
  escrow: {
    status: { type: String, enum: ["initiated","funded","confirmed","delivered","disputed","released","refunded"], default: "initiated" },
    confirmationCode: String,
    stripePaymentIntentId: String
  }
}, { timestamps: true });

export const Order = mongoose.model("Order", OrderSchema);
