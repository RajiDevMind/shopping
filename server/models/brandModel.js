const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: "Brand name is required?",
      minLenght: [2, "Brand name, too short"],
      maxLenght: [32, "Brand name, too loong"],
    },
    // Creating a slug, A slug is a way to join two words together to create a link
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
