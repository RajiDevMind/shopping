const express = require("express");
const {
  createCategory,
  getAllCategories,
  deleteCategory,
} = require("../controllers/categoryController");
const { auth, adminOnlyAuth } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/createCategory", auth, adminOnlyAuth, createCategory);
router.get("/getCategories", auth, adminOnlyAuth, getAllCategories);
router.delete("/:slug", auth, adminOnlyAuth, deleteCategory);

module.exports = router;
