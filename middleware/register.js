const express = require("express");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User, validateUser } = require("../models/usercredentials");
const crudsSignUp = require("../controller/cruds_sign_up");

module.exports = async function(req, res, next) {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error["message"]);
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
    if (user) throw err;
  } catch (err) {
    if (user) return res.status(400).send("User already registered!");
  }

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
    req.body.user = result;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send(err["message"]);
  }
};
