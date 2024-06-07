require("dotenv").config();
const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const {
  updateProductQuantity,
  calculateTotalAmountStripe,
  calculateTotalAmountWallet,
} = require("../utils");
const sendEmail = require("../utils/sendEmail");
const { orderSuccessEmail } = require("../emailTemplates/orderTemplate");
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");

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

  // Update Product Quantity for stock mgt
  await updateProductQuantity(cartItems);

  // Send email to the user
  const subject = "Order created -Sellout App";
  const send_to = req.user.email;
  const template = orderSuccessEmail(req.user.name, cartItems);
  const reply_To = "no_reply@gmail.com";

  await sendEmail(subject, send_to, template, reply_To);

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
    throw new Error("User not authorised to view order!");
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

  orderAmount = calculateTotalAmountStripe(product, items); // calculate "cartItems" and find the "product" in the DB

  if (coupon !== null && coupon?.name !== "nil") {
    let totalAfterDiscount =
      orderAmount - (orderAmount * coupon.discount) / 100;
    orderAmount = totalAfterDiscount;
  }

  // Create a PaymentIntent with the order amount, currency , automatic_payment_methods and orderDetails
  const paymentIntent = await Stripe.paymentIntents.create({
    amount: parseInt(orderAmount),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.postal_code,
      },
      name: shipping.name,
      phone: shipping.phone,
    },
    // receipt_email: customerEmail
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Redirecting user to the server to Confirm Flutterwave Payment
const verifyFlutterwavePayment = asyncHandler(async (req, res) => {
  const { transaction_id } = req.query;

  // confirm transaction
  const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

  const response = await axios({
    url,
    method: "get",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: process.env.FLUTTERWAVE_SECRET_KEY,
    },
  });

  const { tx_ref } = response.data.data;

  const successURL =
    process.env.CLIENT_URL +
    `/checkout-flutterwave?payment=successful&ref=${tx_ref}`;

  const failedURL =
    process.env.CLIENT_URL + `/checkout-flutterwave?payment=failed`;

  if (req.query.status === "successful") {
    return res.redirect(successURL);
  } else {
    res.redirect(failedURL);
  }
});

const payWithWallet = asyncHandler(async (req, res) => {
  const { items, cartItems, shippingAddress, coupon } = req.body; // items are the array of productIDs
  const user = await User.findById(req.user._id);

  const product = await Product.find();
  const today = new Date();

  let orderAmount;

  orderAmount = calculateTotalAmountWallet(product, items); // calculate "cartItems" and find the "product" in the DB

  if (coupon !== null && coupon?.name !== "nil") {
    let totalAfterDiscount =
      orderAmount - (orderAmount * coupon.discount) / 100;
    orderAmount = totalAfterDiscount;
  }

  if (user.balance < orderAmount) {
    res.status(400);
    throw new Error("Insufficient balance");
  }

  // Create new transaction and pay with wallet
  const walletTransaction = await Transaction.create({
    amount: orderAmount,
    sender: user.email,
    recipient: "Sellout Online Store",
    description: "Payment for products",
    status: "success",
  });

  // Decrease sender balance
  const newBalance = await User.findByIdAndUpdate(
    { _id: user._id },
    { email: user.email },
    {
      $inc: { balance: -orderAmount },
    }
  );

  // Create Order
  const newOrder = await Order.create({
    user: user._id,
    orderDate: today.toDateString(),
    orderTime: today.toLocaleTimeString(),
    orderAmount,
    orderStatus: "Order Placed...",
    paymentMethod: "Shopito Wallet",
    cartItems,
    shippingAddress,
    coupon,
  });

  // Update product quantity
  await updateProductQuantity(cartItems);

  // Send email to the user
  const subject = "Order created -Sellout App";
  const send_to = user.email;
  const template = orderSuccessEmail(user.name, cartItems);
  const reply_To = "no_reply@gmail.com";

  await sendEmail(subject, send_to, template, reply_To);

  if (walletTransaction && newBalance && newOrder) {
    return res.status(200).json({
      msg: "Payment Successful",
      url: `${process.env.CLIENT_URL}/checkout-success`,
    });
  }
  res.status(400).json({ msg: "Something went wrong, Contact admin" });
});

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  stripePayment,
  verifyFlutterwavePayment,
  payWithWallet,
};
