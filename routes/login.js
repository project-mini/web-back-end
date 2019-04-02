const _ = require('lodash');
const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
router.post("/", authenticate, (req, res) => {
  if(req.header('x-auth-token'))
    return res.send(`Welcome ${req.body.user.firstName} ${req.body.user.lastName}`);

  res
    .header("x-auth-token", req.body.user.generateAuthToken())
    .send(`Welcome ${req.body.user.firstName} ${req.body.user.lastName}`);
});

router.get("/me", authenticate, (req, res) => {
  res.send(
    _.pick(req.body.user, ["firstName", "lastName", "email"])
  );
});

module.exports = router;
