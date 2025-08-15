import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.js";

export function requireAuth(roles = []) {
  return async (req, res, next) => {
    try {
      const header = req.headers.authorization || "";
      const token = header.startsWith("Bearer ") ? header.slice(7) : null;
      if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No token" });
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.sub);
      if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token" });
      req.user = { id: user._id.toString(), role: user.role };
      if (roles.length && !roles.includes(user.role)) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden" });
      }
      next();
    } catch (e) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
  };
}
