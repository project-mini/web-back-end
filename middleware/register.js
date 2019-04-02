const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/usercredentials");
const crudsSignUp = require("../controller/cruds_sign_up");

module.exports = async function(req, res, next) {
  const token = req.header("x-auth-token");
  let user;

  const { error } = validateUser(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send(error["message"]);
  }


  try {
    user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered!");
  } catch (err) {
    console.log(err);
    return res.state(500).send('Server error');
  }

  req.body.tokenInvalid = false;
  if (token) req.body.tokenInvalid = true;

  user = new User(
    _.pick(req.body, [
      "firstName",
      "lastName",
      "email",
      "password"
    ])
  );


  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await crudsSignUp.addUser(user);
    req.body.user = result;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send(err["message"]);
  }
};
