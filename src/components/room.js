import React from 'react';

export default class Room extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div class="col-12">
				<video width="933" height="360" controls></video>
				<div class="video_controls">
					<span class="room_name">{this.props.room_name}</span>
					{this.props.type == 'host' &&
					<>
						<a href="#">Share Screen</a>
						<a href="#">Upload Video</a>
						<a href="#">Invite Users</a>
					</>
					}
					<div class="participants">
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