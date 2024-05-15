const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderDate,
    orderTime,
    orderAmount,
    orderStatus,
    paymentMethod,
    cartItems,
    shippingAddress,
    coupon,
  } = req.body;

  // Validating user inputs
  if (!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
    res.status(404);
    throw new Error("Order data missing!");
  }
  // Create Order
  await Order.create({
    user: req.user._id,
    orderDate,
    orderTime,
    orderAmount,
    orderStatus,
    paymentMethod,
    cartItems,
    shippingAddress,
    coupon,
  });

  return res.status(201).json({ msg: "Order created successfully!" });
});

// Get all orders if req.user.role === admin else get a particular user orders
const getAllOrders = asyncHandler(async (req, res) => {
  let orders;
  try {
    if (req.user.role === "admin") {
      orders = await Order.find().sort("-createdAt");
      return res.status(200).json(orders);
    }
    orders = await Order.find({ user: req.user._id }).sort("-createdAt");
    return res.status(200).json(orders);
  } catch (err) {
    res.status(404);
    throw new Error("User not found!");
  }
});

const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found!");
  }
  if (req.user.role === "admin") {
    return res.status(200).json(order);
  }
  // match order to user
  if (order.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorised!");
  }
  res.status(200).json(order);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;
  const { id } = req.params;

  const order = await Order.findById(id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found!");
  }
  // update orderStatus in the order request
  await Order.findByIdAndUpdate(
    { _id: id },
    { orderStatus },
    { new: true, runValidators: true }
  );
  return res.status(200).json({ msg: "Order status has been updated!" });
});

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
};
