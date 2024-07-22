const express = require("express");
const router = express.Router();
const {registerUser, loginUser, userDetails, userLogout, allUserDetails, updateUser} = require("../controllers/userController");
const validateToken = require("../middleware/authToken");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user-details", validateToken, userDetails);
router.get("/logout", userLogout);


// admin panel
router.get("/all-users", validateToken, allUserDetails);
router.post("/update-user", validateToken, updateUser);


module.exports = router;