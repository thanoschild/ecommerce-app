const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add the name"],
    },
    email: {
      type: String,
      required: [true, "please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "please add the user password"],
    },
    role: {
      type: String
    },
    profileImage: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
