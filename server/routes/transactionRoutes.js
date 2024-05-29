const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const {
  transferFund,
  verifyAccount,
  getUserTransactions,
  depositFundStripe,
  webhook,
} = require("../controllers/transactionController");

router.post("/transferFund", express.json(), auth, transferFund);
router.post("/verifyAccount", express.json(), auth, verifyAccount);
router.get("/getUserTransactions", express.json(), auth, getUserTransactions);

router.post("/depositFundStripe", express.json(), auth, depositFundStripe);
router.post("/webhook", express.raw({ type: "application/json" }), webhook);

module.exports = router;
