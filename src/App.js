import React, {useState} from 'react';
//Components
import Homepage from './components/homepage';
import Login from './components/login';
import SignUp from './components/signup';
import Dashboard from './components/dashboard';
//CSS Files
import './css/ui.css';
import './css/theme.css';
//Images
import Logo from './imgs/logo.png';

function App() {
	const [loginVisible, showLogin] = useState(0);
	const [signupVisible, showSignup] = useState(0);
	const [loggedIn, setLogin] = useState(0);
	const [username, setUsername] = useState("username");
	let render;
	if(loggedIn){
		render = <Dashboard />;
	}else{
		render = <Homepage showLogin = {showLogin} showSignup = {showSignup}/>;
	}
	return (
		<>
			{loginVisible == 1 &&
				<Login showLogin = {showLogin} setUsername = {setUsername} setLogin = {setLogin}/>
			}
			{signupVisible == 1 &&
				<SignUp showSignup = {showSignup} showLogin = {showLogin}/>
			}
		    <div className="container-md homepage">
				<div className="row">
					<div className="col-9">
						<img className="logo" src={Logo} alt="rooms" />
					</div>
					{loggedIn == 1 &&
						<div className="col-3 user_menu">
							<span>@{username}</span>
							<a onClick={() => {setLogin(0)}} className="button red" href="#">Logout</a>
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
