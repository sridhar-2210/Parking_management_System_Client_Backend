const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    lot_id: {
      type: String,
      required: [true, "Please provide the lot ID"],
    },
    user_name: {
      type: String,
      required: [true, "Please provide the user name"],
    },
    comment: {
      type: String,
      required: [true, "Please provide a comment"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: 1,
      max: 5,
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

module.exports = mongoose.model("review", reviewSchema);
