const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MongoStore = require("connect-mongo")(session);

require("dotenv").config();
//SESSION SETUP
const connection = require("./config/database");

const sessionStore = new MongoStore({
	mongooseConnection: connection,
	collection: "sessions",
});

app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		store: sessionStore,
		cookie: {
			maxAge: 1000 * 3600 * 24,
		},
	})
);

//PASSPORT SETUP
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	console.log(req.session);
	console.log(req.user);
	next();
});

//FiNALLY THE ROUTES BEFORE ERROR HANDLER
app.use(routes);

app.listen(3000);
