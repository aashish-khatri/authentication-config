const crypto = require("crypto");
//crypto functions to generate salt-hashed password
const genPassword = (password) => {
	var salt = crypto.randomBytes(32).toString("hex");
	var genHash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, "sha512")
		.toString("hex");
	return {
		salt: salt,
		hash: genHash,
	};
};
//Use to validate user in verify callback(passport js)
const validPassword = (password, hash, salt) => {
	var verifyHash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, "sha512")
		.toString("hex");
	return verifyHash === hash;
};

module.exports.genPassword = genPassword;
module.exports.validPassword = validPassword;
