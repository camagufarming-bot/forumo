import rateLimit from "express-rate-limit";

const gen = process.env.RATE_GENERAL_PER_MINUTE ? parseInt(process.env.RATE_GENERAL_PER_MINUTE) : 60;
export const generalLimiter = rateLimit({ windowMs: 60 * 1000, max: gen });

const auth = process.env.RATE_AUTH_ATTEMPTS ? parseInt(process.env.RATE_AUTH_ATTEMPTS) : 10;
export const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: auth });

const create = process.env.RATE_ACCOUNT_CREATIONS_PER_HOUR ? parseInt(process.env.RATE_ACCOUNT_CREATIONS_PER_HOUR) : 3;
export const accountCreateLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: create });
