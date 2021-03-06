const express = require("express");
const config = require("config");
const github = require("debug")("github");
const router = express.Router();
const request = require("request");
const qs = require("querystring");
const _ = require("lodash");
const randomString = require("randomstring");

router.all("/", (req, res) => {
  console.log("Request send by GITHUB");
  console.log(req.query);

  const code = req.query.code;
  const returnedState = req.query.state;

  // console.log(req.session.csrf_string === returnedState);
  // console.log()
  // res.send('Hey welcome here');

  if (req.session.csrf_string === returnedState) {
    request.post(
      {
        url:
          "https://github.com/login/oauth/access_token?" +
          qs.stringify({
            client_id: process.env.ALT_CLIENT_ID,
            client_secret: process.env.ALT_CLIENT_SECRET,
            code: code,
            redirect_uri: process.env.ALT_REDIRECT,
            state: req.session.csrf_string
          })
      },
      (error, response, body) => {
        github("Your access token :", qs.parse(body));
        req.session.access_token = qs.parse(body).access_token;
        // res.redirect(A);
        console.log(req.session.access_token);
      }
    );
  } else {
    res.redirect(config.get("home"));
  }
});

module.exports = router;
