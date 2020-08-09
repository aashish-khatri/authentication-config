const crypto = require("crypto");
const fs = require("fs");

function genKeyPair() {
	const keyPair = crypto.generateKeyPairSync("rsa", {
		modulusLength: 4096, //bits - standard RSA
		publicKeyEncoding: {
			type: "pkcs1", // "Public Key Crypto Std 1"
			format: "pem", // most common formatting choice
		},
		privateKeyEncoding: {
			type: "pkcs1", // "Public Key Crypto Std 1"
			format: "pem", // most common formatting choice
		},
	});
  fs.writeFileSync(__dirname + "/id_rsa_pub.pem", keyPair.publicKey);
  fs.writeFileSync(__dirname + "/id_rsa_priv.pem", keyPair.privateKey);
}
genKeyPair()
