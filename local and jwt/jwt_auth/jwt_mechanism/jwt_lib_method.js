const jwt = require("jsonwebtoken");
const fs = require("fs");

const publicKey = fs.readFileSync(__dirname + "/pubKey.pem", "utf-8");
const privateKey = fs.readFileSync(__dirname + "/privKey.pem", "utf-8");

const payLoadObj = {
	sub: "1234567890",
	name: "John Doe",
	admin: true,
	iat: 1516239022,
};

const signedJWT = jwt.sign(payLoadObj, privateKey, { algorithm: "RS256" });

console.log(signedJWT);

jwt.verify(signedJWT, publicKey, { algorithm: ["RS256"] }, (err, payload) => {
	console.log(err, payload);
});
