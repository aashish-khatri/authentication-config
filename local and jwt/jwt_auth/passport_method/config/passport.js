const fs = require("fs");
const path = require("path");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("mongoose").model("User");

const pathToKey = path.join(__dirname, "..", "/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: PUB_KEY,
	algorithms: ["RS256"],
};

module.exports = (passport) => {
	passport.use(
		new JwtStrategy(options, function (jwt_payload, done) {
			console.log(jwt_payload);

			User.findOne({ _id: jwt_payload.sub })
				.then((user) => {
					user ? done(null, user) : done(null, false);
				})
				.catch((err) => done(err, null));
		})
	);
};
