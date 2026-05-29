const db = require("../config/db")

const ValidateAccount = async (acc_num) => {
    
    const result = await db.query(
        "SELECT EXISTS (SELECT 1 FROM accounts WHERE acc_number = $1)",
        [acc_num]
    )

    return {
        success: result.rows[0].exists
    }
}

const ValidatePin = async (pin, acc_num) => {
    const result = await db.query(
        "SELECT upi_pin FROM accounts WHERE acc_number = $1",
        [acc_num]
    )

    // no account found
    if (result.rows.length === 0) {
        return {
            success: false
        }
    }

    if (result.rows[0].upi_pin == pin) {
        return {
            success: true
        }
    } else {
        return {
            success: false
        }
    }
}

module.exports = {
    ValidateAccount,
    ValidatePin
}