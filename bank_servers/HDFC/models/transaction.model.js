const db = require("../config/db");
const ValidateTransaction = async (
  sender_acc_num,
  receiver_acc_num,
  upi_pin,
  amount,
) => {
  try {
    await db.query("BEGIN");
    // for locking both the accounts
    await db.query(
      `SELECT *
FROM accounts
WHERE acc_number IN ($1,$2)
FOR UPDATE`,
      [sender_acc_num, receiver_acc_num],
    );
    const result = await db.query(
      `
            select balance from 
            accounts
            where acc_number = $1
            `,
      [sender_acc_num],
    );    console.log(amount)
    console.log(result.rows[0].balance)
    console.log(result.rows[0].balance < amount)
    if (result.rows[0].balance < amount) {
      await db.query("ROLLBACK");
      return {
        success: false,
        message: "Insufficient Balance",
      };
    }
    // now updating the banalace in the each account
    await db.query(
      `update accounts
        set balance = balance - $1
        where acc_number = $2 `,
      [amount, sender_acc_num],
    );
    await db.query(
      `update accounts
        set balance = balance + $1
        where acc_number = $2 `,
      [amount, receiver_acc_num],
    );
    await db.query(
      `insert into transactions
        (
            sender_acc,
            rec_upi,
            amount,
            status
        
        )values(
            $1,
            $2,
            $3,
            'SUCCESS'
        
        )`,
      [sender_acc_num, receiver_acc_num, amount],
    );
    await db.query("COMMIT");
    return {
      success: true,
      message: "Transaction successful",
    };
  } catch (err) {
    await db.query("ROLLBACK");
    return {
      success: false,
      message: err.message,
    };
  }
};
module.exports = { ValidateTransaction };
