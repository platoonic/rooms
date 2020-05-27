import React from 'react';
//Utilities
import API from '../axios';

export default class SignUp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			password_confirm: '',
			submitActive: true
		};
	}
	inputHandler = (event) => {
		let field = event.target.name;
		let value = event.target.value;
		this.setState({
			[field]: value
		});
	}
	handleSubmit = (event) => {
		let submitActive = false;
		let errors = [];
		if(this.state.username == ''){
			errors.push("Please Enter your Username \n");
		}
		if(this.state.password == ''){
			errors.push("Please Enter your Password \n");
		}
		if(this.state.email == ""){
			errors.push("Please Enter your email\n");
		}else if(!this.state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
			errors.push("The Email you entered is invalid\n");
		}
		if(this.state.password_confirm == ""){
			errors.push("Please enter your password confirmation\n");
		}else if(this.state.password != this.state.password_confirm){
			errors.push("The Passwords you entered do not match\n");
		}
		
		if(errors.length == 0){
			//Send HTTP POST request to register the user at the backend API
			API.post('/users', {
				username: this.state.username,
				email: this.state.email,
				password: this.state.password
			}).then((res) => {
				this.props.flashHandler('success', 'Signed Up Succesfully!');
				this.props.showSignup(0);
				this.props.showLogin(1);

			}).catch((error) => {
				this.props.flashHandler('error', 'An Error Occured!');
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
					<h2>Sign Up</h2>
					<input onChange = {(event) => { this.inputHandler(event) }} type="text" placeholder="Please Enter your username" name="username" />
					<input onChange = {(event) => { this.inputHandler(event) }} type="text" placeholder="Please Enter your email address" name="email"/>
					<input onChange = {(event) => { this.inputHandler(event) }} type="password" placeholder="Please Enter your password" name="password" />
					<input onChange = {(event) => { this.inputHandler(event) }} type="password" placeholder="Please Confirm your password" name="password_confirm" />
					<a onClick={() => { this.handleSubmit() }} className={buttonClass} href="#">Sign Up</a>
				</div>
				<div onClick={() => { this.props.showSignup(0) }} className="overlay"></div>
			</div>
		);
	}
}