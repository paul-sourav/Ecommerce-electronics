const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretkey = process.env.SECRET_KEY;
// authMiddleware
const authMiddleware = asyncHandler(async (req, resp, next) => {
  if (req.headers.authorization.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    const verifyUser = jwt.verify(token, secretkey);
    if(verifyUser){
        const user= await User.findById(verifyUser.id);
        req.user = user
        req.token = token
        next()
    }else{
        resp.status(404)
        throw new Error("token expired")
    }
  } else {
    resp.status(404);
    throw new Error("no token found");
  }
});

// is Admin 
const isAdmin = asyncHandler(async(req,resp,next)=>{
     const user = req.user;
     if(user.role==="admin"){
        next()
     }else{
        resp.status(404)
        throw new Error("not an admin")
     }
}) 

module.exports = {authMiddleware,isAdmin}