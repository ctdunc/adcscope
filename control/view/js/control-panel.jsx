import React, { Component } from "react";
import { Select, MenuItem } from "@material-ui/core";
import DeviceConfig from "./device-config";
var $ = require('jquery');
export default class ControlPanel extends Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			devices: ["no devices found"],
			current_device: "no devices found",
			device_options: {},
		}
		this.handleDeviceChange = this.handleDeviceChange.bind(this);
	}
	componentDidMount(){
		$.get(window.location.href+'active-devices', (d) => {
			$.get(window.location.href+'device/'+d[0], (d0) =>{
				this.setState({devices: d, current_device: d[0], device_options:d0});
			})
		});	
	}

	handleDeviceChange(event){
		$.get(window.location.href+'device/'+event.target.name, (d) =>
			{
				this.setState({current_device: event.target.name, device_options: d})
			});
	}
	
	render(){
		return(
		<div className="config-container">
			<div className="titlebar">
				<h1 className="title"> DAQ Configuration </h1>
				<Select 
				value={this.state.current_device}
				onChange={this.handleChange}
				autoWidth={true}
				inputProps={{name:"current_device", id:"device"}}
				className="dev-select"
				>	
				{this.state.devices.map((device)=>{
					return(
						<MenuItem value={device} key={device}> {device} </MenuItem>
					)
				})
				}
				</Select>
			</div>
			<DeviceConfig conf_vars={this.state.device_options} className="submenu"/>
			<div className="submenu">
			an
			</div>
			<div className="submenu">
			sv
			</div>
		</div>
		);
	}
}
