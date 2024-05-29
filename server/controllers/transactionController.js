const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const {
  successfulTransfer,
} = require("../emailTemplates/transferFundTemplate");

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

  res.status(201).json({ msg: "Account verification Successful" });
});

const getUserTransactions = asyncHandler(async (req, res) => {
  if (req.user.email !== req.body.email) {
    res.status(400);
    throw new Error("Not Authorised to view this transaction");
  }
  const transactions = await Transaction.find({
    $or: [{ sender: req.body.email }, { recipient: req.body.email }],
  })
    .sort({ createdAt: -1 })
    .populate("sender")
    .populate("recipient");

  res.status(200).json(transactions);
});

module.exports = { transferFund, verifyAccount, getUserTransactions };
