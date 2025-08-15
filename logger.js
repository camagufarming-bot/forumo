import winston from "winston";
import morgan from "morgan";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()]
});

export const morganStream = {
  write: (message) => logger.info(message.trim())
};
