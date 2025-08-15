import { Message } from "../models/Message.js";
import { StatusCodes } from "http-status-codes";

export async function listMessages(req, res) {
  const { conversationId, page=1 } = req.query;
  const limit = 30;
  const skip = (parseInt(page)-1) * limit;
  const msgs = await Message.find({ conversationId }).sort("-createdAt").skip(skip).limit(limit).lean();
  res.json(msgs.reverse());
}

export async function sendMessage(req, res) {
  const { to, text, conversationId, product, order } = req.body;
  const message = await Message.create({ conversationId, from: req.user.id, to, text, product, order });
  res.status(StatusCodes.CREATED).json(message);
}
