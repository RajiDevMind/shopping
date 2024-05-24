const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const { calculateTotalAmount } = require("../utils");
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

// Pay with stripe
const stripePayment = asyncHandler(async (req, res) => {
  const { items, shipping, description, coupon } = req.body;

  const product = await Product.find();

  let orderAmount;

  orderAmount = calculateTotalAmount(product, items); // calculate "cartItems" and find the "product" in the DB

  if (coupon !== null && coupon?.name !== "nil") {
    let totalAfterDiscount =
      orderAmount - (orderAmount * coupon.discount) / 100;
    orderAmount = totalAfterDiscount;
  }

  // Create a PaymentIntent with the order amount, currency , automatic_payment_methods and orderDetails
  const paymentIntent = await Stripe.paymentIntents.create({
    amount: orderAmount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      line1: shipping.line1,
      line2: shipping.line2,
      city: shipping.city,
      country: shipping.country,
      postal_code: shipping.postal_code,
    },
    name: shipping.name,
    phone: shipping.phone,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  stripePayment,
};
