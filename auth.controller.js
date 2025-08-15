import { validationResult, body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { isStrongPassword } from "../utils/validators.js";
import { StatusCodes } from "http-status-codes";

export const registerValidators = [
  body("username").isLength({ min:3, max:30 }).matches(/^[a-zA-Z0-9_]+$/),
  body("email").isEmail().normalizeEmail(),
  body("password").custom(isStrongPassword),
  body("phone").optional().matches(/^(?:\+27|0)[6-8][0-9]{8}$/)
];

export async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  const { username, email, password, firstName, lastName, phone, role } = req.body;
  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) return res.status(StatusCodes.CONFLICT).json({ message: "User exists" });
  const user = await User.create({ username, email, password, firstName, lastName, phone, role: role || "user" });
  res.status(StatusCodes.CREATED).json({ id: user._id, username: user.username, email: user.email });
}

export const loginValidators = [
  body("email").isEmail().normalizeEmail(),
  body("password").isString().isLength({ min: 6 })
];

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
  const token = jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
  res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
}
