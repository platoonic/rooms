import React from 'react';

export default class Dashboard extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			room_name: '',
			room_code: ''
		}
	}
	inputHandler = (event) => {
		let field = event.target.name;
		let value = event.target.value;
		this.setState({
			[field]: value
		});
		console.log(this.state);
	}
	render(){
		return(
			<>
				<div className="col-6">
					<h3>Create a Room</h3>
					<div className="room_action">
						<input onChange={(event) => {this.inputHandler(event)}}type="text" name="room_name" placeholder="Enter Room Name"/>
						<a href="#">Create & Join</a>
					</div>
				</div>
				<div className="col-6">
					<h3>Join a Room</h3>
					<div className="room_action">
						<input onChange={(event) => {this.inputHandler(event)}}type="text" name="room_code" placeholder="Enter Room code (e.g RG34WEZ)"/>
						<a href="#">Join</a>
					</div>
				</div>
			</>
		);
	}
}