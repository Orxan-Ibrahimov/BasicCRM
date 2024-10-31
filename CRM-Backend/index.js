const express = require("express");
const app = express();
require("dotenv/config");
const mongoose = require("mongoose");
const morgan = require("morgan");
const API_URL = process.env.API_URL;
const bodyParser = require("body-parser");
const cors = require("cors");
const authJwt = require("./helpers/safety/jwt");
const errorHandler = require("./helpers/safety/error-handler");
const userRouter = require("./routes/user");
const clientRouter = require("./routes/client");

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(morgan("tiny")); // Logging
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.json()); // Parse application/json

// Uncomment if using JWT
// app.use(authJwt()); 

app.use(errorHandler); // Error handling middleware
app.options("*", cors()); // Preflight requests

// Static files (if needed)
// app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// Routes
app.use(`${API_URL}/users`, userRouter);
app.use(`${API_URL}/clients`, clientRouter);

// Database connection
mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    dbName: "BasicCRM",
  })
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Start the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
