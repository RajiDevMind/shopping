const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      sku,
      category,
      brand,
      color,
      quantity,
      sold,
      regularPrice,
      price,
      description,
      image,
      ratings,
    } = req.body;

    // Invalidate empty input
    if (!name || !category || !brand || !quantity || !price || !description) {
      res.status(400);
      throw new Error("Please, fill in all fields");
    }

    // Create product
    const product = await Product.create({
      name,
      sku,
      category,
      brand,
      color,
      quantity,
      sold,
      regularPrice,
      price,
      description,
      image,
      ratings,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500);
    throw new Error("Internal server error!");
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  const product = await Product.find().sort("-createdAt"); // sorting product by date of creations
  res.status(200).json(product);
});

module.exports = { createProduct, getAllProducts };
