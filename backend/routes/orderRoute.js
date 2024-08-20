const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/authToken");
const { getOrderDetails } = require("../controllers/orderController");


router.get("/order-details", validateToken, getOrderDetails);



module.exports = router;