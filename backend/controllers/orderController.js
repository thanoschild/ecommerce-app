const expressAsyncHandler = require("express-async-handler");
const orderModel = require("../models/orderModel");

const getOrderDetails = expressAsyncHandler( async(req, res) => {
    const currUser = req.userId;
    const orderList = await orderModel.find({userId: currUser}).sort({createdAt: -1})

    res.status(200).json({
        data: orderList,
        message: "order detailed fetched successfully",
        success: true,
        error: false
    })
});

module.exports = {getOrderDetails};