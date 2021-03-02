import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import LoggedInNavbar from "../navigation/loggedInNavbar";
import Sidebar from "./sidebar";

class TherapistDashboard extends Component {
	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};

	render() {
		const { user } = this.props.auth;

		return (
			<div>
				<LoggedInNavbar />
				{/* <Sidebar /> */}
				<h4>
					<b>Hey there,</b> {user.name.split(" ")[0]}
					<p>You are now logged in 👏</p>
				</h4>
			</div>
		);
	}
}
TherapistDashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(TherapistDashboard);
