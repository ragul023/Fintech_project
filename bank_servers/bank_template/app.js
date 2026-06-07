const express = require("express");
require("dotenv").config();
const pool = require("./config/db")
console.log(process.env.BANK_NAME);
console.log(process.env.PORT);
console.log(process.env.DB_NAME);

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("HDFC Mock Server Running");
});
const userroutes = require("./routes/userroutes");
const transaction = require("./routes/transaction.routes")
app.use(express.json());
app.use("/api/users",userroutes);
app.use("/api/transaction",transaction);



app.listen(process.env.PORT, () => {
    console.log(`${process.env.BANK_NAME} Server running on port ${process.env.PORT}`);
});