const mongoose = require('mongoose');

//schema for user credentials
const user = new mongoose.Schema({
    firstName: { 
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        lowercase: true,
        enum: ['male','female']
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    signUpTime: {
        type : Date,
        default : Date.now
    },
    email: {
        type: String,
        lowercase: true,
        match: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/
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

module.exports = mongoose.model('UserCredentials', user);