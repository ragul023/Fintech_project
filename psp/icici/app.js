const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ service: "ICICI PSP", status: "ok" });
});

app.post("/upi", (req, res) => {
  const { payer_vpa, payee_vpa, amount, upi_pin } = req.body;
  if (!payer_vpa || !payee_vpa || !amount || !upi_pin) {
    return res
      .status(400)
      .json({
        success: false,
        message: "payer_vpa, payee_vpa, amount and upi_pin are required",
      });
  }

  return res.json({
    success: true,
    bank: "ICICI",
    received: true,
    payload: { payer_vpa, payee_vpa, amount },
  });
});

app.listen(port, () => console.log(`ICICI PSP listening on ${port}`));
