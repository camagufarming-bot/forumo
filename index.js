import { Message } from "../models/Message.js";

export function initSocket(io) {
  io.on("connection", (socket) => {
    socket.on("join", (conversationId) => socket.join(conversationId));
    socket.on("typing", ({ conversationId, from }) => socket.to(conversationId).emit("typing", { from }));
    socket.on("message", async (data) => {
      const msg = await Message.create(data);
      io.to(data.conversationId).emit("message", msg);
    });
  });
}
