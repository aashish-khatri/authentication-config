//Database Configuration to setup and connect to mongo server
const mongoose = require("mongoose");
require("dotenv").config();
//Create env file and the db_string=mongodb://localhost:27017/(name of your database)
const dbString = process.env.db_string;
const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
const connection = mongoose.createConnection(dbString, dbOptions);

//User Schema
const UserSchema = new mongoose.Schema({
	username: String,
	hash: String,
	salt: String,
	admin: String,
});

const User = connection.model("User", UserSchema);

module.exports = connection;
