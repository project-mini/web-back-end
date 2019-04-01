const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/usercredentials");

module.exports = async function(req, res, next) {
  try {
    const err = Error("Incorrect email or password!");
    const token = req.header("x-auth-token");
    let result;
    let user;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.ALT_JWT_PRIVATE_KEY);
        user = await User.findOne({
          username: decoded.username
        });
      } catch (err) {
        return res.status(400).send("Inavalid token");
      }
      if (!user) throw err;
    } else {
      if (!req.body.username_email) {
        user = await User.findOne({ username: req.body.user.username });
      } else if (req.body.username_email.length > 50) {
        throw err;
      } else {
        user = await User.findOne({
          $or: [
            { email: req.body.username_email },
            { username: req.body.username_email }
          ]
        });
      }
      if (!user) throw err;
      result = await bcrypt.compare(req.body.password, user.password);
      if (!result) throw err;
    }

    req.body.user = user;

    next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
