const express = require("express");
require("dotenv").config();
const pool = require("./config/db");
console.log(process.env.BANK_NAME);
console.log(process.env.PORT);
console.log(process.env.DB_NAME);

const app = express();

app.use(express.json());

const userroutes = require("./routes/userroutes");
const transaction = require("./routes/transaction.routes");

app.use("/api/users", userroutes);
app.use("/api/transaction", transaction);

app.get("/health", (req, res) => {
  res.json({ service: process.env.BANK_NAME || "BankServer", status: "ok" });
});

app.listen(process.env.PORT, () => {
  console.log(
    `${process.env.BANK_NAME} Server running on port ${process.env.PORT}`,
  );
});
