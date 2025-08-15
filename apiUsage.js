import { logger } from "../utils/logger.js";

export function apiUsageLogger(req, res, next) {
  const info = {
    path: req.path,
    method: req.method,
    ip: req.ip,
    ua: req.headers['user-agent'],
    uid: req.user?.id || null
  };
  logger.info("API", info);
  next();
}
