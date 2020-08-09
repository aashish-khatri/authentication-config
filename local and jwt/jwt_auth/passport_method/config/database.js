const mongoose = require("mongoose");

const devConnection = "mongodb://localhost:27017/jwt_auth";
const prodConnection = "";

const connectConfig = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

if (process.env.NODE_ENV === "production")
	mongoose.connect(prodConnection, connectConfig);
else mongoose.connect(devConnection, connectConfig);

mongoose.connection.on("connected", () => {
	console.log("database connected");
});
