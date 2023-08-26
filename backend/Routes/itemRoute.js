const express  = require("express");
const itemRoute = express.Router();
const {setItem, getItem, getphoto} = require('../controllers/itemCtrl')
const formidable = require("express-formidable");
const multer = require("multer");
const fs = require("fs");


var Stoage = multer.memoryStorage();
var uploadMem = multer({storage:Stoage})


itemRoute.post("/set-item",formidable(),setItem);
itemRoute.get("/get-item/:id",getItem);
itemRoute.get("/get-photo/:pid",getphoto);


itemRoute.post("/create-item",uploadMem.single("image"),(res,resp)=>{
    console.log(req.file);
    resp.send(req.file)   
})

module.exports= itemRoute;