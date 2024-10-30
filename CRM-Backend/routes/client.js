const express = require("express");
const { User } = require("../models/user");
require("dotenv/config");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const { Client } = require("../models/client");

router.get("/", async (req, res) => {
  const clients = await Client.find();
  if (!clients)
    return res
      .status(400)
      .json({ success: false, message: "Not found any client!" });

  res.status(200).send(clients);
});

router.get("/:cid", async (req, res) => {
  const client = await Client.findById(req.params.cid);
  if (!client)
    return res
      .status(400)
      .json({ success: false, message: "The client not found!" });

  res.status(200).send(client);
});

router.post("/", async (req, res) => {
  let client = new Client({
    organization: req.body.organization,
    person: req.body.person,
    phone: req.body.phone,
    createdDate: Date.now(),
  });

  client = await client.save();

  if (!client)
    return res
      .status(400)
      .json({ success: false, message: "The client can not be created!" });

  res.status(201).send(client);
});

router.delete("/:cid", async (req, res) => {
  const client = Client.findByIdAndDelete(req.params.cid)
    .then((removedClient) => {
      if (!removedClient)
        return res
          .status(500)
          .json({ success: false, message: "The client can not be deleted!" });

      res.status(200).send(removedClient);
    })
    .catch((err) => {
      if (err)
        return res.status(500).json({ success: false, message: err.message });
    });
});

module.exports = router;
