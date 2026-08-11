const express = require("express");

const router = express.Router();

const transactioncontroller = require("../controllers/transaction.controller.js");

router.post("/createtransaction", transactioncontroller.createTransaction);
router.post("/upi", transactioncontroller.createUpiTransaction);

module.exports = router;
