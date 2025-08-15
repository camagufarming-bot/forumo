import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const phoneRegex = /^(?:\+27|0)[6-8][0-9]{8}$/; // SA format simplistic

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3, maxlength: 30, match: /^[a-zA-Z0-9_]+$/ },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  phone: { type: String, validate: { validator: (v) => !v || phoneRegex.test(v), message: "Invalid SA phone" } },
  role: { type: String, enum: ["user", "seller", "admin"], default: "user" },
  avatar: String,
  bio: { type: String, maxlength: 500 },
  location: {
    address: String, city: String, province: String, postalCode: String,
    coordinates: { type: { type: String, enum: ["Point"], default: "Point" }, coordinates: [Number] }
  },
  isVerified: { type: Boolean, default: false },
  sellerVerified: { type: Boolean, default: false },
  twoFAEnabled: { type: Boolean, default: false },
  twoFABackupCodesHash: [String]
}, { timestamps: true });

UserSchema.index({ "location.coordinates": "2dsphere" });

UserSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model("User", UserSchema);
