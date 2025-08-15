import { Order } from "../models/Order.js";
import { createPaymentIntent, refundPayment } from "../services/payment.service.js";
import { StatusCodes } from "http-status-codes";

export async function createIntent(req, res) {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  if (!order || order.buyer.toString() !== req.user.id) return res.status(StatusCodes.FORBIDDEN).json({ message: "No access" });
  const pi = await createPaymentIntent(Math.round(order.total * 100), "zar", { orderId });
  order.escrow.status = "funded";
  order.escrow.stripePaymentIntentId = pi.id;
  await order.save();
  res.json({ clientSecret: pi.client_secret });
}

export async function confirmDelivery(req, res) {
  const { orderId, code } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found" });
  if (order.escrow.confirmationCode !== code) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid code" });
  order.escrow.status = "released";
  order.paymentStatus = "paid";
  await order.save();
  res.json(order);
}

export async function refund(req, res) {
  const { orderId, amount } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found" });
  await refundPayment(order.escrow.stripePaymentIntentId, Math.round(amount * 100));
  order.paymentStatus = "refunded";
  order.escrow.status = "refunded";
  await order.save();
  res.json(order);
}
