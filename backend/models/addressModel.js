const mongoose = require("mongoose");
const User = require("../models/userModel");

const AddressSchema = new mongoose.Schema({
  uid:{type:String,required:true},
  username:{type:String,required:true},
  name :{type:String,required:true},
  pincode:{type:Number,required:true},
  state:{type:String,required:true},
  block:{type:String,required:true},
  district:{type:String,required:true},
  streetname:{type:String,required:true},
  landmark:{type:String,required:true}
});

AddressSchema.pre("save",async function(){
  const  user = await User.findOne({_id:this.uid})
  user.address.push(this._id);
  user.save();
});



const  Address = mongoose.model("Address",AddressSchema);
 module.exports =Address;