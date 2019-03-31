const express = require("express");
const router = express.Router();
const request = require("request");
const qs = require("querystring");
const _ = require("lodash");
const randomString = require("randomstring");

router.all('/', (req, res) => {
    console.log('Request send by GITHUB');
    console.log(req.query);

    const code = req.query.code;
    const returnedState = req.query.state;

    console.log(req.session.csrf_string === returnedState);
    console.log()
    res.send('Hey welcome here');
});

module.exports = router;