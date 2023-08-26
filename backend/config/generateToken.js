const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const secretKey  = process.env.SECRET_KEY;


const generateToken  = (id)=>{
    const token = jwt.sign({id},secretKey,{expiresIn:"7d"});
    return token
}


module.exports = generateToken;
