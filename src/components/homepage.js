import React, {useState} from 'react';
//Images
import Logo from '../imgs/logo.png';
//Components
import Login from './login';

export default function Homepage(props){
	const [loginVisible, showLogin] = useState(0);
	const [signupVisible, showSignup] = useState(0);
	return(
		<div>
			{loginVisible == 1 &&
				<Login showLogin = {showLogin}/>
			}
			<div className="container-md homepage">
				<div className="row">
					<div className="col-12">
						<img src={Logo} alt="rooms" />
						<h1>Create Virtual Rooms and start casting media for<br/> others.</h1>
						<p className="description">rooms is a platform that lets people setup private rooms and share their screen/windows/browser tabs or even local 
						video files with each other and control their playback and more!</p>
						<div className="action">
							<a className="button green" href="#">Sign Up</a>
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