const mongoose = require("mongoose");
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");

//schema for user credentials
const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: new RegExp("^[a-zA-Z' ]{1,50}$")
  },
  lastName: {
    type: String,
    required: true,
    match: new RegExp("^[a-zA-Z' ]{1,50}$")
  },
  gender: {
    type: String,
    lowercase: true,
    enum: ["male", "female", "something-else"]
  },
  username: {
    type: String,
    required: true,
    match: new RegExp("^[a-zA-Z0-9]{3,30}$"),
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    match: new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"),
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
    firstName: Joi.string()
      .required()
      .regex(new RegExp("^[a-zA-Z' ]{1,50}$")),
    lastName: Joi.string()
      .required()
      .regex(new RegExp("^[a-zA-Z' ]{1,50}$")),
    gender: Joi.string()
      .required()
      .valid("male", "female", "something-else"),
    username: Joi.string()
      .required()
      .min(3)
      .max(30)
      .regex(new RegExp("^[a-zA-Z-_0-9]{3,30}$")),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required()
  };

  const schemaError = Joi.validate(user, schema);
  const passwordError = Joi.validate(user.password, new PasswordComplexity());

  if (schemaError) return schemaError;
  if (passwordError) return passwordError;
}

exports.User = mongoose.model("UserCredentials", user);
exports.validateUser = validateUser;
