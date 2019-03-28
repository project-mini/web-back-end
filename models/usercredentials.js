const mongoose = require("mongoose");
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity')(Joi);

//schema for user credentials
const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    lowercase: true,
    enum: ["male", "female", "something-else"]
  },
  username: {
    type: String,
    required: true,
    match: new RegExp("^[a-zA-Z\-_0-9]{3,30}$")
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    match: new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$"),
    maxlength: 255,
    unique: true,
    required: true
  },
  hasUpvoted: {
    type: Array,
    default: []
  },
  hasDownvoted: {
    type: Array,
    default: []
  }
});

function validateUser(user) {
  const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().required().options(['male', 'female', 'something-else']),
    username: Joi.string().required().min(3).max(30).regex(new RegExp("^[a-zA-Z\-_0-9]{3,30}$")),
    email: Joi.required().email(),
    password: Joi.passwordComplexity()
  }  

  return Joi.validate(user, schema);
}

exports.User = mongoose.model("UserCredentials", user);
exports.validateUser = validateUser;