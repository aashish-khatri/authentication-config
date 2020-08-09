const express = require("express");
const passport = require("passport");

var app = express();

require("./config/database");

require("./models/user");

require("./config/passport")(passport);

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes"));

app.listen(3000, console.log("app is listening"));
