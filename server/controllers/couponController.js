const asyncHandler = require("express-async-handler");
const Coupon = require("../models/couponModel");

const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiresAt } = req.body;

  if (!name || !discount || !expiresAt) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  const coupon = await Coupon.create({ name, discount, expiresAt });
  return res.status(201).json(coupon);
});

const getAllCoupons = asyncHandler(async (req, res) => {
  const coupon = await Coupon.find().sort("-createdAt");
  res.status(200).json(coupon);
});

const getSingleCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({
    name: req.params.couponName,
    expiresAt: { $gt: Date.now() },
  });

  if (!coupon) {
    res.status(400);
    throw new Error("Coupon not found or expired!");
  }
  return res.status(200).json(coupon);
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const coupon = await Coupon.findByIdAndDelete({ _id: id });

  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }
  return res.status(200).json({ msg: "Coupon Successfully Deleted!" });
});

module.exports = { createCoupon, getAllCoupons, getSingleCoupon, deleteCoupon };
