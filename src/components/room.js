import React from 'react';
import io from 'socket.io-client';

export default class Room extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			socket: '',
			sharing_screen: false,
			people_count: 1,
			upload_visible: false,
			viewing: false,
			WebRTC_config: {
				iceServers: [
				    {
				      urls: ["stun:stun.l.google.com:19302"]
				    }
				]
			},
			peerConnections: []
		};
		this.myRef = React.createRef();
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
			socket: io('http://localhost:3005')
		}, () => {
			let peerConnections = [];
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

			//WebRTC Specific events
			if(this.props.type == 'host'){
				//Host socket events
				this.state.socket.on('viewing', (id) => {
					const peerConnection = new RTCPeerConnection(this.state.WebRTC_config);
					peerConnections[id] = peerConnection;
					this.state.stream.getTracks().forEach(track => peerConnection.addTrack(track, this.state.stream));

					peerConnection.onicecandidate = event => {
						if (event.candidate) {
							this.state.socket.emit("candidate", id, event.candidate);
						}
					};
					console.log("Creating offer");
					peerConnection
						.createOffer()
						.then(sdp => peerConnection.setLocalDescription(sdp))
						.then(() => {
							this.state.socket.emit("offer", id, peerConnection.localDescription);
						});
				});
				this.state.socket.on("answer", (id, description) => {
				  peerConnections[id].setRemoteDescription(description);
				  //peerConnection.setRemoteDescription(description);
				});

				this.state.socket.on("candidate", (id, candidate) => {
				  peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
				  //peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
				});

				this.state.socket.on("disconnectPeer", id => {
				  peerConnections[id].close();
				  //peerConnection.close();
				  delete peerConnections[id];
				});
			}else{
				//Viewer socket events
				let peerConnection;
				this.state.socket.on("offer", (id, description) => {
				    peerConnection = new RTCPeerConnection(this.state.WebRTC_config);
				    peerConnection
				        .setRemoteDescription(description)
				        .then(() => peerConnection.createAnswer())
				        .then((sdp) => peerConnection.setLocalDescription(sdp))
				        .then(() => {
				            this.state.socket.emit("answer", id, peerConnection.localDescription);
				        });
				    peerConnection.ontrack = (event) => {
				    	this.setState({viewing: true});
				        this.myRef.current.srcObject = event.streams[0];
				        this.myRef.current.play();
				    };
				    peerConnection.onicecandidate = (event) => {
				        if (event.candidate) {
				            this.state.socket.emit("candidate", id, event.candidate);
				        }
				    };
				});

				this.state.socket.on("candidate", (id, candidate) => {
				    peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch((e) => console.error(e));
				});

				this.state.socket.on("stream", (data) => {
				    this.state.socket.emit("view", data);
				});

				this.state.socket.on("disconnectPeer", () => {
				    peerConnection.close();
				});
			}
		});	
	}

	leaveHandler = () => {
		this.state.socket.close();
		this.props.setInsideRoom(0);
		this.props.flashHandler('error', 'You Left the room.');
	}

	fileUploadBox = () => {
		if(this.state.people_count == 1){
			return;
		}
		this.setState({ upload_visible: !this.state.upload_visible });
	}

	handleUploadedFile = (files, event) => {
		let file = files[0];
	    let type = file.type;
	    const URL = window.URL || window.webkitURL;
	    
	    let playable = this.myRef.current.canPlayType(type);
	    if (playable === '') playable = 'no';
	    let message = 'The file you uploaded is type: "' + type + '". Possibility: ' + playable;
	    let isError = playable === 'no';

	    if (isError) {
	    	this.props.flashHandler('error', 'This file cannot be played.');
	    	event.target.value = '';
	    	return;
	    }

	    this.setState({ upload_visible: false });
	    this.myRef.current.src = URL.createObjectURL(file);
	}

	videoPlayed = (event) => {
		if(this.props.type != 'host'){
			return;
		}
		console.log("video played");
		if(this.myRef.current.captureStream()){
			var stream = this.myRef.current.captureStream();
		}
		else if (this.myRef.current.mozCaptureStream()){
			var stream = this.myRef.current.mozCaptureStream();
		}
    	const data = {
			room_code: this.props.room_code
		};
		this.setState({stream: stream});
    	this.state.socket.emit("stream", data);
	}

	shareScreen = () => {
		if(this.state.people_count == 1){
			return;
		}
		if(!navigator.mediaDevices.getDisplayMedia){
			this.props.flashHandler('error', "Your browser doesn't support screen sharing");
			return;
		}
		navigator.mediaDevices.getDisplayMedia({video:1}).then((stream) => {
			this.setState({upload_visible: false, sharing_screen: true});
			this.myRef.current.srcObject = stream;
			this.myRef.current.play();
			this.state.socket.emit("stream", { room_code: this.props.room_code });
		}).catch((error) => {
			this.props.flashHandler('error', "No permissions granted for screen sharing!");
		});
	}

	stopSharing = () => {
		let tracks = this.myRef.current.srcObject.getTracks();
		tracks.forEach(track => track.stop());
		this.myRef.current.srcObject = null;
		this.setState({sharing_screen: false});
	}

	render(){
		let share_screen_link;
		if(this.state.sharing_screen == false){
			share_screen_link = <a className={this.state.people_count == 1 ? "disabled" : ""} onClick = {(event) => {this.shareScreen()}} href="#">Share Screen</a>
		}else{
			share_screen_link = <a onClick = {(event) => {this.stopSharing()}} href="#">Stop Screen</a>
		}
		return(
			<>	
				{this.state.upload_visible == true &&
					<div className="upload_box">
						<input onChange = {(event) => { this.handleUploadedFile(event.target.files, event) }} type="file" accept="video/*"/>
					</div>
				}
				{this.state.viewing == false && this.props.type == 'client' &&
					<div className="no-video">
						<p>The Host hasn't streamed anything yet!</p>
					</div>
				}
				<div className="col-12">
					<video onPlay = {(event) => { this.videoPlayed(event)}} ref={this.myRef} width="933" height="360" controls></video>
					<div className="video_controls">
						<span className="room_name">{this.props.room_name}</span>
						{this.props.type == 'host' &&
						<>
							{share_screen_link}
							<a className={this.state.people_count == 1 ? "disabled" : ""} onClick = {() => { this.fileUploadBox() }} href="#">Upload Video</a>
							<a onClick = {() => { this.inviteHandler() }} href="#">Invite Users</a>
						</>
						}
							<a onClick={() => { this.leaveHandler() }} style={{ color: '#ff6e6e' }} href="#">Leave Room</a>
						<div className="participants">
							<span>People: {this.state.people_count}</span>
						</div>
					</div>
				</div>
			</>
		);
	}
}