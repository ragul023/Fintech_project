const transactionModel = require("../models/transaction.model.js");
const validateModel = require("../models/validation.model.js");

const createTransaction = async (req, res) => {
  const [sender_acc_num, receiver_acc_num, upi_pin] = req.body;
  
};
