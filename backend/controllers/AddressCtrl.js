const asyncHandler = require("express-async-handler");
const Address = require("../models/addressModel");
const User = require("../models/userModel");

//add_address
const add_address = asyncHandler(async (req, resp) => {
  const {
    uid,
    username,
    name,
    pincode,
    state,
    block,
    district,
    streetname,
    landmark,
  } = req.body.address;

  if (
    !uid ||
    !username ||
    !name ||
    !pincode ||
    !state ||
    !block ||
    !district ||
    !streetname ||
    !landmark
  ) {
    resp.status(404);
    throw new Error("please fill all the fields");
  } else {
    try {
      const data = new Address({
        uid: uid,
        username: username,
        name: name,
        pincode: pincode,
        state: state,
        block: block,
        district: district,
        streetname: streetname,
        landmark: landmark,
      });
      const saveData = await data.save();
      console.log(saveData);
      resp.status(201).json({
        result: saveData,
      });
    } catch (error) {
      console.log(error);
      resp.status(500);
      throw new Error(error);
    }
  }
});


//delete_address 
const del_address = asyncHandler(async(req,resp)=>{
    const {aid} = req.params;
    try {
      const data =  await Address.findByIdAndDelete(aid)
      // console.log(data);
      resp.send(data);
      if(data){
        const user  = await User.updateOne(
          {_id:data.uid},
          {
            $pull:{address:data._id}
          }
        )
        console.log(user);
      }
      
    } catch (error) {
      resp.status(500);
      console.log(error);
      throw new Error(error);
    }
})


module.exports = { add_address,del_address};
