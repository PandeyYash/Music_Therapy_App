import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
import Register from "./components/register";
import Login from "./components/login";
import PrivateRoute from "./components/private-route/privateRoute";
import TherapistDashboard from "./components/therapist/therapistDashboard";
import LandingPage from "./components/landing/landingPage";
import AddPatient from "./components/therapist/addPatient";
import PatientDashboard from "./components/patient/patientDashboard";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);
	// Decode token and get user info and exp
	const decoded = jwt_decode(token);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Redirect to login
		window.location.href = "./login";
	}
}

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Route exact path='/' component={LandingPage} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<Switch>
					<PrivateRoute
						exact
						path='/dashboard'
						component={TherapistDashboard}
					/>
					<PrivateRoute exact path='/add-patient' component={AddPatient} />
					<PrivateRoute
						exact
						path='/dashboard-patient'
						component={PatientDashboard}
					/>
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
