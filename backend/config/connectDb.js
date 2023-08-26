const mongoose  = require("mongoose");
const mongourl = process.env.MONGO_URL;

const connectDb = ()=>{
    const conn = mongoose.connect(mongourl);
    conn.then((res)=>console.log(`connected with ${res.connection.name}`))
    .catch((err)=>console.log(err))
};


module.exports = connectDb;