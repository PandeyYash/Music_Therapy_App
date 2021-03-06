import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			errors: {},
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Login page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push("/dashboard"); // push user to dashboard when they login

			console.log();
		}
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
			});
		}
	}

	onChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
		console.log(userData);
	};

	render() {
		const { errors } = this.state;
		return (
			<div>
				<form noValidate onSubmit={this.onSubmit}>
					<input
						onChange={this.onChange}
						value={this.state.email}
						error={errors.email}
						id='email'
						type='email'
						className={classnames("", {
							invalid: errors.email || errors.emailnotfound,
						})}
					/>
					<label htmlFor='email'>Email</label>
					<span className='red-text'>
						{errors.email}
						{errors.emailnotfound}
					</span>
					<input
						onChange={this.onChange}
						value={this.state.password}
						error={errors.password}
						id='password'
						type='password'
						className={classnames("", {
							invalid: errors.password || errors.passwordincorrect,
						})}
					/>
					<label htmlFor='password'>Password</label>
					<span className='red-text'>
						{errors.password}
						{errors.passwordincorrect}
					</span>
					<button
						style={{
							width: "150px",
							borderRadius: "3px",
							letterSpacing: "1.5px",
							marginTop: "1rem",
						}}
						type='submit'
					>
						Login
					</button>
				</form>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
