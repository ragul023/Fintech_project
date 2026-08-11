const express = require("express");
require("dotenv").config();
const app = express();
const upiRoutes = require("./routes/upi.routes");

app.use(express.json());
app.use("/api", upiRoutes);

app.get("/health", (req, res) => {
  res.json({ service: "NPCI", status: "ok" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`NPCI Server running on port ${port}`);
});
