const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productControllers");
const { auth } = require("../middleware/authMiddleware");

router.post("/", auth, createProduct);

module.exports = router;
