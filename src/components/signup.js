import React from 'react';

export default class SignUp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			password_confirm: ''
		};
	}
	inputHandler = (event) => {
		let field = event.target.name;
		let value = event.target.value;
		this.setState({
			[field]: value
		});
	}
	render(){
		return(
			<div>
				<div className="box">
					<h2>Sign Up</h2>
					<input onChange = {(event) => { this.inputHandler(event) }} type="text" placeholder="Please Enter your username" name="username" />
					<input onChange = {(event) => { this.inputHandler(event) }} type="text" placeholder="Please Enter your email address" name="email"/>
					<input onChange = {(event) => { this.inputHandler(event) }} type="password" placeholder="Please Enter your password" name="password" />
					<input onChange = {(event) => { this.inputHandler(event) }} type="password" placeholder="Please Confirm your password" name="password_confirm" />
					<a className="button blue" href="#">Sign Up</a>
				</div>
				<div onClick={() => { this.props.showSignup(0) }} className="overlay"></div>
			</div>
		);
	}
}