const expressAsyncHandler = require("express-async-handler");
const cart = require("../models/cardProduct");


const addToCart = expressAsyncHandler(async (req, res) => {
  const { productId } = req?.body;
  const currUser = req.userId;

  const isProductAvailable = await cart.findOne({ productId, userId: currUser });
  if (isProductAvailable) {
    return res.json({
      message: "Already exist in the cart",
      success: false,
      error: true,
    });
  }

  const payload = {
    productId: productId,
    quantity: 1,
    userId: currUser,
  };

  const newCart = new cart(payload);
  const saveProduct = await newCart.save();

  return res.status(201).json({
    data: saveProduct,
    message: "product added in cart",
    success: true,
    error: false,
  });
});

const getNoOfCart = expressAsyncHandler(async (req, res) => {
  const userId = req.userId;
  const count = await cart.countDocuments({ userId });

  res.status(200).json({
    data: {
      count: count,
    },
    message: "fetched successfully",
    success: true,
    error: false,
  });
});

const getCartProduct = expressAsyncHandler(async (req, res) => {
  const userId = req.userId;
  const allProduct = await cart.find({ userId }).populate("productId");

  res.status(200).json({
    data: allProduct,
    message: "cart product fetched successfully",
    success: true,
    error: false,
  });
});

const updateCartProduct = expressAsyncHandler(async (req, res) => {
    const userId = req.userId;
    const productId = req.body._id;
    const qty = req.body.quantity;

    const updateCartProduct = await cart.updateOne({_id : productId},{
        ...(qty && {quantity : qty})
    })

    res.status(200).json({
        data: updateCartProduct,
        message: "product updated in cart",
        success: true,
        error: false
    })
});


const deleteCartProduct = expressAsyncHandler(async (req, res) => {
    const userId = req.userId;
    const productId = req.body._id;

    const deleteCartProduct = await cart.deleteOne({_id: productId});

    res.status(200).json({
        data: deleteCartProduct,
        message: "product deleted from cart successfully",
        success: true,
        error: false
    })
});

module.exports = { addToCart, getNoOfCart, getCartProduct, updateCartProduct, deleteCartProduct };
