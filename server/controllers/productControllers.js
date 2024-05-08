const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async (req, res) => {
  res.send("Hello, products are gonna show here!");
});

module.exports = { createProduct };
