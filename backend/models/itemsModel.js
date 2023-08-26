const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    itemImg:{data:Buffer,contentType:String},
})

const Item = mongoose.model("items",itemSchema);

module.exports = Item;