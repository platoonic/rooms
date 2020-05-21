import React, {useState} from 'react';
//Images
import Logo from '../imgs/logo.png';
//Components
import Login from './login';
import SignUp from './signup';

export default function Homepage(props){
	const [loginVisible, showLogin] = useState(0);
	const [signupVisible, showSignup] = useState(0);
	return(
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
						<h1>Create Virtual Rooms and start casting media for<br/> others.</h1>
						<p className="description">rooms is a platform that lets people setup private rooms and share their screen/windows/browser tabs or even local 
						video files with each other and control their playback and more!</p>
						<div className="action">
							<a onClick={() => { showSignup(1) }} className="button green" href="#">Sign Up</a>
							<span>or</span>
							<a onClick={() => { showLogin(1) }} className="login" href="#">Login</a>
						</div>
						<p className="credits">This project is part of CC431 (Computer Networks) course work in AAST university.</p>
					</div>
				</div>
			</div>
		</div>
	);
}