require("dotenv").config();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = asyncHandler(async (req, res, next) => {
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

const adminOnlyAuth = asyncHandler((req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
    return;
  } else res.status(401);
  throw new Error("Not Authorized as an admin!");
});

module.exports = { auth, adminOnlyAuth };
