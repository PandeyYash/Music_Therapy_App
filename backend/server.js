const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const app = express();
//const passportPatient = require("passport");
const patients = require("./routes/api/patients");

// Bodyparser middleware
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB successfully connected"))
	.catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
//app.use(passportPatient.initialize());

// Passport config
require("./config/passport")(passport);
//require("./config/passportPatient")(passportPatient);

// Routes
app.use("/api/users", users);
//app.use("/api/patients", patients);
app.use("/api/users", patients);

const port = process.env.PORT || 5000;
app.listen(port, () =>
	console.log(`Server is up and running on port ${port} !`)
);
