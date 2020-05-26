import React from 'react';

export default class Room extends React.Component{
	constructor(props){
		super(props);
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
						<a href="#">Invite Users</a>
					</>
					}
					<div className="participants">
						<span>Participants</span>
							<ul>
								<li>@{this.props.room_name}(me)</li>
								<li>@username2</li>
							</ul>
					</div>
				</div>
			</div>
		);
	}
}