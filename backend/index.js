const express = require("express");
const cors = require("cors");
var cookieParser = require('cookie-parser')
const connectDb = require("./config/dbConnection");
require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");

// Create Express app
const app = express();

// Setup CORS
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Setup middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());


// Setup routes
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/cart", require("./routes/cartRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));
app.use("/api/order", require("./routes/orderRoute"));


app.use(errorHandler);

// Start server
const port = 8000 || process.env.PORT;
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
