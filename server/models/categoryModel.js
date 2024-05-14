const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: "Ctegory name is required?",
      minLenght: [2, "Category name, too short"],
      maxLenght: [32, "Category name, too loong"],
    },
    // Creating a slug, A slug is a way to join two words together to create a link
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
