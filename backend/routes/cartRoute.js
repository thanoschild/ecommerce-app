const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/authToken");
const {
  addToCart,
  getNoOfCart,
  getCartProduct,
  updateCartProduct,
  deleteCartProduct,
} = require("../controllers/cartController");



router.post("/add-product", validateToken, addToCart);
router.get("/cart-number", validateToken, getNoOfCart);
router.get("/cart-product", validateToken, getCartProduct);
router.post("/update-cart", validateToken, updateCartProduct);
router.post("/delete-cart", validateToken, deleteCartProduct);

module.exports = router;
