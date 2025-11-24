const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    lot_id: {
      type: String,
      required: [true, "Please provide the lot ID"],
    },
    user_name: {
      type: String,
      required: [true, "Please provide the user name"],
    },
    from: {
      type: Date,
      required: [true, "Please provide the start time"],
    },
    to: {
      type: Date,
      required: [true, "Please provide the end time"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
