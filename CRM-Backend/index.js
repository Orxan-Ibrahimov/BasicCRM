const express = require("express");
const app = express();
require("dotenv/config");
const mongoose = require("mongoose");
const morgan = require("morgan");
const API_URL = process.env.API_URL;
const bodyParser = require('body-parser');
const cors = require('cors');

const userRouter = require('./routes/user');
const clientRouter = require('./routes/client');

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
// app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// Routes
app.use(`${API_URL}/users`, userRouter);
app.use(`${API_URL}/clients`, clientRouter);

mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: "BasicCRM",
  })
  .then(() => {
    console.log("Database Connecting...");
  })
  .catch((err) => {
    console.log("an error was occured");
    console.log(err);
  });
app.listen(3000, () => {
  console.log("Database Listenning...");
});
