const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getLoginStatus,
  updateUser,
  add_Image,
  saveCart,
  getCartItems,
} = require("../controllers/userControllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/get-user", auth, getUser);
router.get("/status", getLoginStatus);
router.patch("/update-user", auth, updateUser);
router.patch("/add-image", auth, add_Image);

// Storing Cart Items from the user
router.post("/saveCart", auth, saveCart);
router.get("/getCartItems", auth, getCartItems);

module.exports = router;
