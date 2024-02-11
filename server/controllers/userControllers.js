require("dotenv").config();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Enter all the required field!");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be 6 characters and above!");
  }
  // check existing user with emails
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error(`${email} has been registered, kindly login!`);
  }
  const userDetails = await User.create({
    name,
    email,
    password,
  });

  const token = generateToken(userDetails._id);

  if (userDetails) {
    const { _id, name, email, role } = userDetails;
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 2592000),
      // secure: true,
      // sameSite: "none",
    });
    // sending users data to the frontend
    res.status(201).json({ _id, name, email, role, token });
  } else {
    res.status(400);
    throw new Error("Invalid user details!");
  }
});

module.exports = { registerUser };
