const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/authToken");
const {paymentController, webhook} = require("../controllers/paymentController");


router.post("/checkout", validateToken, paymentController);
router.post("/webhook", webhook);


module.exports = router;