import React from 'react';

export default class Room extends React.Component{
	constructor(props){
		super(props);
	}
	inviteHandler = () => {
		navigator.clipboard.writeText(this.props.room_code);
		this.props.flashHandler('success', 'Copied Room Code to Clipboard!');
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
					<div className="participants">
						<span>People: 1 (me)</span>
					</div>
				</div>
			</div>
		);
	}
}