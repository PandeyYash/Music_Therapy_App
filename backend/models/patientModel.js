const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Patient Schema
const PatientSchema = new Schema({
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
		required: false,
	},
	institution: {
		type: String,
		required: true,
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
module.exports = Patient = mongoose.model("patients", PatientSchema);
