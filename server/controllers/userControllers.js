require("dotenv").config();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const {
  successfulRegistration,
} = require("../emailTemplates/registerUserEmail");

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

    // Send email to the user
    const subject = "Successfully Registered - Sellout";
    const send_to = email;
    const template = successfulRegistration(name);
    const reply_To = "roi4tech@gmail.com";

    await sendEmail(subject, send_to, template, reply_To);

    // sending users data to the frontend
    res.status(201).json({ _id, name, email, role, token });
  } else {
    res.status(400);
    throw new Error("Invalid user details!");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate
  if (!email || !password) {
    res.status(400);
    throw new Error("Empty email or password!");
  }
  // check if user exists
  const existinUser = await User.findOne({ email });
  if (!existinUser) {
    res.status(400);
    throw new Error("User doesn`t exists!");
  }

  const confirmPassword = bcrypt.compareSync(password, existinUser.password);
  const token = generateToken(existinUser._id);

  if (existinUser && confirmPassword) {
    // send userDoc to the frontend excluding password
    const userDoc = await User.findOne({ email }).select("-password");
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 2592000),
      // secure: true,
      // sameSite: "none",
    });
    return res.status(201).json(userDoc);
  } else {
    res.status(400);
    throw new Error("Invalid email or password!");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    // secure: true,
    // sameSite: "none",
  });
  res.status(200).json({ msg: "Logged out Successlly!" });
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User not found!");
  }
});

const getLoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
  if (verifyToken) {
    res.json(true);
  } else {
    res.json(false);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    const { name, phone, address } = user;
    // save new user details, if changed by user or leave previous details
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.address = req.body.address || address;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const add_Image = asyncHandler(async (req, res) => {
  const { photo } = req.body;
  const user = await User.findById(req.user.id);
  user.photo = photo;

  const addImage = await user.save();
  res.status(200).json(addImage);
});

// Save User CartItems
const saveCart = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.cartItems = cartItems;
    user.save();
    return res.status(200).json({ msg: "Cart Saved!" });
  } else {
    res.status(400);
    throw new Error("User not found!");
  }
});

const getCartItems = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    return res.status(200).json(user.cartItems);
  } else {
    res.status(400);
    throw new Error("User not found!");
  }
});

// User Wishlist
const addToWishList = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  );

  res.status(200).json({ msg: "Product added to wishlist" });
});

// get a specific user wishlists
const getAllWishList = asyncHandler(async (req, res) => {
  const wishLists = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist");

  res.status(200).json(wishLists);
});

// Removing a single product from wishlist
const removeWishList = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  );

  res.status(200).json({ msg: "Product removed from wishlist" });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getLoginStatus,
  updateUser,
  add_Image,
  saveCart,
  getCartItems,
  addToWishList,
  getAllWishList,
  removeWishList,
};
