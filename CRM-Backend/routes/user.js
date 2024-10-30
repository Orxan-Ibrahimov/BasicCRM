const express = require("express");
const { User } = require("../models/user");
require("dotenv/config");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const multer = require("multer");
const jwt = require("jsonwebtoken");

// User Login Request
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(404)
      .json({ success: false, message: "user can not found!" });

  if (!bcryptjs.compare(req.body.password, user.password))
    return res
      .status(404)
      .json({ success: false, message: "password or nickname is inccorect" });

  const token = jwt.sign(
    { role: user.role, userId: user.id },
    process.env.MY_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.status(200).send({ success: true, token: token });
});

// User Register Request
router.post("/register", async (req, res) => {
  let user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: bcryptjs.hashSync(req.body.password),
    registrationDate: Date.now(),
    role: req.body.role,
  });

  user = user
    .save()
    .then(async (createdUser) => {
      if (!createdUser)
        return res
          .status(500)
          .json({ success: false, message: "User datas is wrong!" });

      res.status(201).send(createdUser);
    })
    .catch((err) => {
      if (err)
        return res.status(500).json({ success: false, message: err.message });
    });
});

module.exports = router;
