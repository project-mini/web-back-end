const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/usercredentials");

module.exports = async function(req, res, next) {
  try {
    const err = Error("Incorrect email or password!");
    const token = req.header("x-auth-token");

    let result, user;

    if (token && !req.body.tokenInvalid) {
      try {
        const decoded = jwt.verify(token, process.env.ALT_JWT_PRIVATE_KEY);
        user = await User.findOne({
          email: decoded.email
        });
      } catch (err) {
        console.log(err);
        return res.status(400).send("Inavalid token");
      }
      if (!user) throw err;
    } else {
      if (req.body.email.length > 75) {
        throw err;
      } else {
        user = await User.findOne({ email: req.body.email });
      }
      if (!user) throw err;

      result = await bcrypt.compare(req.body.password, user.password);

      if (!result) throw err;
    }

    req.body.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};
