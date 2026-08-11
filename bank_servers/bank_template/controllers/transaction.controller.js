const transactionModel = require("../models/transaction.model.js");
const UserValidationService = require("../services/userValidation.service.js");

const createTransaction = async (req, res) => {
  const { sender_acc_num, receiver_acc_num, upi_pin, amount } = req.body;
  if (!sender_acc_num || !receiver_acc_num || !amount || !upi_pin) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const Sender = await UserValidationService.ValidateAccount(sender_acc_num);
  const Receiver =
    await UserValidationService.ValidateAccount(receiver_acc_num);
  const ValidatePin = await UserValidationService.ValidatePin(
    upi_pin,
    sender_acc_num,
  );

  if (!Sender.success) {
    return res
      .status(404)
      .json({ success: false, error: "Sender Account Doesn't Exist" });
  }

  if (!Receiver.success) {
    return res
      .status(404)
      .json({ success: false, error: "Receiver Account Doesn't Exist" });
  }

  if (!ValidatePin.success) {
    return res.status(401).json({ success: false, error: "Invalid UPI PIN" });
  }

  const result = await transactionModel.ValidateTransaction(
    sender_acc_num,
    receiver_acc_num,
    amount,
  );
  if (result.success === true) {
    return res.status(200).json(result);
  }
  return res.status(400).json(result);
};

const createUpiTransaction = async (req, res) => {
  const { payer_vpa, payee_vpa, amount, upi_pin } = req.body;

  if (!payer_vpa || !payee_vpa || !amount || !upi_pin) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const payer = await UserValidationService.ValidateAccountUpi(payer_vpa);
  if (!payer.success) {
    return res
      .status(404)
      .json({ success: false, error: "Payer VPA not found" });
  }

  const payee = await UserValidationService.ValidateAccountUpi(payee_vpa);
  if (!payee.success) {
    return res
      .status(404)
      .json({ success: false, error: "Payee VPA not found" });
  }

  const validPin = await UserValidationService.ValidatePin(
    upi_pin,
    payer.data.acc_number,
  );
  if (!validPin.success) {
    return res.status(401).json({ success: false, error: "Invalid UPI PIN" });
  }

  const result = await transactionModel.ValidateTransaction(
    payer.data.acc_number,
    payee.data.acc_number,
    amount,
  );
  if (result.success === true) {
    return res.status(200).json(result);
  }

  return res.status(400).json(result);
};

module.exports = {
  createTransaction,
  createUpiTransaction,
};
