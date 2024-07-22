const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "please add the productName"],
    },
    brandName: {
      type: String,
      required: [true, "please add the brandName"],
    },
    category: {
      type: String,
      required: [true, "please add the category"],
    },
    productImage: {
      type: [],
      required: [true, "please add the productImage"],
    },
    description: {
      type: String,
      required: [true, "please add the description"],
    },
    price: {
      type: Number,
      required: [true, "please add the price"],
    },
    sellingPrice: {
      type: Number,
      required: [true, "please add the sellingPrice"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);