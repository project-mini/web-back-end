const express = require("express");
const session = require("express-session");
const randomString = require("randomstring");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const root = require("./routes/root");
const sign_up = require("./routes/sign_up");
const login = require("./routes/login");
const proprietary = require("./routes/proprietary");
const alternatives = require("./routes/alternatives");


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
app.use("/api/proprietary", proprietary);
app.use("/api/alternatives", alternatives);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serving at port ${PORT}...`));
