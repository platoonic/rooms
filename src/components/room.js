import React from 'react';
import io from 'socket.io-client';

export default class Room extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			socket: '',
			people_count: 1
		};
	}
	inviteHandler = () => {
		navigator.clipboard.writeText(this.props.room_code);
		this.props.flashHandler('success', 'Copied Room Code to Clipboard!');
	}
	componentDidMount(){
		if(this.props.type != 'host'){
			this.setState({ people_count: 2 });
		}
		//Connect to Socket
		this.setState({
			socket: io('https://room-backend-networks.herokuapp.com/')
		}, () => {
			const data = {
				room_code: this.props.room_code
			};
			if(this.props.type == 'host'){
				this.state.socket.emit("create-room", data);
			}else{
				this.state.socket.emit("join-room", data);
			}
			this.state.socket.on('user-joined', () => {
				this.props.flashHandler('success', 'Someone Joined!');
				this.setState({ people_count: 2 });
			});
			this.state.socket.on('user-left', () => {
				this.props.flashHandler('error', 'Someone Left.');
				this.setState({ people_count: 1 });
			})
			this.state.socket.on('room-terminated', () => {
				this.props.flashHandler('error', 'Host left the room.');
				this.props.setInsideRoom(0);
			});
		});	
	}

	leaveHandler = () => {
		this.state.socket.close();
		this.props.setInsideRoom(0);
		this.props.flashHandler('error', 'You Left the room.');
	}

	render(){
		return(
			<div className="col-12">
				<video width="933" height="360" controls></video>
				<div className="video_controls">
					<span className="room_name">{this.props.room_name}</span>
					{this.props.type == 'host' &&
					<>
						<a href="#">Share Screen</a>
						<a href="#">Upload Video</a>
						<a onClick={() => { this.inviteHandler() }} href="#">Invite Users</a>
					</>
					}
						<a onClick={() => { this.leaveHandler() }} style={{ color: '#ff6e6e' }} href="#">Leave Room</a>
					<div className="participants">
						<span>People: {this.state.people_count}</span>
					</div>
				</div>
			</div>
		);
	}
}