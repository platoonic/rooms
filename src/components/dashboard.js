import React from 'react';
//Utilities
import API from '../axios';
//Components
import Room from './room';

export default class Dashboard extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			room_name: '',
			room_code: '',
			type: 'client'
		}
	}

	inputHandler = (event) => {
		let field = event.target.name;
		let value = event.target.value;
		this.setState({
			[field]: value
		});
	}

	createRoom = () => {
		if(this.state.room_name == ''){
			this.props.flashHandler('error', "You didn't enter a room name!");
			return;
		}
		let userData = JSON.parse(localStorage.getItem('userData'));
		let userID = userData.id;
		API.post('/rooms/create', {
			name: this.state.room_name,
			creatorId: userID
		}).then((res) => {
			console.log(res.data.data.roomCode);
			this.setState({
				type: 'host',
				room_code: res.data.data.roomCode
			});
			//Should get room code here and set its state
			this.props.flashHandler('success', 'Room Joined!');
			this.props.setInsideRoom(1);
		}).catch((error) => {
			console.log(error);
			this.props.flashHandler('error', 'An Error occured');
		});
	}

	joinRoom = () => {
		if(this.state.room_code == ''){
			this.props.flashHandler('error', "You didn't enter a room code!");
			return;
		}
		API.get('/rooms/join/'+this.state.room_code, {

		}).then((res) => {
			this.props.flashHandler('success', 'Room Joined!');
			this.setState({ room_name: res.data.data.room_name, type: 'client' });
			this.props.setInsideRoom(1);
		}).catch((error) => {
			this.props.flashHandler('error', 'Room is full!');
		});
	}

	render(){
		let page;
		if(this.props.insideRoom){
			page = <Room setInsideRoom={this.props.setInsideRoom} flashHandler={this.props.flashHandler} type={this.state.type} room_name={this.state.room_name} room_code={this.state.room_code}/>;
		}else{
			page = <>
					<div className="col-6">
						<h3>Create a Room</h3>
						<div className="room_action">
							<input onChange={(event) => {this.inputHandler(event)}}type="text" name="room_name" placeholder="Enter Room Name"/>
							<a className="linkNoUnderline" onClick={() => {this.createRoom()}} href="#">Create & Join</a>
						</div>
					</div>
					<div className="col-6">
						<h3>Join a Room</h3>
						<div className="room_action">
							<input onChange={(event) => {this.inputHandler(event)}}type="text" name="room_code" placeholder="Enter Room code (e.g RG34WEZ)"/>
							<a className="linkNoUnderline" onClick={() => {this.joinRoom()}} href="#">Join</a>
						</div>
					</div>
					</>;
		}
		return(
			<>
				{page}
			</>
		);
	}
}