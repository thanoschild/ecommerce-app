const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/authToken");
const {
  uploadProduct,
  getAllProduct,
  updateProduct,
  getCategoryProduct,
  getSingleCategoryProduct,
  getProductDetails,
  searchProduct,
  getFilterProduct,
} = require("../controllers/productController");

router.post("/upload-product", validateToken, uploadProduct);
router.get("/all-products", getAllProduct);
router.post("/update-product", validateToken, updateProduct);
router.get("/catagory-products", getCategoryProduct);
router.post("/catagory-product", getSingleCategoryProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", getFilterProduct);

module.exports = router;
