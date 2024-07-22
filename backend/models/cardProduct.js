const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    productId: {
      ref: 'product',
      type: String,
      required: [true, "please add the productId"],
    },
    quantity: {
        type: Number,
        required: [true, "please add the quantity"],
    },
    userId: {
        type: String,
        required: [true, "please add the userId"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cartSchema);