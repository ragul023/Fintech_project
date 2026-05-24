const express = require("express")

const router = express.Router();

const usercontroller = require("../controllers/usercontroller")

router.get(
    "/users",usercontroller.getallusers
);
module.exports= router;
