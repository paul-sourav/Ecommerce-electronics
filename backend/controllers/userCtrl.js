const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const  bcrypt = require('bcrypt');


//register user
const registerUser = asyncHandler(async (req, resp) => {
  const { name, email, phone, password } = req.body;
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password,salt)
  if (!name || !email || !phone || !password) {
    resp.status(404).json("please fill all the fields");
  } else {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      throw new Error("user already exist...");
    } else {
      try {
        const user = new User({
         name:name,
         email:email,
         phone:phone,
         password:hash,
        });
        const newUser = await user.save();
        resp.status(200).json({
          result: "sucessfull register ",
        });
        console.log(newUser);
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }
  }
});

//login user
const loginUser = asyncHandler(async (req, resp) => {
  const { email, password } = req.body;
  if (!email && !password) {
    resp.status(404).json("please fill all the fields");
  } else {
    try {
      const findUser = await User.findOne({ email: email }).populate("wishlist");
      if (findUser) {
        const comparePassword = await bcrypt.compare(password,findUser.password)
        console.log(comparePassword)
        if (comparePassword==true) {
          console.log(findUser);
          resp.status(200).json({
            _id: findUser._id,
            role: findUser.role,
            token: generateToken(findUser._id),
          });
        } else {
          throw new Error("invalid Password");
        }
      } else {
        throw new Error("invalid credentials");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
});

//validate User
const auth_user = asyncHandler(async (req, resp) => {
  resp.status(200).json({
    ok: true,
  });
});

//validate Admin
const auth_admin = asyncHandler(async (req, resp) => {
  resp.status(200).json({
    ok: true,
  });
});

//add new wishlist
const add_wishlist = asyncHandler(async (req, resp) => {
  const { wishlist } = req.body;
  const { id } = req.params;
  if (!wishlist) {
    resp.status(404);
    throw new Error("please select the product you want in your wishlist");
  } else {
    try {
      const user = await User.findOne({ _id: id });
      const findWishlist = user.wishlist.filter((item) => item == wishlist);

      if (findWishlist.length > 0) {
        resp.send("Already in your wishlist");
      } else {
        user.wishlist.push(wishlist);
        user.save();
        resp.json({
          result: "added tour wishlist",
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
});

//find wishlist
const find_wishlist = asyncHandler(async (req, resp) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
      .select("wishlist")
      .populate("wishlist");
    resp.send(user);
  } catch (error) {
    resp.status(500);
    throw new Error(error);
  }
});

//delete wishlist
const delete_wishlist = asyncHandler(async (req, resp) => {
  const { wishlist } = req.body;
  const { id } = req.params;
  if (!wishlist) {
    resp.status(404);
    throw new Error("please select the product you want in your wishlist");
  } else {
    try {
      const data = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { wishlist: wishlist } },
        { new: true }
      );
      resp.json({
        result: "removed from your wishlist",
      });
      console.log(data);
    } catch (error) {
      resp.status(500);
      throw new Error(error);
    }
  }
});

//add New Cart
const add_cart = asyncHandler(async (req, resp) => {
  const { id } = req.params;
  const { cartItem } = req.body;
  if (!cartItem) {
    resp.status(404);
    throw new Error("no product found");
  } else {
    try {
      const user = await User.findOne({ _id: id });
      console.log(user.cart.length);
      let Obj = {};
      (Obj.id = cartItem._id),
        (Obj.quantity = cartItem.quantity),
        (Obj.name = cartItem.name),
        (Obj.color = cartItem.color),
        (Obj.price = cartItem.price),
        (Obj.totalPrice = cartItem.price * cartItem.quantity);
      user.cart.push(Obj);
      user.save();

      resp.status(201).json({
        result: "saved to the cart ",
      });
    } catch (error) {
      console.log(error);
      resp.status(500);
      throw new Error(error);
    }
  }
});

//find cart
const find_cart = asyncHandler(async (req, resp) => {
  const { id } = req.params;
  try {
    const cart = await User.findById(id).select("cart");
    resp.status(201).send(cart);
  } catch (error) {
    console.log(error);
    resp.status(500);
    throw new Error(error);
  }
});

//update Cart
const update_cart = asyncHandler(async (req, resp) => {
  const { id } = req.params;
  const { pId, quantity } = req.body;

  try {
    const user = await User.findOne({ _id: id });
    const data = user.cart.filter((item) => item.id === pId);
    data[0].quantity = quantity;

    await user
      .save()
      .then((res) => {
        console.log(res);
        resp.json({
          result: "update successful",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    resp.status(500);
    throw new Error(error);
  }
});
//delete cart
const delete_cart = asyncHandler(async (req, resp) => {
  const { id } = req.params;
  const { pId } = req.body;
  if (!pId) {
    resp.status(404);
    throw new Error("something went wrong");
  } else {
    try {
      User.updateOne({ _id: id }, { $pull: { cart: { id: pId } } })
        .then((data) => {
          resp.status(201).json({
            result: data,
          });
        })
        .catch((err) => {
          resp.status(500);
          throw new Error(err);
        });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
});

//userAddress 
const  user_address =  asyncHandler(async(req,resp)=>{ 
  const {uid} =  req.params;
  if(!uid){
    resp.status(404)
    throw new Error("didn't find the user")
  }else{
    try {
      const data = await User.findOne({_id:uid}).select("address").populate("address")
      if(data){
        console.log(data);
        resp.status(201).json(data);
      }
    } catch (error) {
      resp.status(500)
      console.log(error);
      throw new Error(error)
    }
  }
})

//user_profile
const user_profile = asyncHandler(async(req,resp)=>{
  const  {uid} = req.params;
 try {
  const user = await User.findOne({_id:uid}).select("-password").populate("address");
  resp.status(201).json({
    name:user.name,
    email:user.email,
    phone:user.phone,
    orders:user.orders,
    address:user.address
  })
 } catch (error) {
  
 }
})

module.exports = {
  registerUser,
  loginUser,
  auth_user,
  auth_admin,
  add_wishlist,
  find_wishlist,
  delete_wishlist,
  add_cart,
  find_cart,
  update_cart,
  delete_cart,
  user_address,
  user_profile
};
