const mongoose = require("mongoose");

loginCred =
  "mongodb://" +
  process.env.ALT_USERNAME +
  ":" +
  process.env.ALT_PWD +
  "@ds213645.mlab.com:13645/alterfoss";

mongoose
  .connect(loginCred, { useNewUrlParser: true })
  .then(() => console.log("Connected to database from cruds_sign_up.js"))
  .catch(err =>
    console.log(
      "Error in connection with respect to that of the database:",
      err.message
    )
  );

async function addUser(user) {
  try {
    return await user.save();
  } catch (err) {
    throw err;
  }
}

exports.addUser = addUser;
