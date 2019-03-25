const mongoose = require("mongoose");

//schema for user credentials
const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: new RegExp("^[a-zA-Z ]+$")
  },
  lastName: {
    type: String,
    required: true,
    match: new RegExp("^[a-zA-Z ]+$")
  },
  gender: {
    type: String,
    lowercase: true,
    enum: ["male", "female", "others"]
  },
  username: {
    type: String,
    required: true,
    match: new RegExp("^[a-zA-Z-_0-9]{3,20}$")
  },
  password: {
    type: String,
    required: true
  },
  signUpTime: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    lowercase: true,
    match: new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$"),
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

module.exports = mongoose.model("UserCredentials", user);
