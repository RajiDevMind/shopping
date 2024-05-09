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

const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product Not Found!");
  }
  res.status(200).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error("Product Not Found!");
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ msg: "Deleted Successfully!" });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error!");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
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
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found!");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      { id },
      {
        name,
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
      },
      {
        // Ensure to validate model required statement
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error!");
  }
});

const reviewProduct = asyncHandler(async (req, res) => {
  const { star, review, reviewDate } = req.body;
  const { id } = req.params;

  if (star < 1 || !review) {
    return res.status(400).json({ error: "Click on star to review!" });
  }

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ error: "Unable to find product" });
  }
  // Update ratings
  product.ratings.push({
    star,
    review,
    reviewDate,
    name: req.user.name,
    userID: req.user._id,
  });

  await product.save(); // Waiting for the product to be saved before proceeding to the next operation

  return res.status(201).json({
    product: {
      msg: "Product Successfully Reviewed!",
      product: product.ratings,
    },
  });
});

const deleteReview = asyncHandler(async (req, res) => {
  const { userID } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found!");
  }

  const filterRating = product.ratings.filter((rating) => {
    return rating.userID.toString() !== userID.toString();
  });
  product.ratings = filterRating;
  await product.save();
  res.status(200).json({ msg: "Review was deleted successfully!" });
});

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
};
