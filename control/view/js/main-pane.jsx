import React, { Component } from 'react';
import DeviceConfigContainer from './config/device-config';
import 'react-light-accordion/demo/css/index.css';
var $ = require('jquery');

export default class MainPane extends Component {
	constructor(props, context){
		super(props,context);
		this.state = {devices: [], current: ""};
		this.getDevicesFromRDB = this.getDevicesFromRDB.bind(this);
		this.changeDevice = this.changeDevice.bind(this);
		this.getDevicesFromRDB();
	}

	getDevicesFromRDB(){
		$.get(window.location.href+"devices", (devices) => {
			for(const idx in devices){
				this.setState({devices: devices, current: devices[0]})
			}
			});
	}

	changeDevice(e){
		const dev = e.target.value;
		this.setState({current: dev});
	}
	render(){
		return(
			<div className="main">
				<div className="header">
					<h1> Device Configuration </h1>
					<select value={this.state.current} onChange={this.changeDevice}>
						{this.state.devices.map(device =>
							{return(
								<option value={device} key={device}> {device} </option>
							)})}
					</select>
				</div>
			<div className="configuration-pane">
				<DeviceConfigContainer deviceName={this.state.current} key={this.state.current}/>
			</div>
			</div>
		);
	}
}
