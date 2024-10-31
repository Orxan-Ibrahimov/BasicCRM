const express = require("express");
const { User } = require("../models/user");
require("dotenv/config");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const { Roles } = require("../helpers/enums/role");

router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId).select("-password");

  if (!user)
    return res.status(404).json({ success: false, message: "User not found!" });

  res.status(200).send(user);
});

// User Login Request
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(404)
      .json({ success: false, message: "This email was incorrect!" });

  if (!bcryptjs.compare(req.body.password, user.password))
    return res
      .status(404)
      .json({ success: false, message: "password or email is inccorect" });

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
  const users = await User.find();
  let role = Roles.member.toString();
  if (users.length === 0) role = Roles.admin.toString();
  let user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: bcryptjs.hashSync(req.body.password),
    registrationDate: Date.now(),
    role: role,
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
