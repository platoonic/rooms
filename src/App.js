import React, {useState, useEffect} from 'react';
//Utilities
import API from './axios';
import {loadProgressBar} from 'axios-progress-bar';
import {logout} from './auth';
import Flash from './utilities/flash';
//Components
import Homepage from './components/homepage';
import Login from './components/login';
import SignUp from './components/signup';
import Dashboard from './components/dashboard';
//CSS Files
import './css/ui.css';
import './css/theme.css';
import 'axios-progress-bar/dist/nprogress.css'
//Images
import Logo from './imgs/logo.png';

function App() {
	const [loginVisible, showLogin] = useState(0);
	const [signupVisible, showSignup] = useState(0);
	const [loggedIn, setLogin] = useState(0);
	const [username, setUsername] = useState("username");
	const [insideRoom, setInsideRoom] = useState(0);
	const [flashVisible, setFlashVisible] = useState(0);
	const [flashMessages, setFlashMessages] = useState({});
	const [interceptorID, setInterceptorID] = useState(0);

	//Check if user is already logged in
	useEffect(() => {
		//Attach Axios loading bar
		loadProgressBar({}, API);
		if(localStorage.getItem('userData')){
			let userData = JSON.parse(localStorage.getItem('userData'));
			setLogin(1);
			//Send Token with Each request
			API.interceptors.request.use((config) => {
				config.headers.token = userData.token;
				return config;
			}, (error) => {
				return Promise.reject(error);
			})
			setUsername(userData.username);
		}
	}, []);

	let logoutHandler = () => {
		logout(interceptorID);
		flashHandler('success', 'Logged out succesfully!');
		setLogin(0);
	}

	let flashHandler = (status, messages) => {
		setFlashVisible(1);
		setFlashMessages({ status, messages});
		setTimeout(() => {
			setFlashVisible(0);
		}, 2000);
	}

	let render;
	if(loggedIn){
		render = <Dashboard flashHandler={flashHandler} setInsideRoom = {setInsideRoom} insideRoom = {insideRoom}/>;
	}else{
		render = <Homepage showLogin = {showLogin} showSignup = {showSignup}/>;
	}
	let button;
	if(insideRoom){
		button = <a onClick={() => {setInsideRoom(0)}} className="button red" href="#">Leave Room</a>
	}else{
		button = <a onClick={() => {logoutHandler()}} className="button red" href="#">Logout</a>;
	}
	return (
		<>	
			{flashVisible == 1 &&
				<Flash data={flashMessages}/>
			}
			{loginVisible == 1 &&
				<Login setInterceptorID={setInterceptorID} flashHandler={flashHandler} showLogin = {showLogin} setUsername = {setUsername} setLogin = {setLogin}/>
			}
			{signupVisible == 1 &&
				<SignUp flashHandler={flashHandler} showSignup = {showSignup} showLogin = {showLogin}/>
			}
		    <div className="container-md homepage">
				<div className="row">
					<div className="col-8">
						<img className="logo" src={Logo} alt="rooms" />
					</div>
					{loggedIn == 1 &&
						<div className="col-4 user_menu">
							<span>@{username}</span>
							{button}
						</div>
					}
				</div>
				<div className="row">
					{render}
				</div>
			</div>
		</>
  	);
}

export default App;
