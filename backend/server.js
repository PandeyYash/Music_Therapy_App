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

var io = require("socket.io")({
	path: "/Music_Therapy_App",
});

app.use(express.static(__dirname + "/build"));
app.get("/", (req, res, next) => {
	res.sendFile(__dirname + "/build/index.html");
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
	console.log(`Server is up and running on port ${port} !`)
);

io.listen(server);

const peers = io.of("/Music_Therapy_AppPeer");

// keep a reference of all socket connections
let connectedPeers = new Map();

peers.on("connection", (socket) => {
	console.log(socket.id);
	socket.emit("connection-success", { success: socket.id });

	connectedPeers.set(socket.id, socket);

	socket.on("disconnect", () => {
		console.log("disconnected");
		connectedPeers.delete(socket.id);
	});

	socket.on("offerOrAnswer", (data) => {
		// send to the other peer(s) if any
		for (const [socketID, socket] of connectedPeers.entries()) {
			// don't send to self
			if (socketID !== data.socketID) {
				console.log(socketID, data.payload.type);
				socket.emit("offerOrAnswer", data.payload);
			}
		}
	});

	socket.on("candidate", (data) => {
		// send candidate to the other peer(s) if any
		for (const [socketID, socket] of connectedPeers.entries()) {
			// don't send to self
			if (socketID !== data.socketID) {
				console.log(socketID, data.payload);
				socket.emit("candidate", data.payload);
			}
		}
	});
});
