const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema(
  {
    emailaddress: {
      type: String,
      required: [true, "Please add email address"],
      unique: true, // prevents duplicate emails
    },
    password: {
      type: String,
      required: [true, "Please add password"],
      minlength: 6,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Login", loginSchema);
