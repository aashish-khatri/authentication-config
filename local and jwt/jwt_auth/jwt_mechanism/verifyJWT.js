const crypto = require("crypto");
const { default: base64url } = require("base64url");
const verifyFunction = crypto.createVerify("RSA-SHA256");
const fs = require("fs");

const JWT =
	"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA";

const jwtParts = JWT.split(".");
const headerInBaseUrlFormat = jwtParts[0];
const payloadInBaseUrlFormat = jwtParts[1];
const signatureInBaseUrlFormat = jwtParts[2];

verifyFunction.write(headerInBaseUrlFormat + "." + payloadInBaseUrlFormat);
verifyFunction.end();

const jwtSignatureBase64 = base64url.toBase64(signatureInBaseUrlFormat);

const PUB_KEY = fs.readFileSync(__dirname + "/pubKey.pem", "utf-8");

const signatureIsVAlid = verifyFunction.verify(
	PUB_KEY,
	jwtSignatureBase64,
	"base64"
);
console.log(signatureIsVAlid);
