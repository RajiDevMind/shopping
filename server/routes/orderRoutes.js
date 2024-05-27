const express = require("express");
const router = express.Router();
const { auth, adminOnlyAuth } = require("../middleware/authMiddleware");
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  stripePayment,
  verifyFlutterwavePayment,
} = require("../controllers/orderController");

router.get("/response", verifyFlutterwavePayment);

router.post("/", auth, createOrder);
router.get("/", auth, getAllOrders).get("/:id", auth, getSingleOrder);
router.patch("/:id", auth, adminOnlyAuth, updateOrderStatus);

router.post("/create-payment", stripePayment);

module.exports = router;
