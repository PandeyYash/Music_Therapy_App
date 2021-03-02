import React from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";

const Nav = styled.nav`
	background: #00103c;
	height: 80px;
	display: flex;
	justify-content: space-between;
	padding: 0.5rem calc((100vw - 1250px) / 2);
	z-index: 10;
`;

const NavLink = styled(Link)`
	color: #fff;
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 0 1rem;
	height: 100%;
	cursor: pointer;
	&.active {
		color: #15cdfc;
	}
`;

const Bars = styled(FaBars)`
	display: none;
	color: #fff;
	@media screen and (max-width: 768px) {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(-100%, 75%);
		font-size: 1.8rem;
		cursor: pointer;
	}
`;

const NavMenu = styled.div`
	display: flex;
	align-items: center;
	margin-right: 24px;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const NavBtn = styled.nav`
	display: flex;
	align-items: center;
	margin-left: 24px;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

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
	margin-left: 24px;
	&:hover {
		transition: all 0.2s ease-in-out;
		background: #fff;
		color: #010606;
	}
`;

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavLink to='/'>
					<h1>Logo</h1>
				</NavLink>
				<Bars />
				<NavMenu>
					<NavLink to='/about-us' activeStyle>
						About Us
					</NavLink>
					<NavLink to='/support' activeStyle>
						Support
					</NavLink>
					<NavLink to='/login' activeStyle>
						Sign In
					</NavLink>
					<NavBtnLink to='/register'>Sign Up</NavBtnLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
