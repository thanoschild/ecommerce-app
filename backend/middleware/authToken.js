const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = expressAsyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if(!token) {
    res.status(200).json({
        message: "User is not login or session is expired.",
        success: false,
        error: true
    });
    return;
  }
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
     if(err) {
        res.status(401);
        throw new Error("User is not authorized.")
     }
     
     req.userId = decoded?._id;
     next();
  });
});

module.exports = validateToken;
