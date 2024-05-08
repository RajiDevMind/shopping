const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productControllers");
const { auth, adminOnlyAuth } = require("../middleware/authMiddleware");

// a logged in user that is an admin can only create a product
router.post("/", auth, adminOnlyAuth, createProduct);

module.exports = router;
