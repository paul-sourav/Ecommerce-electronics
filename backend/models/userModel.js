const mongoose = require('mongoose');
const bcrypt = require("bcrypt");


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"user"
    },
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address'
    }],
    cart: [{
        id: String,
        quantity: Number,
        name: String,
        color: String,
        price: Number,
        totalPrice: Number
      }],
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Orders"
    }],
    isUserBlocked:{type:Boolean,default:false}
});

/* //generate password
userSchema.pre("save",async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})
//compare password
userSchema.methods.isPasswordMatch = async function(userPassword){
 return  bcrypt.compare(userPassword,this.password);
}
 */
//Export the model
module.exports = mongoose.model('User', userSchema);