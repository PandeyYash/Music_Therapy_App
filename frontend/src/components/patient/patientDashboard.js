import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import LoggedInNavbar from "../navigation/loggedInNavbar";
//import Sidebar from "./sidebar";
//import { NavLink as Link } from "react-router-dom";
//import styled from "styled-components";

class PatientDashboard extends Component {
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
					<b>Hey there,</b> {user.fname}
					<p>You are now logged in as Patient👏</p>
				</h4>
			</div>
		);
	}
}
PatientDashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(PatientDashboard);
