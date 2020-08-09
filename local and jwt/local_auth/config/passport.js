//Passport local strategy config
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const User = connection.models.User;
const validPassword = require("../lib/passwordFunc").validPassword;

//replace it with name of the input field like email, passw etc.
const customFields = {
	usernameField: "username",
	passwordField: "password",
};

//called on authenticate method and check if the user exists or not
const verifyCallback = (username, password, done) => {
	User.findOne({ username: username })
		.then((user) => {
			if (!user) {
				return done(null, false);
			}
			const isValid = validPassword(password, user.hash, user.salt);
			if (isValid) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		})
		.catch((err) => {
			console.log(password, salt, hash);
			done(err);
		});
};
const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		if (err) {
			return done(err);
		}
		done(null, user);
	});
});
