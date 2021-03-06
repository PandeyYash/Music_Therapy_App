const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
	fname: {
		type: String,
		required: true,
	},
	lname: {
		type: String,
		required: true,
	},
	birthyear: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	uid: {
		type: String,
		required: false,
	},
	institution: {
		type: String,
		required: false,
	},
	therapist: {
		type: String,
		required: false,
	},
	notes: {
		type: String,
		required: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
module.exports = User = mongoose.model("users", UserSchema);
