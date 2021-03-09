import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import LoggedInNavbar from "../navigation/loggedInNavbar";
//import Sidebar from "./sidebar";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

const NavBtnLink = styled(Link)`
	border-radius: 4px;
	background: #256ce1;
	padding: 10px 22px;
	color: #fff;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	margin-top: 30px;
	&:hover {
		transition: all 0.2s ease-in-out;
		background: #fff;
		color: #010606;
	}
`;

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
					<b>Hey there,</b> {user.fname}
					<p>You are now logged in as Therapist👏</p>
				</h4>
				<NavBtnLink to='/add-patient' activeStyle>
					Add Patient
				</NavBtnLink>
				<NavBtnLink to='/call' activeStyle>
					Call
				</NavBtnLink>
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
