const mongoose = require("mongoose");
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");

//schema for user credentials
const userSchema = new mongoose.Schema({
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

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      id: this._id
    },
    process.env.ALT_JWT_PRIVATE_KEY,
    { expiresIn: "168h" } // expires in a week
  );
};

function validateUser(user) {
  const schema = {
    firstName: Joi.string()
      .required()
      .regex(new RegExp("^[a-zA-Z' ]{1,50}$")),
    lastName: Joi.string()
      .required()
      .regex(new RegExp("^[a-zA-Z' ]{1,50}$")),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required()
  };

  const schemaError = Joi.validate(user, schema);
  const passwordError = Joi.validate(user.password, new PasswordComplexity());

  if (schemaError.error) return schemaError;
  else if (passwordError.error) return passwordError;
  else return {error: null};
}

exports.User = mongoose.model("UserCredentials", userSchema);
exports.validateUser = validateUser;
