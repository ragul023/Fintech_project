const express = require("express");
const pool = require("./config/db")

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("HDFC Mock Server Running");
});
const userroutes = require("./routes/userroutes");
app.use(express.json());
app.use("/api",userroutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`HDFC Server running on port ${PORT}`);
});