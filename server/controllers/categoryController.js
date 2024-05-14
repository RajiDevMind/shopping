const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const { default: slugify } = require("slugify");

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Category name can`t be empty!");
  }
  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    res.status(400);
    throw new Error("Category name already exists!");
  }

  const category = await Category.create({ name, slug: slugify(name) });
  return res.status(201).json(category);
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort("-createdAt"); // sorting product by date of creations
  res.status(200).json(categories);
});

const deleteCategory = asyncHandler(async (req, res) => {
  // to delete a cat, we find it by its slug not id
  const slug = req.params.slug.toLocaleLowerCase();
  const category = await Category.findOneAndDelete({ slug });
  if (!category) {
    res.status(404);
    throw new Error("Category not found!");
  }
  return res.status(200).json({ msg: "Category deleted successfully!" });
});

module.exports = { createCategory, getAllCategories, deleteCategory };
