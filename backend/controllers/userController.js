const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, profileImage } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fileds are required");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password: ", hashedPassword);
  const user = await User.create({
    name,
    email,
    profileImage,
    password: hashedPassword,
    role: "GENERAL",
  });

  res.status(201).json({
    data: user,
    success: true,
    error: false,
    message: "User created successfully",
  });
});


// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fileds are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Incorrect password.");
  }

  const tokenData = {
    _id: user._id,
    email: user.email,
  };
  const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "600m",
  });

  const tokenOption = {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  };
  res.cookie("token", accessToken, tokenOption).status(200).json({
    message: "Login successfully.",
    data: accessToken,
    success: true,
    error: false,
  });
});


// @desc user details
// @route GET /api/users/login
// @access public
const userDetails = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  res.status(200).json({
    data: user,
    message: "User details.",
    success: true,
    error: false,
  });
});


// @desc Logout a user
// @route GET /api/users/logout
// @access public
const userLogout = expressAsyncHandler(async (req, res) => {
  const tokenOption = {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  };

  res.clearCookie("token", tokenOption);
  res.status(200).json({
    data: [],
    message: "Logged out successfully",
    success: true,
    error: false,
  });
});

// @desc all user details
// @route GET /api/users/all-users
// @access public
const allUserDetails = expressAsyncHandler(async (req, res) => {
  const allUsers = await User.find();
  if (!allUsers) {
    res.status(400);
    throw new Error("Unable to fetch user details");
  }
  res.json({
    message: "All user details",
    data: allUsers,
    success: true,
    error: false,
  });
});

// @desc update user
// @route POST /api/users/update-user
// @access public
const updateUser = expressAsyncHandler(async (req, res) => {
  const sessionUser = req.userId;
  const { userId, email, name, role } = req.body;
  const payload = {
    ...(email && { email: email }),
    ...(name && { name: name }),
    ...(role && { role: role }),
  };

  const user = await User.findById(sessionUser);

  const updateUser = await User.findByIdAndUpdate(userId, payload);
  res.status(200).json({
    data: updateUser,
    message: "User Update Successfully",
    success: true,
    error: false,
  });
});


module.exports = {
  registerUser,
  loginUser,
  userDetails,
  userLogout,
  allUserDetails,
  updateUser,
};
