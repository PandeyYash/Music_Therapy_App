const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterTherapistInput(data) {
	let errors = {};

	// Convert empty fields to an empty string so we can use validator functions
	data.fname = !isEmpty(data.fname) ? data.fname : "";
	data.lname = !isEmpty(data.lname) ? data.lname : "";
	data.birthyear = !isEmpty(data.birthyear) ? data.birthyear : "";
	data.gender = !isEmpty(data.gender) ? data.gender : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";

	// FName checks
	if (Validator.isEmpty(data.fname)) {
		errors.fname = "First Name is required";
	}

	// LName checks
	if (Validator.isEmpty(data.lname)) {
		errors.lname = "Last Name is required";
	}

	// Birth Year checks
	if (Validator.isEmpty(data.birthyear)) {
		errors.birthyear = "Birth Year is required";
	}

	// Gender checks
	if (Validator.isEmpty(data.gender)) {
		errors.gender = "Gender is required";
	}

	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = "Email field is required";
	} else if (!Validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}

	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	}
	if (Validator.isEmpty(data.password2)) {
		errors.password2 = "Confirm password field is required";
	}
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = "Password must be at least 6 characters";
	}
	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords must match";
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
