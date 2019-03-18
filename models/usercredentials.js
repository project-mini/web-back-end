const mongoose = require('mongoose');

//schema for user credentials
const user = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    username: String,
    password: String,
    email: String,
    hasUpvoted: [String],
    hasDownvoted: [String]
});

module.exports = mongoose.model('UserCredentials', user);