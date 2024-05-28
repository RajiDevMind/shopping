const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

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

  res.status(201).json({ msg: "Transaction Successful" });
});

module.exports = { transferFund };
