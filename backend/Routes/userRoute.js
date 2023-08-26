const express = require("express");
const {
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
  user_profile,
} = require("../controllers/userCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/Authorization");
const router = express.Router();

//user Route
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/auth_user", authMiddleware, auth_user);
router.get("/auth_admin", authMiddleware, isAdmin, auth_admin);
router.put("/add-wishlist/:id", authMiddleware, add_wishlist);
router.put("/delete-wishlist/:id", authMiddleware, delete_wishlist);
router.get("/find-wishlist/:id", find_wishlist);
router.post("/add-cart/:id", authMiddleware, add_cart);
router.get("/find-cart/:id", authMiddleware, find_cart);
router.put("/update-cart/:id", authMiddleware, update_cart);
router.put("/delete-cart/:id", authMiddleware, delete_cart);
router.get("/user-address/:uid", authMiddleware, user_address);
router.get("/user_profile/:uid",authMiddleware,user_profile);

module.exports = router;
