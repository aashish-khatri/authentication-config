const base64url = require("base64url");
const crypto = require("crypto");
const fs = require("fs");
const signatureFunction = crypto.createSign("RSA-SHA256");


const headerObj = {
	alg: "RS256",
	typ: "JWT",
};
const payLoadObj = {
	sub: "1234567890",
	name: "John Doe",
	admin: true,
	iat: 1516239022,
};

const headerObjString = JSON.stringify(headerObj);
const payLoadObjString = JSON.stringify(payLoadObj);

const base64urlHeader = base64url(headerObjString);
const base64urlPayload = base64url(payLoadObjString);

signatureFunction.write(base64urlHeader + "." + base64urlPayload);
signatureFunction.end();

const PRIV_KEY = fs.readFileSync(__dirname + "/privKey.pem", "utf8");

const signatureBase64 = signatureFunction.sign(PRIV_KEY, "base64");

const signatureBase64url = base64url.fromBase64(signatureBase64);
console.log(signatureBase64url);
