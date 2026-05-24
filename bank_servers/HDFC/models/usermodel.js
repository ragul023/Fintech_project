const db = require('../config/db')
const getallusers =async ()=>{
    const result = await db.query(
        "select * from users"
    );
    return result.rows;

}

module.exports = {
    getallusers
}