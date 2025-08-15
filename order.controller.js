import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { Inventory } from "../models/Inventory.js";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";

export async function createOrder(req, res) {
  const { items, shippingAddress } = req.body;
  // Build order items and reserve stock
  const orderItems = [];
  let total = 0;
  for (const it of items) {
    const product = await Product.findById(it.product);
    if (!product) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid product" });
    const inv = await Inventory.findOne({ product: product._id, "location.name": "Default" });
    if (!inv || inv.stock.available < it.quantity) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Insufficient stock" });
    inv.stock.available -= it.quantity;
    inv.stock.reserved += it.quantity;
    await inv.save();
    orderItems.push({ product: product._id, seller: product.seller, quantity: it.quantity, price: product.price });
    total += product.price * it.quantity;
  }
  const order = await Order.create({
    orderNumber: uuidv4().slice(0, 8).toUpperCase(),
    buyer: req.user.id,
    items: orderItems,
    shippingAddress,
    total,
    paymentStatus: "pending",
    escrow: { status: "initiated", confirmationCode: Math.floor(100000 + Math.random()*900000).toString() }
  });
  res.status(StatusCodes.CREATED).json(order);
}

export async function getMyOrders(req, res) {
  const orders = await Order.find({ buyer: req.user.id }).sort("-createdAt");
  res.json(orders);
}

export async function updateItemStatus(req, res) {
  const { status } = req.body;
  const order = await Order.findById(req.params.orderId);
  if (!order) return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found" });
  const item = order.items.id(req.params.itemId) || order.items.find(i => i._id.toString() === req.params.itemId);
  if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "Item not found" });
  item.status = status;
  if (status === "delivered") order.escrow.status = "delivered";
  await order.save();
  res.json(order);
}
