const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
router.post("/", authenticate, (req, res) => {
  if(req.header('x-auth-token'))
    return res.send(`Welcome ${req.body.user.username}`);

  res
    .header("x-auth-token", req.body.user.generateAuthToken())
    .send(`Welcome ${req.body.user.username}`);
});

router.post("/me", authenticate, (req, res) => {
  res.send(
    _.pick(req.body.user, ["username", "firstName", "lastName", "email"])
  );
});

module.exports = router;
