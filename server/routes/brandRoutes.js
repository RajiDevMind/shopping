const express = require("express");
const {
  createBrand,
  getAllBrands,
  deleteBrand,
} = require("../controllers/brandController");
const { auth, adminOnlyAuth } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/createBrand", auth, adminOnlyAuth, createBrand);
router.get("/getBrands", auth, adminOnlyAuth, getAllBrands);
router.delete("/:slug", auth, adminOnlyAuth, deleteBrand);

module.exports = router;
