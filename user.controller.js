import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.js";

export async function me(req, res) {
  const user = await User.findById(req.user.id).select("-password -twoFABackupCodesHash");
  res.json(user);
}

export async function updateProfile(req, res) {
  const { firstName, lastName, bio, phone, location } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { firstName, lastName, bio, phone, location }, { new: true });
  res.json(user);
}

export async function listUsers(req, res) {
  const users = await User.find().select("username email role createdAt");
  res.json(users);
}
