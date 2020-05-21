import React from 'react';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}
	handleUsername = (event) => {
		let username = event.target.value;
		this.setState({ username });
	}
	handlePassword = (event) => {
		let password = event.target.value;
		this.setState({ password });
	}
	render(){
		return(
			<div>
				<div className="box">
					<h2>Login</h2>
					<input onChange={(event) => {this.handleUsername(event)}} type="text" placeholder="Please Enter your username" name="username" />
					<input onChange={(event) => {this.handlePassword(event)}}type="password" placeholder="Please Enter your password" name="password" />
					<a className="button blue" href="#">Login</a>
				</div>
				<div onClick={() => { this.props.showLogin(0) }} className="overlay"></div>
			</div>
		);
	}
}

export default Login;