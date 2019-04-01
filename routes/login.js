const express = require("express");
const config = require('config');
const github = require("debug")("github");
const router = express.Router();
const session = require("express-session");
const request = require("request");
const qs = require("querystring");
const _ = require("lodash");
const randomString = require("randomstring");
// const redirect_uri = "https://dry-dusk-50998.herokuapp.com/api/redirect";
// const redirect_uri = "http://localhost:3000/api/redirect";

router.get("/", (req, res) => {
  req.session.csrf_string = randomString.generate();

  github(req.session.csrf_string);
  github(process.env.ALT_CLIENT_ID);
  console.log(config.get('client_id'));
  console.log(config.get('redirect_uri'));
  const githubAuthUrl =
    "https://github.com/login/oauth/authorize?" +
    qs.stringify({
      client_id: process.env.ALT_CLIENT_ID,
      redirect_uri: process.env.ALT_REDIRECT,
      state: req.session.csrf_string,
      scope: "user:email"
    });

  // Redirect to githubAuthURL for github to handle the authentication now.
  res.redirect(githubAuthUrl);
});

module.exports = router;
