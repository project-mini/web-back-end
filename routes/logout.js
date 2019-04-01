const express = require("express");
const config = require("config");
const github = require("debug")("github");
const router = express.Router();
const session = require("express-session");
const request = require("request");
const qs = require("querystring");
const _ = require("lodash");
const randomString = require("randomstring");

router.get("/", (req, res) => {
    req.logout();
    res.send('Logout');
});

module.exports = router;
