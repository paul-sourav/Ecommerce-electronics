const express = require("express");
const prouter = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/Authorization");
const formidable = require("express-formidable");
const {
  setCategory,
  updateCategory,
  getCategory,
  singleCategory,
  deleteCategory,
} = require("../controllers/categoryCtrl");
const {
  setProduct,
  getProduct,
  singleProduct,
  productPhoto,
  deleteProduct,
  updateProduct,
  searchProduct,
} = require("../controllers/productCtrl");

//category Route
prouter.post("/category", authMiddleware, isAdmin, setCategory);
prouter.put("/update-category/:id", authMiddleware, isAdmin, updateCategory);
prouter.get("/get-category", getCategory);
prouter.get("/single-category/:slug", singleCategory);
prouter.delete("/delete-category/:id", authMiddleware, isAdmin, deleteCategory);

//product Route
prouter.post("/set-product", authMiddleware, isAdmin, formidable(), setProduct);
prouter.put("/update-product/:pid",authMiddleware,isAdmin,formidable(),updateProduct);
prouter.get("/get-product", getProduct);
prouter.get("/single-product/:slug", singleProduct);
prouter.get("/product-photo/:pid", productPhoto);
prouter.delete("/delete-product/:pid", deleteProduct);
prouter.get("/search-product/:key",searchProduct);

module.exports = prouter;
