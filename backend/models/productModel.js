const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    slug:{type:String,lowercase:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"},
    photo:{data:Buffer,contenType:String}
})

const Product = mongoose.model("Product",productSchema);
module.exports = Product;   