const express = require("express");
const router = express.Router();
const { auth, adminOnlyAuth } = require("../middleware/authMiddleware");
const {
  createCoupon,
  getAllCoupons,
  getSingleCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

router.post("/createCoupon", auth, adminOnlyAuth, createCoupon);
router.get("/getAllCoupons", auth, adminOnlyAuth, getAllCoupons);
router.get("/:couponName", auth, getSingleCoupon);
router.delete("/:id", auth, adminOnlyAuth, deleteCoupon);

module.exports = router;
