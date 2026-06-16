const transactionModel = require("../models/transaction.model.js");
const UserValidationService = require("../services/userValidation.service.js");

const createTransaction = async (req, res) => {
  const { sender_acc_num, receiver_acc_num, upi_pin ,amount} = req.body;
  if (
    !sender_acc_num ||
    !receiver_acc_num ||
    !amount ||
    !upi_pin
) {
    return res.status(400).json({
        message: "All fields are required"
    });
}

  const Sender = await UserValidationService.ValidateAccount(sender_acc_num);

  const Receiver =
    await UserValidationService.ValidateAccount(receiver_acc_num);

  const ValidatePin = await UserValidationService.ValidatePin(
    upi_pin,
    sender_acc_num,
  );

  if (Sender.success && Receiver.success && ValidatePin.success) {
    // continue transaction
    const result = await transactionModel.ValidateTransaction(sender_acc_num,receiver_acc_num,upi_pin,amount);
    if(result.success==true){
      return res.status(200).json(result);
    }else
    {return res.status(401).json(result);}

  }

  if (!Sender.success) {
    return res.status(404).json({
      success: false,
      error: "Sender Account Doesn't Exist",
    });
  }

  if (!Receiver.success) {
    return res.status(404).json({
      success: false,
      error: "Receiver Account Doesn't Exist",
    });
  }

  if (!ValidatePin.success) {
    return res.status(401).json({
      success: false,
      error: "Invalid UPI PIN",
    });
  }
};

const createUpiTransaction = async(req,res)=>{

  const {payer_vpa,payee_vpa,amount,upi_pin}=req.body;
  if(
    !payee_vpa||
    !payee_vpa||
    !amount
  ){
    res.status(401).json({msg:"All fields Required"})
  }
  const validUser = await UserValidationService.ValidateAccountUpi(payer_vpa)
  if(validUser.success){
      const valid_pin = await UserValidationService.ValidatePin(validUser.data.upi_pin)
  }

}

module.exports = {
  createTransaction,
};
