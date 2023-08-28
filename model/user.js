const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    fName: { type: String, required: true, min: 1, max: 30 },
    lName: { type: String, required: true, min: 1, max: 30 },
    userName: { type: String, required: true, min: 3, max: 20, unique: true },
    password: { type: String, required: true, min: 6 },
    email: { type: String, required: true, max: 50, unique: true },
    profilePicture: { type: String },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

exports.User = mongoose.model("User", userSchema);
