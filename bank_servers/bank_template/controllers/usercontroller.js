const accountmodel = require("../models/accountmodel");
const usermodel = require("../models/usermodel")


const getallusers = async (req,res)=>{
    try{
        const users = await usermodel.getallusers();
        res.json(users);
    }catch(err){
        res.status(500).json({
            error:"server error",


        })
    }
}
const createuser = async (req,res)=>{
    const {name,email,phone,balance,upi_pin}=req.body;
    try{
        const user_id = await usermodel.createuser(
            name,
            email,
            phone
        );
        const retres = await accountmodel.accountCreation(user_id,balance,upi_pin);
        res.status(201).json(retres);
    }catch(err){
        res.status(500).json({
            error:"server error"
        })
    }
}

module.exports={
    getallusers,
    createuser
}