import React from 'react';
//Utilities
import API from '../axios';
import {login} from '../auth'

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			submitActive: true
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
	handleSubmit = (event) => {
		let submitActive = false;
		let errors = [];
		if(this.state.username == ''){
			errors.push("Please Enter your Username \n");
		}
		if(this.state.password == ''){
			errors.push("Please Enter your Password");
		}
		if(errors.length == 0){
			//Send API Request to /users/login
			API.post('/auth/login', {
				username: this.state.username,
				password: this.state.password
			}).then((res) => {
				console.log(res);
				this.props.flashHandler('success', 'Logged In!');
				let interceptorID = login(this.state.username, res.data.data.token);
				this.props.setInterceptorID(interceptorID);
				this.props.showLogin(0);
				this.props.setUsername(this.state.username);
				this.props.setLogin(1);
			}).catch((error) => {
				this.props.flashHandler('error', 'Wrong Credentials');
				console.log(error);
				this.setState({ submitActive: true });
			});
		}else{
			this.props.flashHandler('error', errors);
			submitActive = true;
		}
		this.setState({ submitActive });
	}
	render(){
		let buttonClass;
		if(this.state.submitActive){
			buttonClass = 'button blue';
		}else{
			buttonClass = 'button blue disabled';
		}
		return(
			<div>
				<div className="box">
					<h2>Login</h2>
					<input onChange={(event) => {this.handleUsername(event)}} type="text" placeholder="Please Enter your username" name="username" />
					<input onChange={(event) => {this.handlePassword(event)}}type="password" placeholder="Please Enter your password" name="password" />
					<a onClick={(event) => { this.state.submitActive && this.handleSubmit() }} className={buttonClass} href="#">Login</a>
				</div>
				<div onClick={() => { this.props.showLogin(0) }} className="overlay"></div>
			</div>
		);
	}
}

export default Login;