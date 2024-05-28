const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const {
  transferFund,
  verifyAccount,
} = require("../controllers/transactionController");

router.post("/transferFund", express.json(), auth, transferFund);
router.post("/verifyAccount", express.json(), auth, verifyAccount);

module.exports = router;
