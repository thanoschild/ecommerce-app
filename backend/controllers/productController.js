const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const product = require("../models/productModel");
const uploadPermission = require("../helper/permission");

const uploadProduct = expressAsyncHandler(async (req, res) => {
  const sessionUserId = req.userId;
  if (!uploadPermission(sessionUserId)) {
    res.status(400);
    throw new Error("Permission denied");
  }

  const uploadProduct = new product(req.body);
  const saveProduct = await uploadProduct.save();

  if (!saveProduct) {
    res.status(400);
    throw new Error("Unable to upload product");
  }

  res.status(201).json({
    message: "Product upload successfully",
    data: saveProduct,
    success: true,
    error: false,
  });
});

const getAllProduct = expressAsyncHandler(async (req, res) => {
  const allProduct = await product.find().sort({ createdAt: -1 });
  if (!allProduct) {
    res.status(400);
    throw new Error("Unable to fetch product details");
  }

  res.status(200).json({
    message: "Product details fetch successfully",
    data: allProduct,
    success: true,
    error: false,
  });
});

const updateProduct = expressAsyncHandler(async (req, res) => {
  const sessionUserId = req.userId;
  if (!uploadPermission(sessionUserId)) {
    res.status(400);
    throw new Error("Permission denied");
  }

  const { _id, ...resBody } = req.body;
  const updateProduct = await product.findByIdAndUpdate(_id, resBody);

  res.status(201).json({
    message: "Product uploaded successfully",
    data: updateProduct,
    success: true,
    error: false,
  });
});

const getCategoryProduct = expressAsyncHandler(async (req, res) => {
  const productCatagory = await product.distinct("category");
  console.log("category: ", productCatagory);
  const productByCatagory = [];
  for (const category of productCatagory) {
    const products = await product.findOne({ category });
    if (products) productByCatagory.push(products);
  }
  res.status(200).json({
    message: "category product",
    data: productByCatagory,
    success: true,
    error: false,
  });
});

const getSingleCategoryProduct = expressAsyncHandler(async (req, res) => {
  const { category } = req?.body || req?.query.q;
  const products = await product.find({ category: category });
  res.status(201).json({
    data: products,
    message: "category product",
    success: true,
    error: false,
  });
});

const getProductDetails = expressAsyncHandler(async (req, res) => {
  const { productId } = req.body;
  const productDetails = await product.findById(productId);
  res.status(200).json({
    data: productDetails,
    message: "successfully fetched product details",
    success: true,
    error: false,
  });
});

const searchProduct = expressAsyncHandler(async (req, res) => {
  const query = req.query.q;
  const regex = RegExp(query, "i", "g");

  const products = await product.find({
    $or: [{ ProductName: regex }, { category: regex }],
  });
  console.log("query: ", query);

  res.status(200).json({
    data: products,
    message: "search product list",
    success: true,
    error: false
  })
});

const getFilterProduct = expressAsyncHandler(async (req, res) => {
  const categoryList = req?.body?.category || [];
  const products = await product.find({
    category: {
      $in : categoryList
    }
  });

  res.status(200).json({
     data: products,
     message: "product fetched successfully",
     success: true,
     error: false
  });
});

module.exports = {
  uploadProduct,
  getAllProduct,
  updateProduct,
  getCategoryProduct,
  getSingleCategoryProduct,
  getProductDetails,
  searchProduct,
  getFilterProduct
};
