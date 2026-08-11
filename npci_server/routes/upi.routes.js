const express = require("express");
const router = express.Router();
const db = require("../Config/db");
const axios = require("axios");

router.get("/health", (req, res) => {
  res.json({ service: "NPCI", status: "ok" });
});

router.post("/register-bank", async (req, res) => {
  const { bank_name, callback_url } = req.body;
  if (!bank_name || !callback_url) {
    return res
      .status(400)
      .json({
        success: false,
        message: "bank_name and callback_url are required",
      });
  }

  try {
    const result = await db.query(
      "INSERT INTO bank_mapping (bank_name, callback_url) VALUES ($1, $2) RETURNING bank_code",
      [bank_name, callback_url],
    );
    return res
      .status(201)
      .json({ success: true, bank_code: result.rows[0].bank_code });
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ success: false, message: "Bank already registered" });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/register-vpa", async (req, res) => {
  const { vpa, bank_code } = req.body;
  if (!vpa || !bank_code) {
    return res
      .status(400)
      .json({ success: false, message: "vpa and bank_code are required" });
  }

  try {
    const result = await db.query(
      "INSERT INTO vpa_mapping (vpa, bank_code) VALUES ($1, $2) RETURNING vpa_id",
      [vpa, bank_code],
    );
    return res
      .status(201)
      .json({ success: true, vpa_id: result.rows[0].vpa_id });
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ success: false, message: "VPA already registered" });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/upi", async (req, res) => {
  const { payer_vpa, payee_vpa, amount, upi_pin } = req.body;
  if (!payer_vpa || !payee_vpa || !amount || !upi_pin) {
    return res
      .status(400)
      .json({
        success: false,
        message: "payer_vpa, payee_vpa, amount, and upi_pin are required",
      });
  }

  try {
    const payeeResult = await db.query(
      "SELECT vpa_mapping.vpa, vpa_mapping.bank_code, bank_mapping.callback_url FROM vpa_mapping INNER JOIN bank_mapping ON vpa_mapping.bank_code = bank_mapping.bank_code WHERE vpa_mapping.vpa = $1",
      [payee_vpa],
    );

    if (payeeResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Payee VPA not found" });
    }

    const payee = payeeResult.rows[0];
    const transactionId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    await db.query(
      "INSERT INTO transaction_log (transaction_id, payer_vpa, payee_vpa, payer_bank_code, payee_bank_code, amount, status) VALUES ($1, $2, $3, $4, $5, $6, 'PENDING')",
      [transactionId, payer_vpa, payee_vpa, null, payee.bank_code, amount],
    );

    const callbackUrl = `${payee.callback_url.replace(/\/$/, "")}/upi`;
    const response = await axios.post(
      callbackUrl,
      { payer_vpa, payee_vpa, amount, upi_pin },
      { timeout: 10000 },
    );

    const status = response.data.success ? "SUCCESS" : "FAILED";
    await db.query(
      "UPDATE transaction_log SET status = $1 WHERE transaction_id = $2",
      [status, transactionId],
    );

    return res
      .status(200)
      .json({
        success: response.data.success,
        details: response.data,
        transaction_id: transactionId,
      });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
