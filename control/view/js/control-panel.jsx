import React, { Component } from "react";
import { Select, MenuItem } from "@material-ui/core";
import DeviceConfig from "./device-config/device-config";

var $ = require('jquery');
export default class ControlPanel extends Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			devices: ["no devices found"],
			current_device: "no devices found",
			activeDeviceOpts: {},
		}
		this.submit = this.submit.bind(this);
		this.handleDeviceChange = this.handleDeviceChange.bind(this);
		this.updateActiveDeviceOpts= this.updateActiveDeviceOpts.bind(this);
	}
	/****** Lifecycle Events ******/
	componentDidMount(){
		$.get(window.location.href+'active-devices', (d) => {
				this.setState({devices:d});
				let e = {target: {name: d[0]}}; //basically a hack to get handleDeviceChange to think the user selected the 0th device
				this.handleDeviceChange(e);
		});	
	}
	
	/****** Device State Functions ******/
	handleDeviceChange(event){
		$.get(window.location.href+'device/'+event.target.name, (d) =>
			{
				if(d.is_currently_running){
					d = null;
				}else{
					delete d.is_currently_running;
					// sets default trigger mode
					Object.keys(d).map(key =>{
						d[key].trigger_opts = d[key].trigger_opts[0] ? d[key].trigger_opts : ["continuous"];
						d[key].sample_mode = d[key].trigger_opts[0];
					})
				}
				this.setState({current_device: event.target.name, activeDeviceOpts: d})
			});
	}
	
	updateActiveDeviceOpts(typeKey, newValue){
		let currentState = this.state.activeDeviceOpts; 
		currentState[typeKey] = newValue;
		this.setState({"activeDeviceOpts": currentState});
	}

	/****** Full Form Function ******/
	submit(event){
		$.post(window.location.href+'start-run/', JSON.stringify(this.state));
	}

	render(){
		return(
		<div className="config-container">
			<div className="titlebar">
				<h1 className="title"> DAQ Configuration </h1>
				<Select 
				value={this.state.current_device}
				onChange={this.handleChange}
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
			<DeviceConfig 
			value={this.state.activeDeviceOpts}
			onChange={this.updateActiveDeviceOpts}
			className="submenu"/>
			<div className="submenu">
			an
			</div>
			<div className="submenu">
			sv
			</div>
			<div className="action-bar">
				<button name="start" onClick={this.submit}> Start Run </button>
			</div>
		</div>
		);
	}
}
