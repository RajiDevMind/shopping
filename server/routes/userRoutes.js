const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getLoginStatus,
  updateUser,
  add_Image,
} = require("../controllers/userControllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/get-user", protect, getUser);
router.get("/status", getLoginStatus);
router.patch("/update-user", protect, updateUser);
router.patch("/add-image", protect, add_Image);

module.exports = router;
