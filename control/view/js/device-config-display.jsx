import React, { Component } from 'react';

export default class DeviceConfigDisplay extends Component{
	constructor(props,context){
		super(props,context);
	}

	render(){
		return(
			<div>
				{JSON.stringify(this.props)}
			</div>
		)
	}
}
