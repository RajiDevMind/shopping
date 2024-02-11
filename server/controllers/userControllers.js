const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  res.send("register users...");
});

module.exports = { registerUser };
