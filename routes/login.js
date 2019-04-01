const express = require("express");
const router = express.Router();

router.post("/", authenticate, (req, res) => {
  res
    .header("x-auth-token", req.body.user.generateAuthToken())
    .send(`Welcome ${req.body.user.username}`);
});

router.post("/me", authenticate, (req, res) => {
  res.send(_.pick(req.body.user, ["username", "firstName", "lastName", "email"]));
});

module.exports = router;
