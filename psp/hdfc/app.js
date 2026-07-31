const express = require("express");
const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ bank: "HDFC", status: "ok" });
});

app.post("/upi", (req, res) => {
  res.json({ bank: "HDFC", received: true, payload: req.body });
});

app.listen(port, () => console.log(`HDFC PSP listening on ${port}`));
