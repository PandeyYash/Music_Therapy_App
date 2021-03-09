import React, { Component } from "react";
import io from "socket.io-client";

class VideoCall extends Component {
	constructor(props) {
		super(props);

		this.localVideoref = React.createRef();
		this.remoteVideoref = React.createRef();

		this.socket = null;
		this.candidates = [];
	}

	componentDidMount() {
		this.socket = io("/Music_Therapy_AppPeer", {
			path: "/Music_Therapy_App",
			query: {},
		});

		this.socket.on("connection-success", (success) => {
			console.log(success);
		});

		this.socket.on("offerOrAnswer", (sdp) => {
			this.textref.value = JSON.stringify(sdp);

			// set sdp as remote description
			this.pc.setRemoteDescription(new RTCSessionDescription(sdp));
		});

		this.socket.on("candidate", (candidate) => {
			this.pc.addIceCandidate(new RTCIceCandidate(candidate));
		});

		const pc_config = {
			iceServers: [
				{
					urls: "stun:stun.l.google.com:19302",
				},
			],
		};

		this.pc = new RTCPeerConnection(pc_config);

		this.pc.onicecandidate = (e) => {
			if (e.candidate) {
				this.sendToPeer("candidate", e.candidate);
			}
		};

		this.pc.onaddstream = (e) => {
			this.remoteVideoref.current.srcObject = e.stream;
		};

		const constraints = { video: true };

		const success = (stream) => {
			this.localVideoref.current.srcObject = stream;
			this.pc.addStream(stream);
		};

		const failure = (e) => {
			console.log("getUserMedia Error:", e);
		};

		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(success)
			.catch(failure);
	}

	sendToPeer = (messageType, payload) => {
		this.socket.emit(messageType, {
			socketID: this.socket.id,
			payload,
		});
	};

	createOffer = () => {
		console.log("Offer");
		this.pc.createOffer({ offerToReceiveVideo: 1 }).then((sdp) => {
			// set offer sdp as local description
			this.pc.setLocalDescription(sdp);

			this.sendToPeer("offerOrAnswer", sdp);
		});
	};

	setRemoteDescription = () => {
		// retrieve and parse the SDP copied from the remote peer
		const desc = JSON.parse(this.textref.value);
		// set sdp as remote description
		this.pc.setRemoteDescription(new RTCSessionDescription(desc));
	};

	createAnswer = () => {
		console.log("Answer");
		this.pc.createAnswer({ offerToReceiveVideo: 1 }).then((sdp) => {
			// set answer sdp as local description
			this.pc.setLocalDescription(sdp);

			this.sendToPeer("offerOrAnswer", sdp);
		});
	};

	addCandidate = () => {
		this.candidates.forEach((candidate) => {
			console.log(JSON.stringify(candidate));
			this.pc.addIceCandidate(new RTCIceCandidate(candidate));
		});
	};

	render() {
		return (
			<div>
				<video
					style={{
						zIndex: 2,
						position: "fixed",
						right: 0,
						bottom: 0,
						width: 200,
						height: 200,
						margin: 10,
						backgroundColor: "black",
					}}
					ref={this.localVideoref}
					autoPlay
				></video>

				<video
					style={{
						zIndex: 1,
						minWidth: "550px",
						minHeight: "550px",
						display: "block",
						marginLeft: "auto",
						marginRight: "auto",
						backgroundColor: "black",

						padding: "110px",
					}}
					ref={this.remoteVideoref}
					autoPlay
				></video>

				<br />
				<div style={{ zIndex: 1, position: "fixed", top: 0 }}>
					<button onClick={this.createOffer}>Offer</button>
					<button onClick={this.createAnswer}>Answer</button>
					<br />
					<textarea
						ref={(ref) => {
							this.textref = ref;
						}}
					></textarea>
					<br />
				</div>
				<br />
			</div>
		);
	}
}

export default VideoCall;
