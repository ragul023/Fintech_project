const express = require("express");

const router = express.Router();

const usercontroller = require("../controllers/usercontroller");

router.get("/", usercontroller.getallusers);

router.post("/", usercontroller.createuser);

router.post("/register", usercontroller.createuser);

module.exports = router;