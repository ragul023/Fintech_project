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

module.exports={
    getallusers
}