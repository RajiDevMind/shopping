const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productControllers");
const { auth, adminOnlyAuth } = require("../middleware/authMiddleware");

router.post("/", auth, adminOnlyAuth, createProduct);

module.exports = router;
