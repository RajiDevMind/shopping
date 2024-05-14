const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const Category = require("../models/categoryModel");
const { default: slugify } = require("slugify");

const createBrand = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  if (!name || !category) {
    res.status(400);
    throw new Error("Fill all fields!");
  }
  const categoryExists = await Category.findOne({ name: category });

  if (!categoryExists) {
    res.status(400);
    throw new Error("Parent category not found!");
  }
  // slug as in: "Men fashion" to men-fashion
  const brand = await Brand.create({ name, slug: slugify(name), category });
  return res.status(201).json(brand);
});

const getAllBrands = asyncHandler(async (req, res) => {
  const Brands = await Brand.find().sort("-createdAt"); // sorting product by date of creations
  res.status(200).json(Brands);
});

const deleteBrand = asyncHandler(async (req, res) => {
  // to delete a brand, we find it by its slug not id
  const slug = req.params.slug.toLocaleLowerCase();
  const brand = await Brand.findOneAndDelete({ slug });
  if (!brand) {
    res.status(404);
    throw new Error("brand not found!");
  }
  return res.status(200).json({ msg: "brand deleted successfully!" });
});

module.exports = { createBrand, getAllBrands, deleteBrand };
