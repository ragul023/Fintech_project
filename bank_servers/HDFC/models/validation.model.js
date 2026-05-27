const db = require("../config/db");

const validateTransaction = async (
   sender_acc_num,
   receiver_acc_num,
   upi_pin
) => {

   // CHECK SENDER ACCOUNT
   const sender = await db.query(
      "SELECT * FROM accounts WHERE acc_num = $1",
      [sender_acc_num]
   );

   if(sender.rows.length === 0){
      return {
         error: "Sender account does not exist"
      };
   }

   // CHECK RECEIVER ACCOUNT
   const receiver = await db.query(
      "SELECT * FROM accounts WHERE acc_num = $1",
      [receiver_acc_num]
   );

   if(receiver.rows.length === 0){
      return {
         error: "Receiver account does not exist"
      };
   }

   // VALIDATE PIN
   if(sender.rows[0].upi_pin !== upi_pin){
      return {
         error: "Invalid UPI PIN"
      };
   }

   return {
      message: "Validation success",
      success:true
   };
};

module.exports = {validateTransaction};