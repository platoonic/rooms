import React from 'react';

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
		let errors = "";
		if(this.state.username == ''){
			errors += "Please Enter your Username \n";
		}
		if(this.state.password == ''){
			errors += "Please Enter your Password";
		}
		if(errors == ""){
			//Send API Request to /users/login
			//Timeout to simulate a real request delay
			setTimeout(() => {
				this.props.setUsername(this.state.username);
				this.props.setLogin(1);
				this.props.showLogin(0);
			}, 2000);
		}else{
			alert(errors);
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