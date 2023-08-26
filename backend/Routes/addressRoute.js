const express = require('express');
const addRouter =  express.Router();
const {add_address, del_address} = require("../controllers/AddressCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/Authorization");


addRouter.post("/add-address",authMiddleware,add_address);
addRouter.delete("/delete-address/:aid",del_address);

module.exports = addRouter;