import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { apiUsageLogger } from "./middleware/apiUsage.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { authLimiter, accountCreateLimiter, generalLimiter } from "./middleware/ratelimit.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import orderRoutes from "./routes/order.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import searchRoutes from "./routes/search.routes.js";
import escrowRoutes from "./routes/escrow.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";

dotenv.config();
const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(hpp({ whitelist: ["sort", "page", "limit", "category", "minPrice", "maxPrice", "radius"] }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging
import { logger, morganStream } from "./utils/logger.js";
morgan.token("uid", (req) => (req.user ? req.user.id : "anon"));
morgan.token("bodySize", (req) => Buffer.byteLength(JSON.stringify(req.body || {})));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms uid=:uid bodyBytes=:bodySize', { stream: morganStream }));
app.use(apiUsageLogger);

// Rate limits (route-scoped)
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", accountCreateLimiter);
app.use("/api", generalLimiter);

// Routes
app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/escrow", escrowRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/webhooks", webhookRoutes);

// Static for uploads (placeholder in-memory -> real storage in prod)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

import { initJobs } from "./jobs/index.js";

initJobs();

// Errors
app.use(notFound);
app.use(errorHandler);

export default app;
