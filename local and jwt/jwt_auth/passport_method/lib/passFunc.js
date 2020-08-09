//Password hashing and validation functions
const crypto = require("crypto");

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

const validPassword = (password, hash, salt) => {
	var verifyHash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, "sha512")
		.toString("hex");
	return verifyHash === hash;
};

//JWT issuance with help of jwt library

const path = require("path");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");

const pathToKey = path.join(__dirname ,".." , "/id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf-8");

const issueJwt = (user) => {
	const _id = user._id;
	const expiresIn = "1d";

	const payload = {
		sub: _id,
		iat: Date.now(),
	};

	const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
		expiresIn: expiresIn,
		algorithm: "RS256",
	});

	return {
		token: "Bearer " + signedToken,
		expires: expiresIn,
	};
};

module.exports.genPassword = genPassword;
module.exports.validPassword = validPassword;
module.exports.issueJwt = issueJwt;
