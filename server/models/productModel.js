const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name Can`t be empty!"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU", // Stock Keeping Unit
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Add category for your product?"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Add a brand name for your product?"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Add color type for your product?"],
      default: "As Seen",
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Add available quantity for your product?"],
      trim: true,
    },
    sold: {
      type: Number,
      default: 0,
      trim: true,
    },
    regularPrice: {
      type: Number,
      // required: [true, "Add price for your product"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Add price for your product"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Add description for your product"],
      trim: true,
    },
    image: { type: [String] },
    ratings: { type: { Object } },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
