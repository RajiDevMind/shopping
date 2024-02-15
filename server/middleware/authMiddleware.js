require("dotenv").config();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      res.status(400);
      throw new Error("Not authorised, Kindly Login!!!");
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    // Get user id from the token
    const findUser = await User.findById(verifyToken.id).select("-password");
    if (!findUser) {
      res.status(401);
      throw new Error("User not Found!");
    }
    req.user = findUser;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("User not Found!");
  }
});

module.exports = { protect };
