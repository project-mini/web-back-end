const _ = require("lodash");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("../models/usercredentials");

const authenticate = require("../middleware/authenticate");

router.post("/", authenticate, (req, res) => {
  res
    .header("x-auth-token", req.body.user.generateAuthToken())
    .send(`Welcome ${req.body.user.username}`);
});

router.post("/me", authenticate, (req, res) => {
  res.send(_.pick(req.body.user, ["username", "firstName", "lastName", "email"]));
});

module.exports = router;
