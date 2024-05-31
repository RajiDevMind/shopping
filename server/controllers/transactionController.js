const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const {
  successfulTransfer,
} = require("../emailTemplates/transferFundTemplate");
const { depositFund } = require("../utils");
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const transferFund = asyncHandler(async (req, res) => {
  const { amount, sender, recipient, description, status } = req.body;

  // Validation
  if (!amount || !sender || !recipient) {
    res.status(400);
    throw new Error("All fields are required?");
  }

  // Check senders account within DB
  const user = User.findOne({ email: sender });
  // confirm amount sending with current balance
  if (user.balance < amount) {
    res.status(400);
    throw new Error("Insufficient balance");
  }

  // Deduct sender account balance
  await User.findOneAndUpdate(
    { email: sender },
    {
      $inc: { balance: -amount },
    }
  );

  // increase recipient acct balance
  await User.findOneAndUpdate(
    { email: recipient },
    {
      $inc: { balance: amount },
    }
  );

  // Create and save transaction
  await Transaction.create({ amount, sender, recipient, description, status });

  // Send email to the user
  const subject = "Successful Transaction!!!";
  const send_to = sender;
  const template = successfulTransfer(sender, recipient, amount);
  const reply_To = "no_reply@gmail.com";

  await sendEmail(subject, send_to, template, reply_To);

  res.status(201).json({ msg: "Transaction Successful" });
});

const verifyAccount = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.recipient });

  if (!user) {
    res.status(400);
    throw new Error("User account not found");
  }

  res
    .status(200)
    .json({ recipientName: user.name, msg: "Account verification Successful" });
});

const getUserTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({
    $or: [{ sender: req.user.email }, { recipient: req.user.email }],
  })
    .sort({ createdAt: -1 })
    .populate("sender")
    .populate("recipient");

  res.status(200).json(transactions);
});

const depositFundStripe = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const user = await User.findById(req.user._id);

  // Create Stripe Customer with userModel (stripeCustomerId)
  if (!user.stripeCustomerId) {
    const customer = await stripe.customers.create({ email: user.email });
    user.stripeCustomerId = customer.id;
    user.save();
  }

  // Creat Stripe Session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: "usd",
          product_data: {
            name: "sellout wallet deposit...",
            description: `Make a deposit of $${amount} to your Sellout wallet...`,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    customer: user.stripeCustomerId,

    success_url: `${process.env.CLIENT_URL}/wallet?payment=successful&amount=${amount}`,

    cancel_url: `${process.env.CLIENT_URL}/wallet?payment=failed`,
  });
  return res.json(session);
});

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const webhook = asyncHandler(async (req, res) => {
  const sig = request.headers["stripe-signature"];

  let data;
  let event;
  let eventType;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log("Webhook Verified!");
  } catch (err) {
    console.log("Webhook Verification Error!", err);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  data = event.data.object;
  eventType = event.type;

  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        // Deposit funds into customer account
        const description = "Stripe deposit";
        const source = "stripe";
        depositFund(customer, data, description, source);
      })
      .catch((err) => console.log(err.message));
  }
  res.send().end();
});

const depositFundFLW = asyncHandler(async (req, res) => {
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

  const { tx_ref, amount, customer } = response.data.data;

  const successURL = process.env.CLIENT_URL + `/wallet?payment=successful`;

  const failedURL = process.env.CLIENT_URL + `/wallet?payment=failed`;

  if (req.query.status === "successful") {
    // Deposit funds into customer wallet
    const data = {
      amount_subtotal: amount,
    };
    const description = "Flutterwave deposit";
    const source = "flutterwave";
    depositFund(customer, data, description, source);
    return res.redirect(successURL);
  } else {
    res.redirect(failedURL);
  }
});

module.exports = {
  transferFund,
  verifyAccount,
  getUserTransactions,
  depositFundStripe,
  webhook,
  depositFundFLW,
};
