const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const { transferFund } = require("../controllers/transactionController");

router.post("/transferFund", express.json(), auth, transferFund);

module.exports = router;
