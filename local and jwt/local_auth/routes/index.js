//Routes
const router = require("express").Router();
const connection = require("../config/database");
const { genPassword } = require("../lib/passwordFunc");
const passport = require("passport");
const isAuth = require("./authMiddleware").isAuth;
const isAdmin = require("./authMiddleware").isAdmin;

const User = connection.models.User;

router.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/login-failure",
		successRedirect: "/login-success",
	})
);
router.post("/register", (req, res, next) => {
	const saltHash = genPassword(req.body.password);

	const salt = saltHash.salt;
	const hash = saltHash.hash;
	const newUser = new User({
		username: req.body.username,
		hash: hash,
		salt: salt,
	});
	newUser.save().then((user) => {
		console.log(user);
	});
	res.redirect("login");
});

router.get("/", (req, res, next) => {
	res.send(
		'<h1>Home</h1><p>Please <a href="/register">register</a><br><a href="/login">login</a></p>'
	);
});
router.get("/login", (req, res, next) => {
	const form =
		'<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';
	res.send(form);
});
router.get("/register", (req, res, next) => {
	const form =
		'<h1>Register Page</h1><form method="post" action="register">Enter Username:<br><input type="text" name="username"><br>Enter Password:<br><input type="password" name="password"><br><br><input type="submit" value="Submit"><form>';
	res.send(form);
});
router.get("/protected-route", isAuth, isAdmin, (req, res, next) => {});
router.get("/logout", (req, res, next) => {
	req.logout();
	res.redirect("/");
});

router.get("/login-success", (req, res, next) => {
	res.send(
		'<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
	);
});

router.get("/login-failure", (req, res, next) => {
	res.send("You entered the wrong password.");
});
module.exports = router;
