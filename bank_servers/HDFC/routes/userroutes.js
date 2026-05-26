const express = require("express")

const router = express.Router();

const usercontroller = require("../controllers/usercontroller")

router.get(
    "/users",usercontroller.getallusers
);
module.exports= router;
router.post(
    "/users",usercontroller.createuser
);
router.post("/register",usercontroller.createuser);