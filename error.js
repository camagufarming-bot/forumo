import { StatusCodes } from "http-status-codes";
import { logger } from "../utils/logger.js";

export function notFound(req, res, next) {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Route not found" });
}

export function errorHandler(err, req, res, next) {
  logger.error("Unhandled error", { err: err.message, stack: err.stack });
  const status = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(status).json({ message: err.message || "Server error" });
}
