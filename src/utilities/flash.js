import React from 'react';

class Flash extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className={'flash ' + this.props.data.status}>
			{Array.isArray(this.props.data.messages) &&
				this.props.data.messages.map((message) => {
					return <p>- {message}</p>;
				})
			}
			{!Array.isArray(this.props.data.messages) &&
				<p>{this.props.data.messages}</p>
			}
			</div>
		);
	}
}

export default Flash;