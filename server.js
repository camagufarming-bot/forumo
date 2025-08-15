import http from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./src/app.js";
import { initSocket } from "./src/socket/index.js";
import { connectDB } from "./src/config/db.js";
import { logger } from "./src/utils/logger.js";

const port = process.env.PORT || 4000;
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  }
});
initSocket(io);

connectDB().then(() => {
  server.listen(port, () => logger.info(`Forumo API listening on :${port}`));
}).catch((err) => {
  logger.error("Failed to start server", { err });
  process.exit(1);
});
