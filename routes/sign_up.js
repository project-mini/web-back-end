const _ = require("lodash");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { User, validateUser } = require("../models/usercredentials");
const crudsSignUp = require("../controller/cruds_sign_up");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error["message"]);

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User already registered!");

  user = new User(
    _.pick(req.body, [
      "firstName",
      "lastName",
      "email",
      "password",
      "gender",
      "username"
    ])
  );
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    const result = await crudsSignUp.addUser(user);
    res.send(_.pick(result, ["firstName", "lastName", "username"]));
  } catch (err) {
    console.log(err);
    res.status(400).send(err["message"]);
  }
});

module.exports = router;
