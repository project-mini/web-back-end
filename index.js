const express = require("express");
const session = require("express-session");
const randomString = require("randomstring");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const root = require("./routes/root");
const sign_up = require("./routes/sign_up");
const login = require("./routes/login");
const logout = require('./routes/logout');
const proprietary = require("./routes/proprietary");
const alternatives = require("./routes/alternatives");
const redirect = require("./routes/redirect");


app.use(express.static("public"));
app.use(
  session({
    secret: randomString.generate(),
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

app.use("/", root);
app.use("/api/signup", sign_up);
app.use("/api/login", login);
app.use("/api/logout", logout);
app.use("/api/proprietary", proprietary);
app.use("/api/alternatives", alternatives);
app.use("/api/redirect", redirect);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serving at port ${PORT}...`));
