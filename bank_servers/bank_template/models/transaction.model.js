const db = require("../config/db");

const ValidateTransaction = async (
  sender_acc_num,
  receiver_acc_num,
  amount,
) => {
  try {
    await db.query("BEGIN");
    await db.query(
      `SELECT *
FROM accounts
WHERE acc_number IN ($1, $2)
FOR UPDATE`,
      [sender_acc_num, receiver_acc_num],
    );

    const result = await db.query(
      `SELECT balance FROM accounts WHERE acc_number = $1`,
      [sender_acc_num],
    );

    if (result.rows.length === 0) {
      await db.query("ROLLBACK");
      return { success: false, message: "Sender account not found" };
    }

    if (result.rows[0].balance < amount) {
      await db.query("ROLLBACK");
      return { success: false, message: "Insufficient Balance" };
    }

    await db.query(
      `UPDATE accounts SET balance = balance - $1 WHERE acc_number = $2`,
      [amount, sender_acc_num],
    );
    await db.query(
      `UPDATE accounts SET balance = balance + $1 WHERE acc_number = $2`,
      [amount, receiver_acc_num],
    );
    await db.query(
      `INSERT INTO transactions (sender_acc, rec_upi, amount, status) VALUES ($1, $2, $3, 'SUCCESS')`,
      [sender_acc_num, receiver_acc_num, amount],
    );
    await db.query("COMMIT");

    return { success: true, message: "Transaction successful" };
  } catch (err) {
    await db.query("ROLLBACK");
    return { success: false, message: err.message };
  }
};

module.exports = { ValidateTransaction };
