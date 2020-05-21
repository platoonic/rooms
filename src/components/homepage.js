import React from 'react';

export default function Homepage(props){
	return(
		<div class="col-12">
			<h1>Create Virtual Rooms and start casting media for<br/> others.</h1>
			<p className="description">rooms is a platform that lets people setup private rooms and share their screen/windows/browser tabs or even local 
			video files with each other and control their playback and more!</p>
			<div className="action">
				<a onClick={() => { props.showSignup(1) }} className="button green" href="#">Sign Up</a>
				<span>or</span>
				<a onClick={() => { props.showLogin(1) }} className="login" href="#">Login</a>
			</div>
			<p className="credits">This project is part of CC431 (Computer Networks) course work in AAST university.</p>
		</div>
	);
}