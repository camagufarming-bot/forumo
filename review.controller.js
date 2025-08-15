import { Review } from "../models/Review.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { StatusCodes } from "http-status-codes";

export async function createReview(req, res) {
  const { product, order, rating, title, content } = req.body;
  const ord = await Order.findOne({ _id: order, buyer: req.user.id, "items.product": product, "items.status": "delivered" });
  if (!ord) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Only delivered purchases can be reviewed" });
  const prod = await Product.findById(product);
  const review = await Review.create({ product, order, rating, title, content, buyer: req.user.id, seller: prod.seller, verified: true });
  res.status(StatusCodes.CREATED).json(review);
}
