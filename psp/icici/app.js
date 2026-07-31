const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ bank: "ICICI", status: "ok" });
});

app.post("/upi", (req, res) => {
  res.json({ bank: "ICICI", received: true, payload: req.body });
});

app.listen(port, () => console.log(`ICICI PSP listening on ${port}`));
