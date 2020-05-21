import React, {useState} from 'react';
//Components
import Homepage from './components/homepage';
import Login from './components/login';
import SignUp from './components/signup';
//CSS Files
import './css/ui.css';
import './css/theme.css';
//Images
import Logo from './imgs/logo.png';

function App() {
	const [loginVisible, showLogin] = useState(0);
	const [signupVisible, showSignup] = useState(0);
	return (
		<div>
			{loginVisible == 1 &&
				<Login showLogin = {showLogin}/>
			}
			{signupVisible == 1 &&
				<SignUp showSignup = {showSignup}/>
			}
		    <div className="container-md homepage">
				<div className="row">
					<div className="col-12">
						<img src={Logo} alt="rooms" />
						<Homepage showLogin = {showLogin} showSignup = {showSignup}/>
					</div>
				</div>
			</div>
		</div>
  	);
}

export default App;
