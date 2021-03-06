import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

class Register extends Component {
	constructor() {
		super();
		this.state = {
			fname: "",
			lname: "",
			birthyear: "",
			gender: "",
			email: "",
			password: "",
			password2: "",
			errors: {},
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Register page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
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
		const newUser = {
			fname: this.state.fname,
			lname: this.state.lname,
			birthyear: this.state.birthyear,
			gender: this.state.gender,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
		};
		this.props.registerUser(newUser, this.props.history);
		console.log(newUser);
	};
	render() {
		const { errors } = this.state;
		return (
			<div>
				<form noValidate onSubmit={this.onSubmit}>
					<label htmlFor='fname'>First Name</label>
					<input
						onChange={this.onChange}
						value={this.state.fname}
						error={errors.fname}
						id='fname'
						type='text'
						className={classnames("", {
							invalid: errors.fname,
						})}
					/>
					<span className='red-text'>{errors.fname}</span>

					<label htmlFor='lname'>Last Name</label>
					<input
						onChange={this.onChange}
						value={this.state.lname}
						error={errors.lname}
						id='lname'
						type='text'
						className={classnames("", {
							invalid: errors.lname,
						})}
					/>
					<span className='red-text'>{errors.lname}</span>

					<label htmlFor='birthyear'>Birth Year</label>
					<input
						onChange={this.onChange}
						value={this.state.birthyear}
						error={errors.birthyear}
						id='birthyear'
						type='text'
						className={classnames("", {
							invalid: errors.birthyear,
						})}
					/>
					<span className='red-text'>{errors.birthyear}</span>

					<label htmlFor='gender'>Gender</label>
					<input
						onChange={this.onChange}
						value={this.state.gender}
						error={errors.gender}
						id='gender'
						type='text'
						className={classnames("", {
							invalid: errors.gender,
						})}
					/>
					<span className='red-text'>{errors.gender}</span>

					<label htmlFor='email'>Email</label>
					<input
						onChange={this.onChange}
						value={this.state.email}
						error={errors.email}
						id='email'
						type='email'
						className={classnames("", {
							invalid: errors.email,
						})}
					/>
					<span className='red-text'>{errors.email}</span>

					<label htmlFor='password'>Password</label>
					<input
						onChange={this.onChange}
						value={this.state.password}
						error={errors.password}
						id='password'
						type='password'
						className={classnames("", {
							invalid: errors.password,
						})}
					/>
					<span className='red-text'>{errors.password}</span>

					<label htmlFor='password2'>Confirm Password</label>
					<input
						onChange={this.onChange}
						value={this.state.password2}
						error={errors.password2}
						id='password2'
						type='password'
						className={classnames("", {
							invalid: errors.password2,
						})}
					/>
					<span className='red-text'>{errors.password2}</span>

					<button
						style={{
							width: "150px",
							borderRadius: "3px",
							letterSpacing: "1.5px",
							marginTop: "1rem",
						}}
						type='submit'
					>
						Sign up
					</button>
				</form>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
