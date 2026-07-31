const express = require("express");
const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ bank: "SBI", status: "ok" });
});

app.post("/upi", (req, res) => {
  res.json({ bank: "SBI", received: true, payload: req.body });
});

app.listen(port, () => console.log(`SBI PSP listening on ${port}`));
