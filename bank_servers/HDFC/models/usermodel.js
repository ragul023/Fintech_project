const { json } = require('express');
const db = require('../config/db')
const getallusers =async ()=>{
    const result = await db.query(
        "select * from users"
    );
    return result.rows;

}
const createuser = async (name,email,phone)=>{
    try{
            const result = await db.query(
        "insert into users (user_name,email,phone) values ($1,$2,$3) returning user_id",[name,email,phone]
    );
    console.log(result.rows[0]);
    console.log(result.rows[0].user_id);
    return (result.rows[0].user_id);
    }catch(err){
    
                        // PostgreSQL duplicate key error
            if (err.code === "23505") {
                console.log("Duplicate account number, retrying...");
                 // retry
            }

            // other errors → stop immediately
            throw err;
        
    }
}


module.exports = {
    getallusers,
    createuser
}