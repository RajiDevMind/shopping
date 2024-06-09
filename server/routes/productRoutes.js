const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview,
} = require("../controllers/productControllers");
const { auth, adminOnlyAuth } = require("../middleware/authMiddleware");

// a logged in user that is an admin can only create a product
router.post("/", auth, adminOnlyAuth, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.delete("/:id", auth, adminOnlyAuth, deleteProduct);
router.patch("/:id", auth, adminOnlyAuth, updateProduct);

router.patch("/review/:id", auth, reviewProduct);
router.patch("/deleteReview/:id", auth, deleteReview);
router.patch("/updateReview/:id", auth, updateReview);

module.exports = router;
