const express = require("express");
const _ = require("lodash");
const router = express.Router();

const authenticate = require("../middleware/authenticate");

router.post("/", authenticate, (req, res) => {
  res.send(`Welcome ${req.user.username}`);
});

router.post("/me", authenticate, (req, res) => {
  res.send(_.pick(req.user, ["username", "firstName", "lastName"]));
});

module.exports = router;
