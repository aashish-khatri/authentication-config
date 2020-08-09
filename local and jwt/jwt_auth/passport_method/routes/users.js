const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const passFunc = require("../lib/passFunc");

const passport = require("passport");

router.get(
	"/protected",
	passport.authenticate("jwt", { session: false }),
	(req, res, next) => {
		res.status(200).json({
			success: true,
			msg: "You are successfully authenticated to this route!",
		});
	}
);

router.post("/login", (req, res, next) => {
	console.log(req.body);
	User.findOne({
		username: req.body.username,
	})
		.then((user) => {
			if (!user)
				res.status(401).json({ success: false, msg: "could not find user" });

			const isValid = passFunc.validPassword(
				req.body.password,
				user.hash,
				user.salt
			);

			if (isValid) {
				const tokenObject = passFunc.issueJwt(user);

				res.status(200).json({
					success: true,
					token: tokenObject.token,
					expiresIn: tokenObject.expires,
				});
			} else {
				res
					.status(401)
					.json({ success: false, msg: "you entered wrong password" });
			}
		})
		.catch((err) => next(err));
});

router.post("/register", function (req, res, next) {
	const saltHash = passFunc.genPassword(req.body.password);

	const salt = saltHash.salt;
	const hash = saltHash.hash;
	const newUser = new User({
		username: req.body.username,
		hash: hash,
		salt: salt,
	});

	newUser
		.save()
		.then((user) => {
			const jwt = passFunc.issueJwt(user);

			res.json({
				success: true,
				user: user,
				token: jwt.token,
				expiresIn: jwt.expires,
			});
		})
		.catch((err) => next(err));
});

module.exports = router;
