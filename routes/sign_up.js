const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const register = require("../middleware/register");


router.post("/", [register, authenticate], async (req, res) => {
  res
  .header("x-auth-token", req.body.user.generateAuthToken())
  .send(`Welcome ${req.body.user.username}`);
});

module.exports = router;
