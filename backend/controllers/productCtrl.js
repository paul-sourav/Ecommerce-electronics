const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../models/productModel");
const fs = require("fs");

// add product
const setProduct = asyncHandler(async (req, resp) =>{
  const { name, description, price, quantity, category } = req.fields;
  const { photo } = req.files;
  console.log(req.fields);

  if (!name || !description || !price || !quantity || !category) {
    resp.status(404);
    throw new Error("please fill all the fields");
  }
  if (photo.size > 1000000) {
    resp.status(404);
    throw new Error("photo size should not be more then 1mb");
  } else {
    try {
      const product = new Product({ ...req.fields, slug: slugify(name) });
      if (photo.path) {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contenType = photo.type;
      }
      await product.save();
      resp.status(201).json({
        product: product,
        success: true,
      });
    } catch (error) {
      console.log(error);
      resp.status(400);
      throw new Error(error);
    }
  }
});

//update product
const updateProduct = asyncHandler(async (req, resp) => {
  const { name, description, price, quantity, category } = req.fields;
  const { photo } = req.files;
  const { pid } = req.params;
  console.log(req.files);
  

  if (!name || !description || !price || !quantity || !category) {
    resp.status(404);
    throw new Error("please fill all the fields");
  } else if (photo?.Size > 1000000) {
    resp.status(400);
    throw new Error("photo size should not more then 1mb");
  } else {
    try {
      const product = await Product.findByIdAndUpdate(
        pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      ); 
      if (photo) {
       product.photo.data = fs.readFileSync(photo.path);
       product.photo.contenType=photo.type;
      }
      await product.save();

      resp.status(202).json({
        product,
        success: true,
        result: "update successful",
      });
    } catch (error) {
      console.log(error);
      resp.status(500);
      throw new Error(error);
    }
  }
});

//get all products
const getProduct = asyncHandler(async (req, resp) => {
  try {
    const products = await Product.find()
      .select("-photo")
      // .limit(12)
      .populate("category");

    resp.status(201).send(products);
  } catch (error) {
    resp.status(401);
    console.log(error);
    throw new Error(error);
  }
});

// single product
const singleProduct = asyncHandler(async (req, resp) => {
  const { slug } = req.params;
  try {
    const product = await Product.findOne({ slug: slug })
      .select("-photo")
      .populate("category");
    resp.status(201).json({
      success: true,
      product: product,
    });
  } catch (error) {
    console.log(error);
    resp.status(401);
    throw new Error(error);
  }
});

//get photo
const productPhoto = asyncHandler(async (req, resp) => {
  const { pid } = req.params;
  try {
    const product = await Product.findById(pid).select("photo");

    if (product.photo.data) {
      resp.set("content-type", product.photo.contenType);
      return resp.status(201).send(product.photo.data);
    } else {
      console.log("no data found");
    }
  } catch (error) {
    console.log(error);
    resp.status(500);
    throw new Error(error);
  }
});

//delete product
const deleteProduct = asyncHandler(async (req, resp) => {
  const { pid } = req.params;
  try {
    const product = await Product.findByIdAndDelete(pid).select("-photo");
    resp.status(201).json({
      product: product,
      success: "delete sucessful",
    });
  } catch (error) {
    console.log(error);
    resp.status(401);
    throw new Error(error);
  }
});


// search Product 
const searchProduct = asyncHandler(async(req,resp)=>{
  const {key}= req.params;
  const product = await Product.find({
     $or:[
      {"slug":{$regex:key}},
      {"category.slug":{$regex:key}}
     ]
  }).select("-photo").populate("category")
  if(product){
      console.log(product)
     resp.status(201).json(product)
  }else{
     throw new Error("something went wrong")
  }

})
module.exports = {
  setProduct,
  updateProduct,
  getProduct,
  singleProduct,
  productPhoto,
  deleteProduct,
  searchProduct,
};
