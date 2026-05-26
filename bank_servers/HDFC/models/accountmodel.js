const crypto = require("crypto");
const db = require("../config/db");

const accountCreation = async (user_id, balance, upi_pin) => {
    console.log({
    user_id,
    balance,
    upi_pin
});

    const maxRetries = 5;

    for (let i = 0; i < maxRetries; i++) {

        try {
            const number = crypto.randomInt(10000000, 100000000);
            const acc_number = `1012${number}01`;
            console.log(user_id, acc_number, balance, upi_pin);
            const result = await db.query(
                "INSERT INTO accounts (user_id, acc_number, balance, upi_pin) VALUES ($1, $2, $3, $4)",
                [user_id, acc_number, balance, upi_pin]
            );
                
            return(
                {
                    success:true,
                    message:"Account created successfully",
                    acc_number:acc_number
                }
            ); // success → exit function

        } catch (err) {

            // PostgreSQL duplicate key error
            if (err.code === "23505") {
                console.log("Duplicate account number, retrying...");
                continue; // retry
            }

            // other errors → stop immediately
            throw err;
        }
    }

    throw new Error("Failed to generate unique account number after retries");
};

module.exports = {accountCreation};